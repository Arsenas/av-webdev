import SectionTitle from "../components/SectionTitle";
import PageBG from "../components/PageBG";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <article className="contact full-bleed" aria-labelledby="contact-title" style={{ position: "relative" }}>
      {/* full-bleed background on the right */}
      <PageBG src="/bg-contact.jpg" className="contact-bg" aria-hidden />

      {/* title aligned with brand rail */}
      <SectionTitle id="contact-title" label="CONTACT" />

      {/* content rails: brand → menu */}
      <div className="contact-wrap">
        {/* LEFT: form */}
        <ContactForm />

        {/* RIGHT: info */}
        <aside className="contact-info" aria-label="Contact details">
          <h3>Hi!</h3>
          <p>
            Write to me for information or to request a quote for your project. I’ll get back to you as soon as
            possible.
          </p>

          <ul className="contact-list">
            <li>
              <a href="tel:+37065236737" aria-label="Call +370 652 36737">
                +370 652 36737
              </a>
            </li>
            <li>
              <a href="mailto:business.aval@gmail.com">business.aval@gmail.com</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/arsenij-valentukevicius" target="_blank" rel="noreferrer">
                linkedin.com/in/arsenij-valentukevicius
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </article>
  );
}
