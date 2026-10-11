import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import data from "../data/portfolio.json";
import NotFound from "./NotFound";

export default function Project() {
  const { projectId } = useParams();
  const { t } = useTranslation();
  const index = data.findIndex(project => project.id === projectId);
  const project = data[index];
  if (!project) return <NotFound />;
  const next = data[(index + 1) % data.length];
  return <article className="project-page full-bleed" aria-labelledby="project-title">
    <Link className="project-back" to="/portfolio">{t("portfolio.back")}</Link>
    <header className="project-heading">
      <p className="project-kicker">{t(`portfolio.${project.copyKey}.role`)}</p>
      <h1 id="project-title">{project.title}</h1>
      <p className="project-lead">{t(`portfolio.${project.copyKey}.description`)}</p>
    </header>
    <figure className="project-preview">
      <img src={project.img} alt={`${project.title} — ${project.demo ? "early shopping assistant interface" : "website preview"}`} fetchPriority="high" />
      {project.demo && <figcaption>{t("portfolio.previewNote")}</figcaption>}
    </figure>
    <div className="project-information">
      <aside className="project-meta">
        <h2>{t("portfolio.myRole")}</h2>
        <p>{t(`portfolio.${project.copyKey}.role`)}</p>
        <div className="pf-links">
          <a href={project.link} target="_blank" rel="noopener noreferrer">{t(`portfolio.${project.linkLabel}`)}</a>
          {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">{t("portfolio.earlyDemo")}</a>}
        </div>
      </aside>
      <section className="project-story">
        <h2>{t("portfolio.aboutProject")}</h2>
        <p>{t(`portfolio.${project.copyKey}.overview`)}</p>
        <p>{t(`portfolio.${project.copyKey}.contribution`)}</p>
      </section>
    </div>
    <nav className="project-navigation" aria-label="Project navigation">
      <Link className="project-back" to="/portfolio">{t("portfolio.back")}</Link>
      <Link className="project-next" to={`/portfolio/${next.id}`}>{t("portfolio.nextProject")}: {next.title}</Link>
    </nav>
  </article>;
}
