import type { CollectionEntry } from "astro:content";

/* ───────── БАЗОВЫЕ ТИПЫ ───────── */

export type Brand = {
  name: string;
};

export type Kurzfakt = {
  label: string;
  value: string;
};

/* ───────── КАТЕГОРИИ ───────── */

export type KategorieId =
  | "strom"
  | "sicherheit"
  | "smart-home"
  | "netzwerk"
  | "beleuchtung"
  | "klima"
  | "sonstiges";

/* ───────── ПРОДУКТ-ТИП (логическая классификация) ───────── */

export type ProduktTyp =
  | "innenkamera"
  | "aussenkamera"
  | "tuerklingel"
  | "alarmanlage"
  | "smartlock"
  | "sensor"
  | "sonstiges";

/* ───────── CONTENT LAYER ENTRY ───────── */

/**
 * Главный тип продукта.
 * Используется в компонентах, карточках и логике.
 */
export type Produkt = CollectionEntry<"produkte">;

/**
 * Удобный алиас для данных (frontmatter)
 */
export type ProduktData = {
  brand?: Brand | string;

  title: string;
  link?: string;
  kategorie: KategorieId;

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

/* ───────── URL HELPERS ───────── */

export const SITE = "https://yevhenbondarenko.com";

/* продукт */

export function getProduktUrl(
  slug: string,
  kategorie: KategorieId
) {
  return `/empfehlungen/${kategorie}/${slug}/`;
}

export function getProduktAbsoluteUrl(
  slug: string,
  kategorie: KategorieId
) {
  return `${SITE}/empfehlungen/${kategorie}/${slug}/`;
}

/* сравнения */

export function getVergleichUrl(slug: string) {
  return `/vergleiche/${slug}/`;
}

/* статьи */

export function getVerstehenUrl(slug: string) {
  return `/verstehen/${slug}/`;
}

/* бренд */

export function getBrandUrl(slug: string) {
  return `/marken/${slug}/`;
}