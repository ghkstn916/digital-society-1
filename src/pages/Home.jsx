import { Link } from "react-router-dom";
import { modules, allLessons } from "../data/lessonRegistry";

const moduleColorMap = {
  green: {
    card: "border-green-200 hover:border-green-400 hover:shadow-green-100",
    badge: "bg-green-100 text-green-700",
    icon: "bg-green-100",
    btn: "bg-green-500 hover:bg-green-600 text-white",
    tag: "text-green-600",
    dot: "bg-green-400",
    number: "text-green-600",
  },
  blue: {
    card: "border-blue-200 hover:border-blue-400 hover:shadow-blue-100",
    badge: "bg-blue-100 text-blue-700",
    icon: "bg-blue-100",
    btn: "bg-blue-500 hover:bg-blue-600 text-white",
    tag: "text-blue-600",
    dot: "bg-blue-400",
    number: "text-blue-600",
  },
  purple: {
    card: "border-purple-200 hover:border-purple-400 hover:shadow-purple-100",
    badge: "bg-purple-100 text-purple-700",
    icon: "bg-purple-100",
    btn: "bg-purple-500 hover:bg-purple-600 text-white",
    tag: "text-purple-600",
    dot: "bg-purple-400",
    number: "text-purple-600",
  },
};

export default function Home() {
  const totalLessons = allLessons.length;
  const totalModules = modules.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      {/* 히어로 섹션 */}
      <section className="px-6 pt-16 pb-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-5">
          <span>📚</span>
          <span>고교 정보 V단원 — 디지털 문화</span>
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
          디지털 세상,<br />
          <span className="text-green-500">똑똑하게 살아가기</span>
        </h1>
        <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-xl mx-auto">
          디지털 기술이 우리 삶을 어떻게 바꾸는지,
          내 정보는 어떻게 지켜야 하는지,
          그리고 디지털 사회에서 어떻게 행동해야 하는지 함께 배워봐요.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to={`/lesson/${allLessons[0].id}`}
            className="px-7 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl text-sm transition-all shadow-sm hover:shadow-md"
          >
            첫 번째 레슨 시작하기 →
          </Link>
          <a
            href="#modules"
            className="px-7 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-2xl text-sm border border-gray-200 hover:border-gray-300 transition-all"
          >
            전체 목차 보기
          </a>
        </div>
      </section>

      {/* 통계 배너 */}
      <section className="max-w-3xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: totalModules, unit: "개", label: "모듈" },
            { value: totalLessons, unit: "개", label: "레슨" },
            { value: "1", unit: "차시", label: "단원" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-5 text-center"
            >
              <p className="text-3xl font-black text-green-500">
                {stat.value}
                <span className="text-base font-semibold ml-0.5">{stat.unit}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 학습 로드맵 미리보기 */}
      <section className="max-w-3xl mx-auto px-6 mb-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-sm font-bold text-gray-500 uppercase mb-4">학습 로드맵</p>
          <div className="flex items-start gap-0 flex-wrap">
            {modules.map((mod, idx) => {
              const col = moduleColorMap[mod.color] || moduleColorMap.green;
              return (
                <div key={mod.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl ${col.icon}`}
                    >
                      {mod.icon}
                    </div>
                    <p className={`text-xs font-semibold mt-1 ${col.tag}`}>
                      Module {mod.id}
                    </p>
                    <p className="text-xs text-gray-500 text-center max-w-16 leading-tight">
                      {mod.title.length > 8 ? mod.title.slice(0, 8) + "…" : mod.title}
                    </p>
                  </div>
                  {idx < modules.length - 1 && (
                    <div className="w-8 border-t-2 border-dashed border-gray-200 mb-5 mx-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 모듈 카드 */}
      <section id="modules" className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-black text-gray-800 mb-6">전체 모듈</h2>
        <div className="space-y-6">
          {modules.map((mod) => {
            const col = moduleColorMap[mod.color] || moduleColorMap.green;
            return (
              <div
                key={mod.id}
                className={`bg-white rounded-2xl border-2 shadow-sm hover:shadow-md transition-all p-6 ${col.card}`}
              >
                {/* 모듈 헤더 */}
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${col.icon}`}
                  >
                    {mod.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${col.badge}`}
                      >
                        Module {mod.id}
                      </span>
                      <span className="text-xs text-gray-400">
                        {mod.lessons.length}개 레슨
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-gray-800 mt-1">
                      {mod.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                </div>

                {/* 레슨 목록 */}
                <div className="space-y-2 mb-5">
                  {mod.lessons.map((lesson, li) => (
                    <Link
                      key={lesson.id}
                      to={`/lesson/${lesson.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all group"
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${col.badge}`}
                      >
                        {li + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 truncate">
                          {lesson.title}
                        </p>
                        {lesson.description && (
                          <p className="text-xs text-gray-400 leading-tight mt-0.5 truncate">
                            {lesson.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-gray-400">{lesson.duration}분</span>
                        <span className={`text-sm ${col.tag} group-hover:translate-x-0.5 transition-transform`}>
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* 첫 레슨 시작 버튼 */}
                <Link
                  to={`/lesson/${mod.lessons[0].id}`}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${col.btn}`}
                >
                  <span>이 모듈 시작하기</span>
                  <span>→</span>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
