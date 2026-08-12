import { ReactNode } from "react";
import Link from "next/link";

export type ProductCardItem = {
  icon: ReactNode;
  title: string;
  text: string;
  href?: string;
};

export default function ProductCardGrid({ items }: { items: ProductCardItem[] }) {
  return (
    <div className="prod-grid">
      {items.map((item) => (
        <div className="prod-card" key={item.title}>
          <div className="prod-icon">
            {item.icon}
            <span className="photo-badge">사진 준비중</span>
          </div>
          <div className="prod-info">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            {item.href && (
              <Link href={item.href} className="prod-more">
                자세히 보기 →
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
