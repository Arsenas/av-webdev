import SectionTitle from "../components/SectionTitle";
import PageBG from "../components/PageBG";

export default function Privacy() {
  return (
    <section className="privacy full-bleed" aria-labelledby="privacy-title">
      {/* Fonas */}
      <PageBG src="/bg-privacy.jpg" className="privacy-bg" />

      {/* Pavadinimas */}
      <SectionTitle id="privacy-title" label="PRIVACY POLICY" />

      {/* Viena kolona */}
      <div className="privacy-wrap">
        <div className="privacy-grid">
          <section className="privacy-body">
            <p>
              We respect your privacy and are committed to protecting your personal data in accordance with the GDPR.
            </p>

            <h2>Data We Collect</h2>
            <p>Information you provide through forms (e.g., name, email, phone, message).</p>
            <p>Technical information automatically collected (IP address, browser type, cookies, analytics).</p>

            <h2>How We Use Data</h2>
            <p>To respond to your inquiries and provide services.</p>
            <p>To improve the website and user experience.</p>
            <p>To comply with legal obligations.</p>
            <p>
              <strong>We do not sell or share your data with third parties for marketing purposes.</strong>
            </p>

            <h2>Cookies</h2>
            <p>
              This site uses cookies (including third-party analytics cookies such as Google Analytics) to improve
              functionality and analyze traffic.
            </p>

            <h2>Your Rights</h2>
            <ul className="privacy-list">
              <li>Access, update, or request deletion of your personal data.</li>
              <li>Object to processing or request restriction.</li>
              <li>Withdraw consent at any time.</li>
              <li>File a complaint with the Data Protection Authority.</li>
            </ul>

            <h2>Data Controller</h2>
            <p>
              Arsenij Valentukevičius <br />
              Vilnius, Lithuania <br />
              Email: <a href="mailto:business.aval@gmail.com">your@email.com</a>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
