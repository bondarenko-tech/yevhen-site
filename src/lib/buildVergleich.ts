import type { CollectionEntry } from "astro:content";

export type VergleichRow = {
  label: string;
  values: (string | number | undefined)[];
};

export type VergleichResult = {
  produkte: CollectionEntry<"produkte">[];
  winnerBudget?: CollectionEntry<"produkte">;
  winnerPremium?: CollectionEntry<"produkte">;
  vergleichTable: VergleichRow[];
  hasData: boolean;
};

export function buildVergleich(
  allProdukte: CollectionEntry<"produkte">[],
  slugs: string[]
): VergleichResult {

  // 🔒 Убираем дубли
  const uniqueSlugs = Array.from(new Set(slugs));

  // 📦 Фильтрация по slug
  const filtered = allProdukte.filter((p) =>
    uniqueSlugs.includes(p.slug)
  );

  if (filtered.length === 0) {
    return {
      produkte: [],
      vergleichTable: [],
      hasData: false,
    };
  }

  // 💰 Сортировка по цене
  const sorted = [...filtered].sort(
    (a, b) =>
      (a.data.preis ?? Infinity) - (b.data.preis ?? Infinity)
  );

  const winnerBudget = sorted[0];
  const winnerPremium =
    sorted.length > 1 ? sorted[sorted.length - 1] : undefined;

  // 📊 Vergleich-Tabelle
  const vergleichTable: VergleichRow[] = [
    {
      label: "Preis",
      values: sorted.map((p) => p.data.preis),
    },
    {
    label: "Marke",
    values: sorted.map((p) =>
      typeof p.data.brand === "string"
        ? p.data.brand
        : p.data.brand?.name ?? "Unbekannt"
    ),
  },
    {
      label: "Verfügbarkeit",
      values: sorted.map((p) => p.data.availability),
    },
  ];

  return {
    produkte: sorted,
    winnerBudget,
    winnerPremium,
    vergleichTable,
    hasData: true,
  };
}