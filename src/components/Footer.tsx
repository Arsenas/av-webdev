import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const footer = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const element = footer.current;
    if (!element) return;
    const measure = () => document.documentElement.style.setProperty("--home-footer-space", `${element.getBoundingClientRect().height}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => { observer.disconnect(); document.documentElement.style.removeProperty("--home-footer-space"); };
  }, []);
  const year = new Date().getFullYear();

  return (
    <footer ref={footer} className="site-footer">
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
