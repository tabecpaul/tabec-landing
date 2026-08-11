const steps = [
  { title: "디자인 업로드", text: "교회 로고, 문구, 원하는 디자인 시안을 보내주세요." },
  {
    title: "실무 미팅",
    text: "무료 견적 요청 후 대면 또는 화상 미팅으로 구체적인 요구사항을 논의합니다.",
  },
  { title: "견적 산정", text: "수량, 재질, 납기에 맞춘 맞춤 견적을 안내해 드립니다." },
  { title: "샘플 확인", text: "생산 전 샘플 이미지·실물로 최종 디자인을 확정합니다." },
  { title: "생산 및 납품", text: "검증된 해외 공장에서 생산 후 지정 장소로 납품합니다." },
];

export default function Process() {
  return (
    <section id="process">
      <div className="container">
        <div className="sec-head">
          <span className="sec-tag">How it works</span>
          <h2>진행 절차</h2>
          <p>디자인 업로드부터 납품까지, 타베크가 전 과정을 함께합니다.</p>
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
