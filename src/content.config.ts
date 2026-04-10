import { defineCollection, z } from "astro:content";
import { kategorien } from "./data/kategorien";

const kategorieEnum = z.enum(
  kategorien.map((k) => k.id) as [string, ...string[]]
);

const faqSchema = z.array(
  z.object({
    q: z.string(),
    a: z.string(),
  })
);

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  kategorie: kategorieEnum,
  datum: z.string().optional(),
  tags: z.array(z.string()).optional(),
  faq: faqSchema.optional(),
  sku: z.string().optional(),
  mpn: z.string().optional(),
});

const produkte = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      pros: z.array(z.string()).optional(),
      cons: z.array(z.string()).optional(),

      title: z.string(),
      kategorie: kategorieEnum,

      typ: z.string().optional(),

      teaser: z.string().optional(),
      description: z.string().optional(),
      image: z.union([z.string(), image()]).optional(),

      brand: z.union([
        z.string(),
        z.object({
          name: z.string(),
        }),
      ]).optional(),

      preis: z.number().optional(),
      priceCurrency: z.string().default("EUR"),
      datum: z.string().optional(),
      availability: z.string().optional(),
      sku: z.string().optional(),
      mpn: z.string().optional(),

      linkExtern: z.string().optional(),

      videoShortId: z.string().optional(),
      videoMainId: z.string().optional(),
      videoDuration: z.number().optional(),
      videoLang: z.string().optional(),

      featured: z.boolean().optional(),

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

const vergleiche = defineCollection({
  type: "content",
  schema: ({ image }) =>
    baseSchema.extend({
      image: z.union([z.string(), image()]).optional(),
      kategorie: z.string().optional(),
      themen: z.array(z.string()).optional(),
      vergleichTyp: z.string().optional(),
    }),
});

const verstehen = defineCollection({
  type: "content",
  schema: ({ image }) =>
    baseSchema.extend({
      fokusProduktTyp: z.string().optional(),
      image: z.union([z.string(), image()]).optional(),
    }),
});

export const collections = {
  produkte,
  vergleiche,
  verstehen,
};