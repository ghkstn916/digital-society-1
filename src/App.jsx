import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import LessonPage from "./pages/LessonPage";
import Sidebar from "./components/layout/Sidebar";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex">
      {/* 사이드바 — 데스크톱 */}
      <div className="hidden lg:flex w-72 shrink-0 h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* 모바일 사이드바 오버레이 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div
            className="absolute left-0 top-0 w-72 h-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* 메인 콘텐츠 */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* 모바일 헤더 */}
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="메뉴 열기"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              디
            </div>
            <span className="text-sm font-bold text-gray-800">디지털 문화</span>
          </div>
        </header>

        {/* 라우트 */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lesson/:lessonId" element={<LessonPage />} />
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center min-h-96 gap-4">
                  <p className="text-5xl">404</p>
                  <p className="text-gray-500">페이지를 찾을 수 없어요.</p>
                  <a
                    href="/"
                    className="px-5 py-2 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors"
                  >
                    홈으로
                  </a>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/digital-society-1">
      <AppLayout />
    </BrowserRouter>
  );
}
