export default function LPSolution({
  tag,
  heading,
  intro,
  steps,
}: {
  tag: string;
  heading: string;
  intro: string;
  steps: { title: string; text: string }[];
}) {
  return (
    <section id="solution">
      <div className="container">
        <div className="sec-head">
          <span className="sec-tag">{tag}</span>
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="process-grid">
          {steps.map((step, i) => (
            <div className="process-card" key={step.title}>
              <div className="process-num">{i + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
