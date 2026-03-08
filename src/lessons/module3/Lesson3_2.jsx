import { useState } from "react";
import FlipCard from "../../components/interactive/FlipCard";
import QuizCard from "../../components/interactive/QuizCard";
import ClassifyActivity from "../../components/interactive/ClassifyActivity";
import RevealCard from "../../components/interactive/RevealCard";
import ChecklistActivity from "../../components/interactive/ChecklistActivity";

// 디지털 윤리 문제 데이터
const ethicsIssues = [
  {
    icon: "💬",
    title: "악성 댓글",
    desc: "익명성 뒤에 숨어 상대방에게 상처를 주는 댓글을 달아요. 온라인이라도 현실과 똑같은 사람 사이의 관계예요.",
    color: "bg-red-50 border-red-200",
  },
  {
    icon: "📋",
    title: "개인 정보·저작권 침해",
    desc: "허락 없이 다른 사람의 사진이나 글을 퍼나르거나, 음악·영상을 무단으로 사용해요.",
    color: "bg-orange-50 border-orange-200",
  },
  {
    icon: "📰",
    title: "가짜 뉴스 전파",
    desc: "사실 확인 없이 자극적인 정보를 공유해요. 한 번 퍼진 가짜 뉴스는 되돌리기 어려워요.",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    icon: "📱",
    title: "디지털 중독",
    desc: "스마트폰, 게임, SNS 사용이 과도해져 일상생활이 어려워지는 상태예요.",
    color: "bg-purple-50 border-purple-200",
  },
];

// 사이버 폭력 유형 데이터
const cyberViolenceTypes = [
  {
    icon: "💢",
    name: "사이버 언어폭력",
    desc: "욕설, 모욕적 메시지, 협박을 온라인으로 보내는 것",
    example: "게임에서 진다고 상대방에게 심한 욕설 DM을 보내요",
    color: "bg-red-50 border-red-200",
  },
  {
    icon: "👻",
    name: "사이버 따돌림 (카따)",
    desc: "단톡방에서 의도적으로 특정인을 무시하거나 배제하는 것",
    example: "반 단톡방에서 한 친구 메시지만 읽씹하기로 몰래 약속해요",
    color: "bg-orange-50 border-orange-200",
  },
  {
    icon: "📸",
    name: "사이버 스토킹",
    desc: "온라인에서 타인의 행동을 집요하게 추적하거나 괴롭히는 것",
    example: "누군가의 SNS 계정을 여러 개 만들어 계속 팔로우하며 댓글을 달아요",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    icon: "🖼️",
    name: "사이버 명예훼손",
    desc: "온라인에서 사실이든 아니든 타인의 명예를 훼손하는 정보를 퍼뜨리는 것",
    example: "친구에 대한 나쁜 소문을 커뮤니티 앱에 올려요",
    color: "bg-purple-50 border-purple-200",
  },
];

// 인터넷 실명제 데이터
const realNameDebate = [
  {
    side: "찬성",
    icon: "✅",
    color: "bg-blue-50 border-blue-300",
    badge: "bg-blue-100 text-blue-700",
    points: [
      "실명이 확인되면 악성 댓글을 달기 전에 한 번 더 생각하게 돼요",
      "사이버 폭력 피해자가 가해자를 특정하기 쉬워져요",
      "책임감 있는 표현을 유도할 수 있어요",
    ],
  },
  {
    side: "반대",
    icon: "❌",
    color: "bg-red-50 border-red-300",
    badge: "bg-red-100 text-red-700",
    points: [
      "소수 의견이나 민감한 주제를 자유롭게 표현하기 어려워져요 (표현의 자유 침해)",
      "주민번호 등 개인 정보 노출로 또 다른 보안 위험이 생겨요",
      "헌법재판소는 2012년 인터넷 실명제가 위헌이라고 판결했어요",
    ],
  },
];

// 저작권 데이터
const copyrightData = [
  {
    type: "저작권 (Copyright)",
    icon: "©️",
    color: "bg-indigo-50 border-indigo-200",
    badge: "bg-indigo-100 text-indigo-700",
    def: "저작자가 자신의 창작물에 대해 갖는 독점적인 권리예요. 허락 없이 사용하면 법적 처벌을 받을 수 있어요.",
    examples: ["음악 무단 다운로드·공유", "유튜브 영상 무단 재업로드", "소설·웹툰 불법 복제"],
  },
  {
    type: "공유 저작권 (Copyleft)",
    icon: "🔓",
    color: "bg-teal-50 border-teal-200",
    badge: "bg-teal-100 text-teal-700",
    def: "저작자가 모든 사람에게 창작물을 무상으로 자유롭게 사용·복제·수정·배포할 수 있도록 허용하는 것이에요.",
    examples: ["위키피디아 글 콘텐츠", "오픈소스 소프트웨어(Linux)", "CC 라이선스 적용 사진"],
  },
];

// 윤리 사례 판단 분류 데이터
const ethicsCaseItems = [
  {
    id: "ec1",
    label: "수업 중에 찍은 친구 사진을 허락 없이 SNS에 올렸어요",
    correct: "A",
    explanation: "타인의 사진을 허락 없이 공개하는 것은 개인정보 침해이자 초상권 침해예요.",
  },
  {
    id: "ec2",
    label: "CC 라이선스가 붙어 있는 이미지를 출처를 밝히고 발표 자료에 사용했어요",
    correct: "B",
    explanation: "공유 저작권(CC 라이선스) 이미지를 출처 표기와 함께 사용하는 건 올바른 디지털 활용이에요.",
  },
  {
    id: "ec3",
    label: "확인되지 않은 소문을 재미있어 보여서 카카오톡으로 퍼뜨렸어요",
    correct: "A",
    explanation: "사실 확인 없이 소문을 퍼뜨리는 행위는 가짜 뉴스 전파예요. 명예훼손으로 이어질 수도 있어요.",
  },
  {
    id: "ec4",
    label: "유명 가수의 음악을 공식 스트리밍 앱에서 스트리밍해서 들었어요",
    correct: "B",
    explanation: "공식 플랫폼에서 정상적으로 스트리밍하는 것은 저작권을 준수하는 올바른 방법이에요.",
  },
  {
    id: "ec5",
    label: "게임에서 지는 게 화가 나서 상대방에게 심한 욕설 메시지를 보냈어요",
    correct: "A",
    explanation: "온라인에서 욕설이나 모욕적 메시지를 보내는 행위는 사이버 폭력이에요. 익명이라도 처벌받을 수 있어요.",
  },
  {
    id: "ec6",
    label: "친구의 틱톡 영상이 재밌어서 허락 받고 카카오톡으로 다른 친구에게 공유했어요",
    correct: "B",
    explanation: "본인의 동의를 받고 공유하는 것은 올바른 행동이에요. 공유 전 '괜찮아?'라고 물어보는 습관이 중요해요.",
  },
  {
    id: "ec7",
    label: "수행평가 발표 자료에 저작권 표시가 있는 폰트를 구매하지 않고 무단으로 사용했어요",
    correct: "A",
    explanation: "폰트도 저작권이 있어요. 상업용 폰트를 허락 없이 사용하면 저작권 침해예요. 무료 폰트나 학교 라이선스 폰트를 사용해야 해요.",
  },
];

// 디지털 규칙 작성 활동 (직접 써보기)
const ruleScenarios = [
  {
    id: "doc",
    scenario: "중요한 문서를 다른 사람에게 공유해야 할 때",
    example: "문서를 암호화한 뒤 비밀번호를 따로 전달해요.",
    hint: "개인 정보나 민감한 내용이 담긴 파일이라면?",
    placeholder: "예: 문서에 암호를 설정하고, 비밀번호는 별도 메시지로 전달해요.",
  },
  {
    id: "photo",
    scenario: "SNS 앱이 내 스마트폰의 모든 사진 접근 권한을 요청할 때",
    example: "접근 권한을 '선택한 사진만'으로 제한하고, 모든 사진 접근은 거부해요.",
    hint: "앱이 왜 모든 사진에 접근해야 하는 걸까요?",
    placeholder: "예: 필요한 사진만 선택적으로 허용하고, 전체 접근 권한은 거부해요.",
  },
  {
    id: "signup",
    scenario: "처음 사용하는 포털 사이트나 앱에 가입할 때",
    example: "개인정보 처리 방침을 확인하고, 선택 동의 항목은 동의하지 않아도 가입할 수 있어요.",
    hint: "어떤 정보를 왜 수집하는지 확인했나요?",
    placeholder: "예: 필수 정보만 입력하고, 선택 항목은 신중하게 판단해요.",
  },
];

// 나의 디지털 생활 체크리스트 (강화)
const digitalLifeChecklist = [
  { id: "think-before-post", label: "SNS에 올리기 전에 '이 정보가 공개돼도 괜찮은가?'를 한 번 더 생각해요", tip: "한 번 올린 게시물은 삭제해도 인터넷 어딘가에 남을 수 있어요." },
  { id: "no-friend-photo", label: "친구 사진이나 영상을 올릴 때 반드시 허락을 먼저 받아요", tip: "내가 당사자라면 어떤 기분일지 생각해봐요. 초상권은 모든 사람에게 있어요." },
  { id: "check-copyright", label: "발표 자료나 SNS 포스팅에 이미지·음악·영상을 사용할 때 저작권을 확인해요", tip: "CC 라이선스 이미지를 활용하거나 출처를 명확히 표기해요." },
  { id: "no-rumor", label: "카카오톡이나 SNS에서 소문이나 자극적인 글을 무조건 공유하지 않아요", tip: "공유 전 '이게 사실인가?'를 먼저 확인해요. 가짜 뉴스 전파에 본인도 책임이 있어요." },
  { id: "no-screenshot", label: "친구의 개인 대화를 캡처해서 다른 곳에 올리거나 공유하지 않아요", tip: "개인 대화 캡처 무단 공유는 개인정보 침해예요." },
  { id: "report-bully", label: "사이버 폭력을 목격하면 신고하거나 피해자를 지지해요 (방관하지 않아요)", tip: "방관도 간접적인 동참이에요. 신고 기능이나 관리자 문의를 적극 활용해요." },
  { id: "screen-time", label: "스마트폰 사용 시간을 스스로 인식하고, 지나치게 길면 조절하려고 노력해요", tip: "스마트폰 설정의 '스크린 타임' 기능으로 사용 시간을 확인할 수 있어요." },
];

const digitalLifeFeedbacks = [
  {
    minScore: 0,
    maxScore: 2,
    message: "아직 디지털 윤리 습관을 더 키울 필요가 있어요. 오늘 레슨에서 배운 것 중 하나만이라도 바로 실천해봐요. 작은 변화가 큰 차이를 만들어요.",
    color: "bg-orange-50 border border-orange-200 text-orange-800",
  },
  {
    minScore: 3,
    maxScore: 4,
    message: "기본적인 디지털 윤리를 지키고 있어요! 저작권 확인, 소문 공유 자제 같은 부분을 더 신경 쓰면 더 좋은 디지털 시민이 될 수 있어요.",
    color: "bg-yellow-50 border border-yellow-200 text-yellow-800",
  },
  {
    minScore: 5,
    maxScore: 6,
    message: "디지털 윤리 의식이 꽤 높아요! 사이버 폭력 방관 안 하기와 스크린 타임 관리까지 챙기면 완벽해요.",
    color: "bg-blue-50 border border-blue-200 text-blue-800",
  },
  {
    minScore: 7,
    maxScore: 7,
    message: "훌륭한 디지털 시민이에요! 이 습관을 꾸준히 유지하고, 주변 친구들에게도 좋은 영향을 줘봐요.",
    color: "bg-green-50 border border-green-200 text-green-800",
  },
];

// 딜레마 시나리오 (RevealCard 3개)
const dilemmaScenarios = [
  {
    id: "friend-photo",
    situation: "친구가 놀이공원에서 찍힌 나의 사진 20장을 내 허락 없이 자신의 인스타그램에 올렸어요. 사진은 예쁘게 나왔지만, 친구는 '네가 잘 나왔으니까 당연히 좋아하겠지'라고 생각했대요.",
    question: "이 행동, 괜찮은 걸까요?",
    answerLabel: "어떻게 봐야 할까?",
    answer: "사진이 예쁘게 나왔어도 허락 없이 올리는 건 초상권 침해예요.",
    explanation: "결과가 좋아 보여도 과정이 잘못됐어요. '잘 나왔으니 좋아하겠지'는 내 기준이지 상대방의 동의가 아니에요. 특히 공개 SNS에 올리는 것은 불특정 다수에게 나의 얼굴·위치·상황이 노출되는 것과 같아요. 먼저 '이 사진 올려도 돼?'라고 물어보는 게 가장 간단한 해결책이에요.",
  },
  {
    id: "screenshot",
    situation: "친구와 단둘이 나눈 카카오톡 대화에서 친구가 은밀한 고민을 털어놨어요. 그 내용이 다른 친구들과의 대화에서 화제가 됐고, '그냥 보여주면 어때'라는 생각이 들었어요.",
    question: "캡처해서 공유해도 될까요?",
    answerLabel: "어떻게 봐야 할까?",
    answer: "절대 안 돼요. 개인 대화 내용을 무단으로 공유하는 건 심각한 개인정보 침해예요.",
    explanation: "친구가 나한테만 말한 건 '나를 신뢰했기 때문'이에요. 그 신뢰를 깨는 행동은 단순한 예의 문제가 아니라 법적으로도 문제가 될 수 있어요. 개인 대화 무단 공유는 정보통신망법으로 처벌받을 수 있어요. '재미있어 보여서', '어차피 공개 정보 아니야?'라는 변명은 통하지 않아요.",
  },
  {
    id: "paid-font",
    situation: "수행평가 발표 자료를 만드는데, 예쁜 유료 폰트를 발견했어요. 구매하려면 돈이 필요한데, '학교 과제에 쓰는 거니까 괜찮겠지'라고 생각했어요.",
    question: "학교 과제에 유료 폰트를 무단으로 써도 될까요?",
    answerLabel: "어떻게 봐야 할까?",
    answer: "학교 과제라도 유료 폰트를 무단으로 사용하는 건 저작권 침해예요.",
    explanation: "교육 목적이라도 폰트 저작권은 그대로 적용돼요. 상업용 폰트를 무단으로 사용하면 저작권법 위반이에요. 대신 네이버 나눔글꼴, 구글 폰트, 눈누(noonnu.cc) 같은 플랫폼에서 무료로 사용 가능한 폰트를 찾을 수 있어요. 수행평가 발표 자료 하나로 저작권 분쟁에 휘말릴 필요는 없어요.",
  },
];

function DilemmaCard({ scenario }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
        <p className="text-xs font-bold text-amber-700 mb-1">상황</p>
        <p className="text-sm text-gray-800 leading-relaxed">{scenario.situation}</p>
      </div>
      <RevealCard
        prompt={scenario.question}
        answerLabel={scenario.answerLabel}
        answer={scenario.answer}
        explanation={scenario.explanation}
      />
    </div>
  );
}

function RuleWritingCard({ scenario }) {
  const [userRule, setUserRule] = useState("");
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <p className="text-sm font-bold text-gray-700 mb-1">{scenario.scenario}</p>
      <p className="text-xs text-gray-400 mb-3">힌트: {scenario.hint}</p>

      <textarea
        value={userRule}
        onChange={(e) => setUserRule(e.target.value)}
        placeholder={scenario.placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-200 bg-gray-50 transition-colors"
        rows={2}
      />

      <div className="mt-3 flex gap-2 items-start flex-wrap">
        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="px-4 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs font-medium rounded-xl transition-colors"
          >
            예시 답 보기
          </button>
        ) : (
          <div className="w-full bg-purple-50 border border-purple-200 rounded-xl px-4 py-3 text-xs text-purple-800 leading-relaxed">
            <span className="font-bold mr-1">예시:</span>
            {scenario.example}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Lesson3_2() {
  const [activeDebate, setActiveDebate] = useState(null);
  const [openCyberViolence, setOpenCyberViolence] = useState(null);

  return (
    <div className="space-y-10">
      {/* 도입 */}
      <section>
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-6">
          <p className="text-purple-800 font-bold text-lg mb-2">
            기술이 있다고 뭐든 해도 될까?
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            할 수 있다고 해서 해도 된다는 뜻은 아니에요.
            디지털 세상에서도 우리가 지켜야 할 윤리와 규칙이 있어요.
            이 레슨에서는 디지털 사회의 여러 윤리 문제를 살펴보고, 내가 어떻게 행동할지 생각해봐요.
          </p>
        </div>
      </section>

      {/* 개념 — 디지털 윤리 문제 */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-4">
          디지털 사회의 윤리 문제
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {ethicsIssues.map((issue, i) => (
            <div
              key={i}
              className={`rounded-2xl border-2 p-5 ${issue.color}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{issue.icon}</span>
                <p className="font-bold text-gray-800">{issue.title}</p>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{issue.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 개념 — 사이버 폭력이란? */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-3">
          사이버 폭력이란?
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-4">
          <p className="text-sm text-gray-800 leading-relaxed">
            <span className="font-bold text-red-700">사이버 폭력</span>은 인터넷, 스마트폰 등 디지털 매체를 이용해 타인에게 신체적·언어적·심리적 피해를 주는 모든 행위예요.
            오프라인 폭력과 달리 24시간, 익명으로, 빠르게 확산될 수 있어 피해가 더 크게 느껴질 수 있어요.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {cyberViolenceTypes.map((t) => (
            <div key={t.name} className={`rounded-2xl border-2 overflow-hidden ${t.color}`}>
              <button
                className="w-full text-left px-4 py-3 flex items-center gap-3"
                onClick={() => setOpenCyberViolence(openCyberViolence === t.name ? null : t.name)}
              >
                <span className="text-xl">{t.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-800 text-sm">{t.name}</p>
                </div>
                <span className="text-gray-400 text-sm">
                  {openCyberViolence === t.name ? "▲" : "▼"}
                </span>
              </button>
              {openCyberViolence === t.name && (
                <div className="px-4 pb-4 space-y-2">
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs font-bold text-gray-500 mb-1">정의</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{t.desc}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs font-bold text-gray-500 mb-1">예시</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{t.example}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 실습 — 딜레마 상황 판단 */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            이런 행동, 괜찮을까?
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-5 leading-relaxed">
          실제로 일어날 수 있는 상황들이에요. 내가 당사자라면 어떻게 판단할지 먼저 생각해보고, 답을 확인해봐요.
        </p>
        <div className="space-y-4">
          {dilemmaScenarios.map((scenario) => (
            <DilemmaCard key={scenario.id} scenario={scenario} />
          ))}
        </div>
      </section>

      {/* 개념 + 실습 — 인터넷 실명제 토론 */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-2">
          인터넷 실명제 — 찬성 vs 반대
        </h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          인터넷에서 댓글을 쓸 때 실명을 공개해야 한다는 '인터넷 실명제'.
          각 입장을 클릭해서 근거를 확인해봐요.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          {realNameDebate.map((d) => (
            <div
              key={d.side}
              className={`rounded-2xl border-2 overflow-hidden ${d.color}`}
            >
              <button
                className="w-full text-left px-5 py-4 flex items-center gap-3"
                onClick={() =>
                  setActiveDebate(activeDebate === d.side ? null : d.side)
                }
              >
                <span className="text-xl">{d.icon}</span>
                <span className="font-bold text-gray-800 text-lg">{d.side}</span>
                <span
                  className={`ml-auto text-xs font-semibold px-2.5 py-1 rounded-full ${d.badge}`}
                >
                  근거 보기
                </span>
                <span className="text-gray-400 text-sm">
                  {activeDebate === d.side ? "▲" : "▼"}
                </span>
              </button>
              {activeDebate === d.side && (
                <ul className="px-5 pb-5 space-y-2">
                  {d.points.map((p, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm text-gray-700 bg-white rounded-xl px-4 py-3"
                    >
                      <span className="shrink-0 mt-0.5 text-gray-400">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-sm text-gray-700 leading-relaxed">
          <p className="font-bold text-gray-800 mb-1">현재 상황</p>
          인터넷 실명제는 2012년 헌법재판소에서 위헌 결정을 받아 폐지됐어요.
          현재는 주민번호 대신 <strong>전화번호 인증, 공동인증서, 아이핀, 간편인증</strong> 등을
          통해 본인 확인을 하면서도 게시 시 실명을 공개하지 않는 방식을 사용해요.
        </div>
      </section>

      {/* 개념 — 저작권 vs 공유 저작권 (플립 카드) */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            저작권 vs 공유 저작권
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          아래 카드를 클릭해서 내용을 확인해봐요.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <FlipCard
            front={{
              title: "저작권 (Copyright)",
              description: "©️ 창작물을 만든 사람의 권리",
              color: "bg-indigo-100 border-indigo-300 text-indigo-800",
            }}
            back={{
              title: "저작권이란?",
              items: [
                "저작자가 창작물에 대해 갖는 독점적 권리",
                "허락 없이 사용하면 법적 처벌 가능",
                "음악 무단 다운로드·공유 ❌",
                "영상 무단 재업로드 ❌",
                "웹툰·소설 불법 복제 ❌",
                "유료 폰트 무단 사용 ❌",
              ],
              color: "bg-white border-indigo-300",
            }}
          />
          <FlipCard
            front={{
              title: "공유 저작권 (Copyleft)",
              description: "🔓 모두가 자유롭게 쓸 수 있도록",
              color: "bg-teal-100 border-teal-300 text-teal-800",
            }}
            back={{
              title: "공유 저작권이란?",
              items: [
                "저작자가 모든 사람에게 무상으로 사용 허용",
                "복제·수정·배포도 자유롭게 가능",
                "위키피디아 텍스트 ✅",
                "오픈소스 소프트웨어(Linux) ✅",
                "CC 라이선스 적용 사진 ✅",
                "네이버 나눔글꼴 ✅",
              ],
              color: "bg-white border-teal-300",
            }}
          />
        </div>
      </section>

      {/* 실습 — 윤리 사례 판단 (강화) */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            이 행동, 괜찮은 건가요?
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          아래 행동이 디지털 윤리를 지킨 것인지, 어긴 것인지 판단해봐요.
          헷갈리는 경우에는 결과 확인 후 해설을 꼭 읽어봐요.
        </p>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <ClassifyActivity
            items={ethicsCaseItems}
            categoryA={{ label: "윤리 위반", color: "red" }}
            categoryB={{ label: "올바른 행동", color: "green" }}
            instruction="각 행동이 디지털 윤리를 어겼는지, 올바른 행동인지 판단해봐요."
          />
        </div>
      </section>

      {/* 퀴즈 — 사이버 폭력 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
            퀴즈
          </span>
          <h2 className="text-xl font-black text-gray-800">사이버 폭력, 어디까지 알고 있어?</h2>
        </div>

        <QuizCard
          question="반 단톡방에서 한 친구를 계속 무시하고 답장을 아무도 하지 않기로 암묵적으로 동의했어요. 이 행동은 사이버 폭력에 해당할까요?"
          options={[
            {
              label: "아니요 — 욕설이나 나쁜 말을 한 게 아니니까 괜찮아요",
              correct: false,
              explanation: "사이버 폭력은 직접적인 욕설만이 아니에요. 의도적으로 무시하거나 메시지를 읽고도 답장하지 않는 '사이버 따돌림'도 폭력에 해당해요.",
            },
            {
              label: "네 — 온라인에서 의도적으로 특정인을 배제하고 무시하는 것도 사이버 폭력이에요",
              correct: true,
              explanation: "사이버 따돌림(카따, 단톡 왕따)은 사이버 폭력의 한 유형이에요. 온라인에서도 의도적 배제와 무시는 피해자에게 심각한 상처를 줘요.",
            },
            {
              label: "모르겠어요 — 단톡방은 사적인 공간이라 법이 적용되지 않아요",
              correct: false,
              explanation: "사적인 채팅방이라도 사이버 폭력 관련 법이 적용돼요. 피해자가 신고하면 처벌받을 수 있어요.",
            },
          ]}
          hint="'말하지 않는 것'도 의도적이면 폭력이 될 수 있어요."
        />
      </section>

      {/* 퀴즈 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
            퀴즈
          </span>
          <h2 className="text-xl font-black text-gray-800">확인해볼까?</h2>
        </div>

        <QuizCard
          question="유진이는 인터넷에서 멋진 사진을 발견해 자신의 SNS 프로필 사진으로 올렸어요. 이 사진에는 저작권 표시가 있었는데, 유진이는 '그냥 프로필에 쓰는 건데 괜찮겠지'라고 생각했어요. 유진이의 행동은 어떤가요?"
          options={[
            {
              label: "괜찮아요 — 상업적 목적이 아니면 저작권 침해가 아니에요",
              correct: false,
              explanation: "비상업적 사용이라도 저작자의 허락 없이 사용하면 저작권 침해에 해당해요.",
            },
            {
              label: "문제 있어요 — 저작권이 있는 사진을 허락 없이 사용하는 건 저작권 침해예요",
              correct: true,
              explanation: "저작권이 있는 사진은 개인 용도로 쓰더라도 저작자의 허락이 필요해요. 공유 저작권(Copyleft)이 아닌 이상 무단 사용은 위법이에요.",
            },
            {
              label: "괜찮아요 — SNS 프로필은 공개가 아니라 개인 공간이에요",
              correct: false,
              explanation: "SNS 프로필은 다른 사람들이 볼 수 있는 공개 공간이에요. 또한 장소와 무관하게 저작권이 적용돼요.",
            },
          ]}
        />
      </section>

      {/* 실습 — 나의 디지털 생활 돌아보기 (강화) */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            나의 디지털 생활 돌아보기
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          오늘 레슨에서 배운 디지털 윤리 기준으로 내 디지털 생활을 점검해봐요.
          솔직하게 체크해야 의미 있는 진단이 돼요.
        </p>
        <ChecklistActivity
          title="디지털 윤리 실천 자가진단"
          items={digitalLifeChecklist}
          feedbacks={digitalLifeFeedbacks}
        />
      </section>

      {/* 실습 — 규칙 직접 써보기 */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            내가 지킬 디지털 규칙 써보기
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          아래 세 가지 상황에서 어떻게 행동할지 직접 써봐요.
          정답이 없어요 — 이유를 생각하면서 내 규칙을 만들어보는 활동이에요.
          써본 뒤 예시를 눌러서 비교해봐요.
        </p>
        <div className="space-y-4">
          {ruleScenarios.map((s) => (
            <RuleWritingCard key={s.id} scenario={s} />
          ))}
        </div>
      </section>

      {/* 정리 */}
      <section>
        <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-white border border-purple-200 rounded-2xl p-6">
          <h2 className="text-base font-black text-purple-800 mb-3">
            이번 레슨에서 배운 것
          </h2>
          <ul className="space-y-2">
            {[
              "디지털 윤리 문제: 악성 댓글, 개인 정보·저작권 침해, 가짜 뉴스, 디지털 중독",
              "사이버 폭력: 언어폭력·따돌림·스토킹·명예훼손 등 — 익명이라도 처벌받을 수 있어요",
              "인터넷 실명제: 찬반 논란 끝에 위헌 결정 → 현재는 본인 인증 방식으로 대체",
              "저작권: 창작물에 대한 저작자의 독점 권리 — 허락 없이 사용 금지",
              "공유 저작권(Copyleft): 저작자가 모든 사람에게 자유로운 사용을 허용한 것",
              "친구 사진 무단 공유, 대화 캡처 공유, 유료 폰트 무단 사용은 모두 디지털 윤리 위반이에요.",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-purple-500 shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
