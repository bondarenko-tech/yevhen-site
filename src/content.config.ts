import { defineCollection, z } from "astro:content";
import { kategorien } from "./data/kategorien";

// Вспомогательная функция для Zod enum, чтобы не дублировать код
// Она берет ID из твоего файла категорий
const kategorieEnum = z.enum(
  kategorien.map((k) => k.id) as [string, ...string[]]
);

/* ──────────────────────────────── */
/* FAQ                              */
/* ──────────────────────────────── */

const faqSchema = z.array(
  z.object({
    q: z.string(),
    a: z.string(),
  })
);

/* ──────────────────────────────── */
/* Base Content (verstehen + vergleiche) */
/* ──────────────────────────────── */

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  kategorie: kategorieEnum, // Используем общую переменную
  datum: z.string().optional(),
  tags: z.array(z.string()).optional(),
  faq: faqSchema.optional(),
  sku: z.string().optional(),
  mpn: z.string().optional(),
});

/* ──────────────────────────────── */
/* Produkte                         */
/* ──────────────────────────────── */

const produkte = defineCollection({
  type: "content",
  schema: z.object({
    // Твои новые поля
    pros: z.array(z.string()).optional(),
    cons: z.array(z.string()).optional(),

    /* ───────── Pflichtfelder ───────── */
    title: z.string(),
    kategorie: kategorieEnum,

    /* ───────── Typ (für scoring engine) ───────── */
    typ: z.string().optional(),

    /* ───────── Core Content ───────── */
    teaser: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),

    /* ───────── Brand ───────── */
    brand: z.union([
      z.string(),
      z.object({
        name: z.string()
      })
    ]).optional(),

    /* ───────── Preis ───────── */
    preis: z.number().optional(),
    priceCurrency: z.string().default("EUR"),
    datum: z.string().optional(),
    availability: z.string().optional(),
    sku: z.string().optional(),
    mpn: z.string().optional(),

    /* ───────── Links ───────── */
    linkExtern: z.string().url().optional(),

    /* ───────── Video ───────── */
    videoShortId: z.string().optional(),
    videoMainId: z.string().optional(),
    videoDuration: z.number().optional(),
    videoLang: z.string().optional(),

    /* ───────── Flags ───────── */
    featured: z.boolean().optional(),

    /* ───────── Specs ───────── */
    specs: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    kurzfakten: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ).optional(),
  }),
});

/* ──────────────────────────────── */
/* Vergleiche                       */
/* ──────────────────────────────── */

const vergleiche = defineCollection({
  type: "content",
  schema: baseSchema.extend({ // baseSchema должна содержать title, description, datum
    image: z.string().optional(), // Добавь эту строку
    kategorie: z.string().optional(), // И эту
    themen: z.array(z.string()).optional(),
    vergleichTyp: z.string().optional(),
  }),
});

/* ──────────────────────────────── */
/* Verstehen                        */
/* ──────────────────────────────── */

const verstehen = defineCollection({
  type: "content",
  schema: baseSchema.extend({
    fokusProduktTyp: z.string().optional(),
    image: z.string().optional(), // Добавь эту строку
  }),
});

/* ──────────────────────────────── */
/* Export                           */
/* ──────────────────────────────── */

export const collections = {
  produkte,
  vergleiche,
  verstehen,
};