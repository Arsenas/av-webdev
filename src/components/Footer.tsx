import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-left">
          <span>
            © {year} arsenij.dev | {t("footer.rights")}
          </span>
          <span className="privacy-link">
            {" | "}
            <Link to="/privacy">{t("footer.privacy")}</Link>
          </span>
        </div>

        <nav className="footer-right" aria-label="Social media">
          <a href="https://www.facebook.com/Arseval" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <span aria-hidden="true"> | </span>
          <a href="https://www.instagram.com/senia_val" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <span aria-hidden="true"> | </span>
          <a href="https://www.linkedin.com/in/arsenij-valentukevicius" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
