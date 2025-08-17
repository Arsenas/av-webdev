import React from "react";

type PageBGProps = React.HTMLAttributes<HTMLDivElement> & {
  src: string;
  /** CSS background-position */
  position?: string;
  /** CSS background-size */
  fit?: "cover" | "contain";
};

export default function PageBG({
  src,
  position = "right center",
  fit = "cover",
  className = "",
  style,
  ...rest
}: PageBGProps) {
  return (
    <div
      // aria-hidden galima perrašyti iš tėvinio, bet default – true
      aria-hidden="true"
      className={`pagebg ${className}`.trim()}
      style={{
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: position,
        backgroundSize: fit,
        ...style,
      }}
      {...rest}
    />
  );
}
