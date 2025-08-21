import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const KEY = "cookie-consent:v1";

export default function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (!v) setVisible(true);
    } catch {
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
          {t("cookie.text")} <Link to="/privacy">{t("cookie.link")}</Link>.
        </p>
        <div className="cookie-actions">
          <button className="cookie-btn alt" onClick={() => save("rejected")} aria-label={t("cookie.rejectLabel")}>
            {t("cookie.reject")}
          </button>
          <button className="cookie-btn" onClick={() => save("accepted")} aria-label={t("cookie.acceptLabel")}>
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
