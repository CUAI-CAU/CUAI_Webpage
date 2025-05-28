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
    # POST 요청의 body를 JSON으로 파싱합니다.
    data = json.loads(request.body)
    name = data['name']
    email = data['email']
    ans1 = data['ans1']
    ans2 = data['ans2']
    ans3 = data['ans3']
    ans4 = data['ans4']
    ans5 = data['ans5']
    ans6 = data['ans6']
    
    # 답변들을 리스트로 관리
    ans = [ans1, ans2, ans3, ans4, ans5, ans6]

    # quiz_questions.json 불러오기 (정답 검증용)
    quiz_questions_path = settings.BASE_DIR / 'static' / 'quiz_questions.json'
    with open(quiz_questions_path, 'r', encoding='utf-8') as f:
        quiz_questions = json.load(f)

    # 맞춘 개수를 세거나 별도로 처리할 수 있음(선택)
    correct_answers = 0
    for i in range(1, 7):
        key = f"Q{i}"
        user_answer = ans[i-1]
        correct_answer = quiz_questions[key]['answer']
        if user_answer == correct_answer:
            correct_answers += 1

    # 저장할 레코드 생성 (타임스탬프 포함)
    record = {
        "name": name,
        "email": email,
        "answers": ans,
        "correct_count": correct_answers,
        "submitted_at": datetime.datetime.now().isoformat()
    }
    
    # 파일명은 현재 날짜를 YYMMDD 형식으로 사용
    file_name = datetime.datetime.now().strftime("%y%m%d") + ".json"
    
    # 저장 디렉토리 설정: quiz_log 폴더가 없으면 생성
    folder = "quiz_log"
    if not os.path.exists(folder):
        os.makedirs(folder)
    file_path = os.path.join(folder, file_name)
    
    # 기존 파일 로드
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            try:
                file_data = json.load(f)
            except json.JSONDecodeError:
                file_data = []
    else:
        file_data = []
    
    # 새로운 레코드 추가
    file_data.append(record)
    
    # 업데이트된 데이터를 JSON 파일에 저장
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(file_data, f, ensure_ascii=False, indent=4)
    
    # members_dict 내 정보와 답변 유효성 검사 후 응답 반환
    for member in members_dict:
        if member['name'] == name and member['email'] == email:
            # 빈 답변이 있는지 확인
            if "" in ans or None in ans:
                return HttpResponse('Failure', status=400)
            else:
                # 최종 통과
                return HttpResponse('Success', status=200)

    return HttpResponse('Failure', status=400)

@csrf_exempt
def updatequestions(request):
    if request.method != 'POST':
        return HttpResponse('Failure', status=405)
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return HttpResponse('JSON Format Error', status=400)
    
    # 예: data = {
    #   "Q1": {"question":"...", "answer":"..."},
    #   "Q2": {"question":"...", "answer":"..."},
    #   ...
    #   "passkey": "..."
    # }

    # 6개 문항에 대한 점검 (Q1 ~ Q6)
    for i in range(1, 7):
        key = f"Q{i}"
        if key not in data:
            return HttpResponse('Failure', status=400)
        # question, answer 키 검사
        if not isinstance(data[key], dict) or 'question' not in data[key] or 'answer' not in data[key]:
            return HttpResponse('Failure', status=400)

        # question에 <br>을 붙이는 로직(필요시)
        q_text = data[key]['question']
        if not q_text.startswith("<br>"):
            q_text = "<br>" + q_text
        if not q_text.endswith("<br>"):
            q_text = q_text + "<br>"
        data[key]['question'] = q_text

    passkey = os.getenv("PASSKEY")
    if passkey is None:
        return HttpResponse('Failure', status=500)
    elif "passkey" not in data or data["passkey"] != passkey:
        return HttpResponse('Failure', status=403)

    data.pop("passkey")

    # JSON 파일 쓰기
    quiz_questions_path = settings.BASE_DIR / 'static' / 'quiz_questions.json'
    with open(quiz_questions_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    
    return HttpResponse('Success', status=200)

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