import SectionTitle from "../components/SectionTitle";
import PortfolioGrid, { type PortfolioItem } from "../components/PortfolioGrid";
import data from "../data/portfolio.json";

export default function Portfolio() {
  return (
    <article>
      <SectionTitle label="PORTFOLIO" />
      <PortfolioGrid items={data as PortfolioItem[]} />
    </article>
  );
}
