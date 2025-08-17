import { useMemo } from "react";
import SectionTitle from "../components/SectionTitle";
import PortfolioGrid, { type PortfolioItem } from "../components/PortfolioGrid";
import PageBG from "../components/PageBG";
import data from "../data/portfolio.json";

export default function Portfolio() {
  // Safe cast to array
  const items = useMemo<PortfolioItem[]>(() => (Array.isArray(data) ? (data as PortfolioItem[]) : []), []);

  if (!Array.isArray(data)) {
    console.warn("portfolio.json is NOT an array:", data);
  }

  // no logic changes, just className on the content wrapper
  return (
    <section className="portfolio full-bleed" aria-labelledby="portfolio-title">
      <PageBG src="/bg-portfolio.jpg" className="portfolio-bg" aria-hidden />
      <SectionTitle id="portfolio-title" label="PORTFOLIO" />
      <div className="portfolio-wrap">
        <PortfolioGrid items={items} />
      </div>
    </section>
  );
}
