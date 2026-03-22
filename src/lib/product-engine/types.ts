import type { CollectionEntry } from "astro:content";

/**
 * Сырой входной тип из коллекции 'produkte'
 */
export type ProduktEntry = CollectionEntry<"produkte">;

/**
 * Допустимые типы продуктов (для логики скоринга)
 */
export type ProduktTyp = "router" | "camera" | "smarthome" | "other";

/**
 * Главный интерфейс нормализованного продукта, 
 * который используется во всех компонентах сайта.
 */
export type Segment = "budget" | "mid" | "premium";
export interface NormalizedProduct {
  slug: string;
  kategorie: string;
  title: string;
  teaser: string | null;
  description: string;
  image: string | null;

  // Бренд
  brand?: {
    name: string;
  };

  // Цена
  preis?: number;
  currency: string;
  priceCurrency?: string;

  // Плюсы и Минусы (МЫ ДОБАВИЛИ ЭТО)
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