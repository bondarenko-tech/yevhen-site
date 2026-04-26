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

const imageSchema = (image: any) => z.union([z.string(), image()]).optional();

const kurzfaktenSchema = z
  .array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  )
  .optional();

const baseContentFields = {
  title: z.string(),
  description: z.string().optional(),
  kategorie: kategorieEnum,
  typ: z.string().optional(),
  image: z.any().optional(),
  datum: z.string().optional(),
  dateModified: z.string().optional(),
  tags: z.array(z.string()).optional(),
  faq: faqSchema.optional(),
  featured: z.boolean().optional(),
  familyFriendly: z.boolean().optional(),
};

const produkte = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      ...baseContentFields,

      link: z.string().optional(),
      teaser: z.string().optional(),

      image: imageSchema(image),

      brand: z
        .union([
          z.string(),
          z.object({
            name: z.string(),
          }),
        ])
        .optional(),

      preis: z.number().optional(),
      priceCurrency: z.string().default("EUR"),
      availability: z.string().optional(),

      sku: z.string().optional(),
      mpn: z.string().optional(),

      linkExtern: z.string().optional(),

      videoShortId: z.string().optional(),
      videoMainId: z.string().optional(),
      videoDuration: z.number().optional(),
      videoLang: z.string().optional(),

      specs: z.array(z.string()).optional(),
      pros: z.array(z.string()).optional(),
      cons: z.array(z.string()).optional(),
      kurzfakten: kurzfaktenSchema,
    }),
});

const vergleiche = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      ...baseContentFields,

      typ: z.string().default("vergleich"),
      image: imageSchema(image),

      themen: z.array(z.string()).optional(),
      vergleichTyp: z.string().optional(),
    }),
});

const verstehen = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      ...baseContentFields,

      image: imageSchema(image),
      fokusProduktTyp: z.string().optional(),
    }),
});

export const collections = {
  produkte,
  vergleiche,
  verstehen,
};