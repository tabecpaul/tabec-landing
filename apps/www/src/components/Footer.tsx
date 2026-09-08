import { getLogoSrc } from "@/lib/logo";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={getLogoSrc()} alt="타베크 로고" />
          <span style={{ color: "#c9a35d" }}>Custom</span>
        </div>
        <p>20년 기독교 선물용품 수입·제작 경력 | 문의: tabec@naver.com</p>
        <a
          href="https://smartstore.naver.com/tabec"
          target="_blank"
          rel="noopener"
          className="footer-link-box"
        >
          소매 구매는 타베크 스마트스토어에서 →
        </a>
        <p>사업자등록번호 128-26-97778 | 경기도 의왕시 오봉산단1로 12, 에이스비전 21 10층 1012호 | 031-393-6101</p>
        <p className="copyright">© 2026 타베크. All rights reserved.</p>
      </div>
    </footer>
  );
}
