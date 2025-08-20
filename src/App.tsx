import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./i18n";
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

export default function App() {
  return (
    <BrowserRouter>
      <div className="vrule" aria-hidden="true" />
      <Header />
      <main className="container section no-section-top no-section-bottom">
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
