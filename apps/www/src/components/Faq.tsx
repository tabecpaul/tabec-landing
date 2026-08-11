const faqs = [
  {
    q: "최소 주문 수량(MOQ)은 얼마인가요?",
    a: "품목당 최소 1,000개부터 제작이 가능합니다. 수량이 많을수록 단가는 낮아집니다.",
  },
  {
    q: "제작 기간은 얼마나 걸리나요?",
    a: "품목과 수량에 따라 상이하며, 샘플 확정 후 평균 4~8주가 소요됩니다. 행사 일정이 있다면 미리 문의해 주세요.",
  },
  {
    q: "샘플을 받아볼 수 있나요?",
    a: "본 생산 전 디자인 시안 및 샘플 렌더링 이미지를 확인하실 수 있으며, 실물 샘플 제작은 별도 비용 협의를 통해 진행됩니다.",
  },
  {
    q: "해외 한인교회도 신청 가능한가요?",
    a: "네, 가능합니다. 미주·호주 등 해외 한인교회 납품 경험이 있으며, 국제 배송 견적도 함께 안내해 드립니다.",
  },
];

export default function Faq() {
  return (
    <section id="faq">
      <div className="container">
        <div className="sec-head">
          <span className="sec-tag">FAQ</span>
          <h2>자주 묻는 질문</h2>
        </div>
        {faqs.map((item) => (
          <div className="faq-item" key={item.q}>
            <h3>{item.q}</h3>
            <p>{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
