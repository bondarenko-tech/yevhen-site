import type { CollectionEntry } from "astro:content";

export type Vergleich = CollectionEntry<"vergleiche">;

/* ───────────────────────────────────────────── */
/* Score                                         */
/* ───────────────────────────────────────────── */

function scoreVergleich(
  current: Vergleich,
  candidate: Vergleich
) {

  let score = 0;

  /* gleiche Kategorie */

  if (current.data.kategorie === candidate.data.kategorie) {
    score += 5;
  }

  /* tags (optional) */

  const tagsA = (current.data as any).tags as string[] | undefined;
  const tagsB = (candidate.data as any).tags as string[] | undefined;

  if (tagsA && tagsB) {

    const overlap = tagsA.filter((tag: string) =>
      tagsB.includes(tag)
    );

    score += overlap.length * 3;

  }

  /* title similarity */

  const titleA = current.data.title.toLowerCase();
  const titleB = candidate.data.title.toLowerCase();

  if (titleA.split(" ").some((w) => titleB.includes(w))) {
    score += 2;
  }

  return score;

}

/* ───────────────────────────────────────────── */
/* Related Engine                                */
/* ───────────────────────────────────────────── */

export function getRelatedVergleiche(
  all: Vergleich[],
  current: Vergleich,
  limit = 4
): Vergleich[] {

  const candidates = all
    .filter((v) => v.slug !== current.slug);

  const ranked = candidates.map((v) => ({
    entry: v,
    score: scoreVergleich(current, v),
  }));

  const sorted = ranked.sort((a, b) => b.score - a.score);

  const result = sorted
    .slice(0, limit)
    .map((r) => r.entry);

  if (result.length < limit) {

    const fallback = all
      .filter((v) => v.slug !== current.slug)
      .slice(0, limit - result.length);

    return [...result, ...fallback];

  }

  return result;

}