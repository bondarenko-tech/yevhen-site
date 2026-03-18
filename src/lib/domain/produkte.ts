import type { CollectionEntry } from "astro:content";

export function filterByKategorie(
  produkte: CollectionEntry<"produkte">[],
  kategorie: string
) {
  return produkte.filter((p) => p.data.kategorie === kategorie);
}

export function findBySlug(
  produkte: CollectionEntry<"produkte">[],
  slug: string
) {
  return produkte.find((p) => p.slug === slug);
}