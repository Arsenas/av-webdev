import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);
  const wasOpened = useRef(false);
  useLayoutEffect(() => {
    if (open) {
      wasOpened.current = true;
      document.body.classList.remove("menu-closing");
      return;
    }
    if (!wasOpened.current || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    document.body.classList.add("menu-closing");
    const timer = window.setTimeout(() => document.body.classList.remove("menu-closing"), 680);
    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove("menu-closing");
    };
  }, [open]);
  useEffect(() => { document.documentElement.lang = i18n.resolvedLanguage || "en"; }, [i18n.resolvedLanguage]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const button = trigger.current;
    overlay.current?.querySelector<HTMLElement>("nav a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const nodes = [button, ...Array.from(overlay.current?.querySelectorAll<HTMLElement>('a[href], button:not([tabindex="-1"])') || [])].filter((node): node is HTMLElement => !!node);
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); button?.focus(); };
  }, [open]);
  return <>
    <a className="skip-link" href="#main-content">{t("header.skip")}</a>
    <header className={`site-header ${scrolled ? "scrolled" : ""} ${open ? "menu-open" : ""} ${pathname === "/" ? "on-home" : ""}`}>
      <div className="header-row">
        <Link className="brand" to="/" onClick={close}>
          <span className="brand-title">arsenij.dev</span>
          <span className="brand-sub">{t("header.subtitle")}</span>
        </Link>
        <button ref={trigger} className={`menu-btn ${open ? "open" : ""}`} aria-label={open ? t("header.back") : t("header.menu")} aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
          {open ? <span className="menu-back">{t("header.back")}</span> : <span className="burger" aria-hidden="true"><span /><span /><span /></span>}
        </button>
      </div>
    </header>
    <div ref={overlay} id="site-nav" className={`nav-overlay ${open ? "open" : ""}`} inert={!open} aria-hidden={!open}>
      <div className="nav-panel" />
      <nav className="nav-menu" aria-label={t("header.menu")}><ul>
        {["profile", "services", "portfolio", "contacts"].map(page => <li key={page}><NavLink to={`/${page}`} onClick={close}>{t(`nav.${page}`)}</NavLink></li>)}
      </ul></nav>
      <button className="nav-dim" aria-label={t("header.back")} tabIndex={-1} onClick={close} />
    </div>
  </>;
}
