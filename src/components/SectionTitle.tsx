import React from "react";

type SectionTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  label: string;
  as?: "h1" | "h2" | "h3";
};

export default function SectionTitle({ label, as = "h1", id, className = "", ...rest }: SectionTitleProps) {
  const Tag = as;
  return (
    <Tag id={id} className={`section-title ${className}`.trim()} {...rest}>
      {label}
    </Tag>
  );
}
