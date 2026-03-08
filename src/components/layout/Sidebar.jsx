import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { modules } from "../../data/lessonRegistry";

const moduleColorMap = {
  green: {
    header: "bg-green-50 border-green-200",
    icon: "bg-green-100 text-green-700",
    title: "text-green-800",
    activeLesson: "bg-green-500 text-white font-semibold shadow-sm",
    hoverLesson: "hover:bg-green-50 hover:text-green-700",
    dot: "bg-green-400",
    activeDot: "bg-green-600",
    progress: "text-green-600",
  },
  blue: {
    header: "bg-blue-50 border-blue-200",
    icon: "bg-blue-100 text-blue-700",
    title: "text-blue-800",
    activeLesson: "bg-blue-500 text-white font-semibold shadow-sm",
    hoverLesson: "hover:bg-blue-50 hover:text-blue-700",
    dot: "bg-blue-400",
    activeDot: "bg-blue-600",
    progress: "text-blue-600",
  },
  purple: {
    header: "bg-purple-50 border-purple-200",
    icon: "bg-purple-100 text-purple-700",
    title: "text-purple-800",
    activeLesson: "bg-purple-500 text-white font-semibold shadow-sm",
    hoverLesson: "hover:bg-purple-50 hover:text-purple-700",
    dot: "bg-purple-400",
    activeDot: "bg-purple-600",
    progress: "text-purple-600",
  },
};

function getCompletedSet() {
  try {
    const list = JSON.parse(localStorage.getItem("completedLessons") || "[]");
    return new Set(list);
  } catch {
    return new Set();
  }
}

export default function Sidebar({ onClose }) {
  const { lessonId } = useParams();
  const [completedSet, setCompletedSet] = useState(() => getCompletedSet());

  // lesson 페이지에서 완료 처리 시 storage 이벤트로 동기화
  useEffect(() => {
    function handleStorage() {
      setCompletedSet(getCompletedSet());
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // 같은 탭에서 완료 버튼을 누를 때 반영 (storage 이벤트는 다른 탭에서만 발생)
  // lessonId가 바뀔 때마다 (새 lesson으로 이동) 다시 읽음
  useEffect(() => {
    setCompletedSet(getCompletedSet());
  }, [lessonId]);

  return (
    <aside className="h-full overflow-y-auto bg-white border-r border-gray-200 flex flex-col">
      {/* 로고 영역 */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm font-bold group-hover:bg-green-600 transition-colors">
            디
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800 leading-tight">디지털 문화</p>
            <p className="text-xs text-gray-400">고교 정보 V단원</p>
          </div>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-gray-400 hover:text-gray-600 rounded-lg"
          >
            ✕
          </button>
        )}
      </div>

      {/* 모듈 & 레슨 목록 */}
      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
        {modules.map((mod) => {
          const col = moduleColorMap[mod.color] || moduleColorMap.green;
          const completedCount = mod.lessons.filter((l) => completedSet.has(l.id)).length;
          const totalCount = mod.lessons.length;

          return (
            <div key={mod.id}>
              {/* 모듈 헤더 */}
              <div
                className={`rounded-xl border px-3 py-2.5 mb-1 ${col.header}`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-base shrink-0 ${col.icon}`}
                  >
                    {mod.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-bold leading-tight ${col.title}`}>
                      Module {mod.id}
                    </p>
                    <p className="text-xs text-gray-600 leading-tight truncate">
                      {mod.title}
                    </p>
                  </div>
                  {/* 진도 표시 */}
                  <span className={`text-xs font-semibold shrink-0 ${col.progress}`}>
                    {completedCount}/{totalCount}
                  </span>
                </div>
              </div>

              {/* 레슨 목록 */}
              <ul className="space-y-0.5 pl-1">
                {mod.lessons.map((lesson) => {
                  const isActive = lesson.id === lessonId;
                  const isDone = completedSet.has(lesson.id);
                  return (
                    <li key={lesson.id}>
                      <Link
                        to={`/lesson/${lesson.id}`}
                        onClick={onClose}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all ${
                          isActive
                            ? col.activeLesson
                            : `text-gray-600 ${col.hoverLesson}`
                        }`}
                      >
                        {/* 완료 체크 / 미완료 점 */}
                        {isDone ? (
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold ${
                              isActive ? "bg-white/30" : "bg-green-500"
                            }`}
                          >
                            ✓
                          </span>
                        ) : (
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              isActive ? col.activeDot : col.dot
                            }`}
                          />
                        )}
                        <span className="leading-snug flex-1">{lesson.title}</span>
                        {isDone && !isActive && (
                          <span className="text-xs text-green-500 font-medium shrink-0">완료</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* 홈 링크 */}
      <div className="px-4 py-3 border-t border-gray-100 shrink-0">
        <Link
          to="/"
          onClick={onClose}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors"
        >
          <span>🏠</span>
          <span>홈으로 돌아가기</span>
        </Link>
      </div>
    </aside>
  );
}
