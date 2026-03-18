// src/lib/moneyPage.ts

import type { CollectionEntry } from "astro:content";

/* ───────────────── Preis-Konfiguration pro Typ ───────────────── */

type ProduktTyp =
  | "innenkamera"
  | "aussenkamera"
  | "tuerklingel"
  | "alarmanlage"
  | "smartlock"
  | "sensor"
  | "sonstiges";

type SegmentConfig = {
  budgetMax: number;
  midMax: number;
};

const SEGMENT_CONFIG: Record<ProduktTyp, SegmentConfig> = {
  tuerklingel: { budgetMax: 60, midMax: 120 },
  innenkamera: { budgetMax: 40, midMax: 100 },
  aussenkamera: { budgetMax: 70, midMax: 180 },
  alarmanlage: { budgetMax: 150, midMax: 400 },
  smartlock: { budgetMax: 120, midMax: 300 },
  sensor: { budgetMax: 25, midMax: 80 },
  sonstiges: { budgetMax: 50, midMax: 150 },
};

/* ───────────────── Types ───────────────── */

type ProduktEntry = CollectionEntry<"produkte">;

type MoneySegments = {
  budget: ProduktEntry[];
  mid: ProduktEntry[];
  premium: ProduktEntry[];
};

export type MoneyPageResult = {
  all: ProduktEntry[];
  top?: ProduktEntry;
  weitere: ProduktEntry[];
  segments: MoneySegments;
};

/* ───────────────── Core Builder ───────────────── */

export function buildMoneyPage(
  produkte: ProduktEntry[],
  typ: ProduktTyp
): MoneyPageResult {
  const config = SEGMENT_CONFIG[typ];

  const filtered = produkte
    .filter((p) => p.data.typ === typ)
    .sort(
      (a, b) =>
        (typeof a.data.preis === "number"
          ? a.data.preis
          : Infinity) -
        (typeof b.data.preis === "number"
          ? b.data.preis
          : Infinity)
    );

  if (filtered.length === 0) {
    return emptyResult();
  }

  const top =
    filtered.find((p) => p.data.featured === true) ??
    filtered[0];

  const weitere = filtered
    .filter((p) => p !== top)
    .slice(0, 4);

  const budget = filtered.filter(
    (p) =>
      typeof p.data.preis === "number" &&
      p.data.preis < config.budgetMax
  );

  const mid = filtered.filter(
    (p) =>
      typeof p.data.preis === "number" &&
      p.data.preis >= config.budgetMax &&
      p.data.preis <= config.midMax
  );

  const premium = filtered.filter(
    (p) =>
      typeof p.data.preis === "number" &&
      p.data.preis > config.midMax
  );

  return {
    all: filtered,
    top,
    weitere,
    segments: {
      budget,
      mid,
      premium,
    },
  };
}

/* ───────────────── Fallback ───────────────── */

function emptyResult(): MoneyPageResult {
  return {
    all: [],
    top: undefined,
    weitere: [],
    segments: {
      budget: [],
      mid: [],
      premium: [],
    },
  };
}