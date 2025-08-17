import { useCallback, useEffect, useRef, useState } from "react";

type Slide = { title: string };
const slides: Slide[] = [
  { title: "I specialize in graphic design and website development" },
  { title: "I want my clients to be proud of me and the work I do. That’s what makes me happy." },
  {
    title: "I like getting to know the client and figuring out the style that best fits their field.",
  },
];

export default function Hero() {
  const [i, setI] = useState(0);

  // saugus indeksų "apkarpymas"
  const clampIndex = useCallback((n: number) => ((n % slides.length) + slides.length) % slides.length, []);

  const go = useCallback((n: number) => setI(clampIndex(n)), [clampIndex]);
  const next = useCallback(() => setI((p) => clampIndex(p + 1)), [clampIndex]);
  const prev = useCallback(() => setI((p) => clampIndex(p - 1)), [clampIndex]);

  // rodyklės
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // DRAG tik ant H1
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    let startX = 0;
    let dx = 0;
    let dragging = false;

    // UX
    el.style.transition = "transform 360ms cubic-bezier(.22,.61,.36,1)";
    el.style.willChange = "transform";
    (el.style as any).touchAction = "pan-y";

    const onDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      el.setPointerCapture(e.pointerId);
      el.classList.add("dragging");
      el.style.transition = "none";
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      dx = e.clientX - startX;
      el.style.transform = `translate3d(${dx}px,0,0)`;
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove("dragging");
      el.releasePointerCapture(e.pointerId);

      // snap
      el.style.transition = "transform 360ms cubic-bezier(.22,.61,.36,1)";
      if (dx > 60) prev();
      else if (dx < -60) next();
      el.style.transform = "translate3d(0,0,0)";
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
        {/* drag tik čia */}
        <h1 ref={titleRef} className="hero-title" aria-live="polite">
          {cur.title}
        </h1>

        {/* dots lieka vietoje */}
        <div className="hero-dots" role="tablist" aria-label="Slides">
          {slides.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={i === idx}
              aria-controls={`slide-${idx}`}
              className={`dot ${i === idx ? "active" : ""}`}
              onClick={() => go(idx)}
            >
              <span className="visually-hidden">
                Slide {idx + 1} of {slides.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="hero-media" aria-hidden="true" />
    </section>
  );
}
