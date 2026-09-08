import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export type ProductCardItem = {
  icon: ReactNode;
  title: string;
  text: string;
  href?: string;
  images?: string[];
};

export default function ProductCardGrid({ items }: { items: ProductCardItem[] }) {
  return (
    <div className="prod-grid">
      {items.map((item) => (
        <div className="prod-card" key={item.title}>
          {item.images && item.images.length > 0 ? (
            <div className="prod-photo">
              <Image src={item.images[0]} alt={item.title} fill sizes="(max-width: 640px) 100vw, 320px" style={{ objectFit: "cover" }} />
              {item.images.length > 1 && <span className="photo-count">+{item.images.length - 1}장</span>}
            </div>
          ) : (
            <div className="prod-icon">
              {item.icon}
              <span className="photo-badge">사진 준비중</span>
            </div>
          )}
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
