/* ───────── КАТЕГОРИИ (Единственный источник правды) ───────── */

export type KategorieId =
  | "sicherheit"
  | "smart-home"
  | "strom"
  | "klima"
  | "beleuchtung"
  | "netzwerk"
  | "sonstiges";

export interface Kategorie {
  id: KategorieId;
  name: string;
  teaser: string;
}
