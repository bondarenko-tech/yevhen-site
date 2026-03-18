import type { ProduktTyp, Segment } from "./types";

type SegmentConfig = { budgetMax: number; midMax: number };

const SEGMENT_CONFIG: Record<string, SegmentConfig> = {
  tuerklingel: { budgetMax: 60, midMax: 120 },
  innenkamera: { budgetMax: 40, midMax: 100 },
  aussenkamera: { budgetMax: 70, midMax: 180 },
  alarmanlage: { budgetMax: 150, midMax: 400 },
  smartlock: { budgetMax: 120, midMax: 300 },
  sensor: { budgetMax: 25, midMax: 80 },
  sonstiges: { budgetMax: 50, midMax: 150 },
};

export function getSegment(typ: ProduktTyp, preis?: number): Segment | null {
  if (typeof preis !== "number") return null;
  const cfg = SEGMENT_CONFIG[typ] ?? SEGMENT_CONFIG["sonstiges"];
  if (preis < cfg.budgetMax) return "budget";
  if (preis <= cfg.midMax) return "mid";
  return "premium";
}