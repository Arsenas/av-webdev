import SectionTitle from "../components/SectionTitle";
import PriceList, { type PriceGroup } from "../components/PriceList";
import data from "../data/listino.json";

export default function Listino() {
  return (
    <article>
      <SectionTitle label="LISTINO" />
      <PriceList groups={data as PriceGroup[]} />
    </article>
  );
}
