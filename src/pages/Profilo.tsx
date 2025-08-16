import SectionTitle from "../components/SectionTitle";
import PageBG from "../components/PageBG";

export default function Profilo() {
  return (
    <article className="profile" style={{ position: "relative" }}>
      <SectionTitle label="PROFILO" />
      <PageBG src="/bg-profilo.jpg" />

      <div className="profile-grid">
        {/* Kairė kolona — aprašymas */}
        <section className="profile-body">
          <p className="profile-lead">
            Sono Alessandro Cirina — grafica &amp; web. Aiuto attività e professionisti a costruire un’identità visiva
            coerente e siti web puliti, veloci e facili da usare.
          </p>
          <p>
            Lavoro dal brief alla consegna finale: dalla ricostruzione o creazione del logo, ai materiali stampati, fino
            alla messa online del sito e ottimizzazione base SEO.
          </p>
          <ul className="profile-list">
            <li>Identità visiva (logo, palette, tipografia)</li>
            <li>Materiali per la stampa (biglietti, volantini, roll-up)</li>
            <li>Siti vetrina responsive (design &amp; sviluppo)</li>
            <li>Manutenzione e piccoli aggiornamenti sul sito</li>
          </ul>
        </section>

        {/* Dešinė kolona — trumpa kortelė + CV */}
        <aside className="profile-card">
          <div>
            <strong>Contatti rapidi</strong>
            <br />
            ✉️ <a href="mailto:a.cirina@gmail.com">a.cirina@gmail.com</a>
            <br />
            📱 <a href="tel:+393495288929">+39 349 5288929</a>
          </div>
          <a className="profile-cta" href="/docs/cv.pdf" download>
            <i aria-hidden="true" /> Scarica PDF (CV)
          </a>
        </aside>
      </div>
    </article>
  );
}
