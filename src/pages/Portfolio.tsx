import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import SectionTitle from "../components/SectionTitle";
import PortfolioGrid, { type PortfolioItem } from "../components/PortfolioGrid";
import PageBG from "../components/PageBG";
import data from "../data/portfolio.json";

export default function Portfolio() {
  const { t } = useTranslation();

  const items = useMemo<PortfolioItem[]>(() => {
    if (!Array.isArray(data)) {
      console.warn("portfolio.json is NOT an array:", data);
      return [];
    }
    return data as PortfolioItem[];
  }, []);

  return (
    <section className="portfolio full-bleed" aria-labelledby="portfolio-title">
      <PageBG src="/bg-portfolio.jpg" className="portfolio-bg" aria-hidden />
      <SectionTitle id="portfolio-title" label={t("portfolio.title")} />
      <div className="portfolio-wrap">
        <PortfolioGrid items={items} />
      </div>
    </section>
  );
}
