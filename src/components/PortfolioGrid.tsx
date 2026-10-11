import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export type PortfolioItem = { id: string; title: string; category: string; img: string; link?: string | null };

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
      {items.map((item, index) => <button key={item.id} type="button" className="pf-card" aria-label={`${t("portfolio.open")} ${item.title}`} onClick={e => { opener.current = e.currentTarget; setOpenIdx(index); }}>
        <img src={item.img} alt={item.title} loading="lazy" decoding="async" className="pf-img cover" />
      </button>)}
    </div>
    {current && <dialog ref={dialog} className="portfolio-dialog" aria-label={current.title} onCancel={() => setOpenIdx(null)} onClick={e => { if (e.target === e.currentTarget) setOpenIdx(null); }} onKeyDown={e => { if (e.key === "ArrowRight") move(1); if (e.key === "ArrowLeft") move(-1); }}>
      <button className="pf-close" aria-label={t("portfolio.close")} onClick={() => setOpenIdx(null)}>×</button>
      <figure><img src={current.img} alt={current.title} className="dialog-img" /><figcaption>{current.title}{current.link && <a href={current.link} target="_blank" rel="noopener noreferrer"> {t("portfolio.viewSite")} ↗</a>}</figcaption></figure>
      {items.length > 1 && <div className="dialog-controls"><button onClick={() => move(-1)}>{t("portfolio.prev")}</button><span>{(openIdx ?? 0) + 1} / {items.length}</span><button onClick={() => move(1)}>{t("portfolio.next")}</button></div>}
    </dialog>}
  </section>;
}
