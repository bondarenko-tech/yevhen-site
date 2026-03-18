import type { CollectionEntry } from "astro:content";

/* ───────────────────────────────────────────── */
/* Types                                        */
/* ───────────────────────────────────────────── */

export interface InternalLinkOptions {
  limit?: number;
  allowDifferentCategory?: boolean;
}

/* ───────────────────────────────────────────── */
/* Helpers                                      */
/* ───────────────────────────────────────────── */

function getBrandName(
  brand: string | { name: string } | undefined
): string | null {

  if (!brand) return null;

  if (typeof brand === "string") {
    return brand;
  }

  if (typeof brand === "object" && "name" in brand) {
    return brand.name;
  }

  return null;
}

/* ───────────────────────────────────────────── */
/* Relevance Score                              */
/* ───────────────────────────────────────────── */

function scoreProduct(
  current: CollectionEntry<"produkte">,
  candidate: CollectionEntry<"produkte">
): number {

  let score = 0;

  /* gleiche Kategorie */

  if (current.data.kategorie === candidate.data.kategorie) {
    score += 6;
  }

  /* gleicher Typ */

  if (
    current.data.typ &&
    candidate.data.typ &&
    current.data.typ === candidate.data.typ
  ) {
    score += 4;
  }

  /* gemeinsame Tags */

  if (current.data.tags && candidate.data.tags) {

    const overlap = current.data.tags.filter((tag) =>
      candidate.data.tags?.includes(tag)
    );

    score += overlap.length * 2;
  }

  /* gleiche Marke */

  const currentBrand = getBrandName(current.data.brand);
  const candidateBrand = getBrandName(candidate.data.brand);

  if (currentBrand && candidateBrand && currentBrand === candidateBrand) {
    score += 2;
  }

  /* featured boost */

  if (candidate.data.featured) {
    score += 3;
  }

  return score;
}

/* ───────────────────────────────────────────── */
/* Diversity Filter                             */
/* ───────────────────────────────────────────── */

function uniqueBySlug(
  items: { entry: CollectionEntry<"produkte">; score: number }[]
) {

  const seen = new Set<string>();

  return items.filter((item) => {

    if (seen.has(item.entry.slug)) return false;

    seen.add(item.entry.slug);

    return true;

  });

}

/* ───────────────────────────────────────────── */
/* Internal Linking Engine                      */
/* ───────────────────────────────────────────── */

export function buildInternalLinks(
  all: CollectionEntry<"produkte">[],
  current: CollectionEntry<"produkte">,
  options: InternalLinkOptions = {}
): CollectionEntry<"produkte">[] {

  const limit = options.limit ?? 4;

  let candidates = all.filter((p) => p.slug !== current.slug);

  /* optional category restriction */

  if (!options.allowDifferentCategory) {
    candidates = candidates.filter(
      (p) => p.data.kategorie === current.data.kategorie
    );
  }

  const ranked = candidates.map((p) => ({
    entry: p,
    score: scoreProduct(current, p)
  }));

  const unique = uniqueBySlug(ranked);

  const sorted = unique.sort((a, b) => {

    if (b.score === a.score) {
      return a.entry.slug.localeCompare(b.entry.slug);
    }

    return b.score - a.score;

  });

  const result = sorted
    .slice(0, limit)
    .map((c) => c.entry);

  /* fallback если мало продуктов */

  if (result.length < limit) {

    const fallback = all
      .filter((p) => p.slug !== current.slug)
      .slice(0, limit - result.length);

    return [...result, ...fallback];

  }

  return result;

}