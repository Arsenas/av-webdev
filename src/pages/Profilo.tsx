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
            My name is Arsenij - graphic designer &amp; web developer. I help businesses and professionals build a
            coherent visual identity and clean, fast, and easy-to-use websites.
          </p>
          <p>
            I work from the brief to the final delivery: from reconstructing or creating logos, to printed materials,
            all the way to putting the site online and basic SEO optimization.
          </p>
          <ul className="profile-list">
            <li>Visual identity (logo, palette, typography)</li>
            <li>Print materials (business cards, flyers, roll-ups)</li>
            <li>Responsive showcase websites (design & development)</li>
            <li>Maintenance and small website updates</li>
          </ul>
        </section>

        {/* Dešinė kolona — trumpa kortelė + CV */}
        <aside className="profile-card">
          <div>
            <strong>Quick Contacts</strong>
            <br />
            ✉️ <a href="business.aval@gmail.com">business.aval@gmail.com</a>
            <br />
            📱 <a href="tel:+37065236737">+370 652 36737</a>
          </div>
          <a className="profile-cta" href="/docs/cv.pdf" download>
            <i aria-hidden="true" /> Download PDF (CV)
          </a>
        </aside>
      </div>
    </article>
  );
}
