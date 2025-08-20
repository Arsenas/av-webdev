import SectionTitle from "../components/SectionTitle";
import PageBG from "../components/PageBG";

export default function Services() {
  return (
    <section className="services full-bleed pad-top-header" aria-labelledby="services-title">
      <PageBG src="/bg-listino.jpg" className="services-bg" aria-hidden />

      {/* Title aligned with brand */}
      <SectionTitle id="services-title" label="SERVICES" />

      <div className="services-wrap">
        {/* Four compact pillars (Maintenance merged into each) */}
        <div className="svc-cards" role="list">
          <article className="svc" role="listitem">
            <h2 className="svc-title">Websites</h2>
            <p className="svc-lead">Clean, fast, easy-to-use company & portfolio sites.</p>
            <ul className="svc-list">
              <li>Static or headless CMS (as needed)</li>
              <li>Multi-language, SEO basics, Core Web Vitals</li>
              <li>Accessible, responsive layouts</li>
              <li>Integrations: forms, maps, analytics, social meta</li>
              <li>Documented files & handover</li>
            </ul>
            <footer className="svc-foot">Care plan available on request</footer>
          </article>

          <article className="svc" role="listitem">
            <h2 className="svc-title">Landing Pages</h2>
            <p className="svc-lead">For launches, campaigns & lead generation.</p>
            <ul className="svc-list">
              <li>Built from your content or from scratch</li>
              <li>A/B variants & conversion tracking</li>
              <li>Micro-interactions & smooth animations</li>
              <li>Mobile-first, fast load</li>
            </ul>
            <footer className="svc-foot">Care plan available on request</footer>
          </article>

          <article className="svc" role="listitem">
            <h2 className="svc-title">E-commerce</h2>
            <p className="svc-lead">Lightweight stores & checkout integrations.</p>
            <ul className="svc-list">
              <li>Shopify / WooCommerce setup & theming</li>
              <li>Clean product pages, cart & checkout</li>
              <li>Payments, emails, catalog structure</li>
              <li>Speed & SEO foundation</li>
            </ul>
            <footer className="svc-foot">Care plan available on request</footer>
          </article>

          <article className="svc" role="listitem">
            <h2 className="svc-title">Brand & Identity</h2>
            <p className="svc-lead">Consistent visuals for web & print.</p>
            <ul className="svc-list">
              <li>Logo refresh, colour palette, typography</li>
              <li>Brand kit: social avatars, covers, post templates</li>
              <li>Business cards & simple print assets</li>
            </ul>
            <footer className="svc-foot">Care plan available on request</footer>
          </article>
        </div>

        {/* Compact full-width summary */}
        <aside className="svc-summary" aria-label="What you get">
          <h3 className="summary-title">What you get</h3>
          <ul className="summary-list">
            <li>Clean design & typography</li>
            <li>Fast load & SEO basics</li>
            <li>Mobile-first, accessibility-minded</li>
            <li>Documented files & exports</li>
          </ul>
          <a className="summary-cta" href="/contatti">
            Tell me about your project
          </a>
        </aside>
      </div>
    </section>
  );
}
