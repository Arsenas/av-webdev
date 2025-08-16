import { useState } from "react";

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  img: string;
  link?: string | null;
};

const cats = ["tutti", "logo", "web", "stampa"] as const;
type Category = (typeof cats)[number];

export default function PortfolioGrid({ items }: { items?: PortfolioItem[] }) {
  const [cat, setCat] = useState<Category>("tutti");
  const list = Array.isArray(items) ? items : [];

  const filtered = cat === "tutti" ? list : list.filter((i) => (i.category || "").toLowerCase() === cat);

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

      {filtered.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>Nessun elemento in “{cat.toUpperCase()}”.</p>
      ) : (
        <div className="pf-grid">
          {filtered.map((it) => {
            const isLogo = (it.category || "").toLowerCase() === "logo";
            return (
              <article className="pf-card" key={it.id}>
                {it.link ? (
                  <a href={it.link} target="_blank" rel="noopener noreferrer" className="pf-link">
                    <img
                      src={it.img}
                      alt={it.title}
                      loading="lazy"
                      decoding="async"
                      className={`pf-img ${isLogo ? "contain" : "cover"}`}
                      onError={(e) => {
                        console.warn("Missing image:", it.img);
                        (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
                      }}
                    />
                  </a>
                ) : (
                  <img
                    src={it.img}
                    alt={it.title}
                    loading="lazy"
                    decoding="async"
                    className={`pf-img ${isLogo ? "contain" : "cover"}`}
                    onError={(e) => {
                      console.warn("Missing image:", it.img);
                      (e.currentTarget as HTMLImageElement).style.opacity = "0.3";
                    }}
                  />
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
