import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPostsMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "블로그",
  description: "타베크의 교회·기독교 기관 맞춤 기념품 제작 사례와 이야기를 소개합니다.",
};

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();

  return (
    <>
      <Header />
      <section>
        <div className="container">
          <div className="sec-head">
            <span className="sec-tag">Blog</span>
            <h2>타베크 블로그</h2>
            <p>제작 사례와 교회 기념품에 대한 이야기를 전합니다.</p>
          </div>
          {posts.length === 0 ? (
            <p className="blog-empty">아직 등록된 글이 없습니다.</p>
          ) : (
            <div className="blog-list">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                  <span className="blog-date">{post.date}</span>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
