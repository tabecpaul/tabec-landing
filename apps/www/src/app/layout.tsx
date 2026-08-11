import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const OG_IMAGE = {
  url: "/tabec-logo.png",
  width: 1181,
  height: 591,
  alt: "타베크 TABEC 로고",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "타베크 Custom | 교회 맞춤 기념품 제작",
    template: "%s | 타베크 Custom",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "교회 기념품 제작",
    "교회 맞춤 기념품",
    "교회용품 주문생산",
    "기독교용품 주문제작",
    "교회 창립 기념품 맞춤제작",
    "기독교 선물용품 주문제작",
    "십자가 제작",
    "교회 굿즈 제작",
    "타베크",
    "TABEC",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "wac2QJdtHHJUIeVOkqkjusrqmeF69U8zVCm5coNU11E",
  },
  openGraph: {
    title: "타베크 Custom | 교회 맞춤 기념품 제작",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary",
    title: "타베크 Custom | 교회 맞춤 기념품 제작",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "타베크",
  alternateName: "TABEC",
  url: SITE_URL,
  logo: `${SITE_URL}/tabec-logo.png`,
  image: `${SITE_URL}/tabec-logo.png`,
  description: SITE_DESCRIPTION,
  telephone: "031-393-6101",
  email: "tabec@naver.com",
  taxID: "128-26-97778",
  address: {
    "@type": "PostalAddress",
    streetAddress: "오봉산단1로 12, 에이스비전 21 10층 1012호",
    addressLocality: "의왕시",
    addressRegion: "경기도",
    addressCountry: "KR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
