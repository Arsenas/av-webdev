import { useEffect, useState, useCallback } from "react";

type Slide = { title: string };
const slides: Slide[] = [
  { title: "I specialize in graphic design and website development, visual identity, and corporate branding." },
  { title: "I want my clients to be proud of me and the work I do. That’s what makes me happy." },
  {
    title:
      "I like getting to know the client, their way of doing things, and figuring out the style that best fits their field.",
  },
];

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

  const cur = slides[i];

  return (
    <section className="hero" aria-label="Intro">
      <div className="hero-text">
        <h1 className="hero-title" aria-live="polite">
          {cur.title}
        </h1>

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

      {/* Fonas ir gradientas daromi CSS'e */}
      <div className="hero-media" aria-hidden="true" />
    </section>
  );
}
