import type { ReactNode } from "react";

type Props = {
  label: string; // "PROFILO" | "LISTINO" | "PORTFOLIO" | "CONTATTI"
  title?: ReactNode; // optional didesnė antraštė
  desc?: ReactNode; // optional aprašas po antrašte
  className?: string;
};

export default function SectionTitle({ label, title, desc, className }: Props) {
  return (
    <header className={`section-title ${className ?? ""}`.trim()}>
      <span className="section-label">{label}</span>
      {title ? <h2 className="section-h2">{title}</h2> : null}
      {desc ? <p className="section-desc">{desc}</p> : null}
    </header>
  );
}
