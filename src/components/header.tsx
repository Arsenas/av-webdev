import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-row">
          <Link to="/" className="brand" onClick={close}>
            <span className="brand-title">arsenij v.</span>
            <span className="brand-sub">graphic &amp; web development</span>
          </Link>

          <button
            className={`menu-btn ${open ? "open" : ""}`}
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <span className="menu-back">BACK</span>
            ) : (
              <>
                <span className="burger" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="menu-label" aria-hidden="true">
                  MENU
                </span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div id="site-nav" className={`nav-overlay ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="nav-panel" />
        <div className="nav-center">
          <nav className="nav-menu" role="navigation" aria-label="Main">
            <div className="nav-inner">
              <ul>
                <li>
                  <NavLink to="/profilo" onClick={close}>
                    PROFILE
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/listino" onClick={close}>
                    SERVICES
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/portfolio" onClick={close}>
                    PORTFOLIO
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contatti" onClick={close}>
                    CONTACT
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <button className="nav-dim" aria-label="Close menu" onClick={close} />
      </div>
    </>
  );
}
