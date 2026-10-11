import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export type PortfolioItem = { id: string; title: string; category: string; img: string; link?: string | null; demo?: string; copyKey?: string; linkLabel?: string };

export default function PortfolioGrid({ items = [] as PortfolioItem[] }) {
  const { t } = useTranslation();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const isOpen = openIdx !== null;
  const current = openIdx !== null ? items[openIdx] : null;
  useEffect(() => {
    if (!isOpen) return;
    const modal = dialog.current;
    modal?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = opener.current;
    return () => { modal?.close(); document.body.style.overflow = previous; trigger?.focus(); };
  }, [isOpen]);
  const move = (direction: number) => setOpenIdx(index => index === null ? null : (index + direction + items.length) % items.length);
  return <section className="pf">
    <div className="pf-grid">
      {items.map((item, index) => <article key={item.id} className="pf-project">
        <button type="button" className="pf-card" aria-label={`${t("portfolio.open")} ${item.title}`} onClick={e => { opener.current = e.currentTarget; setOpenIdx(index); }}>
          <img src={item.img} alt={item.title} loading="lazy" decoding="async" className="pf-img cover" />
        </button>
        <div className="pf-details">
          <h2>{item.title}</h2>
          {item.copyKey && <><p className="pf-role">{t(`portfolio.${item.copyKey}.role`)}</p><p>{t(`portfolio.${item.copyKey}.description`)}</p></>}
          {item.demo && <p className="pf-note">{t("portfolio.previewNote")}</p>}
          <div className="pf-links">
            {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer">{t(`portfolio.${item.linkLabel || "viewSite"}`)} ↗</a>}
            {item.demo && <a href={item.demo} target="_blank" rel="noopener noreferrer">{t("portfolio.earlyDemo")} ↗</a>}
          </div>
        </div>
      </article>)}
    </div>
    {current && <dialog ref={dialog} className="portfolio-dialog" aria-label={current.title} onCancel={() => setOpenIdx(null)} onClick={e => { if (e.target === e.currentTarget) setOpenIdx(null); }} onKeyDown={e => { if (e.key === "ArrowRight") move(1); if (e.key === "ArrowLeft") move(-1); }}>
      <button className="pf-close" aria-label={t("portfolio.close")} onClick={() => setOpenIdx(null)}>×</button>
      <figure><img src={current.img} alt={current.title} className="dialog-img" /><figcaption>{current.title}{current.link && <a href={current.link} target="_blank" rel="noopener noreferrer"> {t(`portfolio.${current.linkLabel || "viewSite"}`)} ↗</a>}{current.copyKey && <p>{t(`portfolio.${current.copyKey}.role`)}</p>}{current.demo && <><p className="pf-note">{t("portfolio.previewNote")}</p><a href={current.demo} target="_blank" rel="noopener noreferrer">{t("portfolio.earlyDemo")} ↗</a></>}</figcaption></figure>
      {items.length > 1 && <div className="dialog-controls"><button onClick={() => move(-1)}>{t("portfolio.prev")}</button><span>{(openIdx ?? 0) + 1} / {items.length}</span><button onClick={() => move(1)}>{t("portfolio.next")}</button></div>}
    </dialog>}
  </section>;
}
