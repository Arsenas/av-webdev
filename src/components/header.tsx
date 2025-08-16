import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="container header-row">
          <Link to="/" className="brand" onClick={close}>
            <span className="brand-title">arsenij v.</span>
            <span className="brand-sub">graphic design &amp; web dev</span>
          </Link>

          <button className="menu-btn" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((v) => !v)}>
            <span className="burger" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="menu-label">MENU</span>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div id="site-nav" className={`nav-overlay ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="nav-panel">
          <button className="nav-close" onClick={close} aria-label="Chiudi menu">
            BACK
          </button>

          <nav className="nav-menu" role="navigation" aria-label="Main">
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
          </nav>
        </div>

        {/* Dešinė pusė – pritemdymas (stipriai) */}
        <button className="nav-dim" aria-label="Uždaryti" onClick={close} />
      </div>
    </>
  );
}
