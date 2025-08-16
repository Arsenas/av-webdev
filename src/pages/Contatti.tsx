import SectionTitle from "../components/SectionTitle";
import ContactForm from "../components/ContactForm";
import PageBG from "../components/PageBG";

export default function Contatti() {
  return (
    <article style={{ position: "relative" }}>
      <SectionTitle label="CONTATTI" />
      <PageBG src="/bg-contatti.jpg" />
      <div className="contact-wrap" style={{ position: "relative", zIndex: 1 }}>
        <ContactForm />
        <aside className="contact-info">
          <h3>Hi!</h3>
          <p>
            Write to me for information or to request a quote tailored to your project. You’ll be contacted back as soon
            as possible.
          </p>
          <p>
            📱 <a href="tel:+37065236737">+370 652 36737</a>
          </p>
          <p>
            ✉️ <a href="business.aval@gmail.com">business.aval@gmail.com</a>
          </p>
          <p>
            in{" "}
            <a href="www.linkedin.com/in/arsenij-valentukevicius" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/arsenij-valentukevicius
            </a>
          </p>
        </aside>
      </div>
    </article>
  );
}
