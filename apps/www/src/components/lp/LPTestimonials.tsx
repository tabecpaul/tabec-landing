import { LPTestimonial } from "@/lib/lp-types";

export default function LPTestimonials({
  tag,
  heading,
  intro,
  items,
}: {
  tag: string;
  heading: string;
  intro: string;
  items: LPTestimonial[];
}) {
  return (
    <section id="testimonials" className="products">
      <div className="container">
        <div className="sec-head">
          <span className="sec-tag">{tag}</span>
          <h2>{heading}</h2>
          <p>
            {intro} <em style={{ color: "#b08a3a", fontStyle: "normal" }}>(실제 후기로 순차 교체 예정)</em>
          </p>
        </div>
        <div className="testimonial-grid">
          {items.map((item) => (
            <div className="testimonial-card" key={item.quote}>
              <p className="testimonial-quote">“{item.quote}”</p>
              <p className="testimonial-author">{item.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
