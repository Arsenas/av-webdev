import { BrowserRouter, MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import "./i18n";
import { useEffect } from "react";
// Puslapiai (bendri visoms kalboms)
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Project from "./pages/Project";
import { applySeo } from "./seo";
import { trackPageView } from "./analytics";
import Contacts from "./pages/Contacts";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

// Bendri komponentai
import Header from "./components/header";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    applySeo(pathname);
    trackPageView(pathname);
  }, [pathname]);
  return null;
}

export default function App({ serverPath }: { serverPath?: string }) {
  const Router = serverPath === undefined ? BrowserRouter : MemoryRouter;
  return (
    <Router initialEntries={serverPath ? [serverPath] : undefined}>
      <RouteEffects />
      <div className="vrule" aria-hidden="true" />
      <Header />
      <main id="main-content" tabIndex={-1} className="container section no-section-top no-section-bottom">
        <Routes>
          {/* Pradinis puslapis */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:projectId" element={<Project />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Nežinomas kelias */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </Router>
  );
}
