/* ───────── БАЗОВЫЕ ТИПЫ ───────── */

import type { KategorieId } from "../types/kategorie";

export type Brand = {
  name: string;
};

export type Kurzfakt = {
  label: string;
  value: string;
};

/* ───────── ПРОДУКТ-ТИП (логическая классификация) ───────── */

export type ProduktTyp =
  | "innenkamera"
  | "aussenkamera"
  | "tuerklingel"
  | "alarmanlage"
  | "smartlock"
  | "sensor"
  | "sonstiges";

/* ───────── RAW-ДАННЫЕ (Content Collection Schema) ───────── */

export type ProduktData = {
  brand: Brand;

  title: string;

  /** Формат: /empfehlungen/<kategorie>/<slug>/ */
  link: string;

  kategorie: KategorieId;

  /** Логическая классификация внутри категории */
  typ?: ProduktTyp;

  image?: string;
  teaser?: string;
  description?: string;

  featured?: boolean;
  familyFriendly?: boolean;

  linkExtern?: string;

  preis?: number;
  priceCurrency?: string;
  availability?: string;

  datum?: string;
  dateModified?: string;

  videoMainId?: string;
  videoShortId?: string;
  videoDuration?: number;
  videoLang?: string;

  sku?: string;
  mpn?: string;
  specs?: string[];

  tags?: string[];
  kurzfakten?: Kurzfakt[];
};

/* ───────── НОРМАЛИЗОВАННЫЙ ТИП ───────── */

export type Produkt = Omit<ProduktData, "datum"> & {
  slug: string;
  date: Date;
};


