import SectionTitle from "../components/SectionTitle";
import PageBG from "../components/PageBG";
import ContactForm from "../components/ContactForm";
import { useTranslation } from "react-i18next";

/* import SVG files (Vite will give you the URL) */
import icoPhone from "../assets/phone-portrait-svgrepo-com.svg";
import icoMail from "../assets/email-svgrepo-com.svg";
import icoLinkedIn from "../assets/linkedin-fill-svgrepo-com.svg";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <article className="contact full-bleed" aria-labelledby="contact-title">
      <PageBG src="/bg-contact.jpg" className="contact-bg" aria-hidden />

      <SectionTitle id="contact-title" label={t("nav.contacts")} />

      <div className="contact-wrap">
        <ContactForm />

        <aside className="contact-info" aria-label={t("contact.quickTitle")}>
          <h3>{t("contact.title")}</h3>
          <p>{t("contact.desc")}</p>

          <address>
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
                <a href="https://www.linkedin.com/in/arsenij-valentukevicius" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/arsenij-valentukevicius
                </a>
              </li>
            </ul>
          </address>
        </aside>
      </div>
    </article>
  );
}
