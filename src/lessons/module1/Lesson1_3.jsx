import { useState } from "react";
import QuizCard from "../../components/interactive/QuizCard";
import ClassifyActivity from "../../components/interactive/ClassifyActivity";
import MatchingActivity from "../../components/interactive/MatchingActivity";
import RevealCard from "../../components/interactive/RevealCard";

// 기술-특징 매칭 데이터
const techMatchingPairs = [
  {
    leftId: "ai",
    leftLabel: "인공지능 (AI)",
    rightId: "r-ai",
    rightLabel: "사람처럼 학습하고 판단하는 기술 — 번역, 이미지 인식, 챗봇",
  },
  {
    leftId: "iot",
    leftLabel: "사물인터넷 (IoT)",
    rightId: "r-iot",
    rightLabel: "일상 사물에 센서를 달아 인터넷으로 연결하는 기술",
  },
  {
    leftId: "bigdata",
    leftLabel: "빅데이터",
    rightId: "r-bigdata",
    rightLabel: "방대한 양의 데이터를 수집·분석해 패턴을 찾는 기술",
  },
  {
    leftId: "cloud",
    leftLabel: "클라우드",
    rightId: "r-cloud",
    rightLabel: "인터넷을 통해 저장·처리·공유하는 원격 컴퓨팅 환경",
  },
];

// 직업 변화 분류 데이터
const jobClassifyItems = [
  {
    id: "cashier",
    label: "계산원 — 무인 키오스크·앱 결제 확산으로 수요 감소",
    correct: "A",
    explanation: "단순 반복 업무는 자동화에 취약해요. 계산원은 대표적으로 줄어드는 직업이에요.",
  },
  {
    id: "creator",
    label: "동영상 크리에이터 — 유튜브·틱톡 플랫폼 성장으로 새롭게 등장",
    correct: "B",
    explanation: "스트리밍 플랫폼의 성장과 함께 새로 생긴 직업이에요.",
  },
  {
    id: "telemarketer",
    label: "텔레마케터 — AI 챗봇과 자동 응답 시스템으로 대체 중",
    correct: "A",
    explanation: "AI가 단순 상담 업무를 빠르게 대체하고 있어 수요가 줄고 있어요.",
  },
  {
    id: "analyst",
    label: "빅데이터 분석가 — 기업 의사결정에 데이터 분석 전문가 수요 증가",
    correct: "B",
    explanation: "데이터가 폭발적으로 늘면서 이를 분석하는 전문가 직업이 새롭게 떠올랐어요.",
  },
  {
    id: "guard",
    label: "경비원 — CCTV·스마트 잠금장치·AI 영상 분석으로 자동화",
    correct: "A",
    explanation: "보안 기술이 발전하면서 사람이 하던 경비 업무가 점점 자동화되고 있어요.",
  },
];

// 진로 준비 O/X 데이터
const oxItems = [
  {
    id: "ox1",
    statement: "AI가 대체하기 어려운 능력은 창의성, 공감 능력, 대인 관계 같은 영역이에요.",
    answer: "O",
    explanation: "단순 반복 작업은 자동화되지만, 사람만이 가진 창의성·공감·판단력은 AI가 완전히 대체하기 어려워요.",
  },
  {
    id: "ox2",
    statement: "디지털 기술을 잘 다루는 사람보다 디지털 기술을 전혀 쓰지 않는 사람이 미래에 더 경쟁력이 있어요.",
    answer: "X",
    explanation: "디지털 기술을 도구처럼 잘 활용하는 능력이 미래 직업 세계에서 점점 더 중요해져요.",
  },
  {
    id: "ox3",
    statement: "디지털 격차란 디지털 기술에 접근하거나 활용할 수 있는 능력의 차이를 말해요.",
    answer: "O",
    explanation: "디지털 격차는 기기 보유 여부, 인터넷 환경, 디지털 활용 능력 등의 차이에서 생겨요.",
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
        const isWrong = checked && answers[item.id] !== item.answer;
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
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {allAnswered ? "결과 확인하기" : `${Object.keys(answers).length}/${items.length} 선택됨`}
          </button>
        ) : (
          <>
            <div className="px-4 py-2 bg-white border border-green-200 rounded-xl text-sm">
              <span className="font-bold text-green-600">{score}</span>
              <span className="text-gray-600">/{items.length} 정답</span>
            </div>
            <button
              onClick={() => {
                setAnswers({});
                setChecked(false);
              }}
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

export default function Lesson1_3() {
  return (
    <div className="space-y-10">
      {/* 도입 */}
      <section>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <p className="text-green-800 font-bold text-lg mb-2">
            모듈 1을 마무리할 시간이에요!
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            디지털 기술과 사회 변화, 직업의 변화와 진로 준비까지 배운 내용을 문제로 되짚어봐요.
            틀려도 괜찮아요 — 해설을 읽으면서 다시 정리하는 게 목표예요.
          </p>
          <div className="mt-4 flex gap-3 flex-wrap">
            <span className="px-3 py-1 bg-white border border-green-200 rounded-full text-xs text-green-700 font-semibold">
              문제 6개
            </span>
            <span className="px-3 py-1 bg-white border border-green-200 rounded-full text-xs text-green-700 font-semibold">
              약 15분
            </span>
          </div>
        </div>
      </section>

      {/* 문제 1 — QuizCard: 디지털 기술 종류 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            문제 1
          </span>
          <h2 className="text-lg font-black text-gray-800">디지털 기술 알아보기</h2>
        </div>
        <QuizCard
          question="스마트 냉장고가 식품 유통기한을 자동으로 확인하고 부족한 식재료를 앱으로 알려줘요. 이때 핵심적으로 활용된 기술은 무엇일까요?"
          options={[
            {
              label: "빅데이터 — 대량의 식품 데이터를 분석하는 기술이에요",
              correct: false,
              explanation: "빅데이터는 방대한 데이터를 수집·분석하는 기술이지만, 이 사례의 핵심은 사물이 인터넷으로 연결되는 것이에요.",
            },
            {
              label: "사물인터넷(IoT) — 냉장고가 센서와 인터넷으로 연결되어 정보를 주고받아요",
              correct: true,
              explanation: "IoT는 일상 사물에 센서를 달아 인터넷으로 연결하는 기술이에요. 냉장고가 직접 데이터를 감지하고 앱으로 전달하는 이 사례가 IoT의 대표 예시예요.",
            },
            {
              label: "클라우드 — 인터넷에 데이터를 저장하는 기술이에요",
              correct: false,
              explanation: "클라우드는 원격 서버에 데이터를 저장·처리하는 기술이에요. 이 사례의 핵심은 사물 자체가 센서로 연결되는 IoT예요.",
            },
            {
              label: "인공지능(AI) — 학습을 통해 스스로 판단하는 기술이에요",
              correct: false,
              explanation: "AI는 데이터로 학습해 판단하는 기술이에요. 식재료 감지와 알림은 IoT 센서 기반 연결이 핵심이에요.",
            },
          ]}
          hint="이 기술은 '사물'이 인터넷과 연결되는 것이 핵심이에요."
        />
      </section>

      {/* 문제 2 — 기술-특징 매칭 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            문제 2
          </span>
          <h2 className="text-lg font-black text-gray-800">디지털 기술과 특징 연결하기</h2>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          네 가지 디지털 기술을 각 설명과 올바르게 연결해봐요.
        </p>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <MatchingActivity
            pairs={techMatchingPairs}
            leftTitle="디지털 기술"
            rightTitle="특징 및 설명"
            instruction="왼쪽 기술 이름을 먼저 클릭하고, 맞는 설명을 오른쪽에서 선택해봐요."
          />
        </div>
      </section>

      {/* 문제 3 — QuizCard: 디지털 격차 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            문제 3
          </span>
          <h2 className="text-lg font-black text-gray-800">디지털 격차 이해하기</h2>
        </div>
        <QuizCard
          question="디지털 격차(Digital Divide)가 발생하는 원인으로 가장 거리가 먼 것은 무엇일까요?"
          options={[
            {
              label: "스마트폰이나 컴퓨터 등 기기를 구입할 경제적 여유의 차이",
              correct: false,
              explanation: "경제적 여건은 디지털 격차의 핵심 원인 중 하나예요. 기기가 없으면 디지털 환경 자체에 접근하기 어려워요.",
            },
            {
              label: "인터넷 인프라 환경의 차이 — 농촌과 도시의 통신 인프라 격차",
              correct: false,
              explanation: "인터넷 연결 환경의 차이도 디지털 격차를 만드는 중요한 요인이에요.",
            },
            {
              label: "디지털 기기 사용 방법을 배울 기회와 교육의 차이",
              correct: false,
              explanation: "디지털 리터러시 교육 기회의 차이도 격차의 원인이에요. 기기가 있어도 제대로 활용하지 못하면 격차가 생겨요.",
            },
            {
              label: "개인의 성격 — 내향적이거나 외향적인 성격 차이",
              correct: true,
              explanation: "디지털 격차는 경제적 조건, 인프라 환경, 교육 기회, 나이·장애 등의 요인으로 발생해요. 개인의 성격 유형은 디지털 격차의 직접적인 원인이 아니에요.",
            },
          ]}
        />
      </section>

      {/* 문제 4 — ClassifyActivity: 직업 변화 분류 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            문제 4
          </span>
          <h2 className="text-lg font-black text-gray-800">직업 변화 분류하기</h2>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <ClassifyActivity
            items={jobClassifyItems}
            categoryA={{ label: "줄어드는 직업", color: "red" }}
            categoryB={{ label: "새로 생긴 직업", color: "green" }}
            instruction="각 직업이 디지털 기술로 인해 줄어들고 있는지, 새로 생긴 직업인지 분류해봐요."
          />
        </div>
      </section>

      {/* 문제 5 — OX: 진로 준비 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            문제 5
          </span>
          <h2 className="text-lg font-black text-gray-800">O / X로 확인하기</h2>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          각 설명이 맞으면 O, 틀리면 X를 눌러봐요.
        </p>
        <OXActivity items={oxItems} />
      </section>

      {/* 문제 6 — RevealCard: 서술형 확인 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            문제 6
          </span>
          <h2 className="text-lg font-black text-gray-800">생각 정리하기</h2>
        </div>
        <RevealCard
          prompt="디지털 기술이 발전해도 AI가 완전히 대체하기 어려운 직업이 있어요. 그 이유는 무엇일까요? 잠깐 생각해본 뒤 답을 확인해봐요."
          answerLabel="핵심 답 보기"
          answer="창의성, 공감 능력, 도덕적 판단력, 대인 관계 능력은 AI가 대체하기 어려운 영역이에요."
          explanation="AI는 데이터를 학습해 패턴을 인식하는 데 뛰어나지만, '사람다운 감성'이 필요한 영역은 여전히 인간의 고유한 강점이에요. 예를 들어 심리 상담사, 사회복지사, 예술가, 교사는 공감과 창의성이 핵심이라 AI로 완전히 대체되기 어려워요."
        />
      </section>

      {/* 마무리 */}
      <section>
        <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-2xl p-6">
          <h2 className="text-base font-black text-green-800 mb-3">
            모듈 1 마무리
          </h2>
          <ul className="space-y-2">
            {[
              "AI, IoT, 빅데이터, 클라우드는 현재 사회를 바꾸는 핵심 디지털 기술이에요.",
              "디지털 격차는 경제적 여건, 인프라, 교육 기회의 차이에서 발생해요.",
              "디지털 기술로 줄어드는 직업이 있는 반면, 새로 생기는 직업도 있어요.",
              "AI가 대체하기 어려운 창의성·공감·판단력을 키우는 것이 진로 준비의 핵심이에요.",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-green-100">
            <p className="text-xs text-green-700 font-medium">
              모듈 2 — 정보 보호와 정보 공유로 계속해봐요.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
