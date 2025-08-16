import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const KEY = "cookie-consent:v1";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (!v) setVisible(true);
    } catch {
      // jei localStorage užblokuotas – nerodyti be galo
      setVisible(false);
    }
  }, []);

  const save = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie">
      <div className="cookie-inner container">
        <p className="cookie-text">
          Naudojame tik būtinus (esminius) slapukus svetainės veikimui. Daugiau – <Link to="/privacy">Privacy</Link>.
        </p>
        <div className="cookie-actions">
          <button className="cookie-btn alt" onClick={() => save("rejected")} aria-label="Reject non-essential cookies">
            Reject
          </button>
          <button className="cookie-btn" onClick={() => save("accepted")} aria-label="Accept cookies">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
