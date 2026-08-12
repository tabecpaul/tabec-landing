import { LPCard } from "@/lib/lp-types";

export default function LPCardSection({
  id,
  tag,
  heading,
  intro,
  items,
  white,
}: {
  id: string;
  tag: string;
  heading: string;
  intro: string;
  items: LPCard[];
  white?: boolean;
}) {
  return (
    <section id={id} className={white ? "products" : undefined}>
      <div className="container">
        <div className="sec-head">
          <span className="sec-tag">{tag}</span>
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="diff-grid">
          {items.map((item) => (
            <div className="diff-card" key={item.title}>
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
