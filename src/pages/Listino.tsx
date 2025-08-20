import SectionTitle from "../components/SectionTitle";
import PageBG from "../components/PageBG";

export default function Services() {
  return (
    <section className="services full-bleed pad-top-header" aria-labelledby="services-title">
      <PageBG src="/bg-listino.jpg" className="services-bg" aria-hidden />

      {/* Title aligned with brand */}
      <SectionTitle id="services-title" label="SERVICES" />

      <div className="services-wrap">
        {/* Four compact pillars, rewritten for tone */}
        <div className="svc-cards" role="list">
          <article className="svc" role="listitem">
            <h2 className="svc-title">Website Design & Dev</h2>
            <p className="svc-lead">Clean, modern websites for all kinds of projects.</p>
            <ul className="svc-list">
              <li>Fully responsive, mobile-first</li>
              <li>Good UX, fast load, SEO basics</li>
              <li>CMS or static - depends on the project</li>
              <li>Forms, embeds, analytics, maps, etc.</li>
              <li>Docs, handoff, basic support included</li>
            </ul>
            <footer className="svc-foot">Maintenance available</footer>
          </article>

          <article className="svc" role="listitem">
            <h2 className="svc-title">Landing Pages</h2>
            <p className="svc-lead">One-pagers that do the job - clear, focused, fast.</p>
            <ul className="svc-list">
              <li>Built from your content or from scratch</li>
              <li>A/B variants & conversion tracking</li>
              <li>Micro-interactions & smooth animations</li>
              <li>Mobile-first, fast load</li>
              <li>Custom design matched to your brand</li>
            </ul>
            <footer className="svc-foot">Maintenance available</footer>
          </article>

          <article className="svc" role="listitem">
            <h2 className="svc-title">Online Stores</h2>
            <p className="svc-lead">Simple e-commerce setups that work without bloat.</p>
            <ul className="svc-list">
              <li>Shopify or WooCommerce basics</li>
              <li>Fast & minimal product pages</li>
              <li>Checkout flow, payment, email</li>
              <li>Catalog structure & SEO</li>
            </ul>
            <footer className="svc-foot">Maintenance available</footer>
          </article>

          <article className="svc" role="listitem">
            <h2 className="svc-title">Fix & Improve</h2>
            <p className="svc-lead">Have a website already? I can help you fix or update it.</p>
            <ul className="svc-list">
              <li>Update design & layout</li>
              <li>Add missing features</li>
              <li>Improve performance</li>
              <li>Debug errors</li>
            </ul>
            <footer className="svc-foot">Maintenance available</footer>
          </article>
        </div>

        {/* Compact full-width summary */}
        <aside className="svc-summary" aria-label="What you get">
          <h3 className="summary-title">What you get</h3>
          <ul className="summary-list">
            <li>Nice design & smart layout</li>
            <li>Speed, responsiveness, clarity</li>
            <li>Modern standards, no clutter</li>
            <li>Handoff-ready exports & support</li>
          </ul>
          <a className="summary-cta" href="/contatti">
            Tell me about your project
          </a>
        </aside>
      </div>
    </section>
  );
}
