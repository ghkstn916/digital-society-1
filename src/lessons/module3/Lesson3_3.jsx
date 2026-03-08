import { useState } from "react";
import QuizCard from "../../components/interactive/QuizCard";
import ClassifyActivity from "../../components/interactive/ClassifyActivity";
import MatchingActivity from "../../components/interactive/MatchingActivity";
import RevealCard from "../../components/interactive/RevealCard";

// 정보 보안 3대 요소 매칭
const securityTriadPairs = [
  {
    leftId: "confidentiality",
    leftLabel: "기밀성 (Confidentiality)",
    rightId: "r-confidentiality",
    rightLabel: "허가된 사람만 정보에 접근할 수 있도록 보호하는 것",
  },
  {
    leftId: "integrity",
    leftLabel: "무결성 (Integrity)",
    rightId: "r-integrity",
    rightLabel: "정보가 허가 없이 변경되지 않고 정확하게 유지되는 것",
  },
  {
    leftId: "availability",
    leftLabel: "가용성 (Availability)",
    rightId: "r-availability",
    rightLabel: "허가된 사용자가 필요할 때 언제든 정보에 접근할 수 있는 것",
  },
];

// 보안 위협 유형 분류
const threatClassifyItems = [
  {
    id: "t1",
    label: "해커가 병원 서버에 침입해 환자 정보를 허락 없이 열람했어요",
    correct: "A",
    explanation: "허락 없이 타인의 시스템에 접근하는 것은 해킹이에요. 대표적인 능동적 보안 위협이에요.",
  },
  {
    id: "t2",
    label: "전산 시스템 오류로 인해 서비스가 일시 중단됐어요",
    correct: "B",
    explanation: "시스템 오류나 자연재해 등으로 서비스가 중단되는 것은 의도하지 않은 수동적 위협이에요.",
  },
  {
    id: "t3",
    label: "랜섬웨어가 회사 컴퓨터 파일을 암호화하고 돈을 요구했어요",
    correct: "A",
    explanation: "랜섬웨어는 악의적 의도를 가진 공격자가 의도적으로 만든 능동적 위협이에요.",
  },
  {
    id: "t4",
    label: "직원이 실수로 중요 문서를 잘못된 메일 주소에 보냈어요",
    correct: "B",
    explanation: "실수·부주의에 의한 정보 유출은 악의적 의도가 없는 수동적(비의도적) 위협이에요.",
  },
];

// 디지털 윤리 OX
const ethicsOXItems = [
  {
    id: "eo1",
    statement: "저작권이 표시된 음악 파일을 구입하지 않고 무단으로 다운로드해 듣는 건 저작권 침해예요.",
    answer: "O",
    explanation: "저작권이 있는 창작물을 허락 없이 복제·배포·사용하는 것은 저작권법 위반이에요.",
  },
  {
    id: "eo2",
    statement: "인터넷에서 익명으로 댓글을 달면, 실제 법적 책임을 지지 않아요.",
    answer: "X",
    explanation: "익명이라도 IP 주소 추적 등을 통해 신원을 확인할 수 있어요. 악성 댓글이나 명예훼손은 법적 처벌 대상이에요.",
  },
  {
    id: "eo3",
    statement: "공유 저작권(Copyleft)이 적용된 콘텐츠는 출처를 밝히고 자유롭게 사용할 수 있어요.",
    answer: "O",
    explanation: "공유 저작권(Copyleft)은 저작자가 모든 사람에게 자유로운 사용·수정·배포를 허용한 것이에요. 단, 라이선스 조건을 확인하는 것이 좋아요.",
  },
];

function OXActivity({ items, accentColor = "purple" }) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  const allAnswered = items.every((item) => answers[item.id] !== undefined);
  const score = checked
    ? items.filter((item) => answers[item.id] === item.answer).length
    : 0;

  const btnActiveColor = accentColor === "purple"
    ? "bg-purple-500 border-purple-500"
    : "bg-blue-500 border-blue-500";

  function select(id, val) {
    if (checked) return;
    setAnswers((prev) => ({ ...prev, [id]: val }));
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isCorrect = checked && answers[item.id] === item.answer;
        const isWrong = checked && answers[item.id] !== undefined && answers[item.id] !== item.answer;
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
                        ? `${btnActiveColor} text-white`
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
                  isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
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
                ? "bg-purple-500 hover:bg-purple-600 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {allAnswered ? "결과 확인하기" : `${Object.keys(answers).length}/${items.length} 선택됨`}
          </button>
        ) : (
          <>
            <div className="px-4 py-2 bg-white border border-purple-200 rounded-xl text-sm">
              <span className="font-bold text-purple-600">{score}</span>
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

export default function Lesson3_3() {
  return (
    <div className="space-y-10">
      {/* 도입 */}
      <section>
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
          <p className="text-purple-800 font-bold text-lg mb-2">
            모듈 3을 마무리할 시간이에요!
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            정보 보안의 3대 요소, 보안 위협 유형, 디지털 윤리까지 배운 내용을 문제로 점검해봐요.
            틀린 문제는 해설을 읽으면서 다시 확인하는 게 훨씬 도움돼요.
          </p>
          <div className="mt-4 flex gap-3 flex-wrap">
            <span className="px-3 py-1 bg-white border border-purple-200 rounded-full text-xs text-purple-700 font-semibold">
              문제 6개
            </span>
            <span className="px-3 py-1 bg-white border border-purple-200 rounded-full text-xs text-purple-700 font-semibold">
              약 15분
            </span>
          </div>
        </div>
      </section>

      {/* 문제 1 — 3대 요소 매칭 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
            문제 1
          </span>
          <h2 className="text-lg font-black text-gray-800">정보 보안 3대 요소 연결하기</h2>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          기밀성, 무결성, 가용성의 개념을 각 설명과 연결해봐요.
        </p>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <MatchingActivity
            pairs={securityTriadPairs}
            leftTitle="보안 요소"
            rightTitle="설명"
            instruction="왼쪽의 보안 요소를 먼저 클릭하고, 맞는 설명을 오른쪽에서 선택해봐요."
          />
        </div>
      </section>

      {/* 문제 2 — QuizCard: 보안 사례 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
            문제 2
          </span>
          <h2 className="text-lg font-black text-gray-800">어떤 보안 요소가 침해됐을까?</h2>
        </div>
        <QuizCard
          question="쇼핑몰 해커가 데이터베이스에 침입해 고객의 주문 내역을 몰래 수정했어요. 이 사건에서 가장 직접적으로 침해된 정보 보안 요소는 무엇일까요?"
          options={[
            {
              label: "기밀성 — 허가받지 않은 사람이 정보를 열람했어요",
              correct: false,
              explanation: "기밀성 침해도 있을 수 있지만, 이 사례의 핵심은 데이터가 허락 없이 '변경'되었다는 점이에요.",
            },
            {
              label: "무결성 — 정보가 허락 없이 변경되었어요",
              correct: true,
              explanation: "무결성은 정보가 허가 없이 변경되지 않고 정확하게 유지되어야 한다는 요소예요. 주문 내역이 무단으로 수정된 것은 무결성 침해예요.",
            },
            {
              label: "가용성 — 사용자가 서비스에 접근할 수 없게 됐어요",
              correct: false,
              explanation: "가용성은 서비스 접근 가능 여부와 관련돼요. 이 사례에서는 서비스 중단이 아니라 데이터 변조가 문제예요.",
            },
            {
              label: "저작권 — 창작물을 무단으로 사용했어요",
              correct: false,
              explanation: "저작권은 창작물에 대한 권리로, 이 사례와는 관련이 없어요.",
            },
          ]}
          hint="정보가 '변경'되거나 '위조'되는 것은 어떤 보안 요소와 관련될까요?"
        />
      </section>

      {/* 문제 3 — 보안 위협 분류 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
            문제 3
          </span>
          <h2 className="text-lg font-black text-gray-800">보안 위협 분류하기</h2>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <ClassifyActivity
            items={threatClassifyItems}
            categoryA={{ label: "능동적 위협 (악의적 의도)", color: "red" }}
            categoryB={{ label: "수동적 위협 (실수·오류)", color: "blue" }}
            instruction="각 사례가 의도적인 능동적 위협인지, 실수나 오류 같은 수동적 위협인지 분류해봐요."
          />
        </div>
      </section>

      {/* 문제 4 — QuizCard: 악성코드 대처 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
            문제 4
          </span>
          <h2 className="text-lg font-black text-gray-800">악성코드 감염, 어떻게 막을까?</h2>
        </div>
        <QuizCard
          question="지아는 SNS에서 '무료 상품권 당첨됐어요!'라는 링크를 클릭했더니 파일 다운로드 화면이 나왔어요. 이 상황에서 가장 적절한 행동은?"
          options={[
            {
              label: "빠른 당첨이니까 일단 파일을 실행해서 확인한다",
              correct: false,
              explanation: "출처를 알 수 없는 파일을 실행하면 악성코드(랜섬웨어, 바이러스 등)에 감염될 수 있어요. 절대 실행하면 안 돼요.",
            },
            {
              label: "파일을 다운로드만 해두고 나중에 열어본다",
              correct: false,
              explanation: "다운로드된 파일도 이미 위험할 수 있어요. 다운로드 자체를 하지 않는 것이 안전해요.",
            },
            {
              label: "파일을 실행하지 않고 창을 닫은 뒤, 공식 경로로 당첨 여부를 확인한다",
              correct: true,
              explanation: "의심스러운 링크에서 다운로드된 파일은 절대 실행하면 안 돼요. 공식 앱이나 홈페이지에서 직접 확인하는 것이 안전해요.",
            },
            {
              label: "친구에게 링크를 공유해서 같이 확인한다",
              correct: false,
              explanation: "악성 링크를 다른 사람에게 전달하면 피해가 확산될 수 있어요. 의심스러운 링크는 절대 공유하면 안 돼요.",
            },
          ]}
        />
      </section>

      {/* 문제 5 — OX: 디지털 윤리 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
            문제 5
          </span>
          <h2 className="text-lg font-black text-gray-800">디지털 윤리 O / X</h2>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          각 설명이 맞으면 O, 틀리면 X를 눌러봐요.
        </p>
        <OXActivity items={ethicsOXItems} accentColor="purple" />
      </section>

      {/* 문제 6 — RevealCard: 안전한 디지털 생활 정리 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
            문제 6
          </span>
          <h2 className="text-lg font-black text-gray-800">안전한 디지털 생활 실천 습관은?</h2>
        </div>
        <RevealCard
          prompt="온라인에서 악성코드 감염을 예방하고 안전하게 사용하기 위해 지금 당장 실천할 수 있는 습관 세 가지를 먼저 떠올려봐요."
          answerLabel="핵심 습관 확인하기"
          answer="① 출처 불명 파일·링크 절대 클릭하지 않기 ② 소프트웨어·운영체제 항상 최신 버전으로 업데이트 ③ 백신 프로그램 설치 + 자동 업데이트 켜두기"
          explanation="이 세 가지 습관은 악성코드 감염의 대부분을 예방해요. 여기에 중요한 파일 정기 백업까지 더하면 랜섬웨어 피해를 최소화할 수 있어요."
        />
      </section>

      {/* 마무리 */}
      <section>
        <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-2xl p-6">
          <h2 className="text-base font-black text-purple-800 mb-3">
            모듈 3 마무리
          </h2>
          <ul className="space-y-2">
            {[
              "정보 보안 3대 요소: 기밀성(접근 제한), 무결성(변경 방지), 가용성(언제든 접근 가능)",
              "보안 위협은 해킹·랜섬웨어 같은 능동적 위협과 실수·오류 같은 수동적 위협으로 나눠요.",
              "익명이라도 온라인 행동에는 법적 책임이 따를 수 있어요.",
              "의심스러운 파일·링크는 클릭하지 말고, 소프트웨어는 항상 최신 상태로 유지해요.",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-purple-500 shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-purple-100">
            <p className="text-xs text-purple-700 font-medium">
              모든 모듈을 완료했어요! 수고했어요.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
