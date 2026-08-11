const timeline = [
  {
    year: "20XX",
    text: "회사 설립 및 사업자 등록",
    note: "※ 실제 연도로 교체 예정",
  },
  { year: "20XX", text: "해외 생산 네트워크(중국·인도네시아·대만·홍콩) 구축" },
  { year: "20XX", text: "기독교 백화점·교회 정기 납품 개시" },
  { year: "2026", text: "교회·기독교 기관 대상 맞춤 제작(주문제작) 서비스 확장" },
];

const differentiators = [
  {
    icon: "🏭",
    title: "검증된 해외 생산 네트워크",
    text: "중국, 인도네시아, 대만, 홍콩 외 20년간 직접 검증한 해외 공장들과 협력해 품질을 철저히 관리합니다.",
  },
  {
    icon: "🎨",
    title: "디자인 자유도",
    text: "정해진 템플릿이 아닌, 교회/기관이 원하는 디자인으로 제작합니다.",
  },
  {
    icon: "💰",
    title: "가격 경쟁력",
    text: "해외 직생산 구조로 국내 제작 대비 합리적인 단가를 제공합니다.",
  },
];

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="sec-head">
          <span className="sec-tag">About Us</span>
          <h2>회사 소개</h2>
          <p>20년간 기독교 선물용품을 해외에서 생산해 온 타베크의 발자취입니다.</p>
        </div>
        <div className="about-grid">
          <div className="about-col">
            <h3>회사 연혁</h3>
            <ul className="timeline">
              {timeline.map((item) => (
                <li key={item.year + item.text}>
                  <span className="year">{item.year}</span>
                  <p>
                    {item.text} {item.note && <em>{item.note}</em>}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="about-col">
            <h3>왜 타베크인가</h3>
            <div className="diff-grid about-diff">
              {differentiators.map((item) => (
                <div className="diff-card" key={item.title}>
                  <div className="icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
