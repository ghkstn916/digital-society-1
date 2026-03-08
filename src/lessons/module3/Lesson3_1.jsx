import { useState } from "react";
import QuizCard from "../../components/interactive/QuizCard";
import RevealCard from "../../components/interactive/RevealCard";
import ClassifyActivity from "../../components/interactive/ClassifyActivity";
import MatchingActivity from "../../components/interactive/MatchingActivity";

// 정보 보안 3대 요소
const triadElements = [
  {
    id: "confidentiality",
    name: "기밀성",
    english: "Confidentiality",
    icon: "🔒",
    color: "bg-blue-50 border-blue-300",
    badge: "bg-blue-100 text-blue-700",
    def: "허락된 사용자만 정보에 접근할 수 있도록 하는 것",
    example: "학교 성적 정보는 해당 학생과 담임 선생님만 볼 수 있어야 해요.",
    broken: "해킹이나 계정 탈취로 다른 사람이 내 메시지를 읽는 경우",
  },
  {
    id: "integrity",
    name: "무결성",
    english: "Integrity",
    icon: "✅",
    color: "bg-green-50 border-green-300",
    badge: "bg-green-100 text-green-700",
    def: "정보를 허락 없이 함부로 변경할 수 없도록 하는 것",
    example: "성적표의 점수가 누군가에 의해 몰래 바뀌지 않아야 해요.",
    broken: "악성 코드가 파일을 수정하거나, 해커가 웹사이트 내용을 바꾸는 경우",
  },
  {
    id: "availability",
    name: "가용성",
    english: "Availability",
    icon: "⚡",
    color: "bg-orange-50 border-orange-300",
    badge: "bg-orange-100 text-orange-700",
    def: "사용자가 원할 때 언제든지 정보에 접근할 수 있는 것",
    example: "온라인 시험 중 서버가 다운되어 아무도 접속할 수 없으면 가용성이 무너진 거예요.",
    broken: "랜섬웨어가 파일을 암호화해 사용할 수 없게 만드는 경우",
  },
];

// 위협 요소 데이터
const threatElements = [
  {
    name: "훼손",
    icon: "💥",
    color: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-700",
    def: "정보를 손상시키거나 파괴해 정상적으로 작동하지 못하게 하는 것",
    example: "바이러스가 중요한 파일을 손상시켜 열 수 없게 만드는 경우",
    triad: "가용성 침해",
  },
  {
    name: "변조",
    icon: "✏️",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    def: "정보의 내용을 다른 내용으로 바꾸는 것",
    example: "성적 데이터를 몰래 수정하거나, 뉴스 기사 내용을 변경하는 경우",
    triad: "무결성 침해",
  },
  {
    name: "접근과 유출",
    icon: "🚪",
    color: "bg-yellow-50 border-yellow-200",
    badge: "bg-yellow-100 text-yellow-700",
    def: "허락받지 않은 사람이 정보를 확인하거나 외부로 빼내는 것",
    example: "직원이 퇴사 전 회사 고객 정보를 외부로 유출하는 경우",
    triad: "기밀성 침해",
  },
  {
    name: "위조",
    icon: "🎭",
    color: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-700",
    def: "거짓 정보를 만들어 정상 정보인 것처럼 속이는 것",
    example: "학교에서 오는 것처럼 꾸민 가짜 이메일로 학생 정보를 요구하는 경우",
    triad: "무결성·기밀성 동시 침해",
  },
];

// 일상 속 보안 위협 사례 데이터
const dailySecurityThreats = [
  {
    id: "phishing-text",
    icon: "📱",
    situation: "문자 한 통: '택배 주소 오류. 아래 링크에서 확인하세요.'",
    threat: "피싱",
    color: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-700",
    explanation: "실제 택배사를 흉내낸 가짜 문자예요. 링크를 누르면 개인정보 입력을 유도해요.",
  },
  {
    id: "wifi",
    icon: "📶",
    situation: "카페 '무료 WiFi' 연결 후 인터넷 뱅킹 로그인",
    threat: "해킹 위험",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    explanation: "비밀번호 없는 공공 WiFi는 해커가 중간에서 데이터를 가로챌 수 있어요.",
  },
  {
    id: "random-file",
    icon: "📁",
    situation: "'무료 아이돌 직캠 모음.exe' 파일 다운로드",
    threat: "악성코드",
    color: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-700",
    explanation: "출처 불명 .exe 파일은 랜섬웨어나 바이러스일 가능성이 높아요. 절대 실행하면 안 돼요.",
  },
  {
    id: "same-pw",
    icon: "🔑",
    situation: "여러 앱에 같은 비밀번호 '1234abcd' 사용 중",
    threat: "계정 탈취 위험",
    color: "bg-yellow-50 border-yellow-200",
    badge: "bg-yellow-100 text-yellow-700",
    explanation: "한 곳이 해킹되면 모든 계정이 위험해져요. 각 서비스마다 다른 강한 비밀번호를 써야 해요.",
  },
];

// 피싱 문자 판단 데이터
const phishingMessages = [
  {
    id: "p1",
    sender: "국세청",
    message: "국세청: 귀하의 세금 환급금 320,000원이 발생했습니다. 지금 바로 수령하려면 아래 링크를 클릭하세요. [링크]",
    isPhishing: true,
    clues: ["공공기관은 문자 링크로 환급을 처리하지 않아요", "링크 주소가 공식 사이트와 달라요", "'지금 바로'처럼 급하게 유도하는 말이 피싱의 특징이에요"],
    safeAction: "국세청 공식 홈페이지(hometax.go.kr)에 직접 접속해 확인해요.",
  },
  {
    id: "p2",
    sender: "카카오뱅크",
    message: "카카오뱅크: 새 기기에서 로그인이 감지됐습니다. 본인이 아닌 경우 고객센터(1599-3333)로 연락하세요.",
    isPhishing: false,
    clues: ["링크를 클릭하게 유도하지 않아요", "개인정보 입력을 요구하지 않아요", "공식 대표 전화번호를 안내해요"],
    safeAction: "이런 문자는 비교적 안전해요. 의심된다면 앱에 직접 접속해 확인해요.",
  },
  {
    id: "p3",
    sender: "건강보험공단",
    message: "[Web발신] 건강검진 결과가 도착했습니다. 확인하려면 아이디/비밀번호를 입력하세요. [링크]",
    isPhishing: true,
    clues: ["문자로 아이디·비밀번호를 요구하는 건 절대 정상이 아니에요", "[Web발신]이라도 가짜일 수 있어요", "공식 기관은 문자에 로그인 링크를 보내지 않아요"],
    safeAction: "공단 공식 앱(The 건강보험)에서 직접 검진 결과를 확인해요.",
  },
];

function PhishingJudgeCard({ msg }) {
  const [answered, setAnswered] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center gap-2">
        <span className="text-xs font-bold text-gray-500">발신자:</span>
        <span className="text-sm font-bold text-gray-800">{msg.sender}</span>
      </div>
      <div className="px-5 py-4">
        <div className="bg-gray-50 rounded-xl px-4 py-3 mb-4">
          <p className="text-sm text-gray-800 leading-relaxed">{msg.message}</p>
        </div>
        {answered === null && (
          <div className="flex gap-2">
            <button
              onClick={() => setAnswered("phishing")}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
            >
              피싱 문자야!
            </button>
            <button
              onClick={() => setAnswered("safe")}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
            >
              안전한 문자야
            </button>
          </div>
        )}
        {answered !== null && (
          <div>
            <div className={`rounded-xl px-4 py-3 text-sm leading-relaxed mb-3 ${
              (answered === "phishing") === msg.isPhishing
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}>
              <span className="font-bold mr-1">
                {(answered === "phishing") === msg.isPhishing ? "정확해요!" : msg.isPhishing ? "이건 피싱 문자예요!" : "이 문자는 비교적 안전해요."}
              </span>
              {msg.safeAction}
            </div>
            <button
              onClick={() => setShowDetail(!showDetail)}
              className="text-xs text-purple-600 underline underline-offset-2 hover:text-purple-800"
            >
              {showDetail ? "판단 단서 숨기기 ▲" : "어떻게 판단하나요? ▼"}
            </button>
            {showDetail && (
              <div className="mt-2 bg-purple-50 border border-purple-100 rounded-xl px-4 py-3">
                <p className="text-xs font-bold text-purple-700 mb-2">판단 단서</p>
                <ul className="space-y-1">
                  {msg.clues.map((clue, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-700">
                      <span className="shrink-0 text-purple-400">•</span>
                      {clue}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// 피싱 사례 분석용 위협 요소
const gyeounCaseOptions = [
  {
    label: "훼손 — 겨울이의 스마트폰 파일이 손상됐어요",
    correct: false,
    explanation: "파일이 손상된 게 아니라 정보가 빠져나간 상황이에요.",
  },
  {
    label: "접근과 유출 — 겨울이의 개인 정보가 허락 없이 외부에 노출됐어요",
    correct: true,
    explanation: "겨울이가 가짜 사이트에 입력한 개인 정보는 공격자에게 그대로 전달돼요. 이건 기밀성이 침해된 전형적인 '유출' 사례예요.",
  },
  {
    label: "훼손 + 변조 — 겨울이의 소셜 미디어 게시물이 바뀌었어요",
    correct: false,
    explanation: "게시물 변경은 이 사례에서 일어난 일이 아니에요.",
  },
  {
    label: "가용성 침해 — 겨울이의 계정이 잠겨서 접속할 수 없어요",
    correct: false,
    explanation: "계정 잠금도 가능하지만, 이 사례의 핵심은 정보가 '유출'된 거예요.",
  },
];

export default function Lesson3_1() {
  const [selectedTriad, setSelectedTriad] = useState(null);
  const [openThreat, setOpenThreat] = useState(null);
  const [openDailyThreat, setOpenDailyThreat] = useState(null);

  const selected = triadElements.find((t) => t.id === selectedTriad);

  return (
    <div className="space-y-10">
      {/* 도입 */}
      <section>
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
          <p className="text-purple-800 font-bold text-lg mb-2">
            정보를 지킨다는 건 정확히 무슨 뜻일까?
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            단순히 비밀번호를 거는 것만으로 충분할까요?
            정보 보안에는 세 가지 핵심 요소가 있어요.
            이 세 요소 중 하나라도 무너지면 정보는 위험해져요.
          </p>
        </div>
      </section>

      {/* 개념 — 정보 보안 정의 */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-4">
          정보 보안이란?
        </h2>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="bg-purple-50 border border-purple-200 rounded-xl px-5 py-4 mb-4">
            <p className="font-bold text-purple-800 text-sm leading-relaxed">
              정보 보안 = 정보를 위협으로부터 보호하는 것<br />
              <span className="font-normal text-gray-700">
                훼손·변조·접근 및 유출·위조를 방지하기 위한
                관리적·기술적 방법을 포함해요.
              </span>
            </p>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            디지털 사회에서 정보는 새로운 자산이에요.
            개인의 사진, 문서, 연락처부터 기업의 영업 비밀, 국가의 기밀까지 모두 보호 대상이에요.
          </p>
        </div>
      </section>

      {/* 실습 — 내 주변의 보안 위협 */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            이게 보안 위협이라고?
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          우리가 일상에서 흔히 겪는 상황들이에요. 어떤 보안 위협이 숨어있는지 카드를 열어서 확인해봐요.
        </p>
        <div className="space-y-3">
          {dailySecurityThreats.map((threat) => (
            <div
              key={threat.id}
              className={`rounded-2xl border-2 overflow-hidden ${threat.color}`}
            >
              <button
                className="w-full text-left px-5 py-4 flex items-center gap-3"
                onClick={() => setOpenDailyThreat(openDailyThreat === threat.id ? null : threat.id)}
              >
                <span className="text-2xl shrink-0">{threat.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-800 text-sm">{threat.situation}</p>
                </div>
                <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-semibold ${threat.badge}`}>
                  {threat.threat}
                </span>
                <span className="text-gray-400 text-sm ml-1">
                  {openDailyThreat === threat.id ? "▲" : "▼"}
                </span>
              </button>
              {openDailyThreat === threat.id && (
                <div className="px-5 pb-5">
                  <div className="bg-white rounded-xl px-4 py-3 text-sm text-gray-700 leading-relaxed">
                    <span className="font-semibold text-red-600 mr-1">왜 위험한가요?</span>
                    {threat.explanation}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 개념 — 위협 요소 4가지 */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-4">
          정보 보안 위협 요소
        </h2>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          보안 위협은 크게 4가지 유형으로 분류할 수 있어요. 각 카드를 클릭해서 개념과 예시를 확인해봐요.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {threatElements.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl border-2 overflow-hidden ${t.color}`}
            >
              <button
                className="w-full text-left px-4 py-3 flex items-center gap-3"
                onClick={() => setOpenThreat(openThreat === t.name ? null : t.name)}
              >
                <span className="text-xl">{t.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{t.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${t.badge}`}>
                    {t.triad}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">
                  {openThreat === t.name ? "▲" : "▼"}
                </span>
              </button>
              {openThreat === t.name && (
                <div className="px-4 pb-4 space-y-2">
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs font-bold text-gray-500 mb-1">개념</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{t.def}</p>
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

      {/* 개념 — 정보 보안 3대 요소 (인터랙티브) */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-2">
          정보 보안의 3대 요소
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          아래 카드를 클릭해서 각 요소를 자세히 알아봐요.
        </p>
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {triadElements.map((t) => (
            <button
              key={t.id}
              onClick={() =>
                setSelectedTriad(selectedTriad === t.id ? null : t.id)
              }
              className={`rounded-2xl border-2 p-5 text-left transition-all ${
                selectedTriad === t.id
                  ? t.color + " shadow-md scale-[1.01]"
                  : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <span className="text-3xl">{t.icon}</span>
              <p className={`font-black text-lg mt-2 ${selectedTriad === t.id ? "" : "text-gray-800"}`}>
                {t.name}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{t.english}</p>
              {selectedTriad !== t.id && (
                <p className="text-xs text-gray-400 mt-2">클릭해서 자세히 보기</p>
              )}
            </button>
          ))}
        </div>

        {selected && (
          <div className={`rounded-2xl border-2 p-5 ${selected.color}`}>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs font-bold text-gray-500 mb-1">정의</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selected.def}</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs font-bold text-gray-500 mb-1">예시</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selected.example}</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <p className="text-xs font-bold text-red-500 mb-1">무너지는 경우</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selected.broken}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 실습 — 피싱 문자 구별하기 */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            피싱 문자 구별하기
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          아래 문자 메시지를 읽고, 피싱인지 안전한 문자인지 판단해봐요.
          실제로 이런 문자를 받으면 어떻게 할지 생각하면서 풀어봐요.
        </p>
        <div className="space-y-4">
          {phishingMessages.map((msg) => (
            <PhishingJudgeCard key={msg.id} msg={msg} />
          ))}
        </div>
      </section>

      {/* 실습 — 피싱 사례 분석 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            겨울이의 이야기
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
            <p className="text-xs font-bold text-gray-500 mb-2">상황</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              겨울이는 소셜 미디어에서 "스마트폰 추첨 이벤트에 당첨되었습니다!
              아래 링크에서 이름, 생년월일, 전화번호를 입력하면 선물을 보내드립니다" 라는 메시지를 받았어요.
              겨울이는 설레는 마음에 링크를 클릭해 정보를 모두 입력했어요.
            </p>
          </div>
          <QuizCard
            question="이 상황에서 어떤 정보 보안 위협 요소가 발생했나요?"
            options={gyeounCaseOptions}
          />
        </div>

        <RevealCard
          prompt="겨울이가 이 상황에서 어떻게 했어야 할까요? 구체적인 대처 방법을 생각해봐요."
          answerLabel="대처 방법 확인하기"
          answer="메시지 자체를 의심하고, 절대 링크를 클릭하지 않아야 했어요."
          explanation="① 공식 채널(스마트폰 제조사 공식 사이트, 공식 SNS)에서 해당 이벤트가 실제로 있는지 확인해요. ② 개인정보(이름, 생년월일, 전화번호)를 요구하는 메시지는 무조건 의심해야 해요. ③ 이미 입력했다면 즉시 관련 계정 비밀번호를 바꾸고, 한국인터넷진흥원(KISA)에 신고할 수 있어요."
        />
      </section>

      {/* 실습 — 보안 위협 유형 분류 */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            이 상황, 어떤 위협 요소일까?
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          아래 상황들이 기밀성을 침해하는 유출 계열인지, 무결성·가용성을 침해하는 변조·훼손 계열인지 분류해봐요.
        </p>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <ClassifyActivity
            items={[
              {
                id: "th1",
                label: "해커가 학교 서버에 침입해 성적 데이터베이스의 점수를 몰래 수정했어요",
                correct: "B",
                explanation: "허락 없이 데이터를 변경한 것은 '변조'에 해당해요. 무결성이 침해된 사례예요.",
              },
              {
                id: "th2",
                label: "바이러스가 컴퓨터에 저장된 기말고사 발표 자료를 열 수 없게 손상시켰어요",
                correct: "B",
                explanation: "파일을 손상시켜 사용할 수 없게 만든 것은 '훼손'이에요. 가용성과 무결성 모두 침해된 사례예요.",
              },
              {
                id: "th3",
                label: "전직 직원이 회사를 그만두면서 고객 연락처와 주문 내역을 외부로 빼냈어요",
                correct: "A",
                explanation: "허락 없이 정보를 빼내는 것은 '유출'이에요. 기밀성이 침해된 사례예요.",
              },
              {
                id: "th4",
                label: "공격자가 학교 홈페이지처럼 꾸민 가짜 사이트로 학생들의 아이디·비밀번호를 수집했어요",
                correct: "A",
                explanation: "거짓 사이트로 정보를 탈취한 것은 '위조'이자 '유출'에 해당해요. 기밀성과 신뢰성 모두 침해됐어요.",
              },
            ]}
            categoryA={{ label: "기밀성 침해 (유출·위조)", color: "red" }}
            categoryB={{ label: "무결성·가용성 침해 (변조·훼손)", color: "purple" }}
            instruction="각 상황이 어느 보안 위협 유형에 해당하는지 판단해봐요."
          />
        </div>
      </section>

      {/* 실습 — 3대 요소-설명 매칭 */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            3대 요소와 예시 연결하기
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          정보 보안의 3대 요소(기밀성·무결성·가용성)와 각각에 해당하는 실제 상황을 연결해봐요.
        </p>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <MatchingActivity
            pairs={[
              {
                leftId: "conf",
                leftLabel: "기밀성 (Confidentiality)",
                rightId: "r-conf",
                rightLabel: "내 카카오톡 메시지를 친구만 볼 수 있어야 해요",
              },
              {
                leftId: "integ",
                leftLabel: "무결성 (Integrity)",
                rightId: "r-integ",
                rightLabel: "수행평가 제출 파일이 제출 후 수정되지 않아야 해요",
              },
              {
                leftId: "avail",
                leftLabel: "가용성 (Availability)",
                rightId: "r-avail",
                rightLabel: "수능 온라인 원서 접수 기간에 사이트에 항상 접속 가능해야 해요",
              },
            ]}
            leftTitle="보안 요소"
            rightTitle="실제 상황 예시"
            instruction="각 보안 요소가 어떤 상황에서 적용되는지 연결해봐요."
          />
        </div>
      </section>

      {/* 개념 — 실천 방법 */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-4">
          정보 보안 실천 방법
        </h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { icon: "🔄", text: "비밀번호 주기적으로 변경 (3~6개월)", color: "bg-blue-50 border-blue-200" },
            { icon: "🔃", text: "운영체제 및 앱 보안 업데이트 즉시 적용", color: "bg-green-50 border-green-200" },
            { icon: "🛡️", text: "바이러스 백신 설치 및 자동 업데이트 유지", color: "bg-purple-50 border-purple-200" },
          ].map((m, i) => (
            <div key={i} className={`rounded-2xl border-2 p-5 ${m.color}`}>
              <span className="text-3xl">{m.icon}</span>
              <p className="text-sm font-semibold text-gray-700 mt-3 leading-relaxed">
                {m.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 정리 */}
      <section>
        <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-2xl p-6">
          <h2 className="text-base font-black text-purple-800 mb-3">
            이번 레슨에서 배운 것
          </h2>
          <ul className="space-y-2">
            {[
              "정보 보안: 훼손·변조·접근 및 유출·위조를 방지하는 관리적·기술적 방법",
              "위협 요소 4가지: 훼손 / 변조 / 접근과 유출 / 위조",
              "3대 요소: 기밀성(허락된 사용자만 접근) / 무결성(함부로 변경 불가) / 가용성(언제든 접근 가능)",
              "피싱 문자는 ① 링크 클릭 유도 ② 개인정보 입력 요구 ③ 긴박감 조성이 특징이에요.",
              "의심스러운 메시지는 클릭하지 말고 공식 앱·홈페이지에서 직접 확인해요.",
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
