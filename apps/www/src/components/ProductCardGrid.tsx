"use client";

import { ReactNode, useEffect, useState } from "react";
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
  const [lightbox, setLightbox] = useState<{ title: string; images: string[]; index: number } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((cur) => (cur ? { ...cur, index: (cur.index + 1) % cur.images.length } : cur));
      if (e.key === "ArrowLeft") setLightbox((cur) => (cur ? { ...cur, index: (cur.index - 1 + cur.images.length) % cur.images.length } : cur));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  return (
    <div className="prod-grid">
      {items.map((item) => (
        <div className="prod-card" key={item.title}>
          {item.images && item.images.length > 0 ? (
            <button
              type="button"
              className="prod-photo"
              onClick={() => setLightbox({ title: item.title, images: item.images!, index: 0 })}
              aria-label={`${item.title} 사진 크게 보기`}
            >
              <Image src={item.images[0]} alt={item.title} fill sizes="(max-width: 640px) 100vw, 320px" style={{ objectFit: "contain" }} />
              {item.images.length > 1 && <span className="photo-count">+{item.images.length - 1}장</span>}
            </button>
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

      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button type="button" className="lightbox-close" onClick={() => setLightbox(null)} aria-label="닫기">
            ✕
          </button>
          {lightbox.images.length > 1 && (
            <button
              type="button"
              className="lightbox-nav lightbox-prev"
              aria-label="이전 사진"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((cur) => (cur ? { ...cur, index: (cur.index - 1 + cur.images.length) % cur.images.length } : cur));
              }}
            >
              ‹
            </button>
          )}
          <div className="lightbox-body" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-image-wrap">
              <Image
                src={lightbox.images[lightbox.index]}
                alt={`${lightbox.title} ${lightbox.index + 1}`}
                fill
                sizes="90vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="lightbox-caption">
              {lightbox.title} ({lightbox.index + 1}/{lightbox.images.length})
            </p>
          </div>
          {lightbox.images.length > 1 && (
            <button
              type="button"
              className="lightbox-nav lightbox-next"
              aria-label="다음 사진"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((cur) => (cur ? { ...cur, index: (cur.index + 1) % cur.images.length } : cur));
              }}
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  );
}
