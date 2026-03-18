import type { NormalizedProduct } from "./types";
import { scoreProduct } from "./score";

export function pickCategoryWinners(
  products: NormalizedProduct[],
  typ: any
) {
  if (!products.length) {
    return {
      top: null,
      preisLeistung: null,
      sorted: [],
    };
  }

  // сортируем по score
  const scored = products
    .map((p) => ({
      product: p,
      score: scoreProduct(p, typ).score,
    }))
    .sort((a, b) => b.score - a.score);

  const sorted = scored.map((x) => x.product);

  const top = sorted[0] ?? null;

  // Preis-Leistungs-Tipp = лучший среди budget или mid
  const preisLeistung =
    sorted.find(
      (p) =>
        p.preis &&
        p.preis < 120 // можно потом автоматизировать по typ
    ) ?? null;

  return {
    top,
    preisLeistung,
    sorted,
  };
}