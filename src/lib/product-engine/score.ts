import type { NormalizedProduct, ProduktTyp } from "./types";
import { getSegment } from "./segment";

export type ScoreResult = {
  score: number;
  segment: ReturnType<typeof getSegment>;
  reasons: string[];
};

/* trusted brands boost */

const TRUSTED_BRANDS = [
  "brennenstuhl",
  "avm",
  "devolo",
  "tp-link",
  "hama",
  "dahua",
];

function normalizeBrand(name?: string) {
  return name?.toLowerCase().trim();
}

/* freshness */

function getFreshnessBoost(date?: string) {

  if (!date) return 0;

  const published = new Date(date).getTime();
  const now = Date.now();

  const days = (now - published) / (1000 * 60 * 60 * 24);

  if (days < 7) return 6;
  if (days < 30) return 4;
  if (days < 90) return 2;

  return 0;
}

export function scoreProduct(
  p: NormalizedProduct,
  typ: ProduktTyp
): ScoreResult {

  let score = 0;
  const reasons: string[] = [];

  const seg = getSegment(typ, p.preis);

  /* featured */

  if (p.featured) {
    score += 30;
    reasons.push("featured");
  }

  /* affiliate */

  if (p.linkExtern) {
    score += 15;
    reasons.push("affiliate-link");
  }

  /* video */

  if (p.videoShortId || p.videoMainId) {
    score += 12;
    reasons.push("video");
  }

  /* content richness */

  if (p.kurzfakten?.length) {
    score += Math.min(10, p.kurzfakten.length);
    reasons.push("kurzfakten");
  }

  if (p.specs?.length) {
    score += Math.min(8, p.specs.length);
    reasons.push("specs");
  }

  if (p.teaser) {
    score += 5;
    reasons.push("teaser");
  }

  /* price sanity */

  if (typeof p.preis === "number") {
    score += 6;
    reasons.push("has-price");
  }

  /* segment boost */

  if (seg === "premium") {
    score += 4;
    reasons.push("premium-segment");
  }

  if (seg === "budget") {
    score += 2;
    reasons.push("budget-segment");
  }

  /* brand trust */

  const brand = normalizeBrand(p.brand?.name);

  if (brand && TRUSTED_BRANDS.includes(brand)) {
    score += 6;
    reasons.push("trusted-brand");
  }

  /* freshness */

  const freshness = getFreshnessBoost(p.datum);

  if (freshness > 0) {
    score += freshness;
    reasons.push("fresh");
  }

  /* tags relevance */

  if (p.tags?.length) {
    score += Math.min(6, p.tags.length);
    reasons.push("tags");
  }

  /* penalty for empty products */

  if (!p.kurzfakten && !p.specs) {
    score -= 5;
    reasons.push("thin-content");
  }

  return {
    score,
    segment: seg,
    reasons
  };

}