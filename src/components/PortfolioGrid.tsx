import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export type PortfolioItem = { id: string; title: string; category: string; img: string; link?: string | null; demo?: string; copyKey?: string; linkLabel?: string };

export default function PortfolioGrid({ items = [] as PortfolioItem[] }) {
  const { t } = useTranslation();
  return <div className="pf-grid">
    {items.map(item => <article key={item.id} className="pf-project">
      <Link className="pf-card" to={`/portfolio/${item.id}`} aria-label={`${t("portfolio.open")} ${item.title}`}>
        <img src={item.img} alt={item.title} loading="lazy" decoding="async" className="pf-img cover" />
      </Link>
      <div className="pf-details">
        <h2><Link className="pf-title-link" to={`/portfolio/${item.id}`}>{item.title}</Link></h2>
        {item.copyKey && <><p className="pf-role">{t(`portfolio.${item.copyKey}.role`)}</p><p>{t(`portfolio.${item.copyKey}.description`)}</p></>}
        <Link className="pf-read-more" to={`/portfolio/${item.id}`}>{t("portfolio.readMore")}</Link>
      </div>
    </article>)}
  </div>;
}
