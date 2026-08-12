import { ReactNode } from "react";

export type LPCard = {
  icon: ReactNode;
  title: string;
  text: string;
};

export type LPTestimonial = {
  quote: string;
  author: string;
};

export type LPFaqItem = {
  q: string;
  a: string;
};

export type LPContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    tag: string;
    catchphrase: string;
    title: ReactNode;
    description: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
  };
  problem: {
    tag: string;
    heading: string;
    intro: string;
    points: LPCard[];
  };
  solution: {
    tag: string;
    heading: string;
    intro: string;
    steps: { title: string; text: string }[];
  };
  benefits: {
    tag: string;
    heading: string;
    intro: string;
    items: LPCard[];
  };
  portfolio: {
    category: string;
    icon: ReactNode;
    title: string;
    text: string;
  };
  testimonials: {
    tag: string;
    heading: string;
    intro: string;
    items: LPTestimonial[];
  };
  cta: {
    heading: string;
    intro: string;
  };
  faq: {
    heading: string;
    items: LPFaqItem[];
  };
};
