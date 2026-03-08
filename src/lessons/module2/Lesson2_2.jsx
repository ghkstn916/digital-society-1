import { useState } from "react";
import ChecklistActivity from "../../components/interactive/ChecklistActivity";
import QuizCard from "../../components/interactive/QuizCard";
import ClassifyActivity from "../../components/interactive/ClassifyActivity";
import RevealCard from "../../components/interactive/RevealCard";

// 디지털 위협 종류
const threats = [
  {
    id: "spam",
    name: "스팸 (Spam)",
    icon: "📧",
    color: "bg-yellow-50 border-yellow-300",
    badge: "bg-yellow-100 text-yellow-700",
    def: "불특정 다수에게 대량으로 보내는 광고성 또는 불필요한 메시지",
    example: "수신 동의 없이 보내는 쇼핑 광고 문자, 스팸 이메일",
    tip: "수신 거부 처리하고, 모르는 링크는 절대 클릭하지 않아요.",
  },
  {
    id: "phishing",
    name: "피싱 (Phishing)",
    icon: "🎣",
    color: "bg-orange-50 border-orange-300",
    badge: "bg-orange-100 text-orange-700",
    def: "Private data + Fishing의 합성어. 신뢰할 수 있는 기관인 척 속여 개인정보·금융 정보를 빼내는 수법",
    example: "\"당신의 계좌가 정지됩니다. 지금 바로 확인하세요\" 문자 + 가짜 사이트 링크",
    tip: "공식 앱이나 공식 홈페이지에서 직접 확인하고, 문자 링크는 함부로 클릭하지 않아요.",
  },
  {
    id: "hacking",
    name: "해킹 (Hacking)",
    icon: "💻",
    color: "bg-red-50 border-red-300",
    badge: "bg-red-100 text-red-700",
    def: "다른 사람의 컴퓨팅 시스템에 허락 없이 침입해 파일을 열람·유출·변경·삭제하는 행위",
    example: "기업 서버에 침입해 고객 개인정보를 대량으로 빼내는 사건",
    tip: "비밀번호를 강화하고, 보안 업데이트를 항상 최신 상태로 유지해요.",
  },
  {
    id: "ransomware",
    name: "랜섬웨어 (Ransomware)",
    icon: "🔐",
    color: "bg-purple-50 border-purple-300",
    badge: "bg-purple-100 text-purple-700",
    def: "Ransom(몸값) + Software의 합성어. 컴퓨터 파일을 암호화해 사용 불가 상태로 만든 뒤 금전을 요구하는 악성 소프트웨어",
    example: "병원 전산 시스템을 잠그고 \"돈을 내야 풀어주겠다\"고 협박한 사건",
    tip: "중요한 파일은 반드시 백업하고, 출처 불명의 파일은 실행하지 않아요.",
  },
];

// 비밀번호 체크리스트
const passwordChecklist = [
  { id: "length", label: "8자리 이상으로 만들었어요", tip: "길수록 안전해요. 12자 이상을 권장해요." },
  { id: "mixed", label: "영문 대소문자, 숫자, 특수문자를 섞었어요", tip: "조합이 다양할수록 해킹이 어려워져요." },
  { id: "notSimple", label: "12345678, 000000 같은 단순한 숫자 패턴은 피했어요", tip: "가장 먼저 시도되는 패턴이에요." },
  { id: "notPersonal", label: "생일, 이름, 학번 같은 개인 정보는 포함하지 않았어요", tip: "주변 사람이 추측할 수 있는 정보는 위험해요." },
  { id: "notReused", label: "여러 사이트에 같은 비밀번호를 쓰지 않아요", tip: "한 곳이 해킹되면 다른 곳도 위험해져요." },
  { id: "twoFactor", label: "2단계 인증(이메일 또는 문자 인증)을 설정했어요", tip: "비밀번호가 유출돼도 추가 방어막이 돼요." },
  { id: "regular", label: "비밀번호를 주기적으로 바꿔요 (3~6개월마다)", tip: "장기간 같은 비밀번호는 위험할 수 있어요." },
];

const passwordFeedbacks = [
  {
    minScore: 0,
    maxScore: 2,
    message: "⚠️ 비밀번호 보안이 많이 취약해요! 지금 바로 비밀번호를 점검하고 바꿔봐요. 특히 2단계 인증 설정이 급해요.",
    color: "bg-red-50 border border-red-200 text-red-800",
  },
  {
    minScore: 3,
    maxScore: 4,
    message: "🔶 기본은 지키고 있지만 아직 아쉬운 부분이 있어요. 체크 안 된 항목들을 하나씩 개선해봐요.",
    color: "bg-orange-50 border border-orange-200 text-orange-800",
  },
  {
    minScore: 5,
    maxScore: 6,
    message: "✅ 꽤 안전한 편이에요! 2단계 인증까지 설정한다면 더욱 철저하게 지킬 수 있어요.",
    color: "bg-blue-50 border border-blue-200 text-blue-800",
  },
  {
    minScore: 7,
    maxScore: 7,
    message: "🌟 완벽해요! 보안 습관이 탄탄하게 잡혀 있어요. 이 상태를 꾸준히 유지해요.",
    color: "bg-green-50 border border-green-200 text-green-800",
  },
];

// 위협 대처법 분류 데이터
const threatResponseItems = [
  {
    id: "r1",
    label: "수신 거부를 설정하고 모르는 링크는 클릭하지 않아요",
    correct: "A",
    explanation: "스팸 대처법이에요. 광고성 메시지를 차단하고 링크 클릭을 피하는 것이 핵심이에요.",
  },
  {
    id: "r2",
    label: "중요한 파일은 주기적으로 외장하드나 클라우드에 백업해요",
    correct: "B",
    explanation: "랜섬웨어 대처법이에요. 파일이 암호화되더라도 백업이 있으면 피해를 최소화할 수 있어요.",
  },
  {
    id: "r3",
    label: "공식 앱이나 홈페이지에서 직접 접속해 문자 링크를 따라가지 않아요",
    correct: "A",
    explanation: "피싱 대처법이에요. 의심스러운 문자의 링크 대신 직접 공식 경로로 접속해야 해요.",
  },
  {
    id: "r4",
    label: "비밀번호를 강화하고 보안 업데이트를 항상 최신으로 유지해요",
    correct: "B",
    explanation: "해킹 대처법이에요. 강한 비밀번호와 최신 보안 패치가 무단 침입을 막아줘요.",
  },
];

// 보호 방법 10가지
const protectionMethods = [
  { icon: "💿", text: "운영체제와 소프트웨어는 정품·최신 버전 사용" },
  { icon: "🔤", text: "단순 비밀번호(12345678 등) 절대 사용 금지" },
  { icon: "📱", text: "2단계 인증 설정 — 이메일·휴대전화·OTP 추가 인증" },
  { icon: "🗑️", text: "수상한 메시지나 링크는 즉시 삭제" },
  { icon: "🌐", text: "유사 웹사이트·쇼핑몰 주의 (주소 꼼꼼히 확인)" },
  { icon: "📲", text: "앱은 공식 마켓(App Store, Play Store)에서만 설치" },
  { icon: "📡", text: "비밀번호 없는 공개 Wi-Fi 사용 자제" },
  { icon: "🔌", text: "공용 환경에서 스마트폰 충전 시 데이터 케이블 조심" },
  { icon: "🔒", text: "보안 업데이트 지원이 끊긴 기기 교체 고려" },
  { icon: "🛡️", text: "백신 프로그램 설치 + 자동 업데이트 켜두기" },
];

export default function Lesson2_2() {
  const [openThreat, setOpenThreat] = useState(null);

  return (
    <div className="space-y-10">
      {/* 도입 */}
      <section>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <p className="text-red-800 font-bold text-lg mb-2">
            내 정보, 누가 노리고 있을까?
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            스마트폰을 쓸 때마다, 인터넷에 접속할 때마다 우리 정보는 다양한 위협에 노출돼 있어요.
            어떤 위협이 있는지 알아야 제대로 대처할 수 있어요.
          </p>
        </div>
      </section>

      {/* 개념 — 디지털 위협 종류 */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-4">
          디지털 위협의 종류
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          각 카드를 클릭해서 자세한 내용과 실제 사례를 확인해봐요.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {threats.map((t) => (
            <div
              key={t.id}
              className={`rounded-2xl border-2 overflow-hidden ${t.color}`}
            >
              <button
                className="w-full text-left px-5 py-4 flex items-center gap-3"
                onClick={() => setOpenThreat(openThreat === t.id ? null : t.id)}
              >
                <span className="text-2xl">{t.icon}</span>
                <div className="flex-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${t.badge}`}>
                    {t.id === "spam" ? "광고성 메시지" :
                     t.id === "phishing" ? "정보 탈취" :
                     t.id === "hacking" ? "불법 침입" : "금전 협박"}
                  </span>
                  <p className="font-bold text-gray-800 mt-0.5">{t.name}</p>
                </div>
                <span className="text-gray-400 text-sm">
                  {openThreat === t.id ? "▲" : "▼"}
                </span>
              </button>
              {openThreat === t.id && (
                <div className="px-5 pb-5 space-y-3">
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-xs font-bold text-gray-500 mb-1">개념</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{t.def}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-xs font-bold text-gray-500 mb-1">실제 사례</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{t.example}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-green-200">
                    <p className="text-xs font-bold text-green-600 mb-1">대처 방법</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{t.tip}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 퀴즈 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
            퀴즈
          </span>
          <h2 className="text-xl font-black text-gray-800">어떤 위협일까?</h2>
        </div>

        <QuizCard
          question="민지는 문자를 받았어요: '귀하의 택배가 주소 오류로 반송됩니다. 아래 링크에서 주소를 확인해 주세요.' 이 문자는 어떤 위협에 해당할까요?"
          options={[
            {
              label: "스팸 — 광고성 메시지이기 때문에",
              correct: false,
              explanation: "스팸은 단순 광고성 메시지예요. 이 문자는 정보를 빼내려는 목적이 있어요.",
            },
            {
              label: "피싱 — 신뢰할 수 있는 기관(택배사)인 척 속여 개인정보를 요구하고 있어요",
              correct: true,
              explanation: "실제 택배사를 흉내 낸 가짜 문자로, 링크를 클릭하면 개인정보 입력을 유도하는 피싱이에요. 반드시 공식 앱이나 공식 홈페이지에서 직접 확인해야 해요.",
            },
            {
              label: "해킹 — 민지의 컴퓨터에 침입했기 때문에",
              correct: false,
              explanation: "해킹은 시스템에 직접 침입하는 행위예요. 아직 침입이 일어난 건 아니에요.",
            },
            {
              label: "랜섬웨어 — 금전을 요구하기 때문에",
              correct: false,
              explanation: "랜섬웨어는 파일을 암호화해 금전을 요구해요. 이 문자는 정보 탈취를 시도하는 피싱이에요.",
            },
          ]}
        />
      </section>

      {/* 실습 — 위협별 대처법 분류 */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            이 대처법은 어떤 위협에 해당할까?
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          아래 각 행동이 스팸·피싱 계열(A)의 대처법인지, 해킹·랜섬웨어 계열(B)의 대처법인지 분류해봐요.
        </p>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <ClassifyActivity
            items={threatResponseItems}
            categoryA={{ label: "스팸·피싱 대처", color: "red" }}
            categoryB={{ label: "해킹·랜섬웨어 대처", color: "blue" }}
            instruction="각 대처 행동이 어느 위협 유형에 주로 적용되는지 선택해봐요."
          />
        </div>
      </section>

      {/* 개념 — 2단계 인증 */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-4">
          2단계 인증이란?
        </h2>
        <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="text-3xl shrink-0">🔐</span>
            <div>
              <p className="font-bold text-gray-800 mb-2">2단계 인증 (2FA, Two-Factor Authentication)</p>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                아이디 + 비밀번호(1단계)에 더해, <strong>추가 인증 수단(2단계)</strong>을 하나 더 거치는 방식이에요.
                비밀번호가 유출되더라도 계정을 보호할 수 있어요.
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-xl text-sm">
                  <span>🔑</span>
                  <span className="font-medium">비밀번호</span>
                </div>
                <span className="text-gray-400 font-bold">+</span>
                <div className="flex gap-2 flex-wrap">
                  {["📧 이메일 인증", "📱 문자 인증", "🔢 OTP 앱"].map((m) => (
                    <span
                      key={m}
                      className="px-3 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm font-medium"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 개념 — 보호 방법 10가지 */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-4">
          나를 지키는 10가지 실천법
        </h2>
        <div className="grid sm:grid-cols-2 gap-2">
          {protectionMethods.map((m, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3"
            >
              <span className="text-xl shrink-0">{m.icon}</span>
              <div className="flex items-start gap-2">
                <span className="text-xs font-bold text-gray-400 shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 실습 — 비밀번호 체크리스트 */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            내 비밀번호 안전한가요?
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          지금 사용하는 비밀번호를 떠올리며 아래 항목을 체크해봐요.
          (실제 비밀번호를 입력하는 게 아니라 습관을 확인하는 자가 진단이에요!)
        </p>
        <ChecklistActivity
          title="비밀번호 보안 자가 진단"
          items={passwordChecklist}
          feedbacks={passwordFeedbacks}
        />
      </section>

      {/* 퀴즈 — 비밀번호 강도 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
            퀴즈
          </span>
          <h2 className="text-xl font-black text-gray-800">
            더 안전한 비밀번호는?
          </h2>
        </div>

        <QuizCard
          question="다음 중 가장 안전한 비밀번호는 무엇일까요?"
          options={[
            {
              label: "010-1234-5678 (내 전화번호)",
              correct: false,
              explanation: "전화번호처럼 타인도 알 수 있는 개인 정보는 절대 비밀번호로 쓰면 안 돼요. 쉽게 추측될 수 있어요.",
            },
            {
              label: "password123 (영문+숫자 조합)",
              correct: false,
              explanation: "'password'는 전 세계에서 가장 많이 쓰이는 비밀번호 중 하나예요. 숫자를 붙여도 해킹 시도 1순위에 해당해요.",
            },
            {
              label: "고2_여름방학_2024! (한글+영문+숫자+특수문자)",
              correct: false,
              explanation: "길이와 다양성이 좋지만, 개인 경험에서 직접 가져온 문구라 추측될 수 있어요. 그래도 나쁘지 않은 편이에요.",
            },
            {
              label: "kR9#mT2@vL5! (무작위 대소문자+숫자+특수문자, 12자)",
              correct: true,
              explanation: "길이가 길고, 대소문자·숫자·특수문자가 무작위로 섞여 있어요. 규칙이 없어서 추측이 거의 불가능해요. 이런 비밀번호는 비밀번호 관리 앱을 활용해서 저장하는 게 좋아요.",
            },
          ]}
          hint="길이, 다양성, 예측 불가능성이 강한 비밀번호의 조건이에요."
        />
      </section>

      {/* 퀴즈 — 2단계 인증 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
            퀴즈
          </span>
          <h2 className="text-xl font-black text-gray-800">
            2단계 인증, 왜 필요할까?
          </h2>
        </div>

        <QuizCard
          question="지민이의 인스타그램 비밀번호가 해킹으로 유출됐어요. 그런데 2단계 인증을 설정해 두었더니 해커가 로그인에 실패했어요. 왜 그랬을까요?"
          options={[
            {
              label: "비밀번호가 저절로 바뀌었기 때문이에요",
              correct: false,
              explanation: "2단계 인증은 비밀번호를 바꿔주지 않아요. 비밀번호와 별개의 추가 인증 수단이 필요하게 만드는 거예요.",
            },
            {
              label: "계정이 자동으로 잠겼기 때문이에요",
              correct: false,
              explanation: "계정 자동 잠금은 2단계 인증과 다른 기능이에요.",
            },
            {
              label: "비밀번호 외에 지민이의 스마트폰으로 전송된 인증번호까지 입력해야 했기 때문이에요",
              correct: true,
              explanation: "2단계 인증은 비밀번호(1단계)가 유출돼도 문자·앱 인증(2단계)이 없으면 로그인할 수 없어요. 해커는 지민이의 스마트폰을 갖고 있지 않으니 2단계를 통과하지 못했어요.",
            },
            {
              label: "인스타그램이 의심스러운 접속을 차단했기 때문이에요",
              correct: false,
              explanation: "비정상 접속 차단 기능도 있지만, 이 상황에서 핵심은 2단계 인증이 추가 방어막 역할을 한 거예요.",
            },
          ]}
        />
      </section>

      {/* 생각해보기 — 내 정보 지키는 습관 점검 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
            생각해보기
          </span>
          <h2 className="text-xl font-black text-gray-800">
            나는 어떤 습관을 가지고 있을까?
          </h2>
        </div>

        <RevealCard
          prompt="지금 사용 중인 주요 앱(인스타그램, 카카오톡, 구글 계정 등)을 하나 떠올려봐요. 2단계 인증이 켜져 있나요? 비밀번호를 마지막으로 바꾼 게 언제인지 기억나나요? 잠깐 생각해본 뒤 아래를 확인해봐요."
          answerLabel="점검 기준 보기"
          answer="내 계정 보안, 지금 바로 확인해볼 수 있어요!"
          explanation="스마트폰 설정 → 계정 보안 또는 각 앱의 보안 설정에서 2단계 인증 켜기가 가능해요. 인스타그램은 '설정 → 보안 → 2단계 인증', 구글은 '계정 → 보안 → 2단계 인증'에서 설정할 수 있어요. 비밀번호는 3~6개월마다 바꾸는 것이 권장돼요. 오늘 수업 후 내 계정 하나만 점검해보는 건 어떨까요?"
        />
      </section>

      {/* 정리 */}
      <section>
        <div className="bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-2xl p-6">
          <h2 className="text-base font-black text-red-800 mb-3">
            이번 레슨에서 배운 것
          </h2>
          <ul className="space-y-2">
            {[
              "스팸: 불특정 다수에게 보내는 광고성 메시지",
              "피싱: 신뢰 기관인 척 속여 개인정보·금융정보를 빼내는 수법",
              "해킹: 허락 없이 타인의 시스템에 침입해 정보를 빼내는 행위",
              "랜섬웨어: 시스템을 잠근 뒤 돈을 요구하는 악성 소프트웨어",
              "2단계 인증 + 강력한 비밀번호 + 백신 프로그램이 기본 방어선이에요.",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-red-400 shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
