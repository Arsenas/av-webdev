import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const switchLang = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nLang", lng);
  };

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setOpen(false);
    }, 260); // CSS transition trukmė
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-row">
          <Link to="/" className="brand" onClick={close}>
            <span className="brand-title">arsenij.dev</span>
            <span className="brand-sub">{t("header.subtitle")}</span>
          </Link>

          <div className="lang-switcher">
            <button onClick={() => switchLang("lt")}>LT</button> | <button onClick={() => switchLang("en")}>EN</button>{" "}
            | <button onClick={() => switchLang("ru")}>RU</button>
          </div>

          <button
            className={`menu-btn ${open ? "open" : ""}`}
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? (
              <span className="menu-back">{t("header.back")}</span>
            ) : (
              <>
                <span className="burger" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="menu-label" aria-hidden="true">
                  {t("header.menu")}
                </span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Overlay navigacija */}
      <div
        id="site-nav"
        className={`nav-overlay ${open ? "open" : ""} ${closing ? "closing" : ""}`}
        aria-hidden={!open}
      >
        <div className="nav-panel" />
        <div className="nav-center">
          <nav className="nav-menu" role="navigation" aria-label="Main">
            <div className="nav-inner">
              <ul>
                <li>
                  <NavLink to="/profile" onClick={close}>
                    {t("nav.profile")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/services" onClick={close}>
                    {t("nav.services")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/portfolio" onClick={close}>
                    {t("nav.portfolio")}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contacts" onClick={close}>
                    {t("nav.contacts")}
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
