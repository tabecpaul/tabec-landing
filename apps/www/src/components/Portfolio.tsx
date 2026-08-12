import ProductCardGrid from "./ProductCardGrid";
import { ChurchIcon, CrossIcon, MugIcon, PlateIcon } from "./icons";
import { getLatestPostByCategory } from "@/lib/blog";

const items = [
  {
    icon: <CrossIcon />,
    title: "십자가 납품 사례",
    text: "교회 창립 기념으로 제작한 맞춤 십자가",
    category: "십자가",
  },
  {
    icon: <MugIcon />,
    title: "컵 / 머그 납품 사례",
    text: "교회 행사 기념품으로 제작한 로고 인쇄 컵",
    category: "컵 / 머그",
  },
  {
    icon: <PlateIcon />,
    title: "기념접시 납품 사례",
    text: "노회 임직 기념으로 제작한 각인 기념접시",
    category: "기념접시",
  },
  {
    icon: <ChurchIcon />,
    title: "미니어처 예배당 납품 사례",
    text: "교회 창립 기념으로 제작한 정밀 미니어처 조형물",
    category: "미니어처 예배당",
  },
];

export default function Portfolio() {
  const cardItems = items.map(({ category, ...item }) => {
    const post = getLatestPostByCategory(category);
    return {
      ...item,
      href: post ? `/blog/${post.slug}` : undefined,
    };
  });

  return (
    <section id="portfolio">
      <div className="container">
        <div className="sec-head">
          <span className="sec-tag">Our Work</span>
          <h2>납품 실적</h2>
          <p>
            타베크가 그동안 교회·기독교 기관에 납품해 온 맞춤 제작 사례입니다.{" "}
            <em style={{ color: "#b08a3a", fontStyle: "normal" }}>(실제 납품 사진으로 순차 교체 예정)</em>
          </p>
        </div>
        <ProductCardGrid items={cardItems} />
      </div>
    </section>
  );
}
