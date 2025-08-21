import SectionTitle from "../components/SectionTitle";
import PageBG from "../components/PageBG";
import { useTranslation } from "react-i18next";

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <section className="privacy full-bleed" aria-labelledby="privacy-title">
      <PageBG src="/bg-privacy.jpg" className="privacy-bg" />

      <SectionTitle id="privacy-title" label={t("privacy.title")} />

      <div className="privacy-wrap">
        <div className="privacy-grid">
          <section className="privacy-body">
            <p>{t("privacy.intro")}</p>

            <h2>{t("privacy.dataTitle")}</h2>
            <p>{t("privacy.dataForms")}</p>
            <p>{t("privacy.dataTech")}</p>

            <h2>{t("privacy.useTitle")}</h2>
            <p>{t("privacy.useRespond")}</p>
            <p>{t("privacy.useImprove")}</p>
            <p>{t("privacy.useLegal")}</p>
            <p>
              <strong>{t("privacy.noSelling")}</strong>
            </p>

            <h2>{t("privacy.cookiesTitle")}</h2>
            <p>{t("privacy.cookiesInfo")}</p>

            <h2>{t("privacy.rightsTitle")}</h2>
            <ul className="privacy-list">
              <li>{t("privacy.rights.access")}</li>
              <li>{t("privacy.rights.object")}</li>
              <li>{t("privacy.rights.withdraw")}</li>
              <li>{t("privacy.rights.complaint")}</li>
            </ul>

            <h2>{t("privacy.controllerTitle")}</h2>
            <p>
              Arsenij Valentukevičius <br />
              Vilnius, Lithuania <br />
              Email: <a href="mailto:business.aval@gmail.com">business.aval@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
