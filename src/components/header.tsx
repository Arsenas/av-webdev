import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const { pathname } = useLocation();

  // uždaryti meniu pasikeitus route
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll + focus trap + ESC
  useEffect(() => {
    if (open) {
      lastActiveRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus();

      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          setOpen(false);
        }
        if (e.key === "Tab") {
          const root = overlayRef.current;
          if (!root) return;
          const focusables = root.querySelectorAll<HTMLElement>('a,button,[tabindex]:not([tabindex="-1"])');
          if (!focusables.length) return;
          const first = focusables[0],
            last = focusables[focusables.length - 1];
          if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        }
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
      lastActiveRef.current?.focus?.();
    }
  }, [open]);

  return (
    <>
      <header className="site-header container">
        <Link to="/" className="brand-link" aria-label="Home">
          <span className="brand-top">arsenij v.</span>
          <span className="brand-sub">graphic design &amp; web dev</span>
        </Link>

        <button
          className="burger"
          aria-label="Apri menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="overlay-menu"
          onClick={() => setOpen(true)}
        >
          <span className="burger-ico" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="burger-text">MENU</span>
        </button>
      </header>

      <div
        id="overlay-menu"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-title"
        className={`overlay ${open ? "open" : ""}`}
      >
        {/* Dešinė: pritemdyta nuotrauka */}
        <div className="overlay-right" aria-hidden="true">
          <img src="/hero-1.jpg" alt="" />
          <div className="overlay-right-fade" />
        </div>

        {/* Kairė: juoda panelė su meniu */}
        <div className="overlay-left">
          <button ref={closeBtnRef} className="overlay-close" onClick={() => setOpen(false)}>
            BACK
          </button>

          <nav className="overlay-nav" aria-label="Menu">
            <ul>
              <li>
                <Link to="/profilo">PROFILE</Link>
              </li>
              <li>
                <Link to="/listino">SERVICES</Link>
              </li>
              <li>
                <Link to="/portfolio">PORTFOLIO</Link>
              </li>
              <li>
                <Link to="/contatti">CONTACTS</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
