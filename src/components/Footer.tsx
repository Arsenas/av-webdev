import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-left">
          © {year} alessandrocirina.it | all right reserved | <Link to="/privacy">privacy</Link>
        </div>
        <nav className="footer-right" aria-label="Social">
          <a href="https://www.facebook.com/alessandro.cirina" target="_blank" rel="noopener noreferrer">
            facebook
          </a>
          <span aria-hidden="true"> | </span>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            instagram
          </a>
          <span aria-hidden="true"> | </span>
          <a href="https://www.linkedin.com/in/alessandrocirina" target="_blank" rel="noopener noreferrer">
            linkedin
          </a>
        </nav>
      </div>
    </footer>
  );
}
