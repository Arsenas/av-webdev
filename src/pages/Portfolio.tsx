import SectionTitle from "../components/SectionTitle";
import PortfolioGrid, { type PortfolioItem } from "../components/PortfolioGrid";
import PageBG from "../components/PageBG";
import data from "../data/portfolio.json";

export default function Portfolio() {
  const items = Array.isArray(data) ? (data as PortfolioItem[]) : [];
  if (!Array.isArray(data)) {
    console.warn("portfolio.json is NOT an array:", data);
  }

  return (
    <article style={{ position: "relative" }}>
      <SectionTitle label="PORTFOLIO" />
      <PageBG src="/bg-portfolio.jpg" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <PortfolioGrid items={items} />
      </div>
    </article>
  );
}
