from django.shortcuts import render

import os
from dotenv import load_dotenv
load_dotenv()
import datetime
import json
import re
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from datetime import timedelta
from zoneinfo import ZoneInfo

def load_members_from_json():
    members_file_path = settings.BASE_DIR / 'members.json'
    try:
        with open(members_file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        # 파일이 없는 경우 빈 리스트 반환 또는 기본값 설정
        return [] 
    except json.JSONDecodeError:
        # JSON 파싱 오류 처리
        return []


KST = ZoneInfo("Asia/Seoul")
QUESTION_KEY_PATTERN = re.compile(r"^Q(\d+)$")


def _get_quiz_window(now=None):
    """Return (window_start, next_reset) based on weekly reset: Tuesday 19:00 (KST)."""
    if now is None:
        from django.utils import timezone
        now = timezone.now()
    now_kst = now.astimezone(KST)

    target_weekday = 1  # Tuesday (Mon=0)
    target_hour = 19

    days_since_target = (now_kst.weekday() - target_weekday) % 7
    candidate = (now_kst - timedelta(days=days_since_target)).replace(
        hour=target_hour, minute=0, second=0, microsecond=0
    )
    if candidate > now_kst:
        candidate = candidate - timedelta(days=7)

    window_start = candidate
    next_reset = window_start + timedelta(days=7)
    return window_start, next_reset


def _get_previous_quiz_window(now=None):
    current_start, _ = _get_quiz_window(now=now)
    previous_start = current_start - timedelta(days=7)
    previous_end = current_start
    return previous_start, previous_end


def _is_member(name: str | None, email: str | None) -> bool:
    if not name or not email:
        return False
    for member in load_members_from_json():
        if member.get('name') == name and member.get('email') == email:
            return True
    return False


def _is_admin(name: str | None, email: str | None) -> bool:
    admin_name = os.getenv("ADMIN_NAME")
    admin_email = os.getenv("ADMIN_EMAIL")
    if not admin_name or not admin_email:
        return False
    return name == admin_name and email == admin_email


def _is_authorized_user(name: str | None, email: str | None) -> bool:
    return _is_admin(name, email) or _is_member(name, email)


def _question_sort_key(key: str):
    match = QUESTION_KEY_PATTERN.match(key)
    if match:
        return int(match.group(1))
    return float("inf")


def _load_quiz_questions():
    quiz_questions_path = settings.BASE_DIR / 'static' / 'quiz_questions.json'
    with open(quiz_questions_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def _save_quiz_questions(questions):
    quiz_questions_path = settings.BASE_DIR / 'static' / 'quiz_questions.json'
    with open(quiz_questions_path, 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=4)


def _save_members(members):
    members_file_path = settings.BASE_DIR / 'members.json'
    with open(members_file_path, 'w', encoding='utf-8') as f:
        json.dump(members, f, ensure_ascii=False, indent=4)


def _is_hidden_member(name: str | None, email: str | None) -> bool:
    if not isinstance(name, str) or not isinstance(email, str):
        return True

    normalized_name = name.strip()
    normalized_email = email.strip()
    if not normalized_name or not normalized_email:
        return True
    if normalized_name.lower().startswith('test'):
        return True
    return _is_admin(normalized_name, normalized_email)


def _get_manageable_members():
    members = []
    seen_emails = set()

    for member in load_members_from_json():
        if not isinstance(member, dict):
            continue

        name = member.get('name')
        email = member.get('email')
        if not isinstance(name, str) or not isinstance(email, str):
            continue
        normalized_name = name.strip()
        normalized_email = email.strip()
        if not normalized_name or not normalized_email:
            continue
        if _is_hidden_member(normalized_name, normalized_email):
            continue
        if normalized_email in seen_emails:
            continue

        seen_emails.add(normalized_email)
        members.append(
            {
                'name': normalized_name,
                'email': normalized_email,
            }
        )

    return sorted(members, key=lambda member: (member['name'], member['email']))


def _normalize_members_payload(raw_members):
    if not isinstance(raw_members, list):
        raise ValueError('Members payload must be a list')

    normalized_members = []
    seen_emails = set()

    for member in raw_members:
        if not isinstance(member, dict):
            raise ValueError('Invalid member data')

        name = member.get('name')
        email = member.get('email')
        if not isinstance(name, str) or not isinstance(email, str):
            raise ValueError('Member name and email are required')

        normalized_name = name.strip()
        normalized_email = email.strip()
        if not normalized_name or not normalized_email:
            raise ValueError('Member name and email are required')
        if _is_hidden_member(normalized_name, normalized_email):
            raise ValueError('System accounts cannot be edited here')
        if normalized_email in seen_emails:
            raise ValueError('Duplicate member email is not allowed')

        seen_emails.add(normalized_email)
        normalized_members.append(
            {
                'name': normalized_name,
                'email': normalized_email,
            }
        )

    return sorted(normalized_members, key=lambda member: (member['name'], member['email']))


def _get_trackable_members():
    return _get_manageable_members()


def _parse_record_timestamp(record, path):
    submitted_at_raw = record.get('submitted_at')
    if submitted_at_raw:
        try:
            submitted_at = datetime.datetime.fromisoformat(submitted_at_raw)
            if submitted_at.tzinfo is None:
                return submitted_at.replace(tzinfo=KST)
            return submitted_at.astimezone(KST)
        except Exception:
            pass

    try:
        fallback_date = datetime.datetime.strptime(path.stem, "%y%m%d")
        return fallback_date.replace(tzinfo=KST)
    except ValueError:
        return None


def _get_submitted_emails_between(window_start, window_end):
    log_dir = settings.BASE_DIR / 'quiz_log'
    if not log_dir.exists():
        return set()

    submitted_emails = set()
    for path in sorted(log_dir.glob('*.json')):
        try:
            with open(path, 'r', encoding='utf-8') as f:
                records = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            continue

        if not isinstance(records, list):
            continue

        for record in records:
            if not isinstance(record, dict):
                continue

            email = record.get('email')
            if not isinstance(email, str) or not email:
                continue

            submitted_at = _parse_record_timestamp(record, path)
            if submitted_at is None:
                continue

            if window_start <= submitted_at < window_end:
                submitted_emails.add(email)

    return submitted_emails


def _build_member_submission_summary(now=None):
    current_start, current_end = _get_quiz_window(now=now)
    previous_start, previous_end = _get_previous_quiz_window(now=now)

    members = _get_trackable_members()
    current_submitted_emails = _get_submitted_emails_between(current_start, current_end)
    previous_submitted_emails = _get_submitted_emails_between(previous_start, previous_end)

    current_submitted = []
    current_pending = []
    previous_pending = []

    for member in members:
        email = member['email']
        if email in current_submitted_emails:
            current_submitted.append(member)
        else:
            current_pending.append(member)

        if email not in previous_submitted_emails:
            previous_pending.append(member)

    return {
        'current_window': {
            'start': current_start.isoformat(),
            'end': current_end.isoformat(),
        },
        'previous_window': {
            'start': previous_start.isoformat(),
            'end': previous_end.isoformat(),
        },
        'current_submitted': current_submitted,
        'current_pending': current_pending,
        'previous_pending': previous_pending,
    }


def _normalize_questions_payload(raw_questions):
    normalized_questions = {}

    if isinstance(raw_questions, list):
        iterable = enumerate(raw_questions, start=1)
        for idx, value in iterable:
            key = f"Q{idx}"
            if not isinstance(value, dict):
                raise ValueError(f'Invalid question data for {key}')
            question = value.get('question')
            answer = value.get('answer')
            if not isinstance(question, str) or not isinstance(answer, str):
                raise ValueError(f'Invalid question data for {key}')
            if not question.strip() or not answer.strip():
                raise ValueError(f'Question and answer are required for {key}')
            normalized_questions[key] = {
                'question': question,
                'answer': answer,
            }
        return normalized_questions

    if not isinstance(raw_questions, dict):
        raise ValueError('Questions payload must be a list or object')

    ordered_items = sorted(raw_questions.items(), key=lambda item: _question_sort_key(item[0]))
    for idx, (key, value) in enumerate(ordered_items, start=1):
        if not QUESTION_KEY_PATTERN.match(key):
            raise ValueError(f'Invalid question key format: {key}')
        if not isinstance(value, dict):
            raise ValueError(f'Invalid question data for {key}')

        question = value.get('question')
        answer = value.get('answer')
        if not isinstance(question, str) or not isinstance(answer, str):
            raise ValueError(f'Invalid question data for {key}')
        if not question.strip() or not answer.strip():
            raise ValueError(f'Question and answer are required for {key}')

        normalized_questions[f"Q{idx}"] = {
            'question': question,
            'answer': answer,
        }

    return normalized_questions


def _has_submitted_since(email: str, window_start):
    log_dir = settings.BASE_DIR / 'quiz_log'
    if not log_dir.exists():
        return False

    for path in sorted(log_dir.glob('*.json')):
        try:
            with open(path, 'r', encoding='utf-8') as f:
                records = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            continue

        if not isinstance(records, list):
            continue

        for record in records:
            if not isinstance(record, dict):
                continue
            if record.get('email') != email:
                continue

            submitted_at_raw = record.get('submitted_at')
            if not submitted_at_raw:
                # Old record without timestamp; treat as already submitted.
                return True

            try:
                submitted_at = datetime.datetime.fromisoformat(submitted_at_raw)
            except Exception:
                # If we can't parse, be conservative.
                return True

            if submitted_at.tzinfo is None:
                submitted_at = submitted_at.replace(tzinfo=KST)
            else:
                submitted_at = submitted_at.astimezone(KST)

            if submitted_at >= window_start:
                return True

    return False


@csrf_exempt
def quiz_view(request):
    # JSON 파일을 읽어서 파싱
    quiz_questions_path = settings.BASE_DIR / 'static' / 'quiz_questions.json'
    with open(quiz_questions_path, 'r', encoding='utf-8') as f:
        quiz_questions = json.load(f)

    return render(request, 'quiz.html', {'quiz_questions': quiz_questions})

@csrf_exempt
def verification(request):
    # request is a GET request with the fields 'name' and 'email'
    # if they match values in the dict, return a success message
    # otherwise, return a failure message
    name = request.GET.get('name')
    email = request.GET.get('email')

    if _is_authorized_user(name, email):
        return JsonResponse(
            {
                'verified': True,
                'is_admin': _is_admin(name, email),
            },
            status=200,
        )

    return JsonResponse({'verified': False, 'is_admin': False}, status=400)


@csrf_exempt
def submission_status(request):
    if request.method != 'GET':
        return HttpResponse('Method Not Allowed: Only GET requests are supported.', status=405)

    name = request.GET.get('name')
    email = request.GET.get('email')
    if not name or not email:
        return HttpResponse('Missing required fields: name and email.', status=400)

    is_admin = _is_admin(name, email)
    if not _is_authorized_user(name, email):
        return HttpResponse('Failure', status=403)

    if is_admin:
        window_start, next_reset = _get_quiz_window()
        submitted = False
    else:
        window_start, next_reset = _get_quiz_window()
        submitted = _has_submitted_since(email, window_start)

    return JsonResponse(
        {
            'submitted': submitted,
            'is_admin': is_admin,
            'window_start': window_start.isoformat(),
            'next_reset': next_reset.isoformat(),
        },
        status=200,
    )

@csrf_exempt
def submit(request):
    print("[DEBUG] Received request:", request)
    if request.method != 'POST':
        print("[ERROR] Invalid request method. Expected POST, got:", request.method)
        return HttpResponse('Method Not Allowed: Only POST requests are supported.', status=405) # 405 Method Not Allowed

    try:
        # POST 요청의 body를 JSON으로 파싱합니다.
        data = json.loads(request.body)
        print("[DEBUG] Parsed request body:", data)
    except json.JSONDecodeError as e:
        print("[ERROR] Failed to parse JSON body:", e)
        return HttpResponse('Invalid JSON format.', status=400)

    name = data.get('name')
    email = data.get('email')
    if not name or not email:
        print("[ERROR] Missing required fields: 'name' or 'email'.")
        return HttpResponse('Missing required fields: name and email.', status=400)

    # 'ans'로 시작하는 모든 키를 찾아 답변으로 처리 (ans1, ans2, ...)
    ans_keys = sorted(
        (key for key in data.keys() if key.startswith('ans')),
        key=lambda key: int(key[3:]) if key[3:].isdigit() else float("inf"),
    )
    ans = [data[key] for key in ans_keys]
    print("[DEBUG] Extracted answers:", ans)

    is_admin = _is_admin(name, email)
    if not _is_authorized_user(name, email):
        print("[ERROR] User not found in members_dict.")
        return HttpResponse('Failure: User not found or validation failed.', status=400)

    if "" in ans or None in ans:
        print("[ERROR] Empty answers detected in submission.")
        return HttpResponse('Failure: Empty answers are not allowed.', status=400)

    window_start, _ = _get_quiz_window()
    if not is_admin and _has_submitted_since(email, window_start):
        print("[WARN] Duplicate submission blocked for:", email)
        return HttpResponse('Already Submitted', status=409)

    # 저장할 레코드 생성 (타임스탬프 포함)
    record = {
        "name": name,
        "email": email,
        "answers": ans,
        "submitted_at": datetime.datetime.now(tz=KST).isoformat()
    }

    file_name = datetime.datetime.now().strftime("%y%m%d") + ".json"
    log_dir = settings.BASE_DIR / 'quiz_log'
    log_dir.mkdir(parents=True, exist_ok=True)
    file_path = log_dir / file_name

    try:
        if file_path.exists():
            with open(file_path, 'r', encoding='utf-8') as f:
                file_data = json.load(f)
        else:
            file_data = []
    except json.JSONDecodeError as e:
        print("[ERROR] Failed to parse existing log file:", e)
        file_data = []

    file_data.append(record)

    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(file_data, f, ensure_ascii=False, indent=4)
        print("[DEBUG] Log file updated successfully at:", file_path)
    except Exception as e:
        print("[ERROR] Failed to write log file:", e)
        return HttpResponse('Failed to save log.', status=500)

    print("[DEBUG] Submission validated successfully for:", name, email)
    return HttpResponse('Success', status=200)

@csrf_exempt
def updatequestions(request):
    if request.method != 'POST':
        return HttpResponse('Failure', status=405)
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return HttpResponse('JSON Format Error', status=400)
    
    name = data.get('name')
    email = data.get('email')
    if not _is_admin(name, email):
        return HttpResponse('Failure', status=403)

    questions_data = data.get('questions')
    if questions_data is None:
        return HttpResponse('No questions data provided', status=400)

    try:
        normalized_questions = _normalize_questions_payload(questions_data)
    except ValueError as exc:
        return HttpResponse(str(exc), status=400)

    if not normalized_questions:
        return HttpResponse('No questions data provided', status=400)

    _save_quiz_questions(normalized_questions)
    return HttpResponse('Success', status=200)

@csrf_exempt
def get_questions(request):
    if request.method != 'GET':
        return HttpResponse('Method Not Allowed: Only GET requests are supported.', status=405)

    quiz_questions_path = settings.BASE_DIR / 'static' / 'quiz_questions.json'
    try:
        with open(quiz_questions_path, 'r', encoding='utf-8') as f:
            quiz_questions = json.load(f)
        return HttpResponse(json.dumps(quiz_questions, ensure_ascii=False, indent=4),
                            content_type='application/json',
                            status=200)
    except FileNotFoundError:
        return HttpResponse('Quiz questions file not found.', status=404)
    except json.JSONDecodeError:
        return HttpResponse('Error decoding quiz questions JSON.', status=500)
    except Exception as e:
        print(f"[ERROR] Failed to get questions: {e}")
        return HttpResponse('Failed to retrieve questions.', status=500)


@csrf_exempt
def admin_questions(request):
    if request.method != 'POST':
        return HttpResponse('Method Not Allowed: Only POST requests are supported.', status=405)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return HttpResponse('Invalid JSON format.', status=400)

    name = data.get('name')
    email = data.get('email')
    if not _is_admin(name, email):
        return HttpResponse('Failure', status=403)

    questions_data = data.get('questions')
    if questions_data is None:
        return HttpResponse('No questions data provided', status=400)

    try:
        normalized_questions = _normalize_questions_payload(questions_data)
    except ValueError as exc:
        return HttpResponse(str(exc), status=400)

    if not normalized_questions:
        return HttpResponse('No questions data provided', status=400)

    _save_quiz_questions(normalized_questions)
    return JsonResponse(
        {
            'success': True,
            'questions': normalized_questions,
        },
        status=200,
    )


@csrf_exempt
def admin_members(request):
    if request.method == 'GET':
        name = request.GET.get('name')
        email = request.GET.get('email')
        if not _is_admin(name, email):
            return HttpResponse('Failure', status=403)

        return JsonResponse({'members': _get_manageable_members()}, status=200)

    if request.method != 'POST':
        return HttpResponse('Method Not Allowed: Only GET and POST requests are supported.', status=405)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return HttpResponse('Invalid JSON format.', status=400)

    name = data.get('name')
    email = data.get('email')
    if not _is_admin(name, email):
        return HttpResponse('Failure', status=403)

    members_data = data.get('members')
    if members_data is None:
        return HttpResponse('No members data provided', status=400)

    try:
        normalized_members = _normalize_members_payload(members_data)
    except ValueError as exc:
        return HttpResponse(str(exc), status=400)

    existing_members = load_members_from_json()
    hidden_members = []
    for member in existing_members:
        if not isinstance(member, dict):
            continue
        if _is_hidden_member(member.get('name'), member.get('email')):
            hidden_members.append(member)

    _save_members(hidden_members + normalized_members)
    return JsonResponse(
        {
            'success': True,
            'members': normalized_members,
        },
        status=200,
    )


@csrf_exempt
def admin_member_summary(request):
    if request.method != 'GET':
        return HttpResponse('Method Not Allowed: Only GET requests are supported.', status=405)

    name = request.GET.get('name')
    email = request.GET.get('email')
    if not _is_admin(name, email):
        return HttpResponse('Failure', status=403)

    return JsonResponse(_build_member_submission_summary(), status=200)


@csrf_exempt
def viewlog(request):
    if request.method != 'GET':
        return HttpResponse('Failure', status=405)
    
    date = request.GET.get('date')
    passkey = request.GET.get('passkey')
    if date is None or passkey is None:
        return HttpResponse('Failure', status=400)
    
    file_name = date + ".json"
    file_path = settings.BASE_DIR / 'quiz_log' / file_name
    if passkey != os.getenv("PASSKEY"):
        return HttpResponse('Failure', status=403)
    
    if not file_path.exists():
        return HttpResponse('Failure', status=404)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        try:
            file_data = json.load(f)
        except json.JSONDecodeError:
            return HttpResponse('Failure', status=500)
    
    return HttpResponse(json.dumps(file_data, ensure_ascii=False, indent=4),
                        content_type='application/json',
                        status=200)
