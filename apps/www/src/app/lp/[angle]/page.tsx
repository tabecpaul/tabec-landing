import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LPTemplate from "@/components/lp/LPTemplate";
import { getAllLPSlugs, getLPContent } from "@/lib/lp";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return getAllLPSlugs().map((angle) => ({ angle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ angle: string }>;
}): Promise<Metadata> {
  const { angle } = await params;
  const content = getLPContent(angle);
  if (!content) return {};

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `${SITE_URL}/lp/${angle}` },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    openGraph: {
      title: `${content.metaTitle} | 타베크 Custom`,
      description: content.metaDescription,
      url: `${SITE_URL}/lp/${angle}`,
      type: "website",
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ angle: string }>;
}) {
  const { angle } = await params;
  const content = getLPContent(angle);
  if (!content) notFound();

  return <LPTemplate content={content} />;
}
