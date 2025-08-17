import SectionTitle from "../components/SectionTitle";
import PageBG from "../components/PageBG";

export default function Profilo() {
  return (
    <section className="profile full-bleed" aria-labelledby="profile-title">
      {/* Dešinės pusės fonas – už viso turinio */}
      <PageBG src="/bg-profilo.jpg" className="profile-bg" />

      {/* Sekcijos pavadinimas (lygus su brand) */}
      <SectionTitle id="profile-title" label="PROFILE" />

      {/* Dviejų kolonų turinys */}
      <div className="profile-grid">
        {/* Kairė kolona — aprašymas */}
        <section className="profile-body">
          <p className="profile-lead">
            My name is Arsenij – graphic designer &amp; web developer. I help businesses and professionals build a
            coherent visual identity and clean, fast, and easy-to-use websites.
          </p>

          <p>
            I work from the brief to the final delivery: from reconstructing or creating logos, to printed materials,
            all the way to putting the site online and basic SEO optimization.
          </p>

          <ul className="profile-list">
            <li>Visual identity (logo, palette, typography)</li>
            <li>Print materials (business cards, flyers, roll-ups)</li>
            <li>Responsive showcase websites (design &amp; development)</li>
            <li>Maintenance and small website updates</li>
          </ul>
        </section>

        {/* Dešinė kolona — kontaktų kortelė */}
        <aside className="profile-card" aria-label="Quick contacts">
          <header>Quick Contacts</header>

          <div className="pc-row">
            <span className="pc-ic">@</span>
            <a href="mailto:business.aval@gmail.com">business.aval@gmail.com</a>
          </div>

          <div className="pc-row">
            <span className="pc-ic">✆</span>
            <a href="tel:+37065236737">+370 652 36737</a>
          </div>

          <a className="profile-cta" href="/docs/cv.pdf" target="_blank" rel="noopener noreferrer">
            Download PDF (CV)
          </a>
        </aside>
      </div>
    </section>
  );
}
