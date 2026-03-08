import { useState } from "react";

/**
 * MatchingActivity — 왼쪽 항목을 클릭하고 오른쪽 항목을 클릭해서 연결하는 매칭 활동
 * Props:
 *   pairs: [{ leftId, leftLabel, rightId, rightLabel }]
 *   leftTitle?: string
 *   rightTitle?: string
 *   instruction?: string
 */
export default function MatchingActivity({
  pairs,
  leftTitle = "기술",
  rightTitle = "직업/설명",
  instruction = "왼쪽 항목을 먼저 클릭한 뒤 연결할 오른쪽 항목을 클릭하세요.",
}) {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [connections, setConnections] = useState({}); // leftId -> rightId
  const [checked, setChecked] = useState(false);

  const rightItems = pairs.map((p) => ({ id: p.rightId, label: p.rightLabel }));

  function handleLeft(id) {
    if (checked) return;
    setSelectedLeft(id === selectedLeft ? null : id);
  }

  function handleRight(rightId) {
    if (checked || !selectedLeft) return;
    setConnections((prev) => {
      const updated = { ...prev };
      // 이미 연결된 right 항목이 있으면 해제
      Object.keys(updated).forEach((lId) => {
        if (updated[lId] === rightId) delete updated[lId];
      });
      updated[selectedLeft] = rightId;
      return updated;
    });
    setSelectedLeft(null);
  }

  const allConnected = pairs.every((p) => connections[p.leftId] !== undefined);

  const score = checked
    ? pairs.filter((p) => connections[p.leftId] === p.rightId).length
    : 0;

  function isCorrect(p) {
    return checked && connections[p.leftId] === p.rightId;
  }

  function isWrong(p) {
    return checked && connections[p.leftId] !== undefined && connections[p.leftId] !== p.rightId;
  }

  return (
    <div className="my-4">
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{instruction}</p>

      <div className="grid grid-cols-2 gap-4">
        {/* 왼쪽 */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{leftTitle}</p>
          <div className="space-y-2">
            {pairs.map((p) => {
              const connected = connections[p.leftId];
              const correct = isCorrect(p);
              const wrong = isWrong(p);
              let style =
                "w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ";
              if (checked) {
                style += correct
                  ? "border-green-400 bg-green-50 text-green-800"
                  : wrong
                  ? "border-red-300 bg-red-50 text-red-800"
                  : "border-gray-200 bg-gray-50 text-gray-500";
              } else if (selectedLeft === p.leftId) {
                style += "border-green-500 bg-green-100 font-semibold";
              } else if (connected) {
                style += "border-blue-300 bg-blue-50 text-blue-700";
              } else {
                style +=
                  "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50 cursor-pointer";
              }
              return (
                <button
                  key={p.leftId}
                  className={style}
                  onClick={() => handleLeft(p.leftId)}
                  disabled={checked}
                >
                  {p.leftLabel}
                  {connected && !checked && (
                    <span className="text-xs text-blue-500 block mt-0.5">
                      → {rightItems.find((r) => r.id === connected)?.label}
                    </span>
                  )}
                  {checked && (
                    <span className="text-xs block mt-0.5">
                      {correct ? "✅ 정답" : wrong ? "❌ 오답" : ""}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 오른쪽 */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{rightTitle}</p>
          <div className="space-y-2">
            {rightItems.map((r) => {
              const usedByLeft = Object.keys(connections).find(
                (lId) => connections[lId] === r.id
              );
              let style =
                "w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ";
              if (checked) {
                const correctPair = pairs.find((p) => p.rightId === r.id);
                const isMatched = correctPair && connections[correctPair.leftId] === r.id;
                style += isMatched
                  ? "border-green-400 bg-green-50 text-green-800"
                  : "border-gray-200 bg-gray-50 text-gray-500";
              } else if (usedByLeft) {
                style += "border-blue-300 bg-blue-50 text-blue-700";
              } else if (selectedLeft) {
                style +=
                  "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 cursor-pointer";
              } else {
                style += "border-gray-200 bg-gray-50 text-gray-500";
              }
              return (
                <button
                  key={r.id}
                  className={style}
                  onClick={() => handleRight(r.id)}
                  disabled={checked || !selectedLeft}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3 items-center">
        {!checked ? (
          <button
            onClick={() => setChecked(true)}
            disabled={!allConnected}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
              allConnected
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {allConnected
              ? "결과 확인"
              : `${Object.keys(connections).length}/${pairs.length} 연결됨`}
          </button>
        ) : (
          <>
            <div className="px-4 py-2 bg-white border border-green-200 rounded-xl text-sm">
              <span className="font-bold text-green-600">{score}</span>
              <span className="text-gray-600">/{pairs.length} 정답</span>
            </div>
            <button
              onClick={() => {
                setConnections({});
                setSelectedLeft(null);
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
