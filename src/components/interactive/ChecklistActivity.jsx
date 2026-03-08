import { useState } from "react";

/**
 * ChecklistActivity — 체크리스트 자가진단 + 총평
 * Props:
 *   title: string
 *   items: [{ id, label, tip?: string }]
 *   feedbacks: [{ minScore, maxScore, message, color }]
 */
export default function ChecklistActivity({ title, items, feedbacks }) {
  const [checked, setChecked] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function toggle(id) {
    if (submitted) return;
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const score = items.filter((item) => checked[item.id]).length;

  const feedback = submitted
    ? feedbacks.find((f) => score >= f.minScore && score <= f.maxScore)
    : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 my-4">
      <p className="font-semibold text-gray-800 mb-4">{title}</p>

      <div className="space-y-2">
        {items.map((item) => (
          <label
            key={item.id}
            className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              checked[item.id]
                ? "bg-green-50 border-green-300"
                : "bg-gray-50 border-gray-200 hover:bg-green-50 hover:border-green-200"
            } ${submitted ? "cursor-default" : ""}`}
          >
            <input
              type="checkbox"
              checked={!!checked[item.id]}
              onChange={() => toggle(item.id)}
              className="mt-0.5 w-4 h-4 accent-green-500 shrink-0"
            />
            <div>
              <p className="text-sm text-gray-800">{item.label}</p>
              {item.tip && submitted && (
                <p className="text-xs text-gray-500 mt-0.5">{item.tip}</p>
              )}
            </div>
          </label>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          className="mt-4 px-5 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-xl transition-colors"
        >
          진단 결과 보기
        </button>
      ) : (
        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">내 점수:</span>
            <span className="font-bold text-lg text-green-600">
              {score}
            </span>
            <span className="text-sm text-gray-500">/ {items.length}</span>
          </div>
          {feedback && (
            <div
              className={`rounded-xl px-4 py-3 border text-sm leading-relaxed ${feedback.color}`}
            >
              {feedback.message}
            </div>
          )}
          <button
            onClick={() => {
              setChecked({});
              setSubmitted(false);
            }}
            className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2"
          >
            다시 진단하기
          </button>
        </div>
      )}
    </div>
  );
}
