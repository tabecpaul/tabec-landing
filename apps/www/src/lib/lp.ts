import { LPContent } from "@/lib/lp-types";
import { content as churchVisitGift } from "@/content/lp/church-visit-gift";
import { content as churchAnniversaryGift } from "@/content/lp/church-anniversary-gift";

const registry: Record<string, LPContent> = {
  [churchVisitGift.slug]: churchVisitGift,
  [churchAnniversaryGift.slug]: churchAnniversaryGift,
};

export function getLPContent(slug: string): LPContent | null {
  return registry[slug] ?? null;
}

export function getAllLPSlugs(): string[] {
  return Object.keys(registry);
}
