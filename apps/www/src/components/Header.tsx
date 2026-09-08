import Link from "next/link";
import { getLogoSrc } from "@/lib/logo";

export default function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={getLogoSrc()} alt="타베크 로고" />
          <span>타베크</span>
        </div>
        <div className="nav-links">
          <Link href="/#about">회사소개</Link>
          <Link href="/#process">진행절차</Link>
          <Link href="/#products">생산 라인업</Link>
          <Link href="/#portfolio">납품 실적</Link>
          <Link href="/blog">블로그</Link>
          <Link href="/#faq">FAQ</Link>
          <a href="https://smartstore.naver.com/tabec" target="_blank" rel="noopener">
            소매구매(스마트스토어)
          </a>
        </div>
        <Link href="/#quote" className="nav-cta">
          무료 견적 받기
        </Link>
      </nav>
    </header>
  );
}
