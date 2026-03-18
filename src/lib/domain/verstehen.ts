import type { CollectionEntry } from "astro:content";

/* types */

export type Vergleich = CollectionEntry<"vergleiche">;
export type Produkt = CollectionEntry<"produkte">;

/* ───────────────────────────────────────────── */
/* Vergleiche for Verstehen                      */
/* ───────────────────────────────────────────── */

export function getRelatedVergleicheForVerstehen(
  vergleiche: Vergleich[],
  slug: string,
  limit = 3
): Vergleich[] {

  const related = vergleiche.filter((v) =>
    v.data.themen?.includes(slug)
  );

  if (related.length > 0) {
    return related.slice(0, limit);
  }

  /* fallback */

  return vergleiche.slice(0, limit);

}

/* ───────────────────────────────────────────── */
/* Produkte for Verstehen                        */
/* ───────────────────────────────────────────── */

export function getRelatedProdukteForVerstehen(
  produkte: Produkt[],
  kategorie: string,
  limit = 3
): Produkt[] {

  const related = produkte.filter(
    (p) => p.data.kategorie === kategorie
  );

  if (related.length > 0) {
    return related.slice(0, limit);
  }

  /* fallback */

  return produkte.slice(0, limit);

}