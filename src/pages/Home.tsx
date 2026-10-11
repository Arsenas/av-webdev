import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return <>
    <Hero />
    <section className="home-details" aria-labelledby="home-services">
      <p className="hero-eyebrow">{t("home.label")}</p>
      <h2 id="home-services">{t("home.title")}</h2>
      <div className="home-services">
        {[1, 2, 3, 4].map(n => <article key={n}>
          <span className="service-number">0{n}</span>
          <h3>{t(`services.cards.${n}.title`)}</h3>
          <p>{t(`services.cards.${n}.lead`)}</p>
        </article>)}
      </div>
      <Link className="text-link" to="/services">{t("hero.cta.secondary")} →</Link>
    </section>
    <section className="home-bottom" aria-labelledby="home-process">
      <div><p className="hero-eyebrow">{t("home.processLabel")}</p>
        <h2 id="home-process">{t("home.processTitle")}</h2>
        <p>{t("home.processDesc")}</p>
        <Link className="action-link" to="/contacts">{t("hero.cta.primary")} ↗</Link>
      </div>
      <div><p className="hero-eyebrow">{t("home.workLabel")}</p>
        <h2>{t("home.workTitle")}</h2><p>{t("portfolio.intro")}</p>
        <Link className="text-link" to="/portfolio">{t("home.workCta")} →</Link>
      </div>
    </section>
  </>;
}
