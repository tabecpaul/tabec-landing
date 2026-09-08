import ProductCardGrid from "./ProductCardGrid";
import { CommunionIcon, FigurineChurchIcon, PlateIcon, ResinCrossIcon, WoodCrossIcon } from "./icons";
import { getProductImages } from "@/lib/products";

const items = [
  { icon: <WoodCrossIcon />, title: "나무 십자가", text: "원목·티크 등 다양한 목재로 제작하는 클래식 십자가", imageSlug: "wood-cross" },
  { icon: <ResinCrossIcon />, title: "레진 십자가", text: "레진·아크릴 소재로 정교하게 캐스팅하는 십자가", imageSlug: "resin-cross" },
  {
    icon: <FigurineChurchIcon />,
    title: "조각상 / 예배당",
    text: "기도하는 인물 조각상, 교회 건물을 본뜬 미니어처 예배당",
    imageSlug: "figurine-church",
  },
  {
    icon: <CommunionIcon />,
    title: "성찬 컵 / 전병",
    text: "성찬컵·성찬떡·성찬전병 등 성찬식용 소모품·용기 제작",
    imageSlug: "communion",
  },
  { icon: <PlateIcon />, title: "기념접시", text: "창립·임직 기념일에 어울리는 각인·인쇄형 기념접시", imageSlug: "plate" },
];

export default function Products() {
  const cardItems = items.map(({ imageSlug, ...item }) => ({
    ...item,
    images: getProductImages(imageSlug),
  }));

  return (
    <section className="products" id="products">
      <div className="container">
        <div className="sec-head">
          <span className="sec-tag">Production Lineup</span>
          <h2>타베크 생산 라인업</h2>
          <p>아래 품목 외에도 원하시는 디자인의 기념품을 상담해 드립니다. (최소 주문 수량 1,000개 이상)</p>
        </div>
        <ProductCardGrid items={cardItems} />
      </div>
    </section>
  );
}
