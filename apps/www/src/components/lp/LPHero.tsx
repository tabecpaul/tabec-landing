import { ReactNode } from "react";

export default function LPHero({
  tag,
  catchphrase,
  title,
  description,
  primaryCtaLabel,
  secondaryCtaLabel,
}: {
  tag: string;
  catchphrase: string;
  title: ReactNode;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
}) {
  return (
    <section className="hero">
      <div className="container">
        <span className="hero-tag">{tag}</span>
        <p className="catchphrase">{catchphrase}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="btn-row">
          <a href="#quote" className="btn btn-primary">
            {primaryCtaLabel}
          </a>
          <a href="#portfolio" className="btn btn-outline">
            {secondaryCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
