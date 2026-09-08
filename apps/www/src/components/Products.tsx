import ProductCardGrid from "./ProductCardGrid";
import { ChurchIcon, CommunionIcon, CrossIcon, FigurineIcon, MugIcon, PlateIcon } from "./icons";

const items = [
  { icon: <CrossIcon />, title: "십자가", text: "목재·금속·아크릴 등 다양한 재질의 맞춤 십자가 제작" },
  {
    icon: <MugIcon />,
    title: "컵 / 머그",
    text: "교회 로고·행사 문구 인쇄가 가능한 도자기·스테인리스 컵",
  },
  { icon: <PlateIcon />, title: "기념접시", text: "창립·임직 기념일에 어울리는 각인·인쇄형 기념접시" },
  { icon: <ChurchIcon />, title: "미니어처 예배당", text: "교회 건물을 본뜬 정밀 미니어처 기념 조형물" },
  { icon: <FigurineIcon />, title: "기도상", text: "예배·기도하는 모습을 형상화한 인물 조형물" },
  { icon: <CommunionIcon />, title: "성찬품", text: "성찬컵·성찬떡·성찬전병 등 성찬식용 소모품·용기 제작" },
];

export default function Products() {
  return (
    <section className="products" id="products">
      <div className="container">
        <div className="sec-head">
          <span className="sec-tag">Product Categories</span>
          <h2>제작 가능 카테고리</h2>
          <p>아래 품목 외에도 원하시는 디자인의 기념품을 상담해 드립니다. (최소 주문 수량 1,000개 이상)</p>
        </div>
        <ProductCardGrid items={items} />
      </div>
    </section>
  );
}
