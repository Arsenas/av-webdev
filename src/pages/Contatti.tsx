import SectionTitle from "../components/SectionTitle";
import PageBG from "../components/PageBG";
import ContactForm from "../components/ContactForm";

/* import SVG files (Vite will give you the URL) */
import icoPhone from "../assets/phone-portrait-svgrepo-com.svg";
import icoMail from "../assets/email-svgrepo-com.svg";
import icoLinkedIn from "../assets/linkedin-fill-svgrepo-com.svg";

export default function Contact() {
  return (
    <article className="contact full-bleed" aria-labelledby="contact-title" style={{ position: "relative" }}>
      <PageBG src="/bg-contact.jpg" className="contact-bg" aria-hidden />

      <SectionTitle id="contact-title" label="CONTACT" />

      <div className="contact-wrap">
        <ContactForm />

        <aside className="contact-info" aria-label="Contact details">
          <h3>Hi!</h3>
          <p>
            Write to me for information or to request a quote for your project. I’ll get back to you as soon as
            possible.
          </p>

          <ul className="contact-list">
            <li>
              <img src={icoPhone} alt="" aria-hidden className="ci" />
              <a href="tel:+37065236737">+370 652 36737</a>
            </li>
            <li>
              <img src={icoMail} alt="" aria-hidden className="ci" />
              <a href="mailto:business.aval@gmail.com">business.aval@gmail.com</a>
            </li>
            <li>
              <img src={icoLinkedIn} alt="" aria-hidden className="ci" />
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
