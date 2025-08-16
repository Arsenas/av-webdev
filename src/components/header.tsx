import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  // Lock body scroll + focus valdymas
  useEffect(() => {
    if (open) {
      lastActiveRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      // focus į Close
      closeBtnRef.current?.focus();

      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          setOpen(false);
        }
        if (e.key === "Tab") {
          // focus trap
          const root = overlayRef.current;
          if (!root) return;
          const focusables = root.querySelectorAll<HTMLElement>('a,button,[tabindex]:not([tabindex="-1"])');
          if (focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];

          if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          } else if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        }
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
      // grąžinti fokusą
      lastActiveRef.current?.focus?.();
    }
  }, [open]);

  return (
    <>
      <header className="site-header container">
        <div className="brand">
          <Link to="/" className="brand-link">
            <span className="brand-top">alessandro cirina</span>
            <span className="brand-sub">grafica &amp; web</span>
          </Link>
        </div>

        <button
          className="burger"
          aria-label="Apri menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="overlay-menu"
          onClick={() => setOpen(true)}
        >
          MENU
        </button>
      </header>

      {/* Overlay */}
      <div
        id="overlay-menu"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-title"
        className={`overlay ${open ? "open" : ""}`}
      >
        <div className="overlay-inner">
          <button ref={closeBtnRef} className="overlay-close" onClick={() => setOpen(false)}>
            CHIUDI
          </button>

          <nav className="overlay-nav" aria-label="Menu">
            <ul>
              <li>
                <Link to="/profilo" onClick={() => setOpen(false)}>
                  PROFILO
                </Link>
              </li>
              <li>
                <Link to="/listino" onClick={() => setOpen(false)}>
                  LISTINO
                </Link>
              </li>
              <li>
                <Link to="/portfolio" onClick={() => setOpen(false)}>
                  PORTFOLIO
                </Link>
              </li>
              <li>
                <Link to="/contatti" onClick={() => setOpen(false)}>
                  CONTATTI
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
