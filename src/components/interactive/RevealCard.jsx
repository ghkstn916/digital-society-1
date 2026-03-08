import { useState } from "react";

/**
 * RevealCard — 생각한 뒤 답/해설을 펼쳐보는 카드
 * Props:
 *   prompt: string — 질문 또는 상황 설명
 *   answer: string — 공개할 답 또는 핵심 내용
 *   explanation?: string — 추가 해설
 *   answerLabel?: string — 버튼 라벨 (기본: "답 확인하기")
 */
export default function RevealCard({
  prompt,
  answer,
  explanation,
  answerLabel = "답 확인하기",
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 my-4">
      <p className="text-gray-800 leading-relaxed mb-4">{prompt}</p>
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-colors"
        >
          {answerLabel}
        </button>
      ) : (
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
            <p className="text-blue-800 font-semibold text-sm leading-relaxed">{answer}</p>
          </div>
          {explanation && (
            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <p className="text-gray-700 text-sm leading-relaxed">{explanation}</p>
            </div>
          )}
          <button
            onClick={() => setRevealed(false)}
            className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2"
          >
            접기
          </button>
        </div>
      )}
    </div>
  );
}
