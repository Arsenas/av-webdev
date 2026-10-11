import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);
  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || "en";
  }, [i18n.resolvedLanguage]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = toggle.current;
    menu.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        const nodes = [trigger, ...Array.from(menu.current?.querySelectorAll<HTMLElement>("a, button") || [])].filter((n): n is HTMLElement => !!n);
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); trigger?.focus(); };
  }, [open]);
  const switchLang = (lng: string) => {
    void i18n.changeLanguage(lng);
    try { localStorage.setItem("i18nLang", lng); } catch { /* Language still works without storage. */ }
  };
  return <>
    <a className="skip-link" href="#main-content">{t("header.skip")}</a>
    <header className={`site-header ${open ? "menu-open" : ""}`}>
      <div className="container header-row">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-title">arsenij.dev</span>
          <span className="brand-sub">{t("header.subtitle")}</span>
        </Link>
        <button ref={toggle} className="menu-btn" aria-expanded={open} aria-controls="site-nav" aria-label={open ? t("header.back") : t("header.menu")} onClick={() => setOpen(!open)}>
          {open ? t("header.back") : t("header.menu")} <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
      </div>
    </header>
    <div ref={menu} id="site-nav" className={`nav-overlay ${open ? "open" : ""}`} hidden={!open}>
      <div className="container nav-content">
        <nav aria-label={t("header.menu")}><ul>
          {["profile", "services", "portfolio", "contacts"].map(page => <li key={page}><NavLink to={`/${page}`} onClick={close}>{t(`nav.${page}`)}</NavLink></li>)}
        </ul></nav>
        <div className="lang-switcher" aria-label={t("header.language")}>
          {["lt", "en", "ru"].map(lng => <button key={lng} lang={lng} aria-pressed={i18n.resolvedLanguage === lng} onClick={() => switchLang(lng)}>{lng.toUpperCase()}</button>)}
        </div>
      </div>
    </div>
  </>;
}
