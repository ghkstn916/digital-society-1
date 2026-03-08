# 혜화 데이터랩 프로젝트 — 에이전트 메모리

## 핵심 구조 (확인됨)

- 프레임워크: React 19 + Vite 8 (beta) + Tailwind CSS v4 (@tailwindcss/vite 플러그인)
- 라우팅: react-router-dom
- 상태: localStorage로 진도 저장 (Zustand 미사용 — 단순 완료 체크만)
- Tailwind 설정: `@tailwindcss/vite` 플러그인을 vite.config.js에 추가, `@import "tailwindcss"` in index.css

## 파일 경로 규칙

- `src/data/lessonRegistry.js` — 모든 모듈/레슨 메타데이터 중앙 관리
- `src/pages/Home.jsx` — 홈 화면
- `src/pages/LessonPage.jsx` — 레슨 셸 (동적 import 방식으로 레슨 컴포넌트 로드)
- `src/components/layout/Sidebar.jsx` — 사이드바
- `src/components/layout/LessonNav.jsx` — 이전/다음 네비게이션 + 완료 버튼
- `src/lessons/module{n}/Lesson{n}_{m}.jsx` — 레슨 파일

## 공통 인터랙티브 컴포넌트 (src/components/interactive/)

- `QuizCard.jsx` — 선택지 클릭 즉시 피드백 퀴즈 (hint 지원)
- `RevealCard.jsx` — 생각 후 답 확인 카드
- `ClassifyActivity.jsx` — 항목 분류 활동 (A/B 두 카테고리, 색상 커스텀)
- `FlipCard.jsx` — 앞/뒷면 클릭 전환 카드
- `ChecklistActivity.jsx` — 체크리스트 자가진단 + 점수별 피드백
- `MatchingActivity.jsx` — 왼쪽/오른쪽 클릭 연결 매칭 활동

## LessonPage 동적 로딩 방식

lessonComponents 객체에 lessonId → lazy import 수동 등록 방식 사용.
새 레슨 추가 시 LessonPage.jsx의 lessonComponents 객체에도 반드시 추가해야 함.

## 색상 체계

- Module 1 (디지털 사회와 진로): green
- Module 2 (정보 보호와 정보 공유): blue
- Module 3 (정보 보안): purple

## Tailwind v4 주의사항

- `tailwind.config.js` 파일 불필요 — vite 플러그인이 자동 처리
- `index.css`에서 `@import "tailwindcss"` 한 줄로 설정 완료
- `body { display: block }` 명시 필요 — 기본 스캐폴드가 `display: flex`로 설정되어 있어 레이아웃 깨짐

## 빌드 성공 확인됨

초기 구축 후 `npm run build` 성공 (2026-03-08)
