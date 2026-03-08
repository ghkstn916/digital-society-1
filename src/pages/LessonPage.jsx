import { useState, useEffect, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { getLessonById, getModuleById } from "../data/lessonRegistry";
import LessonNav from "../components/layout/LessonNav";

// lesson id -> 동적 import
const lessonComponents = {
  "1-1": lazy(() => import("../lessons/module1/Lesson1_1")),
  "1-2": lazy(() => import("../lessons/module1/Lesson1_2")),
  "1-3": lazy(() => import("../lessons/module1/Lesson1_3")),
  "2-1": lazy(() => import("../lessons/module2/Lesson2_1")),
  "2-2": lazy(() => import("../lessons/module2/Lesson2_2")),
  "2-3": lazy(() => import("../lessons/module2/Lesson2_3")),
  "3-1": lazy(() => import("../lessons/module3/Lesson3_1")),
  "3-2": lazy(() => import("../lessons/module3/Lesson3_2")),
  "3-3": lazy(() => import("../lessons/module3/Lesson3_3")),
};

const moduleColorMap = {
  green: { badge: "bg-green-100 text-green-700", border: "border-green-200" },
  blue: { badge: "bg-blue-100 text-blue-700", border: "border-blue-200" },
  purple: { badge: "bg-purple-100 text-purple-700", border: "border-purple-200" },
};

function getCompletedLessons() {
  try {
    return JSON.parse(localStorage.getItem("completedLessons") || "[]");
  } catch {
    return [];
  }
}

function setCompletedLessons(list) {
  localStorage.setItem("completedLessons", JSON.stringify(list));
  // 같은 탭에서도 Sidebar가 변경을 감지할 수 있도록 storage 이벤트를 수동 발행
  window.dispatchEvent(new StorageEvent("storage", { key: "completedLessons" }));
}

export default function LessonPage() {
  const { lessonId } = useParams();
  const lesson = getLessonById(lessonId);
  const mod = lesson ? getModuleById(lesson.moduleId) : null;
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const list = getCompletedLessons();
    setCompleted(list.includes(lessonId));
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [lessonId]);

  function handleComplete() {
    const list = getCompletedLessons();
    if (!list.includes(lessonId)) {
      setCompletedLessons([...list, lessonId]);
    }
    setCompleted(true);
  }

  if (!lesson || !mod) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-4">
        <p className="text-4xl">🔍</p>
        <p className="text-gray-500 font-medium">레슨을 찾을 수 없어요.</p>
        <Link
          to="/"
          className="px-5 py-2 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  const LessonComponent = lessonComponents[lessonId];
  const col = moduleColorMap[mod.color] || moduleColorMap.green;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* 브레드크럼 */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap">
        <Link to="/" className="hover:text-green-600 transition-colors">
          홈
        </Link>
        <span>/</span>
        <span className={`px-2 py-0.5 rounded-full font-semibold ${col.badge}`}>
          Module {mod.id}
        </span>
        <span>/</span>
        <span className="text-gray-600 font-medium">{lesson.title}</span>
      </nav>

      {/* 레슨 헤더 */}
      <div className={`rounded-2xl border-2 ${col.border} bg-white p-6 mb-8`}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">
              {mod.title} · Lesson {lessonId.replace("-", ".")}
            </p>
            <h1 className="text-2xl font-black text-gray-900 leading-tight">
              {lesson.title}
            </h1>
            {lesson.description && (
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {lesson.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {completed && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                ✅ 완료
              </span>
            )}
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
              ⏱ {lesson.duration}분
            </span>
          </div>
        </div>
      </div>

      {/* 레슨 컨텐츠 */}
      {LessonComponent ? (
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-24">
              <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <LessonComponent />
        </Suspense>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🚧</p>
          <p>아직 준비 중인 레슨이에요.</p>
        </div>
      )}

      {/* 레슨 네비게이션 */}
      <LessonNav
        lessonId={lessonId}
        onComplete={handleComplete}
        isCompleted={completed}
      />
    </div>
  );
}
