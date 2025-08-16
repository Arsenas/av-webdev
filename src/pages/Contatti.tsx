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
          <h3>Ciao!</h3>
          <p>
            Scrivimi per informazioni o richiedere un preventivo dedicato al tuo progetto. Sarai ricontattato il prima
            possibile.
          </p>
          <p>
            📱 <a href="tel:+393495288929">+39 349 5288929</a>
          </p>
          <p>
            ✉️ <a href="mailto:a.cirina@gmail.com">a.cirina@gmail.com</a>
          </p>
          <p>
            in{" "}
            <a href="https://www.linkedin.com/in/alessandrocirina" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/alessandrocirina
            </a>
          </p>
        </aside>
      </div>
    </article>
  );
}
