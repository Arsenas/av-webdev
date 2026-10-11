import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
// Puslapiai (bendri visoms kalboms)
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contacts from "./pages/Contacts";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

// Bendri komponentai
import Header from "./components/header";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";

function RouteEffects() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    const page = pathname.slice(1);
    document.title = pathname === "/" ? "Arsenij.dev | Shopify technical support & theme fixes" : `${t(`nav.${page}`, { defaultValue: page === "privacy" ? t("privacy.title") : "404" })} | Arsenij.dev`;
  }, [pathname, t, i18n.resolvedLanguage]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
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
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Nežinomas kelias */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </BrowserRouter>
  );
}
