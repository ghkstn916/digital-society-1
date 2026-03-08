import { useState } from "react";
import QuizCard from "../../components/interactive/QuizCard";
import RevealCard from "../../components/interactive/RevealCard";
import FlipCard from "../../components/interactive/FlipCard";

// 핵심 디지털 기술 4가지
const coreDigitalTechs = [
  {
    id: "ai",
    icon: "🤖",
    name: "인공지능 (AI)",
    short: "컴퓨터가 스스로 학습하고 판단하는 기술",
    color: "bg-blue-50 border-blue-300",
    badge: "bg-blue-100 text-blue-700",
    details: "AI는 수많은 데이터를 분석해 패턴을 스스로 찾아내고, 그 패턴을 바탕으로 판단·예측·생성을 할 수 있어요.",
    examples: [
      "유튜브가 내 취향에 맞는 영상을 추천해줘요",
      "카카오 챗봇이 자동으로 질문에 답해줘요",
      "스마트폰 잠금 화면의 얼굴 인식 기능",
      "ChatGPT 같은 생성형 AI 서비스",
    ],
  },
  {
    id: "iot",
    icon: "📡",
    name: "사물인터넷 (IoT)",
    short: "일상 사물이 인터넷에 연결되어 데이터를 주고받는 기술",
    color: "bg-green-50 border-green-300",
    badge: "bg-green-100 text-green-700",
    details: "IoT는 스마트폰, 냉장고, 가로등, 심지어 운동화까지 인터넷에 연결해 서로 데이터를 주고받게 해요. '사물 + 인터넷' 연결이 핵심이에요.",
    examples: [
      "스마트 냉장고가 유통기한 지난 식품을 알려줘요",
      "스마트워치가 심박수·수면 패턴을 자동으로 측정해요",
      "스마트 가로등이 보행자 감지 시 자동으로 켜져요",
      "편의점 무인 결제기가 상품을 자동 스캔해요",
    ],
  },
  {
    id: "bigdata",
    icon: "📊",
    name: "빅데이터",
    short: "대량의 데이터를 수집·분석해서 패턴을 찾는 기술",
    color: "bg-orange-50 border-orange-300",
    badge: "bg-orange-100 text-orange-700",
    details: "우리가 스마트폰으로 클릭하고 이동할 때마다 엄청난 데이터가 쌓여요. 빅데이터는 이 방대한 데이터에서 의미있는 패턴을 찾아내요.",
    examples: [
      "넷플릭스가 내가 좋아할 드라마를 추천해줘요",
      "배달앱이 우리 동네 인기 메뉴 순위를 보여줘요",
      "유행 예측, 날씨 예보, 선거 여론 분석",
      "편의점이 요일·날씨별 인기 상품을 미리 파악해요",
    ],
  },
  {
    id: "cloud",
    icon: "☁️",
    name: "클라우드",
    short: "인터넷을 통해 저장공간·소프트웨어를 제공하는 기술",
    color: "bg-purple-50 border-purple-300",
    badge: "bg-purple-100 text-purple-700",
    details: "클라우드는 내 컴퓨터나 스마트폰이 아닌 인터넷 어딘가의 서버에 데이터를 저장하고 처리해요. 어디서든 같은 파일에 접근할 수 있어요.",
    examples: [
      "구글 드라이브에 파일을 저장하고 어디서든 열어봐요",
      "카카오톡 사진이 자동으로 클라우드에 백업돼요",
      "스트리밍 앱(멜론, 스포티파이)이 곡을 내 기기에 저장하지 않아도 들려줘요",
      "구글 독스에서 친구와 동시에 같은 문서를 편집해요",
    ],
  },
];

// 사회 변화 타임라인 데이터
const timeline = [
  {
    era: "농경 사회",
    period: "~18세기",
    icon: "🌾",
    color: "bg-yellow-50 border-yellow-200",
    tagColor: "bg-yellow-100 text-yellow-700",
    desc: "땅을 일구고 작물을 재배하는 것이 중심이었어요. 정보는 주로 입에서 입으로 전해졌고, 변화의 속도도 아주 느렸죠.",
  },
  {
    era: "산업 사회",
    period: "18~20세기",
    icon: "🏭",
    color: "bg-orange-50 border-orange-200",
    tagColor: "bg-orange-100 text-orange-700",
    desc: "기계와 공장이 등장하면서 대량 생산이 시작됐어요. 철도, 전화, 라디오 같은 기술로 정보가 점차 빠르게 이동했어요.",
  },
  {
    era: "디지털 사회",
    period: "21세기~",
    icon: "💻",
    color: "bg-green-50 border-green-200",
    tagColor: "bg-green-100 text-green-700",
    desc: "모든 것이 디지털로 연결돼요. 스마트폰 하나로 전 세계와 소통하고, 데이터가 새로운 자원이 됐어요.",
  },
];

// 예전 사회 vs 현재 사회 비교 플립카드 데이터
const societyCompareCards = [
  {
    id: "shopping",
    front: {
      title: "쇼핑 — 예전에는?",
      description: "백화점, 시장, 편의점에 직접 가야 했어요.",
      color: "bg-yellow-50 border-yellow-300 text-yellow-900",
    },
    back: {
      title: "지금은 어때요?",
      items: [
        "앱으로 검색하고 가격 비교까지 한 번에",
        "집 앞까지 당일 배송·새벽 배송",
        "구독 서비스로 정기적으로 자동 주문",
        "후기와 별점으로 구매 전 품질 확인",
      ],
      color: "bg-white border-yellow-300",
    },
  },
  {
    id: "learning",
    front: {
      title: "학습 — 예전에는?",
      description: "교실에서 선생님과 교과서가 전부였어요.",
      color: "bg-blue-50 border-blue-300 text-blue-900",
    },
    back: {
      title: "지금은 어때요?",
      items: [
        "유튜브, 인강으로 언제 어디서나 공부 가능",
        "AI가 내 수준에 맞는 문제 추천",
        "전 세계 강의를 한국어 자막으로 시청",
        "게임형 학습 앱으로 재미있게 복습",
      ],
      color: "bg-white border-blue-300",
    },
  },
  {
    id: "communication",
    front: {
      title: "커뮤니케이션 — 예전에는?",
      description: "편지를 쓰거나 유선 전화를 사용했어요.",
      color: "bg-green-50 border-green-300 text-green-900",
    },
    back: {
      title: "지금은 어때요?",
      items: [
        "카카오톡으로 실시간 메시지·사진 전송",
        "SNS로 일상을 공유하고 팔로워와 소통",
        "화상통화로 외국에 있는 친구와 얼굴 보며 대화",
        "이모티콘과 밈으로 감정을 더 풍부하게 표현",
      ],
      color: "bg-white border-green-300",
    },
  },
  {
    id: "finance",
    front: {
      title: "금융 — 예전에는?",
      description: "은행 창구에 직접 줄 서야 했어요.",
      color: "bg-orange-50 border-orange-300 text-orange-900",
    },
    back: {
      title: "지금은 어때요?",
      items: [
        "앱으로 24시간 송금·잔액 확인",
        "카카오페이·토스 등 간편결제로 빠른 결제",
        "편의점·카페에서 QR 코드 하나로 결제 완료",
        "주식 투자도 스마트폰에서 손쉽게",
      ],
      color: "bg-white border-orange-300",
    },
  },
  {
    id: "health",
    front: {
      title: "의료·건강 — 예전에는?",
      description: "병원에 직접 가야만 진료를 받을 수 있었어요.",
      color: "bg-red-50 border-red-300 text-red-900",
    },
    back: {
      title: "지금은 어때요?",
      items: [
        "원격 진료로 집에서 의사와 상담 가능",
        "스마트워치가 심박수·수면 패턴 자동 측정",
        "AI가 의료 영상을 분석해 더 빠른 진단 지원",
        "헬스케어 앱으로 운동·식단·건강 목표 관리",
      ],
      color: "bg-white border-red-300",
    },
  },
];

// 디지털 사회 특징 데이터
const features = [
  {
    icon: "🔗",
    title: "온오프라인 경계 소멸",
    desc: "편의점에서 스마트폰 앱으로 주문하고, 온라인 수업과 오프라인 수업이 섞여요.",
  },
  {
    icon: "🌐",
    title: "사람과 사물의 네트워크",
    desc: "스마트 냉장고가 유통기한을 알려주고, 스마트워치가 심박수를 측정해요.",
  },
  {
    icon: "📊",
    title: "빅데이터 생성",
    desc: "우리가 클릭하고 이동할 때마다 엄청난 양의 데이터가 쌓여요.",
  },
];

// 키오스크 상황 카드 데이터
const kioskCases = [
  {
    id: "normal",
    persona: "일반 이용자 (20대)",
    icon: "🙂",
    bg: "bg-blue-50 border-blue-200",
    tag: "bg-blue-100 text-blue-700",
    conveniences: ["빠른 주문, 줄 서는 시간 절약", "다양한 메뉴를 한눈에 비교 가능", "현금 없이도 간편하게 결제"],
    problems: ["가끔 오작동하면 당황스러움", "처음 사용하면 메뉴 찾기 헷갈림"],
  },
  {
    id: "elderly",
    persona: "70대 할머니",
    icon: "👵",
    bg: "bg-orange-50 border-orange-200",
    tag: "bg-orange-100 text-orange-700",
    conveniences: ["혼자 주문할 수 있는 독립성"],
    problems: [
      "글씨가 작아서 읽기 어려움",
      "시간 제한이 있어 급하게 눌러야 함",
      "화면이 높아서 불편함",
      "도움 요청할 직원이 없음",
      "메뉴 분류 방식이 낯섦",
    ],
  },
  {
    id: "wheelchair",
    persona: "휠체어 이용자",
    icon: "♿",
    bg: "bg-purple-50 border-purple-200",
    tag: "bg-purple-100 text-purple-700",
    conveniences: ["접근 가능한 키오스크에서는 독립적 주문 가능"],
    problems: [
      "화면 높이가 너무 높아 조작 불가",
      "터치 감도가 맞지 않는 경우가 많음",
      "결제 단말기가 손에 닿지 않음",
      "낮은 키오스크가 설치된 매장이 드묾",
    ],
  },
];

function TechCard({ tech, isOpen, onToggle }) {
  return (
    <div className={`rounded-2xl border-2 overflow-hidden ${tech.color}`}>
      <button
        className="w-full text-left px-5 py-4 flex items-center gap-3"
        onClick={onToggle}
      >
        <span className="text-3xl shrink-0">{tech.icon}</span>
        <div className="flex-1">
          <p className="font-black text-gray-800">{tech.name}</p>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{tech.short}</p>
        </div>
        <span className={`hidden sm:block px-2.5 py-1 rounded-full text-xs font-semibold ${tech.badge}`}>
          {isOpen ? "접기" : "자세히"}
        </span>
        <span className="text-gray-400 text-sm ml-1">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 space-y-3">
          <div className="bg-white rounded-xl p-4">
            <p className="text-xs font-bold text-gray-500 mb-1">개념</p>
            <p className="text-sm text-gray-700 leading-relaxed">{tech.details}</p>
          </div>
          <div className="bg-white rounded-xl p-4">
            <p className="text-xs font-bold text-gray-500 mb-2">생활 속 예시</p>
            <ul className="space-y-1">
              {tech.examples.map((ex, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="shrink-0 text-gray-400">•</span>
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function KioskCard({ caseData, isOpen, onToggle }) {
  return (
    <div className={`rounded-2xl border-2 ${caseData.bg} overflow-hidden`}>
      <button
        className="w-full text-left px-5 py-4 flex items-center gap-3"
        onClick={onToggle}
      >
        <span className="text-2xl">{caseData.icon}</span>
        <div className="flex-1">
          <p className="font-bold text-gray-800">{caseData.persona}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {isOpen ? "접어두기 ▲" : "상황 펼쳐보기 ▼"}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${caseData.tag}`}
        >
          자세히 보기
        </span>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4">
            <p className="text-xs font-bold text-green-600 mb-2">편리한 점</p>
            <ul className="space-y-1">
              {caseData.conveniences.map((c, i) => (
                <li key={i} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-green-500 shrink-0">✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl p-4">
            <p className="text-xs font-bold text-red-500 mb-2">불편한 점</p>
            <ul className="space-y-1">
              {caseData.problems.map((p, i) => (
                <li key={i} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-red-400 shrink-0">!</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Lesson1_1() {
  const [openCase, setOpenCase] = useState(null);
  const [divideExpanded, setDivideExpanded] = useState(false);
  const [openTech, setOpenTech] = useState(null);

  return (
    <div className="space-y-10">
      {/* 도입 */}
      <section>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <p className="text-green-800 font-bold text-lg mb-2">
            요즘 편의점 키오스크, 써봤어?
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            빠르고 편리한 것 같으면서도, 누군가에겐 아직 낯설고 어려운 기술이기도 해요.
            이 레슨에서는 디지털 기술이 우리 사회를 어떻게 바꿔왔는지,
            그리고 그 변화가 모든 사람에게 똑같이 좋은 건지 함께 생각해봐요.
          </p>
        </div>
      </section>

      {/* 개념 — 디지털 기술이란? */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-4">
          디지털 기술이란?
        </h2>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="text-3xl shrink-0">💡</span>
            <div>
              <p className="font-bold text-gray-800 mb-2">
                디지털 기술 (Digital Technology)
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                정보를 <strong>디지털 형식</strong>(0과 1의 조합)으로 처리하고 다루는 기술이에요.
                텍스트, 사진, 영상, 소리 모두 디지털 데이터로 변환되어 저장·전송·처리돼요.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["인터넷", "스마트폰", "AI", "IoT", "클라우드", "빅데이터"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 개념 — 사회 변화 타임라인 */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-4">
          사회는 어떻게 변해왔을까?
        </h2>
        <div className="space-y-3">
          {timeline.map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl border-2 p-5 ${item.color}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${item.tagColor}`}
                  >
                    {item.period}
                  </span>
                  <p className="font-bold text-gray-800 mt-0.5">{item.era}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 개념 — 핵심 디지털 기술 4가지 */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            개념
          </span>
          <h2 className="text-xl font-black text-gray-800">
            지금 세상을 바꾸는 4가지 기술
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          요즘 뉴스에서 자주 들리는 AI, IoT, 빅데이터, 클라우드. 이름은 익숙한데 정확히 뭔지 헷갈리죠?
          각 카드를 열어서 개념과 생활 속 예시를 확인해봐요.
        </p>
        <div className="space-y-3">
          {coreDigitalTechs.map((tech) => (
            <TechCard
              key={tech.id}
              tech={tech}
              isOpen={openTech === tech.id}
              onToggle={() => setOpenTech(openTech === tech.id ? null : tech.id)}
            />
          ))}
        </div>

        {/* 4가지 기술 연결 관계 */}
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-2xl p-5">
          <p className="text-xs font-bold text-gray-500 mb-3">4가지 기술이 함께 작동하는 예시</p>
          <div className="space-y-2">
            {[
              {
                emoji: "🏥",
                text: "스마트워치(IoT)가 심박수를 측정 → 빅데이터로 분석 → AI가 이상 징후 판단 → 클라우드에 기록 저장",
              },
              {
                emoji: "🛍️",
                text: "편의점 카메라(IoT)가 고객 동선 수집 → 빅데이터 분석 → AI가 진열 위치 추천 → 클라우드 서버에 저장",
              },
              {
                emoji: "🎵",
                text: "스트리밍 앱이 내 청취 기록(빅데이터)을 AI로 분석 → 클라우드에서 개인화된 플레이리스트 제공",
              },
            ].map((ex, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-lg shrink-0">{ex.emoji}</span>
                <p className="text-sm text-gray-700 leading-relaxed">{ex.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 퀴즈 1 — 디지털 기술 종류 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            퀴즈
          </span>
          <h2 className="text-xl font-black text-gray-800">4가지 기술, 이제 구분할 수 있어?</h2>
        </div>

        <QuizCard
          question="스마트 냉장고가 유통기한이 지난 식품을 스스로 감지하고 스마트폰으로 알림을 보냈어요. 이때 활용된 디지털 기술은 무엇일까요?"
          options={[
            {
              label: "클라우드 — 인터넷으로 데이터를 저장하는 기술이에요",
              correct: false,
              explanation: "클라우드는 데이터 저장·처리에 관한 기술이에요. 냉장고와 스마트폰을 연결하는 것과는 다른 개념이에요.",
            },
            {
              label: "IoT (사물 인터넷) — 사물에 센서와 통신 기능을 연결하는 기술이에요",
              correct: true,
              explanation: "IoT는 사물과 사물, 사물과 사람을 인터넷으로 연결하는 기술이에요. 냉장고(사물)가 스마트폰(사람)에게 알림을 보내는 게 IoT의 대표적인 예시예요.",
            },
            {
              label: "빅데이터 — 방대한 양의 데이터를 처리하는 기술이에요",
              correct: false,
              explanation: "빅데이터는 대량의 데이터를 분석하는 기술이에요. 냉장고 알림은 사물 연결 기술인 IoT에 더 가까워요.",
            },
            {
              label: "AI — 인공지능이 스스로 판단을 내리는 기술이에요",
              correct: false,
              explanation: "AI는 기계가 스스로 학습·판단하는 기술이에요. 이 경우 단순히 센서 데이터를 전송하는 IoT에 해당해요.",
            },
          ]}
          hint="'사물'과 '인터넷'이 연결된다는 게 핵심이에요."
        />
      </section>

      {/* 실습 — 예전 vs 현재 사회 비교 플립카드 */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            예전 사회 vs 현재 사회, 어떻게 달라졌을까?
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-5 leading-relaxed">
          카드를 클릭해서 디지털 기술이 우리 일상을 어떻게 바꿨는지 확인해봐요.
          각 주제별로 앞면(예전)과 뒷면(현재)을 비교해보세요.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {societyCompareCards.map((card) => (
            <FlipCard key={card.id} front={card.front} back={card.back} />
          ))}
        </div>
      </section>

      {/* 생각해보기 — 내 하루 속 디지털 기술 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
            생각해보기
          </span>
          <h2 className="text-xl font-black text-gray-800">디지털 기술이 내 하루를 바꿨다</h2>
        </div>
        <RevealCard
          prompt="아침에 일어나서 잠들기까지, 우리 하루에서 디지털 기술(AI, IoT, 빅데이터, 클라우드)이 쓰이는 순간이 몇 번이나 될까요? 잠깐 생각해봐요. 생각보다 훨씬 많을 거예요."
          answerLabel="우리 하루 속 디지털 기술 보기"
          answer="아침부터 밤까지 — 이미 디지털 기술 없이 살 수 없어요."
          explanation="알람(스마트폰/IoT) → 날씨 확인(빅데이터·AI 예측) → 유튜브 추천 영상 시청(AI) → 카카오톡으로 친구에게 연락(클라우드) → 배달앱 주문(AI 추천·빅데이터 분석) → 스트리밍으로 음악 감상(클라우드) → 인스타 피드 스크롤(AI 알고리즘) → 수면 앱으로 수면 기록(IoT/빅데이터). 이 모든 게 하루 안에 일어나요!"
        />
      </section>

      {/* 개념 — 디지털 사회의 특징 */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-4">
          디지털 사회의 세 가지 특징
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
            >
              <span className="text-3xl">{f.icon}</span>
              <p className="font-bold text-gray-800 mt-3 mb-1">{f.title}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* 생활 속 예시 */}
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-2xl p-5">
          <p className="text-xs font-bold text-gray-500 uppercase mb-3">생활 속 예시</p>
          <div className="space-y-2">
            {[
              {
                emoji: "🗺️",
                text: "내비게이션이 실시간 교통 데이터를 분석해 최적 경로를 안내해요.",
              },
              {
                emoji: "🎵",
                text: "스트리밍 앱이 내 청취 기록을 분석해 새 노래를 추천해요.",
              },
              {
                emoji: "🚨",
                text: "재난 알림 시스템이 위험 지역 사람들에게 동시에 경보를 보내요.",
              },
            ].map((ex, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-lg shrink-0">{ex.emoji}</span>
                <p className="text-sm text-gray-700 leading-relaxed">{ex.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 실습 — 키오스크 상황 카드 */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            기술의 두 얼굴: 키오스크 사례
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-5 leading-relaxed">
          같은 키오스크인데, 사람마다 경험이 다를 수 있어요.
          아래 세 사람의 상황 카드를 펼쳐서 편리한 점과 불편한 점을 확인해보세요.
        </p>

        <div className="space-y-3">
          {kioskCases.map((c) => (
            <KioskCard
              key={c.id}
              caseData={c}
              isOpen={openCase === c.id}
              onToggle={() => setOpenCase(openCase === c.id ? null : c.id)}
            />
          ))}
        </div>
      </section>

      {/* 개념 — 디지털 격차 */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-4">
          디지털 격차란?
        </h2>
        <div className="bg-white border-2 border-red-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="text-3xl shrink-0">⚠️</span>
            <div>
              <p className="font-bold text-gray-800 mb-1">
                디지털 격차 (Digital Divide)
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                디지털 기술을 사용할 수 있는 사람과 그렇지 못한 사람 사이에
                생기는 <strong>정보 접근성 차이</strong>를 말해요.
              </p>
              <button
                onClick={() => setDivideExpanded(!divideExpanded)}
                className="text-sm text-red-500 underline underline-offset-2 hover:text-red-700"
              >
                {divideExpanded ? "접기 ▲" : "영향받는 그룹 보기 ▼"}
              </button>
              {divideExpanded && (
                <div className="mt-3 grid sm:grid-cols-3 gap-3">
                  {[
                    {
                      group: "고령자",
                      icon: "👴👵",
                      reason: "새로운 기기와 인터페이스에 익숙해지기 어려울 수 있어요",
                    },
                    {
                      group: "장애인",
                      icon: "♿",
                      reason: "기기 설계 자체가 신체적 접근을 고려하지 않는 경우가 많아요",
                    },
                    {
                      group: "저소득층",
                      icon: "💰",
                      reason: "최신 기기나 인터넷 환경을 갖추기 어려울 수 있어요",
                    },
                  ].map((g, i) => (
                    <div
                      key={i}
                      className="bg-red-50 rounded-xl p-3"
                    >
                      <p className="text-lg">{g.icon}</p>
                      <p className="font-semibold text-red-700 text-sm mt-1">
                        {g.group}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                        {g.reason}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 퀴즈 2 — 디지털 격차 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            퀴즈
          </span>
          <h2 className="text-xl font-black text-gray-800">확인해볼까?</h2>
        </div>

        <QuizCard
          question="키오스크가 보편화되면서 고령자가 불편함을 느끼는 주된 이유는 무엇일까요?"
          options={[
            {
              label: "키오스크가 너무 비싸서 고령자들이 구매할 수 없기 때문이에요",
              correct: false,
              explanation: "키오스크는 소비자가 구매하는 제품이 아니에요.",
            },
            {
              label: "디지털 기기에 대한 접근성과 익숙함의 차이, 즉 디지털 격차가 있기 때문이에요",
              correct: true,
              explanation: "인터페이스 설계, 시간 제한, 화면 높이 등이 고령자에게 불편할 수 있어요. 이것이 바로 디지털 격차예요.",
            },
            {
              label: "고령자는 주문을 더 많이 해서 처리 속도가 느리기 때문이에요",
              correct: false,
              explanation: "주문 양의 문제가 아니라, 인터페이스 접근성의 문제예요.",
            },
            {
              label: "키오스크가 노인 보호 구역 근처에 설치되지 않아서예요",
              correct: false,
              explanation: "설치 위치보다는 기기 설계와 디지털 숙련도 차이가 핵심 이유예요.",
            },
          ]}
        />
      </section>

      {/* 생각해보기 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
            생각해보기
          </span>
          <h2 className="text-xl font-black text-gray-800">해결책을 찾아볼까?</h2>
        </div>

        <RevealCard
          prompt="키오스크의 디지털 격차 문제를 줄이려면 어떤 방법이 있을까요? 잠깐 생각해본 뒤 아래 예시를 확인해보세요."
          answerLabel="해결 방법 예시 보기"
          answer="여러 가지 방법이 가능해요!"
          explanation="음성 안내 기능 추가 / 화면 글씨 크기 조절 옵션 / 시간 제한 해제 또는 연장 / 낮은 높이 키오스크 추가 설치 / 도움 요청 버튼 및 직원 호출 시스템 / 화면 고대비 모드 제공 등이 있어요. 기술 자체를 없애는 것이 아니라, 더 많은 사람이 쓸 수 있도록 설계를 개선하는 거예요."
        />
      </section>

      {/* 정리 */}
      <section>
        <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-2xl p-6">
          <h2 className="text-base font-black text-green-800 mb-3">
            이번 레슨에서 배운 것
          </h2>
          <ul className="space-y-2">
            {[
              "디지털 기술은 정보를 0과 1의 디지털 형식으로 처리하는 기술이에요.",
              "사회는 농경 → 산업 → 디지털 사회 순서로 변화해왔어요.",
              "AI(학습·판단), IoT(사물 연결), 빅데이터(데이터 분석), 클라우드(원격 저장)가 현대 디지털 기술의 핵심이에요.",
              "디지털 사회의 특징: 온오프라인 경계 소멸, 사물 네트워크, 빅데이터 생성",
              "같은 기술도 모든 사람에게 동일한 편의를 주는 건 아니에요 — 디지털 격차를 주의해야 해요.",
              "좋은 기술은 더 많은 사람이 쓸 수 있도록 접근성을 고려해야 해요.",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
