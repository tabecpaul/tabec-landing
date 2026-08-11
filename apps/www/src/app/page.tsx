import About from "@/components/About";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Products from "@/components/Products";
import QuoteSection from "@/components/QuoteSection";
import TrustBar from "@/components/TrustBar";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <TrustBar />
      <About />
      <Process />
      <Products />
      <Portfolio />
      <QuoteSection />
      <Faq />
      <Footer />
    </>
  );
}
