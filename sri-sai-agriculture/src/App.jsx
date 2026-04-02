import { Routes, Route, useLocation } from "react-router-dom";
import { useScrollReveal } from "./hooks/useScrollReveal";

// Layout
import AnnouncementBar  from "./components/layout/AnnouncementBar";
import TopBar           from "./components/layout/TopBar";
import Header           from "./components/layout/Header";
import Footer           from "./components/layout/Footer";
import FloatingButtons  from "./components/layout/FloatingButtons";

// Pages
import Home             from "./pages/Home";
import FacultyPage      from "./pages/FacultyPage";
import Results          from "./pages/Results";
import Hostel           from "./pages/Hostel";
import AdminDashboard  from "./pages/admin/AdminDashboard";
import AboutPage       from "./pages/AboutPage";
import TestimonialsPage from "./pages/TestimonialsPage";

export default function App() {
  const location = useLocation();
  useScrollReveal([location.pathname]);

  const isAdminPanel = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-cream font-sora text-[#374151]">
      {/* ── Top fixed layers ── */}
      {!isAdminPanel && (
        <>
          <AnnouncementBar />
          <TopBar />
          <Header />
        </>
      )}

      {/* ── Main content with Routing ── */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faculty" element={<FacultyPage />} />
          <Route path="/results" element={<Results />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/hostel" element={<Hostel />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* ── Footer ── */}
      {!isAdminPanel && <Footer />}

      {/* ── Floating call buttons ── */}
      {!isAdminPanel && <FloatingButtons />}
    </div>
  );
}
