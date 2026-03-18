import type { NormalizedProduct, ProduktTyp } from "./types";
import { scoreProduct } from "./score";

/**
 * Ranking aller Produkte nach Score
 */
export function rankProducts(
  products: NormalizedProduct[],
  typ: ProduktTyp
) {
  return [...products]
    .map((p) => ({
      product: p,
      score: scoreProduct(p, typ).score
    }))
    .sort((a, b) => b.score - a.score)
    .map((p) => p.product);
}

/**
 * Top Produkt bestimmen
 */
export function pickTop(
  products: NormalizedProduct[],
  typ: ProduktTyp
): NormalizedProduct | null {

  if (!products.length) return null;

  // featured override
  const featured = products.find((p) => p.featured);
  if (featured) return featured;

  const ranked = rankProducts(products, typ);

  return ranked[0] ?? null;
}

/**
 * Weitere Empfehlungen
 */
export function pickWeitere(
  products: NormalizedProduct[],
  typ: ProduktTyp,
  top: NormalizedProduct | null,
  limit = 3
) {

  const ranked = rankProducts(products, typ);

  return ranked
    .filter((p) => p !== top)
    .slice(0, limit);
}