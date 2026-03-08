import { useState } from "react";

/**
 * FlipCard — 앞면을 클릭하면 뒷면(장점/단점 또는 요약)을 보여주는 카드
 * Props:
 *   front: { title: string, description?: string, color?: string }
 *   back: { title: string, items: string[], color?: string }
 */
export default function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  const frontBg = front.color || "bg-indigo-100 border-indigo-200";
  const backBg = back.color || "bg-white border-indigo-300";

  return (
    <div
      className="cursor-pointer select-none"
      onClick={() => setFlipped((f) => !f)}
    >
      {!flipped ? (
        <div
          className={`rounded-2xl border-2 p-6 transition-all hover:shadow-md ${frontBg}`}
        >
          <p className="font-bold text-lg mb-1">{front.title}</p>
          {front.description && (
            <p className="text-sm opacity-75 mt-1">{front.description}</p>
          )}
          <p className="text-xs mt-3 opacity-60">클릭하면 내용이 펼쳐져요 →</p>
        </div>
      ) : (
        <div
          className={`rounded-2xl border-2 p-6 transition-all ${backBg}`}
        >
          <p className="font-bold text-base mb-3">{back.title}</p>
          <ul className="space-y-1">
            {back.items.map((item, i) => (
              <li key={i} className="text-sm text-gray-700 flex gap-2">
                <span className="mt-0.5 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs mt-3 text-gray-400">다시 클릭하면 닫혀요</p>
        </div>
      )}
    </div>
  );
}
