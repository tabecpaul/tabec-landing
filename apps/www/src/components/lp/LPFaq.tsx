import { LPFaqItem } from "@/lib/lp-types";

export default function LPFaq({ heading, items }: { heading: string; items: LPFaqItem[] }) {
  return (
    <section id="faq">
      <div className="container">
        <div className="sec-head">
          <span className="sec-tag">FAQ</span>
          <h2>{heading}</h2>
        </div>
        {items.map((item) => (
          <div className="faq-item" key={item.q}>
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
