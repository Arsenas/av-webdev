import { useEffect, useState, useCallback } from "react";

type Slide = { title: string; img?: string };

const slides: Slide[] = [
  { title: "grafica & web", img: "/hero-1.jpg" },
  { title: "identità visiva", img: "/hero-2.jpg" },
  { title: "siti web", img: "/hero-3.jpg" },
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
    <section className="hero">
      <div className="hero-text">
        <h1 className="hero-title">{cur.title}</h1>

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

      <div
        id={`slide-${i}`}
        className="hero-media"
        style={{ ["--hero-img" as any]: cur.img ? `url(${cur.img})` : "none" }}
        aria-hidden="true"
      />
    </section>
  );
}
