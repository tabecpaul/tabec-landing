import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import QuoteSection from "@/components/QuoteSection";
import ProductCardGrid from "@/components/ProductCardGrid";
import { getLatestPostByCategory } from "@/lib/blog";
import { LPContent } from "@/lib/lp-types";
import LPHero from "./LPHero";
import LPCardSection from "./LPCardSection";
import LPSolution from "./LPSolution";
import LPTestimonials from "./LPTestimonials";
import LPFaq from "./LPFaq";

export default function LPTemplate({ content }: { content: LPContent }) {
  const proofPost = getLatestPostByCategory(content.portfolio.category);

  return (
    <>
      <Header />
      <LPHero {...content.hero} />
      <TrustBar />
      <LPCardSection
        id="problem"
        tag={content.problem.tag}
        heading={content.problem.heading}
        intro={content.problem.intro}
        items={content.problem.points}
      />
      <LPSolution {...content.solution} />
      <LPCardSection id="benefits" white {...content.benefits} />
      <section id="portfolio">
        <div className="container">
          <div className="sec-head">
            <span className="sec-tag">Case Study</span>
            <h2>{content.portfolio.title}</h2>
            <p>{content.portfolio.text}</p>
          </div>
          <ProductCardGrid
            items={[
              {
                icon: content.portfolio.icon,
                title: content.portfolio.title,
                text: content.portfolio.text,
                href: proofPost ? `/blog/${proofPost.slug}` : undefined,
              },
            ]}
          />
        </div>
      </section>
      <LPTestimonials {...content.testimonials} />
      <QuoteSection {...content.cta} />
      <LPFaq {...content.faq} />
      <Footer />
    </>
  );
}
