import SectionTitle from "../components/SectionTitle";
import PriceList, { type PriceGroup } from "../components/PriceList";
import PageBG from "../components/PageBG";
import data from "../data/listino.json";

export default function Listino() {
  return (
    <article style={{ position: "relative" }}>
      <SectionTitle label="LISTINO" />
      <PageBG src="/bg-listino.jpg" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <PriceList groups={data as PriceGroup[]} />
      </div>
    </article>
  );
}
