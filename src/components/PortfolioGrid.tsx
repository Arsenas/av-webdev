import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  img: string;
  link?: string | null;
};

const cats = ["tutti", "logo", "web", "stampa"] as const;
type Category = (typeof cats)[number];

export default function PortfolioGrid({ items = [] as PortfolioItem[] }) {
  const { t } = useTranslation();
  const [cat, setCat] = useState<Category>("tutti");

  const labels: Record<Category, string> = {
    tutti: t("portfolio.categories.all"),
    logo: t("portfolio.categories.logo"),
    web: t("portfolio.categories.web"),
    stampa: t("portfolio.categories.print"),
  };

  const filtered = useMemo(
    () => (cat === "tutti" ? items : items.filter((i) => (i.category || "").toLowerCase() === cat)),
    [items, cat]
  );

  // Lightbox
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const isOpen = openIdx !== null;
  const cur = isOpen ? filtered[openIdx!] : null;

  const swipeRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const dragging = useRef(false);
  const [draggingClass, setDraggingClass] = useState(false);

  const animateSwap = (dir: 1 | -1) => {
    if (!isOpen || filtered.length === 0) return;
    const el = swipeRef.current;
    const go = (p: number) => (dir === 1 ? (p + 1) % filtered.length : (p - 1 + filtered.length) % filtered.length);

    if (!el) {
      setOpenIdx((p) => go(p ?? 0));
      return;
    }

    el.style.transition = "transform 260ms ease";
    el.style.transform = `translateX(${dir * -100}%)`;

    const onEnd = () => {
      el.removeEventListener("transitionend", onEnd);
      setOpenIdx((p) => {
        const n = go(p ?? 0);
        requestAnimationFrame(() => {
          const el2 = swipeRef.current;
          if (!el2) return;
          el2.style.transition = "none";
          el2.style.transform = `translateX(${dir * 100}%)`;
          requestAnimationFrame(() => {
            el2.style.transition = "transform 260ms ease";
            el2.style.transform = "translateX(0)";
          });
        });
        return n;
      });
    };
    el.addEventListener("transitionend", onEnd, { once: true });
  };

  const onNext = () => animateSwap(1);
  const onPrev = () => animateSwap(-1);

  useEffect(() => {
    if (!isOpen) return;
    const el = swipeRef.current;
    if (!el) return;

    const down = (e: PointerEvent) => {
      dragging.current = true;
      setDraggingClass(true);
      startX.current = e.clientX;
      el.setPointerCapture(e.pointerId);
      el.style.transition = "none";
    };
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - startX.current;
      el.style.transform = `translateX(${dx}px)`;
    };
    const up = (e: PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      setDraggingClass(false);
      const dx = e.clientX - startX.current;
      const TH = 80;
      if (Math.abs(dx) > TH) {
        animateSwap(dx < 0 ? 1 : -1);
      } else {
        el.style.transition = "transform 200ms ease";
        el.style.transform = "translateX(0)";
      }
      el.releasePointerCapture(e.pointerId);
    };

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [isOpen, filtered.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <section className="pf">
      <div className="pf-tabs" role="tablist" aria-label="Categories">
        {cats.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            className={`pf-tab ${cat === c ? "active" : ""}`}
            onClick={() => {
              setCat(c);
              setOpenIdx(null);
            }}
          >
            {labels[c]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>{t("portfolio.empty", { category: labels[cat] })}</p>
      ) : (
        <div className="pf-grid">
          {filtered.map((it, idx) => {
            const isLogo = (it.category || "").toLowerCase() === "logo";
            return (
              <button
                type="button"
                key={it.id}
                className="pf-card"
                onClick={() => setOpenIdx(idx)}
                aria-label={`${t("portfolio.open")} “${it.title}”`}
              >
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  decoding="async"
                  className={`pf-img ${isLogo ? "contain" : "cover"}`}
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = "0.3")}
                />
              </button>
            );
          })}
        </div>
      )}

      {isOpen && cur && (
        <div
          className="pf-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={cur.title}
          onClick={() => setOpenIdx(null)}
        >
          <figure className="pf-lightbox" onClick={(e) => e.stopPropagation()}>
            <div ref={swipeRef} className={`pf-swipe${draggingClass ? " dragging" : ""}`}>
              <img
                src={cur.img}
                alt={cur.title}
                className={`pf-lb-img ${cur.category?.toLowerCase() === "logo" ? "contain" : "cover"}`}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>

            <figcaption className="pf-caption">
              <div className="pf-lb-title">{cur.title}</div>
              {cur.link && (
                <a className="pf-view" href={cur.link} target="_blank" rel="noopener noreferrer">
                  {t("portfolio.viewSite")} ↗
                </a>
              )}
            </figcaption>
          </figure>

          {filtered.length > 1 && (
            <>
              <button
                className="pf-nav pf-prev"
                aria-label={t("portfolio.prev")}
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
              >
                ‹
              </button>
              <button
                className="pf-nav pf-next"
                aria-label={t("portfolio.next")}
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
              >
                ›
              </button>
            </>
          )}

          <button
            type="button"
            className="pf-close"
            aria-label={t("portfolio.close")}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpenIdx(null);
            }}
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
