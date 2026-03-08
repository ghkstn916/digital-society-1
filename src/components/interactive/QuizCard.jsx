import { useState } from "react";

/**
 * QuizCard — 선택지를 클릭하면 정답/오답 피드백을 즉시 보여주는 단답형 퀴즈
 * Props:
 *   question: string
 *   options: [{ label: string, correct: bool, explanation: string }]
 *   hint?: string
 */
export default function QuizCard({ question, options, hint }) {
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const answered = selected !== null;

  return (
    <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-6 my-4">
      <p className="font-semibold text-gray-800 mb-4 leading-relaxed">{question}</p>

      {hint && !answered && (
        <div className="mb-3">
          {showHint ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-sm text-amber-800">
              💡 {hint}
            </div>
          ) : (
            <button
              onClick={() => setShowHint(true)}
              className="text-sm text-amber-600 underline underline-offset-2 hover:text-amber-700"
            >
              힌트 보기
            </button>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          let style =
            "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150 ";
          if (!answered) {
            style +=
              "border-gray-200 bg-gray-50 hover:bg-green-50 hover:border-green-300 cursor-pointer";
          } else if (selected === i) {
            style += opt.correct
              ? "border-green-400 bg-green-50 text-green-800 font-semibold"
              : "border-red-300 bg-red-50 text-red-800";
          } else if (opt.correct) {
            style += "border-green-300 bg-green-50 text-green-700";
          } else {
            style += "border-gray-100 bg-gray-50 text-gray-400";
          }

          return (
            <button
              key={i}
              className={style}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
            >
              <span className="mr-2">
                {answered && selected === i
                  ? opt.correct
                    ? "✅"
                    : "❌"
                  : answered && opt.correct
                  ? "✅"
                  : `${["①", "②", "③", "④", "⑤"][i] || i + 1}`}
              </span>
              {opt.label}
            </button>
          );
        })}
      </div>

      {answered && selected !== null && (
        <div
          className={`mt-4 rounded-xl px-4 py-3 text-sm leading-relaxed ${
            options[selected].correct
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <span className="font-semibold mr-1">
            {options[selected].correct ? "정답이에요!" : "다시 생각해봐요."}
          </span>
          {options[selected].explanation}
        </div>
      )}

      {answered && (
        <button
          onClick={() => {
            setSelected(null);
            setShowHint(false);
          }}
          className="mt-3 text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2"
        >
          다시 풀기
        </button>
      )}
    </div>
  );
}
