import { Link } from "react-router-dom";
import { getAdjacentLessons } from "../../data/lessonRegistry";

const colorMap = {
  green: "bg-green-50 border-green-200 hover:border-green-400 hover:bg-green-100 text-green-800",
  blue: "bg-blue-50 border-blue-200 hover:border-blue-400 hover:bg-blue-100 text-blue-800",
  purple: "bg-purple-50 border-purple-200 hover:border-purple-400 hover:bg-purple-100 text-purple-800",
};

export default function LessonNav({ lessonId, onComplete, isCompleted }) {
  const { prev, next } = getAdjacentLessons(lessonId);

  return (
    <div className="mt-12 border-t border-gray-100 pt-8">
      {/* 완료 버튼 */}
      <div className="flex justify-center mb-8">
        {isCompleted ? (
          <div className="flex items-center gap-2 px-6 py-3 bg-green-100 border border-green-300 rounded-2xl text-green-700 font-semibold text-sm">
            <span>✅</span>
            <span>이 레슨을 완료했어요!</span>
          </div>
        ) : (
          <button
            onClick={onComplete}
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl text-sm transition-colors shadow-sm hover:shadow-md"
          >
            이 레슨 완료하기 ✓
          </button>
        )}
      </div>

      {/* 이전 / 다음 */}
      <div className="grid grid-cols-2 gap-4">
        {/* 이전 레슨 */}
        <div>
          {prev ? (
            <Link
              to={`/lesson/${prev.id}`}
              className={`flex flex-col gap-1 p-4 rounded-2xl border-2 transition-all ${
                colorMap[prev.moduleColor] || colorMap.green
              }`}
            >
              <span className="text-xs text-gray-500">← 이전 레슨</span>
              <span className="text-xs font-medium opacity-70">
                Module {prev.moduleId}
              </span>
              <span className="text-sm font-semibold leading-snug">{prev.title}</span>
            </Link>
          ) : (
            <div className="p-4 rounded-2xl border-2 border-dashed border-gray-200 text-gray-300 text-sm text-center">
              첫 번째 레슨이에요
            </div>
          )}
        </div>

        {/* 다음 레슨 */}
        <div>
          {next ? (
            <Link
              to={`/lesson/${next.id}`}
              className={`flex flex-col gap-1 p-4 rounded-2xl border-2 transition-all text-right ${
                colorMap[next.moduleColor] || colorMap.green
              }`}
            >
              <span className="text-xs text-gray-500">다음 레슨 →</span>
              <span className="text-xs font-medium opacity-70">
                Module {next.moduleId}
              </span>
              <span className="text-sm font-semibold leading-snug">{next.title}</span>
            </Link>
          ) : (
            <div className="p-4 rounded-2xl border-2 border-dashed border-gray-200 text-gray-300 text-sm text-center">
              마지막 레슨이에요
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
