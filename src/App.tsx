import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profilo from "./pages/Profilo";
import Listino from "./pages/Listino";
import Portfolio from "./pages/Portfolio";
import Contatti from "./pages/Contatti";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <div className="vrule" aria-hidden="true" />
      <main className="container section">
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
    </BrowserRouter>
  );
}
