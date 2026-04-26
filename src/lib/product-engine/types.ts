import type { CollectionEntry } from "astro:content";
import type { ImageMetadata } from "astro";

/**
 * Сырой входной тип из коллекции 'produkte'
 */
export type ProduktEntry = CollectionEntry<"produkte">;

/**
 * Допустимые типы продуктов
 */
export type ProduktTyp = "router" | "camera" | "smarthome" | "other";

export type Segment = "budget" | "mid" | "premium";

/**
 * Универсальный тип картинки:
 * - старый формат: строка "/images/..."
 * - новый формат: Astro image()
 * - null если картинки нет
 */
export type ProduktImage =
  | string
  | ImageMetadata
  | null;

/**
 * Главный интерфейс нормализованного продукта
 */
export interface NormalizedProduct {
  slug: string;
  kategorie: string;
  title: string;
  teaser: string | null;
  description: string;
  image: ProduktImage;

  // Бренд
  brand?: {
    name: string;
  };

  // Цена
  preis?: number;
  currency: string;
  priceCurrency?: string;

  // Плюсы и минусы
  pros?: string[];
  cons?: string[];

  // Ссылки
  linkIntern: string;
  linkExtern?: string;

  // Видео
  videoShortId?: string;
  videoMainId?: string;
  videoDuration?: number;
  videoLang?: string;

  // Характеристики и теги
  specs?: string[];
  tags?: string[];

  // Таблица быстрых фактов
  kurzfakten?: {
    label: string;
    value: string;
  }[];

  // Служебные флаги
  featured: boolean;
  datum?: string;
  typ?: ProduktTyp;

  // Оригинальная запись из Astro Content Layer
  entry: ProduktEntry;
}