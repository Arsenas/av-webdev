import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-left">
          <span>© {year} avweb.dev | all right reserved</span>
          <span className="privacy-link">
            {" | "}
            <Link to="/privacy">privacy</Link>
          </span>
        </div>
        <nav className="footer-right" aria-label="Social">
          <a href="https://www.facebook.com/Arseval" target="_blank" rel="noopener noreferrer">
            facebook
          </a>
          <span aria-hidden="true"> | </span>
          <a href="https://www.instagram.com/senia_val" target="_blank" rel="noopener noreferrer">
            instagram
          </a>
          <span aria-hidden="true"> | </span>
          <a href="https://www.linkedin.com/in/arsenij-valentukevicius" target="_blank" rel="noopener noreferrer">
            linkedin
          </a>
        </nav>
      </div>
    </footer>
  );
}
