import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();
  return <section className="services full-bleed" aria-labelledby="services-title">
    <SectionTitle id="services-title" label={t("services.title")} />
    <div className="services-wrap">
      <div className="svc-cards" role="list">
        {[1, 2, 3, 4].map(n => <article key={n} className="svc" role="listitem">
          <h2 className="svc-title">{t(`services.cards.${n}.title`)}</h2>
          <div className="svc-quote"><span>{t(`services.cards.${n}.lead`)}</span><span className="quote-dots" aria-hidden="true" /><Link to="/contacts">{t("services.quote")}</Link></div>
          <ul className="svc-list">{(t(`services.cards.${n}.items`, { returnObjects: true }) as string[]).map(item => <li key={item}>{item}</li>)}</ul>
        </article>)}
      </div>
      <p className="service-terms">{t("services.intro")}</p>
    </div>
  </section>;
}
