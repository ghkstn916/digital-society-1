import { useState } from "react";
import MatchingActivity from "../../components/interactive/MatchingActivity";
import RevealCard from "../../components/interactive/RevealCard";
import QuizCard from "../../components/interactive/QuizCard";
import ClassifyActivity from "../../components/interactive/ClassifyActivity";
import FlipCard from "../../components/interactive/FlipCard";
import ChecklistActivity from "../../components/interactive/ChecklistActivity";

// 사라지거나 줄어드는 직업
const decliningJobs = [
  {
    job: "계산원",
    icon: "🏪",
    reason: "키오스크·무인 계산대·앱 결제가 빠르게 확산되면서 수요가 줄고 있어요.",
  },
  {
    job: "경비원",
    icon: "🔐",
    reason: "CCTV, 스마트 잠금장치, AI 영상 분석 시스템으로 자동화되고 있어요.",
  },
  {
    job: "텔레마케터",
    icon: "📞",
    reason: "AI 챗봇과 자동 응답 시스템이 단순 상담 업무를 대체하고 있어요.",
  },
];

// 새로 생기거나 커진 직업
const growingJobs = [
  {
    job: "동영상 크리에이터",
    icon: "🎬",
    tech: "스트리밍 플랫폼",
    desc: "유튜브, 틱톡 등 플랫폼의 성장으로 콘텐츠 제작자 직업이 새롭게 생겼어요.",
  },
  {
    job: "빅데이터 분석가",
    icon: "📊",
    tech: "빅데이터·클라우드",
    desc: "방대한 데이터를 수집·분석하고 의사결정에 활용하는 전문가예요.",
  },
];

// 새로운 디지털 직업 플립카드 — 앞면: 직업명, 뒷면: 하는 일
const digitalJobCards = [
  {
    id: "ai-trainer",
    front: {
      title: "AI 트레이너",
      description: "AI를 가르치는 사람? 어떤 일을 할까요?",
      color: "bg-blue-100 border-blue-300 text-blue-900",
    },
    back: {
      title: "AI 트레이너가 하는 일",
      items: [
        "AI 모델이 올바르게 학습하도록 데이터를 준비하고 라벨링해요",
        "AI가 틀린 답을 할 때 왜 틀렸는지 교정해요",
        "AI가 편향된 판단을 하지 않도록 감시해요",
        "챗GPT 같은 AI를 더 잘 대답하게 만드는 역할이에요",
      ],
      color: "bg-white border-blue-300",
    },
  },
  {
    id: "data-analyst",
    front: {
      title: "데이터 분석가",
      description: "데이터로 미래를 읽는 사람?",
      color: "bg-green-100 border-green-300 text-green-900",
    },
    back: {
      title: "데이터 분석가가 하는 일",
      items: [
        "수백만 건의 고객 구매 데이터를 분석해서 패턴을 찾아요",
        "어떤 상품이 잘 팔릴지, 어떤 고객이 이탈할지 예측해요",
        "데이터를 알아보기 쉬운 그래프와 표로 만들어요",
        "기업의 의사결정에 데이터 근거를 제공해요",
      ],
      color: "bg-white border-green-300",
    },
  },
  {
    id: "ux-designer",
    front: {
      title: "UX 디자이너",
      description: "앱을 쓰기 편하게 만드는 사람?",
      color: "bg-purple-100 border-purple-300 text-purple-900",
    },
    back: {
      title: "UX 디자이너가 하는 일",
      items: [
        "사용자가 앱이나 웹사이트를 쉽게 쓸 수 있도록 화면을 설계해요",
        "버튼 위치, 글자 크기, 색상 등 사용자 경험을 연구해요",
        "실제 사용자들이 어디서 막히는지 관찰하고 개선해요",
        "카카오톡 같은 앱이 직관적으로 느껴지는 건 UX 덕분이에요",
      ],
      color: "bg-white border-purple-300",
    },
  },
  {
    id: "security-expert",
    front: {
      title: "사이버 보안 전문가",
      description: "디지털 세상의 경찰관?",
      color: "bg-red-100 border-red-300 text-red-900",
    },
    back: {
      title: "사이버 보안 전문가가 하는 일",
      items: [
        "해킹, 바이러스, 개인정보 유출을 막는 시스템을 구축해요",
        "기업이나 정부 서버의 보안 취약점을 미리 찾아서 막아요",
        "사이버 공격이 발생했을 때 빠르게 대응해요",
        "디지털 기술이 발전할수록 더욱 중요해지는 직업이에요",
      ],
      color: "bg-white border-red-300",
    },
  },
  {
    id: "metaverse-creator",
    front: {
      title: "메타버스 크리에이터",
      description: "가상 세계를 만드는 사람?",
      color: "bg-indigo-100 border-indigo-300 text-indigo-900",
    },
    back: {
      title: "메타버스 크리에이터가 하는 일",
      items: [
        "3D 가상 공간, 아바타, 디지털 아이템을 디자인해요",
        "제페토, 로블록스 같은 플랫폼에서 콘텐츠를 만들어 판매해요",
        "기업의 메타버스 공간(전시회, 행사장 등)을 제작해요",
        "VR·AR 기술을 활용한 가상 경험 콘텐츠를 개발해요",
      ],
      color: "bg-white border-indigo-300",
    },
  },
];

// 기술별 직업 매칭 데이터
const matchingPairs = [
  {
    leftId: "bigdata",
    leftLabel: "빅데이터",
    rightId: "r-bigdata",
    rightLabel: "스포츠 트레이너 — IoT로 선수 건강 데이터를 수집·분석해요",
  },
  {
    leftId: "ai",
    leftLabel: "인공지능(AI)",
    rightId: "r-ai",
    rightLabel: "의사 — AI 의료 데이터로 질병을 더 정확하게 진단해요",
  },
  {
    leftId: "cloud",
    leftLabel: "클라우드",
    rightId: "r-cloud",
    rightLabel: "빅데이터 분석가 — 클라우드에서 대용량 데이터를 저장·처리해요",
  },
  {
    leftId: "genai",
    leftLabel: "생성형 AI",
    rightId: "r-genai",
    rightLabel: "변호사 — 생성형 AI로 법 조항 검색과 서류 작성을 빠르게 처리해요",
  },
];

// 직업 분류 실습 데이터 (강화)
const jobClassifyItems = [
  {
    id: "cashier",
    label: "계산원 — 키오스크와 앱 결제 확산으로 일자리가 줄고 있어요",
    correct: "A",
    explanation: "단순 반복 업무는 자동화에 취약해요. 계산원은 무인 결제 시스템으로 빠르게 대체되고 있어요.",
  },
  {
    id: "creator",
    label: "동영상 크리에이터 — 유튜브·틱톡 같은 플랫폼이 성장하면서 새롭게 생겨난 직업이에요",
    correct: "B",
    explanation: "스트리밍 플랫폼의 성장과 함께 콘텐츠 제작자가 직업으로 인정받게 됐어요.",
  },
  {
    id: "telemarketer",
    label: "텔레마케터 — AI 챗봇과 자동 응답 시스템이 단순 상담을 대신하고 있어요",
    correct: "A",
    explanation: "AI가 24시간 고객 응대를 처리할 수 있어, 텔레마케터 수요가 점점 줄고 있어요.",
  },
  {
    id: "analyst",
    label: "빅데이터 분석가 — 기업 의사결정에 데이터 분析이 필수가 되면서 새로 주목받는 직업이에요",
    correct: "B",
    explanation: "데이터 폭발 시대에 데이터를 읽고 해석하는 전문가 수요가 빠르게 늘고 있어요.",
  },
  {
    id: "guard",
    label: "경비원 — CCTV·AI 영상 감시 시스템이 사람 대신 24시간 감시해요",
    correct: "A",
    explanation: "스마트 보안 시스템이 발전하면서 단순 경비 업무가 자동화되고 있어요.",
  },
  {
    id: "ai-trainer",
    label: "AI 트레이너 — AI 모델을 학습시키고 교정하는 전문가로, 생성형 AI 확산과 함께 급부상 중이에요",
    correct: "B",
    explanation: "ChatGPT 같은 생성형 AI가 보급되면서 AI를 '가르치는' 직업이 완전히 새롭게 생겨났어요.",
  },
  {
    id: "travel-agent",
    label: "여행사 오프라인 상담원 — 여행 플랫폼 앱과 AI 추천 서비스로 직접 상담 수요가 줄었어요",
    correct: "A",
    explanation: "항공권·숙박 예약 플랫폼이 발달해 직접 여행사를 방문하거나 전화로 상담하는 비중이 크게 줄었어요.",
  },
  {
    id: "metaverse",
    label: "메타버스 크리에이터 — 가상 세계 콘텐츠를 제작하고 판매하는 완전히 새로운 직업이에요",
    correct: "B",
    explanation: "제페토, 로블록스 같은 메타버스 플랫폼의 성장과 함께 가상 공간 콘텐츠 제작자라는 직업이 생겨났어요.",
  },
];

// 직업 변화 상세 데이터
const changingJobs = [
  {
    job: "요리 연구가",
    icon: "👩‍🍳",
    tech: "생성형 AI",
    change: "AI에게 재료와 건강 조건을 입력하면 맞춤형 조리법 초안을 받아 더 빠르게 개발할 수 있어요.",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700",
  },
  {
    job: "스포츠 트레이너",
    icon: "🏋️",
    tech: "IoT",
    change: "선수 몸에 부착된 센서로 심박수, 속도, 피로도를 실시간 수집해 개인 맞춤 훈련을 설계해요.",
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    job: "웹툰 작가",
    icon: "🎨",
    tech: "생성형 AI",
    change: "AI가 채색이나 배경 작업을 도와주고, 텍스트를 그림으로 변환하는 기능을 활용해요.",
    color: "bg-pink-50 border-pink-200",
    badge: "bg-pink-100 text-pink-700",
  },
  {
    job: "과수 작물 재배자",
    icon: "🍎",
    tech: "IoT",
    change: "토양 습도, 날씨, 작물 성장 상태를 센서로 모니터링해 적절한 때 물과 비료를 줄 수 있어요.",
    color: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-700",
  },
  {
    job: "작가",
    icon: "✍️",
    tech: "생성형 AI",
    change: "AI로 초안이나 아이디어 목록을 빠르게 뽑아낸 뒤, 작가의 감성과 관점으로 완성도를 높여요.",
    color: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-700",
  },
];

// 디지털 역량 체크리스트
const digitalCapabilityChecklist = [
  { id: "search", label: "인터넷에서 필요한 정보를 빠르게 찾고 신뢰도를 판단할 수 있어요", tip: "정보 탐색 능력 — 진짜인지 가짜인지 가려내는 것도 포함이에요." },
  { id: "coding", label: "프로그래밍이나 코딩의 기본 개념을 알고 있어요 (직접 못 해도 개념 이해)", tip: "코딩 문해력 — 모든 직업에서 AI·자동화와 협업하려면 기본 개념이 필요해요." },
  { id: "data", label: "표나 그래프를 읽고 데이터에서 의미를 찾을 수 있어요", tip: "데이터 리터러시 — 데이터를 읽는 능력은 모든 직업에서 점점 더 중요해지고 있어요." },
  { id: "security", label: "개인정보 보호, 비밀번호 관리, 피싱 등 기본 보안 수칙을 지키고 있어요", tip: "디지털 보안 의식 — 보안 사고는 무지에서 시작되는 경우가 많아요." },
  { id: "collab", label: "구글 독스·노션 같은 도구로 온라인 협업을 해본 적 있어요", tip: "디지털 협업 도구 — 현대 대부분의 직장에서 기본이 됐어요." },
  { id: "content", label: "사진, 영상, 글 등 디지털 콘텐츠를 직접 만들어본 적 있어요", tip: "콘텐츠 생산 능력 — 소비만 하는 것과 직접 만드는 것은 큰 차이가 있어요." },
  { id: "ai-use", label: "ChatGPT, 제미나이 같은 AI 도구를 직접 써본 적 있어요", tip: "AI 활용 능력 — AI를 잘 활용하는 사람이 그렇지 않은 사람보다 훨씬 유리해요." },
];

const digitalCapabilityFeedbacks = [
  {
    minScore: 0,
    maxScore: 2,
    message: "아직 디지털 역량을 쌓을 기회가 많아요! 작은 것부터 시작해봐요. 먼저 AI 도구를 써보거나, 온라인 협업 도구를 한 번 체험해보는 것도 좋아요.",
    color: "bg-orange-50 border border-orange-200 text-orange-800",
  },
  {
    minScore: 3,
    maxScore: 4,
    message: "기본기를 갖추고 있어요! 데이터 읽기나 콘텐츠 제작 같은 부분을 더 연습하면 미래 직업 준비에 큰 도움이 될 거예요.",
    color: "bg-yellow-50 border border-yellow-200 text-yellow-800",
  },
  {
    minScore: 5,
    maxScore: 6,
    message: "디지털 역량이 꽤 탄탄해요! AI 도구 활용과 데이터 리터러시를 더 키우면 어떤 직업을 선택하든 강점이 될 거예요.",
    color: "bg-blue-50 border border-blue-200 text-blue-800",
  },
  {
    minScore: 7,
    maxScore: 7,
    message: "디지털 역량이 이미 풍부하네요! 이 강점을 살려서 AI와 협업하는 미래형 인재로 성장해봐요.",
    color: "bg-green-50 border border-green-200 text-green-800",
  },
];

export default function Lesson1_2() {
  const [showDeclining, setShowDeclining] = useState(null);
  const [showGrowing, setShowGrowing] = useState({});

  return (
    <div className="space-y-10">
      {/* 도입 */}
      <section>
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <p className="text-blue-800 font-bold text-lg mb-2">
            10년 후, 내 꿈의 직업은 아직 존재할까?
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            디지털 기술은 직업 세계도 빠르게 바꾸고 있어요.
            어떤 직업은 사라지고, 어떤 직업은 새로 생기고,
            어떤 직업은 하는 방식 자체가 달라졌어요.
            이 레슨에서는 그 변화를 구체적으로 살펴보고, 내 진로에 어떻게 적용할 수 있는지 생각해봐요.
          </p>
        </div>
      </section>

      {/* 개념 — 사라지는 직업 */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-4">
          사라지거나 줄어드는 직업
        </h2>
        <div className="space-y-3">
          {decliningJobs.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                className="w-full text-left flex items-center gap-3 px-5 py-4"
                onClick={() =>
                  setShowDeclining(showDeclining === i ? null : i)
                }
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-bold text-gray-800 flex-1">{item.job}</span>
                <span className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded-full font-semibold">
                  감소 중
                </span>
                <span className="text-gray-400 text-sm ml-2">
                  {showDeclining === i ? "▲" : "▼"}
                </span>
              </button>
              {showDeclining === i && (
                <div className="px-5 pb-4">
                  <div className="bg-red-50 rounded-xl px-4 py-3 text-sm text-red-800 leading-relaxed">
                    <span className="font-semibold mr-1">왜 줄어드나요?</span>
                    {item.reason}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 개념 — 새로 생긴 직업 */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-4">
          새로 생긴 직업
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {growingJobs.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-green-200 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-semibold">
                    {item.tech}
                  </span>
                  <p className="font-bold text-gray-800 mt-0.5">{item.job}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 실습 — 새로운 디지털 직업 플립카드 */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            이 직업, 알고 있었어?
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-5 leading-relaxed">
          디지털 기술이 만들어낸 새로운 직업들이에요. 이름은 들어봤지만 뭘 하는지 몰랐던 직업들,
          카드를 클릭해서 실제로 어떤 일을 하는지 확인해봐요.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {digitalJobCards.map((card) => (
            <FlipCard key={card.id} front={card.front} back={card.back} />
          ))}
        </div>
      </section>

      {/* 실습 — 직업 변화 분류 (강화됨) */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            이 직업은 줄어드나요, 새로 생겼나요?
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          각 직업이 디지털 기술로 인해 줄어들고 있는지, 아니면 새로 생겨난 직업인지 분류해봐요.
          헷갈린다면 직업 설명을 잘 읽고 판단해봐요.
        </p>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <ClassifyActivity
            items={jobClassifyItems}
            categoryA={{ label: "줄어드는 직업", color: "red" }}
            categoryB={{ label: "새로 생긴 직업", color: "green" }}
            instruction="각 직업 설명을 읽고 어느 쪽에 해당하는지 선택해봐요."
          />
        </div>
      </section>

      {/* 개념 — 변화하는 직업들 */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-2">
          달라지는 직업들
        </h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          직업 자체는 남아 있지만, 디지털 기술이 도입되면서 일하는 방식이 크게 달라졌어요.
          사라진 게 아니라 업그레이드된 거예요.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {changingJobs.map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl border-2 ${item.color} p-4`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${item.badge}`}
                  >
                    {item.tech}
                  </span>
                  <p className="font-bold text-gray-800 text-sm mt-0.5">
                    {item.job}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{item.change}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 실습 — 기술-직업 매칭 */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            기술과 직업을 연결해봐요
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          왼쪽의 디지털 기술과 오른쪽의 직업 설명을 올바르게 연결해보세요.
          먼저 왼쪽 항목을 클릭하고, 그다음 맞는 오른쪽 항목을 클릭하면 돼요.
        </p>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <MatchingActivity
            pairs={matchingPairs}
            leftTitle="디지털 기술"
            rightTitle="직업 + 하는 일"
            instruction="각 기술이 어느 직업에 핵심적으로 활용되는지 연결해보세요."
          />
        </div>
      </section>

      {/* 생각해보기 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
            생각해보기
          </span>
          <h2 className="text-xl font-black text-gray-800">내 진로와 연결해볼까?</h2>
        </div>

        <RevealCard
          prompt='관심 있는 직업 하나를 떠올려봐요. 그 직업은 앞으로 어떤 디지털 기술의 영향을 받을 것 같나요? AI에 의해 대체될 수 있을까요, 아니면 오히려 디지털 기술 덕분에 더 발전할 수 있을까요? 잠깐 생각해본 뒤 아래 힌트를 확인해봐요.'
          answerLabel="생각 힌트 보기"
          answer="핵심 질문: 그 직업의 어떤 부분이 '사람만 할 수 있는 일'인가요?"
          explanation="단순 반복 작업은 자동화될 가능성이 높아요. 하지만 창의성, 공감 능력, 판단력, 대인 관계 같은 영역은 AI가 완전히 대체하기 어려워요. 오히려 디지털 기술을 도구처럼 잘 활용하는 사람이 더 경쟁력 있는 인재가 될 수 있어요."
        />
      </section>

      {/* 실습 — 나의 디지털 역량 체크리스트 */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            나는 어떤 디지털 역량이 필요할까?
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          미래 직업 세계에서 중요해지는 디지털 역량들이에요.
          지금 내가 얼마나 갖추고 있는지 솔직하게 체크해봐요.
          결과를 보면 어떤 부분을 더 키우면 좋을지 힌트를 줄 거예요.
        </p>
        <ChecklistActivity
          title="나의 디지털 역량 자가진단"
          items={digitalCapabilityChecklist}
          feedbacks={digitalCapabilityFeedbacks}
        />
      </section>

      {/* 퀴즈 — 직업 변화 이해 확인 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
            퀴즈
          </span>
          <h2 className="text-xl font-black text-gray-800">확인해볼까?</h2>
        </div>
        <QuizCard
          question="웹툰 작가가 생성형 AI를 활용해 채색과 배경 작업 속도를 크게 높였어요. 이 변화를 가장 잘 설명한 것은 무엇일까요?"
          options={[
            {
              label: "웹툰 작가라는 직업이 AI로 대체되어 사라지고 있어요",
              correct: false,
              explanation: "웹툰 작가는 사라지는 게 아니라, AI 도구를 활용해 일하는 방식이 달라지고 있는 직업이에요.",
            },
            {
              label: "AI 덕분에 웹툰 작가의 창의적 역량이 필요 없어졌어요",
              correct: false,
              explanation: "AI는 반복적인 작업을 보조할 뿐이에요. 스토리 기획, 캐릭터 감성, 연출 등 창의적 역량은 여전히 작가의 몫이에요.",
            },
            {
              label: "디지털 기술이 직업 자체는 남기되 일하는 방식을 바꾸고 있어요",
              correct: true,
              explanation: "웹툰 작가는 사라지지 않았지만, AI라는 도구가 채색·배경 작업을 도와주면서 일하는 방식이 변화했어요. 이게 바로 '달라지는 직업'의 핵심이에요.",
            },
            {
              label: "생성형 AI는 IoT 기술의 한 종류예요",
              correct: false,
              explanation: "생성형 AI와 IoT는 서로 다른 기술이에요. 생성형 AI는 텍스트·이미지를 생성하는 AI이고, IoT는 사물을 인터넷으로 연결하는 기술이에요.",
            },
          ]}
          hint="이 직업은 사라진 게 아니라 '어떻게 일하느냐'가 달라진 사례예요."
        />
      </section>

      {/* 정리 */}
      <section>
        <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-2xl p-6">
          <h2 className="text-base font-black text-blue-800 mb-3">
            이번 레슨에서 배운 것
          </h2>
          <ul className="space-y-2">
            {[
              "디지털 기술로 계산원, 경비원, 텔레마케터 같은 직업은 수요가 줄고 있어요.",
              "AI 트레이너, 데이터 분석가, UX 디자이너, 메타버스 크리에이터처럼 완전히 새로운 직업도 생겨났어요.",
              "기존 직업들도 AI, IoT, 클라우드 등을 활용해 일하는 방식이 달라지고 있어요.",
              "중요한 건 기술 자체보다, 그 기술을 잘 활용하는 능력이에요.",
              "데이터 리터러시, AI 활용, 디지털 보안 의식 등 디지털 역량이 미래 직업의 핵심 경쟁력이에요.",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-blue-500 shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
