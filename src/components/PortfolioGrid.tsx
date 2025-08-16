import { useState } from "react";

export type PortfolioItem = {
  id: string;
  title: string;
  category: "logo" | "web" | "stampa";
  img: string;
  link?: string | null;
};

const cats = ["tutti", "logo", "web", "stampa"] as const;
type Category = (typeof cats)[number];

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const [cat, setCat] = useState<Category>("tutti");

  const filtered = cat === "tutti" ? items : items.filter((i) => i.category === cat);

  return (
    <section className="pf">
      <div className="pf-tabs" role="tablist" aria-label="Categorie">
        {cats.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            className={`pf-tab ${cat === c ? "active" : ""}`}
            onClick={() => setCat(c)}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="pf-grid">
        {filtered.map((it) => {
          const media = (
            <img
              src={it.img}
              alt={it.title}
              loading="lazy"
              decoding="async"
              className={`pf-img ${it.category === "logo" ? "contain" : "cover"}`}
            />
          );
          return (
            <article className="pf-card" key={it.id}>
              {it.link ? (
                <a href={it.link} target="_blank" rel="noopener noreferrer" className="pf-link">
                  {media}
                </a>
              ) : (
                media
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
