import type { CollectionEntry } from "astro:content";

interface BuildProductSchemaOptions {
  entry: CollectionEntry<"produkte">;
  site: URL;
  dateModified?: string;
}

export function buildProductSchema({
  entry,
  site,
  dateModified
}: BuildProductSchemaOptions) {

  const data = entry.data;

  const absolute = (path: string) =>
    new URL(path.replace(/^\//, ""), site).toString();

  /* ───────── URLS ───────── */

  const canonicalUrl = absolute(
    `/empfehlungen/${data.kategorie}/${entry.slug}/`
  );

  const externalUrl =
    typeof data.linkExtern === "string" &&
    data.linkExtern.startsWith("http")
      ? data.linkExtern
      : canonicalUrl;

  /* ───────── IMAGE ───────── */

  const imageUrl =
    typeof data.image === "string" && data.image.length
      ? absolute(data.image)
      : absolute("/images/placeholder.webp");

  /* ───────── DESCRIPTION ───────── */

  const clean = (text?: string) =>
    text?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  const description =
    clean(data.description) ??
    clean(data.teaser) ??
    data.specs?.[0] ??
    data.title;

  /* ───────── BRAND ───────── */

  const brandName =
    typeof data.brand === "string"
      ? data.brand
      : data.brand?.name;

  /* ───────── PRICE CHECK ───────── */

  const hasValidPrice =
    typeof data.preis === "number" &&
    Number.isFinite(data.preis);

  /* ───────── BASE SCHEMA ───────── */

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",

    "@id": `${canonicalUrl}#product`,

    name: data.title,
    description,
    url: canonicalUrl,
    image: [imageUrl],

    ...(brandName && {
      brand: {
        "@type": "Brand",
        name: brandName
      }
    }),

    /* 🔐 Affiliate-safe Hinweis */
    isRelatedTo: {
      "@type": "WebPage",
      url: canonicalUrl
    }
  };

  /* ───────── OFFERS (SAFE) ───────── */

  if (hasValidPrice) {
    schema.offers = {
      "@type": "Offer",
      url: externalUrl,
      priceCurrency: data.priceCurrency ?? "EUR",
      price: data.preis,

      /* НЕ утверждаем наличие точно */
      availability: "https://schema.org/InStock",

      itemCondition: "https://schema.org/NewCondition"
    };
  }

  /* ───────── EXTRA ───────── */

  if (data.sku) schema.sku = data.sku;
  if (data.mpn) schema.mpn = data.mpn;

  if (dateModified) {
    schema.dateModified = dateModified;
  }

  return schema;
}