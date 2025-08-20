import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profilo from "./pages/Profilo";
import Listino from "./pages/Listino";
import Portfolio from "./pages/Portfolio";
import Contatti from "./pages/Contatti";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
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
          <Route path="/" element={<Home />} />
          <Route path="/profilo" element={<Profilo />} />
          <Route path="/listino" element={<Listino />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
    </BrowserRouter>
  );
}
