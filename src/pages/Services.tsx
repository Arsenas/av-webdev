import SectionTitle from "../components/SectionTitle";
import PageBG from "../components/PageBG";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();

  return (
    <section className="services full-bleed pad-top-header" aria-labelledby="services-title">
      <PageBG src="/bg-listino.jpg" className="services-bg" aria-hidden />
      <SectionTitle id="services-title" label={t("services.title")} />

      <div className="services-wrap">
        <div className="svc-cards" role="list">
          {[1, 2, 3, 4].map((n) => (
            <article key={n} className="svc" role="listitem">
              <h2 className="svc-title">{t(`services.cards.${n}.title`)}</h2>
              <p className="svc-lead">{t(`services.cards.${n}.lead`)}</p>
              <ul className="svc-list">
                {(t(`services.cards.${n}.items`, { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <footer className="svc-foot">{t("services.maintenance")}</footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
