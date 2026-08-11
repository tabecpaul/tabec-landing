import Image from "next/image";

export default function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
          <Image src="/tabec-logo.png" alt="타베크 로고" width={1181} height={591} priority />
          <span>타베크</span>
        </div>
        <div className="nav-links">
          <a href="#about">회사소개</a>
          <a href="#process">진행절차</a>
          <a href="#products">제작 카테고리</a>
          <a href="#portfolio">납품 실적</a>
          <a href="#faq">FAQ</a>
          <a href="https://smartstore.naver.com/tabec" target="_blank" rel="noopener">
            소매구매(스마트스토어)
          </a>
        </div>
        <a href="#quote" className="nav-cta">
          무료 견적 받기
        </a>
      </nav>
    </header>
  );
}
