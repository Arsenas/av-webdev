import SectionTitle from "../components/SectionTitle";
import PageBG from "../components/PageBG";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();
  return <section className="profile full-bleed" aria-labelledby="profile-title">
    <PageBG src="/bg-profilo.jpg" className="profile-bg" />
    <SectionTitle id="profile-title" label={t("profile.title")} />
    <div className="profile-wrap content-rule">
      <div className="profile-grid">
        <section className="profile-body">
          <p><strong>{t("profile.skillsLabel")}</strong> {t("profile.lead")}</p>
          <ul className="profile-list">
            {["visual", "print", "web", "maintenance"].map(key => <li key={key}>{t(`profile.items.${key}`)}</li>)}
          </ul>
        </section>
        <section className="profile-work">
          <p><strong>{t("profile.workLabel")}</strong> {t("profile.desc")}</p>
          <a className="profile-cta" href="mailto:business.aval@gmail.com">business.aval@gmail.com</a>
          <a className="profile-cta" href="/docs/cv.pdf" target="_blank" rel="noopener noreferrer">{t("profile.download")} ↗</a>
        </section>
      </div>
    </div>
  </section>;
}
