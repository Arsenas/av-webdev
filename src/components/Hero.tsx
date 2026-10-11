import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
  return <section className="hero full-bleed" aria-labelledby="hero-title">
    <div className="hero-inner container">
      <div className="hero-text">
        <p className="hero-eyebrow">{t("hero.eyebrow")}</p>
        <h1 id="hero-title">{t("hero.title")}</h1>
        <p className="hero-desc">{t("hero.desc")}</p>
        <div className="hero-actions">
          <Link className="action-link" to="/contacts">{t("hero.cta.primary")} ↗</Link>
          <Link className="text-link" to="/services">{t("hero.cta.secondary")} →</Link>
        </div>
        <p className="hero-note">{t("hero.note")}</p>
      </div>
      <div className="hero-media" aria-hidden="true" />
    </div>
  </section>;
}
