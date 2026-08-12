import type { PublishedCardNewsSlide } from "@/lib/card-news";

export default function CardNewsStrip({ slides }: { slides: PublishedCardNewsSlide[] }) {
  if (slides.length === 0) return null;

  return (
    <div className="card-news-strip">
      <div className="card-news-strip-track">
        {slides.map((slide, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.id}
            src={slide.image_url}
            alt={`카드뉴스 ${i + 1}/${slides.length}`}
            className="card-news-strip-img"
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
    </div>
  );
}
