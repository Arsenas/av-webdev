import { useEffect, useState, useCallback } from "react";

type Slide = { title: string };
const slides: Slide[] = [{ title: "grafica & web" }, { title: "identità visiva" }, { title: "siti web" }];

export default function Hero() {
  const [i, setI] = useState(0);
  const go = useCallback((n: number) => setI(((n % slides.length) + slides.length) % slides.length), []);
  const next = useCallback(() => setI((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setI((p) => (p + slides.length - 1) % slides.length), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <section className="hero">
      <div className="hero-text">
        <h1 className="hero-title">{slides[i].title}</h1>

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

      <div className="hero-media" id={`slide-${i}`}>
        <img
          src="/hero-3.jpg" /* mobile default */
          srcSet="
            /hero-3.jpg 640w,                      /* mobile */
            /hero-2.jpg 960w,                      /* tablet */
            /hero-1.jpg 1440w                      /* desktop */
          "
          sizes="(min-width: 1024px) 45vw, (min-width: 640px) 80vw, 100vw"
          alt=""
          decoding="async"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
