import { useState } from "react";
import QuizCard from "../../components/interactive/QuizCard";
import ClassifyActivity from "../../components/interactive/ClassifyActivity";
import MatchingActivity from "../../components/interactive/MatchingActivity";
import RevealCard from "../../components/interactive/RevealCard";

// 개인정보 해당 여부 분류 데이터
const personalInfoItems = [
  {
    id: "name",
    label: "이름과 생년월일",
    correct: "A",
    explanation: "이름과 생년월일은 특정 개인을 식별할 수 있는 대표적인 개인정보예요.",
  },
  {
    id: "weather",
    label: "오늘 서울의 날씨 예보",
    correct: "B",
    explanation: "날씨 예보는 특정 개인과 관련 없는 공공 정보예요.",
  },
  {
    id: "phone",
    label: "휴대전화 번호",
    correct: "A",
    explanation: "전화번호는 특정 개인에게 연락하는 수단이기 때문에 개인정보예요.",
  },
  {
    id: "news",
    label: "유명 연예인의 공식 데뷔 날짜",
    correct: "B",
    explanation: "공식적으로 공개된 연예인 활동 정보는 공개 정보예요. 단, 연예인의 개인 주소나 가족 정보는 여전히 개인정보예요.",
  },
  {
    id: "account",
    label: "은행 계좌번호",
    correct: "A",
    explanation: "계좌번호는 금융 거래와 직결되는 민감한 개인정보예요. 유출되면 금전 피해로 이어질 수 있어요.",
  },
  {
    id: "recipe",
    label: "인터넷에 공개된 김치찌개 레시피",
    correct: "B",
    explanation: "누구나 볼 수 있도록 공개된 레시피는 개인정보가 아닌 공개 정보예요.",
  },
];

// 피싱 유형 매칭
const phishingMatchingPairs = [
  {
    leftId: "spam",
    leftLabel: "스팸",
    rightId: "r-spam",
    rightLabel: "수신 동의 없이 대량으로 보내는 광고성 메시지",
  },
  {
    leftId: "phishing",
    leftLabel: "피싱",
    rightId: "r-phishing",
    rightLabel: "신뢰 기관인 척 속여 개인정보·금융정보를 빼내는 수법",
  },
  {
    leftId: "hacking",
    leftLabel: "해킹",
    rightId: "r-hacking",
    rightLabel: "허락 없이 타인의 시스템에 침입해 정보를 열람·유출하는 행위",
  },
  {
    leftId: "ransomware",
    leftLabel: "랜섬웨어",
    rightId: "r-ransomware",
    rightLabel: "파일을 암호화해 사용 불가 상태로 만들고 금전을 요구하는 악성 소프트웨어",
  },
];

// 정보 공유 판단 시나리오 OX
const shareJudgmentItems = [
  {
    id: "sj1",
    statement: "은지는 단체 카카오톡방에 친구의 전화번호를 허락 없이 올렸어요. 이건 개인정보 침해가 아니에요.",
    answer: "X",
    explanation: "친구의 전화번호는 개인정보예요. 허락 없이 제3자에게 공유하는 건 개인정보 침해에 해당해요.",
  },
  {
    id: "sj2",
    statement: "학교 공식 홈페이지에 게시된 행사 사진(학교 이름, 날짜 포함)은 외부에 공유해도 괜찮아요.",
    answer: "O",
    explanation: "공식적으로 공개된 학교 행사 정보는 공유 가능한 공개 정보예요. 다만 사진 속 개인 얼굴이 특정되는 경우는 따로 확인이 필요해요.",
  },
  {
    id: "sj3",
    statement: "2단계 인증을 설정하면, 비밀번호가 유출되어도 계정을 지키는 데 도움이 돼요.",
    answer: "O",
    explanation: "2단계 인증은 비밀번호 외에 추가 인증 수단을 요구하기 때문에, 비밀번호가 유출되더라도 계정 보호에 큰 도움이 돼요.",
  },
];

function OXActivity({ items }) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  const allAnswered = items.every((item) => answers[item.id] !== undefined);
  const score = checked
    ? items.filter((item) => answers[item.id] === item.answer).length
    : 0;

  function select(id, val) {
    if (checked) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isCorrect = checked && answers[item.id] === item.answer;
        const isWrong = checked && answers[item.id] !== item.answer && answers[item.id] !== undefined;
        return (
          <div
            key={item.id}
            className={`rounded-2xl border-2 p-5 transition-all ${
              isCorrect
                ? "border-green-400 bg-green-50"
                : isWrong
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <p className="text-sm font-medium text-gray-800 mb-3 leading-relaxed">
              {item.statement}
            </p>
            <div className="flex gap-3">
              {["O", "X"].map((val) => (
                <button
                  key={val}
                  onClick={() => select(item.id, val)}
                  disabled={checked}
                  className={`w-14 h-10 rounded-xl border-2 text-base font-black transition-all ${
                    answers[item.id] === val
                      ? val === "O"
                        ? "border-blue-500 bg-blue-500 text-white"
                        : "border-red-500 bg-red-500 text-white"
                      : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-400"
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
            {checked && (
              <div
                className={`mt-3 text-xs rounded-xl px-4 py-3 leading-relaxed ${
                  isCorrect
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <span className="font-semibold mr-1">
                  {isCorrect ? `✅ 정답! (${item.answer})` : `❌ 오답. 정답은 ${item.answer}예요.`}
                </span>
                {item.explanation}
              </div>
            )}
          </div>
        );
      })}
      <div className="flex gap-3 items-center mt-2">
        {!checked ? (
          <button
            onClick={() => setChecked(true)}
            disabled={!allAnswered}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
              allAnswered
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {allAnswered ? "결과 확인하기" : `${Object.keys(answers).length}/${items.length} 선택됨`}
          </button>
        ) : (
          <>
            <div className="px-4 py-2 bg-white border border-blue-200 rounded-xl text-sm">
              <span className="font-bold text-blue-600">{score}</span>
              <span className="text-gray-600">/{items.length} 정답</span>
            </div>
            <button
              onClick={() => { setAnswers({}); setChecked(false); }}
              className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2"
            >
              다시 하기
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function Lesson2_3() {
  return (
    <div className="space-y-10">
      {/* 도입 */}
      <section>
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <p className="text-blue-800 font-bold text-lg mb-2">
            모듈 2를 마무리할 시간이에요!
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            개인정보 보호, 정보 공유 판단, 디지털 위협과 대처법까지 배운 내용을 문제로 확인해봐요.
            어려운 문제가 있다면 해설을 잘 읽고 넘어가요.
          </p>
          <div className="mt-4 flex gap-3 flex-wrap">
            <span className="px-3 py-1 bg-white border border-blue-200 rounded-full text-xs text-blue-700 font-semibold">
              문제 6개
            </span>
            <span className="px-3 py-1 bg-white border border-blue-200 rounded-full text-xs text-blue-700 font-semibold">
              약 15분
            </span>
          </div>
        </div>
      </section>

      {/* 문제 1 — 개인정보 분류 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
            문제 1
          </span>
          <h2 className="text-lg font-black text-gray-800">개인정보인가, 공개 정보인가?</h2>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <ClassifyActivity
            items={personalInfoItems}
            categoryA={{ label: "개인정보", color: "red" }}
            categoryB={{ label: "공개 정보", color: "blue" }}
            instruction="각 항목이 개인정보에 해당하는지, 아니면 공개 정보인지 분류해봐요."
          />
        </div>
      </section>

      {/* 문제 2 — QuizCard: 비밀번호 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
            문제 2
          </span>
          <h2 className="text-lg font-black text-gray-800">안전한 비밀번호 고르기</h2>
        </div>
        <QuizCard
          question="다음 중 가장 안전한 비밀번호는 무엇일까요?"
          options={[
            {
              label: "20050315 (생년월일)",
              correct: false,
              explanation: "생년월일은 주변 사람이 쉽게 추측할 수 있는 정보예요. 개인 정보를 그대로 사용하면 위험해요.",
            },
            {
              label: "password123",
              correct: false,
              explanation: "'password'는 가장 많이 사용되는 비밀번호 중 하나예요. 해킹 시 가장 먼저 시도되는 패턴이에요.",
            },
            {
              label: "Kj#8mP!qL3",
              correct: true,
              explanation: "영문 대소문자, 숫자, 특수문자가 혼합된 10자 이상의 비밀번호예요. 예측하기 매우 어려운 가장 안전한 형태예요.",
            },
            {
              label: "000000",
              correct: false,
              explanation: "단순하게 반복되는 숫자는 해킹 시 가장 먼저 시도되는 최악의 비밀번호예요.",
            },
          ]}
          hint="길고, 복잡하고, 개인 정보가 없어야 강한 비밀번호예요."
        />
      </section>

      {/* 문제 3 — 위협 유형 매칭 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
            문제 3
          </span>
          <h2 className="text-lg font-black text-gray-800">디지털 위협 유형 연결하기</h2>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          각 위협 유형의 이름과 설명을 올바르게 연결해봐요.
        </p>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <MatchingActivity
            pairs={phishingMatchingPairs}
            leftTitle="위협 유형"
            rightTitle="설명"
            instruction="왼쪽 위협 이름을 먼저 클릭하고, 알맞은 설명을 오른쪽에서 선택해봐요."
          />
        </div>
      </section>

      {/* 문제 4 — QuizCard: 피싱 사례 판단 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
            문제 4
          </span>
          <h2 className="text-lg font-black text-gray-800">이건 어떤 위협일까?</h2>
        </div>
        <QuizCard
          question="수빈이는 문자를 받았어요: '국민은행: 고객님 계좌에 이상 거래가 감지됐습니다. 지금 바로 아래 링크에서 확인하세요.' 이 상황에서 수빈이가 해야 할 행동으로 가장 알맞은 것은?"
          options={[
            {
              label: "링크를 바로 클릭해서 계좌를 확인한다",
              correct: false,
              explanation: "문자 링크를 클릭하면 가짜 사이트로 연결되어 개인정보나 금융정보를 입력하게 유도할 수 있어요. 절대 클릭하면 안 돼요.",
            },
            {
              label: "국민은행 공식 앱이나 공식 홈페이지에 직접 접속해서 확인한다",
              correct: true,
              explanation: "피싱 문자는 공식 기관인 척 속여 정보를 빼내려 해요. 항상 공식 앱이나 직접 검색으로 접속한 공식 홈페이지에서 확인해야 해요.",
            },
            {
              label: "문자 속 번호로 바로 전화를 건다",
              correct: false,
              explanation: "문자 속 전화번호도 피싱 번호일 수 있어요. 반드시 공식 홈페이지에서 확인한 대표 번호로 전화해야 해요.",
            },
            {
              label: "친구에게 링크를 보내 대신 클릭해달라고 한다",
              correct: false,
              explanation: "피싱 링크를 친구에게 전달하면 친구도 위험에 노출될 수 있어요. 의심스러운 링크는 누구에게도 전달하면 안 돼요.",
            },
          ]}
        />
      </section>

      {/* 문제 5 — OX: 정보 공유 판단 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
            문제 5
          </span>
          <h2 className="text-lg font-black text-gray-800">O / X로 판단해봐요</h2>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          각 상황이 맞으면 O, 틀리면 X를 눌러봐요.
        </p>
        <OXActivity items={shareJudgmentItems} />
      </section>

      {/* 문제 6 — RevealCard: 서술 확인 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
            문제 6
          </span>
          <h2 className="text-lg font-black text-gray-800">개인정보 보호 핵심 3가지는?</h2>
        </div>
        <RevealCard
          prompt="내 개인정보를 온라인에서 지키기 위해 당장 실천할 수 있는 핵심 방법 세 가지를 먼저 떠올려봐요. 그 다음 답을 확인해봐요."
          answerLabel="핵심 3가지 확인하기"
          answer="① 강력한 비밀번호 설정 (대소문자+숫자+특수문자, 12자 이상) ② 2단계 인증 활성화 ③ 모르는 링크·첨부파일 클릭하지 않기"
          explanation="이 세 가지만 잘 지켜도 일상적인 개인정보 위협의 상당 부분을 막을 수 있어요. 비밀번호를 여러 사이트에 같은 것을 쓰지 않는 것도 중요해요."
        />
      </section>

      {/* 마무리 */}
      <section>
        <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-2xl p-6">
          <h2 className="text-base font-black text-blue-800 mb-3">
            모듈 2 마무리
          </h2>
          <ul className="space-y-2">
            {[
              "이름, 전화번호, 계좌번호, 생년월일은 개인정보 — 허락 없이 공유하면 침해예요.",
              "스팸·피싱·해킹·랜섬웨어는 대표적인 디지털 위협 유형이에요.",
              "강력한 비밀번호 + 2단계 인증이 기본 방어선이에요.",
              "의심스러운 링크는 클릭하지 말고, 공식 앱이나 홈페이지에서 직접 확인해요.",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-blue-500 shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-blue-100">
            <p className="text-xs text-blue-700 font-medium">
              모듈 3 — 정보 보안으로 계속해봐요.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
