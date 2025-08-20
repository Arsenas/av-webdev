import SectionTitle from "../components/SectionTitle";
import PageBG from "../components/PageBG";
import { useTranslation } from "react-i18next";

export default function Profilo() {
  const { t } = useTranslation();

  return (
    <section className="profile full-bleed" aria-labelledby="profile-title">
      <PageBG src="/bg-profilo.jpg" className="profile-bg" />
      <SectionTitle id="profile-title" label={t("profile.title")} />

      <div className="profile-wrap">
        <div className="profile-grid">
          <section className="profile-body">
            <p className="profile-lead">{t("profile.lead")}</p>
            <p>{t("profile.desc")}</p>

            <ul className="profile-list">
              <li>{t("profile.items.visual")}</li>
              <li>{t("profile.items.print")}</li>
              <li>{t("profile.items.web")}</li>
              <li>{t("profile.items.maintenance")}</li>
            </ul>
          </section>

          <aside className="profile-card" aria-label={t("profile.quickContacts")}>
            <header>{t("profile.quickContacts")}</header>

            <div className="pc-row">
              <span className="pc-ic">@</span>
              <a href="mailto:business.aval@gmail.com">business.aval@gmail.com</a>
            </div>

            <div className="pc-row">
              <span className="pc-ic">✆</span>
              <a href="tel:+37065236737">+370 652 36737</a>
            </div>

            <a className="profile-cta" href="/docs/cv.pdf" target="_blank" rel="noopener noreferrer">
              {t("profile.download")}
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
