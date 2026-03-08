import { useState } from "react";

/**
 * ClassifyActivity — 카드를 두 분류 중 하나로 드래그 없이 클릭으로 분류하는 활동
 * Props:
 *   items: [{ id, label, correct: "A"|"B", explanation }]
 *   categoryA: { label, color }   — e.g. { label: "보호해야 할 정보", color: "red" }
 *   categoryB: { label, color }   — e.g. { label: "공유해야 할 정보", color: "blue" }
 *   instruction?: string
 */
export default function ClassifyActivity({
  items,
  categoryA,
  categoryB,
  instruction = "각 항목이 어느 쪽인지 선택해보세요.",
}) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  const allAnswered = items.every((item) => answers[item.id] !== undefined);

  const colorMap = {
    red: {
      btn: "bg-red-100 hover:bg-red-200 border-red-300 text-red-800",
      selected: "bg-red-400 border-red-500 text-white font-semibold",
      correct: "border-green-400 bg-green-50",
      wrong: "border-red-400 bg-red-50",
      tag: "bg-red-100 text-red-700",
    },
    blue: {
      btn: "bg-blue-100 hover:bg-blue-200 border-blue-300 text-blue-800",
      selected: "bg-blue-400 border-blue-500 text-white font-semibold",
      correct: "border-green-400 bg-green-50",
      wrong: "border-red-400 bg-red-50",
      tag: "bg-blue-100 text-blue-700",
    },
    green: {
      btn: "bg-green-100 hover:bg-green-200 border-green-300 text-green-800",
      selected: "bg-green-400 border-green-500 text-white font-semibold",
      correct: "border-green-400 bg-green-50",
      wrong: "border-red-400 bg-red-50",
      tag: "bg-green-100 text-green-700",
    },
  };

  const colA = colorMap[categoryA.color] || colorMap.red;
  const colB = colorMap[categoryB.color] || colorMap.blue;

  function select(itemId, cat) {
    if (checked) return;
    setAnswers((prev) => ({ ...prev, [itemId]: cat }));
  }

  function getCardStyle(item) {
    if (!checked) return "border-gray-200 bg-white";
    const isCorrect = answers[item.id] === item.correct;
    return isCorrect ? "border-green-400 bg-green-50" : "border-red-300 bg-red-50";
  }

  const score = checked
    ? items.filter((item) => answers[item.id] === item.correct).length
    : 0;

  return (
    <div className="my-4">
      <p className="text-gray-700 text-sm mb-4 leading-relaxed">{instruction}</p>

      {/* 카테고리 라벨 */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colA.tag}`}>
          {categoryA.label}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colB.tag}`}>
          {categoryB.label}
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl border-2 p-4 transition-all ${getCardStyle(item)}`}
          >
            <p className="text-gray-800 text-sm font-medium mb-3">{item.label}</p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => select(item.id, "A")}
                disabled={checked}
                className={`px-4 py-1.5 rounded-lg border text-xs transition-all ${
                  answers[item.id] === "A"
                    ? colA.selected
                    : colA.btn
                }`}
              >
                {categoryA.label}
              </button>
              <button
                onClick={() => select(item.id, "B")}
                disabled={checked}
                className={`px-4 py-1.5 rounded-lg border text-xs transition-all ${
                  answers[item.id] === "B"
                    ? colB.selected
                    : colB.btn
                }`}
              >
                {categoryB.label}
              </button>
            </div>

            {checked && (
              <div
                className={`mt-2 text-xs rounded-lg px-3 py-2 leading-relaxed ${
                  answers[item.id] === item.correct
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <span className="font-semibold mr-1">
                  {answers[item.id] === item.correct ? "✅ 정답!" : "❌ 오답."}
                </span>
                {item.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-3 items-center">
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
