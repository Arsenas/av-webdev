import SectionTitle from "../components/SectionTitle";
import PortfolioGrid, { type PortfolioItem } from "../components/PortfolioGrid";
import raw from "../data/portfolio.json";

export default function Portfolio() {
  const items = Array.isArray(raw) ? (raw as PortfolioItem[]) : [];
  if (!Array.isArray(raw)) {
    console.warn("portfolio.json is NOT an array:", raw);
  }
  return (
    <article>
      <SectionTitle label="PORTFOLIO" />
      <PortfolioGrid items={items} />
    </article>
  );
}
