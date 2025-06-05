from django.shortcuts import render

import os
from dotenv import load_dotenv
load_dotenv()
import datetime
import json
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

# members.json 파일을 읽어 members_dict를 초기화하는 함수
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

members_dict = load_members_from_json()


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

    for member in members_dict:
        if member['name'] == name and member['email'] == email:
            # return 200 OK with a success message
            return HttpResponse('Success', status=200)
        
    # return 400 Bad Request with a failure message
    return HttpResponse('Failure', status=400)

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

    # 'ans'로 시작하는 모든 키를 찾아 답변으로 처리
    ans = [data[key] for key in data if key.startswith('ans')]
    print("[DEBUG] Extracted answers:", ans)

    # 저장할 레코드 생성 (타임스탬프 포함)
    record = {
        "name": name,
        "email": email,
        "answers": ans,
        "submitted_at": datetime.datetime.now().isoformat()
    }

    file_name = datetime.datetime.now().strftime("%y%m%d") + ".json"
    folder = "quiz_log"
    if not os.path.exists(folder):
        os.makedirs(folder)
    file_path = os.path.join(folder, file_name)

    try:
        if os.path.exists(file_path):
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

    for member in members_dict:
        if member['name'] == name and member['email'] == email:
            if "" in ans or None in ans:
                print("[ERROR] Empty answers detected in submission.")
                return HttpResponse('Failure: Empty answers are not allowed.', status=400)
            else:
                print("[DEBUG] Submission validated successfully for:", name, email)
                return HttpResponse('Success', status=200)

    print("[ERROR] User not found in members_dict or validation failed.")
    return HttpResponse('Failure: User not found or validation failed.', status=400)

@csrf_exempt
def updatequestions(request):
    if request.method != 'POST':
        return HttpResponse('Failure', status=405)
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return HttpResponse('JSON Format Error', status=400)
    
    # passkey를 먼저 확인하고 제거
    passkey = os.getenv("PASSKEY")
    if passkey is None:
        return HttpResponse('Failure', status=500) # 서버 설정 오류
    if "passkey" not in data or data["passkey"] != passkey:
        return HttpResponse('Failure', status=403) # 인증 실패
    
    # passkey를 data에서 제거하여 질문 데이터만 남김
    questions_data = {k: v for k, v in data.items() if k != "passkey"}

    # 질문 데이터 유효성 검사
    if not questions_data: # 질문 데이터가 없는 경우
        return HttpResponse('No questions data provided', status=400)

    for key, value in questions_data.items():
        if not key.startswith("Q") or not key[1:].isdigit():
            return HttpResponse(f'Invalid question key format: {key}', status=400)
        
        if not isinstance(value, dict) or 'question' not in value or 'answer' not in value:
            return HttpResponse(f'Invalid question data for {key}', status=400)

        # question에 <br>을 붙이는 로직(필요시)
        q_text = value['question']
        if not q_text.startswith("<br>"):
            q_text = "<br>" + q_text
        if not q_text.endswith("<br>"):
            q_text = q_text + "<br>"
        questions_data[key]['question'] = q_text
    
    # JSON 파일 쓰기
    quiz_questions_path = settings.BASE_DIR / 'static' / 'quiz_questions.json'
    with open(quiz_questions_path, 'w', encoding='utf-8') as f:
        json.dump(questions_data, f, ensure_ascii=False, indent=4)
    
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
def viewlog(request):
    if request.method != 'GET':
        return HttpResponse('Failure', status=405)
    
    date = request.GET.get('date')
    passkey = request.GET.get('passkey')
    if date is None or passkey is None:
        return HttpResponse('Failure', status=400)
    
    file_name = date + ".json"
    file_path = os.path.join("quiz_log", file_name)
    if passkey != os.getenv("PASSKEY"):
        return HttpResponse('Failure', status=403)
    
    if not os.path.exists(file_path):
        return HttpResponse('Failure', status=404)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        try:
            file_data = json.load(f)
        except json.JSONDecodeError:
            return HttpResponse('Failure', status=500)
    
    return HttpResponse(json.dumps(file_data, ensure_ascii=False, indent=4),
                        content_type='application/json',
                        status=200)