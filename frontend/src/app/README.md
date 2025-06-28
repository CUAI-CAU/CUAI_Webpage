# 📁 src/app 디렉토리 안내

이 프로젝트에서는 페이지별로 사용하는 **컴포넌트와 관련 상수**를 각 페이지 기준으로 구성된 디렉토리 구조에 따라 관리합니다.

---

## ✅ 페이지별 컴포넌트 및 상수 위치 규칙

### 1. 루트 페이지 (`/`)

-   `src/app/page.tsx`에서 사용하는 컴포넌트는  
    `src/app/_components` 폴더에 위치합니다.

-   루트 페이지에서 사용하는 상수(`CUAI_TITLE`, `WHOAREWE` 등)는  
    `src/constants/home.ts` 파일에 정의되어 있습니다.

-   추가로, 공용 컴포넌트는 `src/components` 폴더에 위치합니다.

### 2. 서브 페이지 (`/projects`, `/quiz` 등)

-   각 서브 페이지(`projects`, `quiz` 등)의 컴포넌트는  
    해당 폴더 내부의 `_components` 폴더에 위치합니다.

-   서브 페이지별로 사용하는 상수가 있다면  
    `src/constants/` 하위에 별도 파일로 분리하여 관리할 수 있습니다  
    (예: `src/constants/faq.ts` 등).

```bash
📁 src/
├── 📁 app/
│   ├── 📁 _components/
│   │   ├── 📁 home                  # 홈 페이지 섹션 컴포넌트
│   │   ├── 📁 navBar                # 네비게이션 바 컴포넌트
│   │   └── Footer.tsx
│   ├── 📁 api/
│   ├── 📁 projects/
│   │   ├── 📁 _components/          # /projects 전용 컴포넌트
│   │   │   ├── ProjectSelector.tsx
│   │   │   ├── PropertiesRenderer.tsx
│   │   │   └── BlocksRenderer.tsx
│   │   └── page.tsx
│   ├── 📁 quiz/
│   │   ├── 📁 _components/          # /quiz 전용 컴포넌트
│   │   │   ├── QuizForm.tsx
│   │   │   └── Auth.tsx
│   │   └── page.tsx
│   ├── 📁 faq/
│   │   └── page.tsx
│   └── page.tsx                    # 루트 페이지
├── 📁 constants/
│   ├── home.ts                     # 루트 페이지에서 사용하는 상수
│   └── faq.ts                      # 서브 페이지 상수 예시
```
