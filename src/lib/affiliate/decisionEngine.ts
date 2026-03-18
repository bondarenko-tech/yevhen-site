// src/lib/affiliate/decisionEngine.ts
import type { CollectionEntry } from "astro:content";
import { getBrandName } from "../brand";

type ProduktEntry = CollectionEntry<"produkte">;

export type DecisionItem = {
  title: string;
  description: string;
  produkt: ProduktEntry;
  reason: string[]; // why chosen (conversion-friendly)
};

const isNum = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);

const price = (p: ProduktEntry) => (isNum(p.data.preis) ? p.data.preis : Infinity);

function hasAnyTag(p: ProduktEntry, tags: string[]) {
  const pt = (p.data.tags ?? []).map((t) => t.toLowerCase());
  return tags.some((t) => pt.includes(t.toLowerCase()));
}

/**
 * Conversion-first decision helper.
 * Picks: best overall, best value, cheapest, "no-abo/local" pick if we can infer it, plus a "most popular brand" nudge.
 */
export function buildDecision(produkte: ProduktEntry[]): DecisionItem[] {
  if (!produkte?.length) return [];

  const sorted = [...produkte].sort((a, b) => price(a) - price(b));

  const cheapest = sorted[0];
  const mostExpensive = sorted[sorted.length - 1];

  const featured = produkte.find((p) => p.data.featured === true);

  // Value pick: near-low price but not the absolute cheapest + has teaser/specs
  const valuePick =
    sorted.find((p) => p !== cheapest && (p.data.teaser || (p.data.specs?.length ?? 0) >= 3)) ??
    (sorted.length > 1 ? sorted[1] : cheapest);

  // “No Abo / local” heuristic: look for tags/teaser keywords
  const noAboPick =
    produkte.find((p) => {
      const t = (p.data.teaser ?? "").toLowerCase();
      return (
        t.includes("ohne abo") ||
        t.includes("ohne cloud") ||
        t.includes("lokal") ||
        t.includes("micro") ||
        hasAnyTag(p, ["ohne abo", "ohne cloud", "lokal", "micro sd", "micro-sd", "sd"])
      );
    }) ?? null;

  // Brand nudge: pick any from the most frequent brand (works even if brand is object/string)
  const brandCount = new Map<string, number>();
  for (const p of produkte) {
    const bn = getBrandName(p.data.brand);
    if (!bn) continue;
    brandCount.set(bn, (brandCount.get(bn) ?? 0) + 1);
  }
  const topBrand = [...brandCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  const topBrandPick = topBrand ? produkte.find((p) => getBrandName(p.data.brand) === topBrand) ?? null : null;

  const out: DecisionItem[] = [];

  const push = (item: DecisionItem | null) => {
    if (!item) return;
    if (out.some((x) => x.produkt.slug === item.produkt.slug)) return;
    out.push(item);
  };

  push(
    (featured ?? null) && {
      title: "Beste Gesamtwahl",
      description: "Wenn du nur 1 Modell nehmen willst – das ist die sichere Wahl für die meisten Fälle.",
      produkt: featured!,
      reason: [
        "Als Empfehlung markiert",
        isNum(featured!.data.preis) ? "Preis ist bekannt" : "Preis variiert – Details prüfen",
        featured!.data.teaser ? "Kurze Einordnung vorhanden" : "Details im Produkt ansehen",
      ],
    }
  );

  push({
    title: "Preis-Leistung",
    description: "Gute Ausstattung ohne unnötig teuer zu werden – ideal für die meisten Käufer.",
    produkt: valuePick,
    reason: [
      isNum(valuePick.data.preis) ? `Preis: ${valuePick.data.preis} € (Stand im Datensatz)` : "Preis im Angebot prüfen",
      valuePick.data.specs?.length ? "Mehrere Features gelistet" : "Kurzbeschreibung vorhanden",
    ],
  });

  push({
    title: "Günstigste Option",
    description: "Wenn Budget Priorität #1 ist – so kommst du am billigsten rein.",
    produkt: cheapest,
    reason: [
      isNum(cheapest.data.preis) ? `Niedrigster Preis: ${cheapest.data.preis} €` : "Preis im Angebot prüfen",
      "Gut für Einstieg / Zweitgerät",
    ],
  });

  push(
    noAboPick && {
      title: "Ohne Abo / lokal (falls wichtig)",
      description: "Wenn du Cloud-Zwang vermeiden willst – hier zuerst schauen.",
      produkt: noAboPick,
      reason: [
        "Heuristik: „ohne Abo / lokal / microSD“ in Text/Tags erkannt",
        "Details im Produkt prüfen",
      ],
    }
  );

  push(
    topBrandPick && {
      title: "Marke mit vielen Einträgen",
      description: "Wenn du lieber bei einer häufig vorkommenden Marke bleibst – das ist der schnelle Einstieg.",
      produkt: topBrandPick,
      reason: [
        `Marke: ${topBrand}`,
        `Mehrere Produkte dieser Marke in der Sammlung (${brandCount.get(topBrand!)})`,
      ],
    }
  );

  // Optional: add premium anchor for conversion/upsell (only if distinct and priced)
  if (mostExpensive && mostExpensive !== cheapest && isNum(mostExpensive.data.preis)) {
    push({
      title: "Premium (wenn du das Beste willst)",
      description: "Teurer, aber oft mit Extras – lohnt sich bei hoher Nutzung.",
      produkt: mostExpensive,
      reason: [`Höchster Preis im Datensatz: ${mostExpensive.data.preis} €`, "Vergleich ansehen, bevor du entscheidest"],
    });
  }

  return out;
}