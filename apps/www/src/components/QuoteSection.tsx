import QuoteForm from "./QuoteForm";

export default function QuoteSection({
  heading = "무료 견적 요청",
  intro = "아래 내용을 작성해 주시면 확인 후 이메일로 견적을 회신해 드립니다.",
}: {
  heading?: string;
  intro?: string;
}) {
  return (
    <section className="quote" id="quote">
      <div className="container">
        <div className="sec-head">
          <span className="sec-tag">Get a Quote</span>
          <h2>{heading}</h2>
          <p>{intro}</p>
        </div>
        <div className="quote-wrap">
          <div className="moq-note">
            ⚠️ 본 서비스는 최소 주문 수량(MOQ) <strong>1,000개 이상</strong>부터 제작이 가능합니다.
          </div>
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
