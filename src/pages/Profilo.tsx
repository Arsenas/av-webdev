import SectionTitle from "../components/SectionTitle";
import PageBG from "../components/PageBG";

export default function Profilo() {
  return (
    <article style={{ position: "relative" }}>
      <SectionTitle label="PROFILO" />
      <PageBG src="/bg-profilo.jpg" />

      <div style={{ position: "relative", zIndex: 1 }}>
        <p>
          (Laikinas tekstas) Sono Alessandro Cirina — grafica &amp; web. Qui andrà la descrizione breve del profilo.
        </p>
      </div>
    </article>
  );
}
