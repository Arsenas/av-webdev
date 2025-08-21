import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type Slide = { title: string };

export default function Hero() {
  const { t } = useTranslation();
  const slides = t("hero.slides", { returnObjects: true }) as Slide[];
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<"left" | "right">("right");
  const titleRef = useRef<HTMLHeadingElement>(null);

  const clampIndex = useCallback((n: number) => ((n % slides.length) + slides.length) % slides.length, []);

  const go = useCallback(
    (n: number, direction: "left" | "right") => {
      setDir(direction);
      setI(clampIndex(n));
    },
    [clampIndex]
  );

  const next = useCallback(() => go(i + 1, "right"), [go, i]);
  const prev = useCallback(() => go(i - 1, "left"), [go, i]);

  // autoplay kas 7s
  useEffect(() => {
    const id = setInterval(() => next(), 7000);
    return () => clearInterval(id);
  }, [next]);

  // drag support
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    let startX = 0;
    let dx = 0;
    let dragging = false;

    (el.style as any).touchAction = "pan-y";

    const onDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      el.setPointerCapture(e.pointerId);
      el.classList.add("dragging");
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      dx = e.clientX - startX;
      const opacity = Math.max(0.4, 1 - Math.abs(dx) / 300);
      el.style.opacity = String(opacity);
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove("dragging");
      el.releasePointerCapture(e.pointerId);
      el.style.opacity = "1";

      if (dx > 60) prev();
      else if (dx < -60) next();
      dx = 0;
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [next, prev]);

  const cur = slides[i];

  return (
    <section className="hero full-bleed" aria-label="Intro">
      <div className="hero-text">
        <div className="hero-title-wrap">
          <h1 ref={titleRef} className="hero-title" aria-live="polite">
            <div key={`${i}-${dir}`} className={dir === "right" ? "enter-from-right" : "enter-from-left"}>
              {cur.title}
            </div>
          </h1>

          <div className="hero-dots-wrap">
            <div className="hero-dots" role="tablist" aria-label="Slides">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={i === idx}
                  aria-controls={`slide-${idx}`}
                  className={`dot ${i === idx ? "active" : ""}`}
                  onClick={() => go(idx, idx > i ? "right" : "left")}
                >
                  <span className="visually-hidden">
                    Slide {idx + 1} of {slides.length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hero-media-wrap">
        <div className="hero-media" aria-hidden="true" />
      </div>
    </section>
  );
}
