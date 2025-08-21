import SectionTitle from "../components/SectionTitle";
import PageBG from "../components/PageBG";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="notfound full-bleed" aria-labelledby="notfound-title">
      <PageBG src="/bg-404.jpg" className="notfound-bg" />

      <SectionTitle id="notfound-title" label="404" />

      <div className="notfound-wrap">
        <p className="notfound-lead">{t("notfound.lead")}</p>
        <p className="notfound-desc">{t("notfound.desc")}</p>
      </div>
    </section>
  );
}
