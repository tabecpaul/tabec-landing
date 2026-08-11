import { ReactNode } from "react";

export type ProductCardItem = {
  icon: ReactNode;
  title: string;
  text: string;
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
          </div>
        </div>
      ))}
    </div>
  );
}
