import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CardNewsStrip from "@/components/CardNewsStrip";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { getCardNewsForSlug } from "@/lib/card-news";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const cardNewsSlides = await getCardNewsForSlug(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "타베크" },
  };

  return (
    <>
      <Header />
      <article className="post">
        <div className="container">
          <CardNewsStrip slides={cardNewsSlides} />
          <div className="post-header">
            <span className="post-date">{post.date}</span>
            <h1>{post.title}</h1>
          </div>
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Footer />
    </>
  );
}
