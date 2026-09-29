import type { CollectionEntry } from "astro:content";

interface BuildProductSchemaOptions {
  entry: CollectionEntry<"produkte">;
  site: URL;
  dateModified?: string;
}

export function buildProductSchema({
  entry,
  site,
  dateModified,
}: BuildProductSchemaOptions) {
  const data = entry.data;

  const absolute = (path: string) =>
    new URL(path.replace(/^\/+/, ""), site).toString();

  const clean = (text?: string) =>
    text?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  const canonicalUrl = absolute(
    `/empfehlungen/${data.kategorie}/${entry.slug}/`
  );

  const imageUrl =
    typeof data.image === "string" && data.image.length
      ? absolute(data.image)
      : absolute("/images/placeholder.webp");

  const description =
    clean(data.description) ??
    clean(data.teaser) ??
    data.specs?.[0] ??
    data.title;

  const brandName =
    typeof data.brand === "string"
      ? data.brand
      : data.brand?.name;

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
        name: brandName,
      },
    }),

    ...(data.sku && {
      sku: data.sku,
    }),

    ...(data.mpn && {
      mpn: data.mpn,
    }),

    isRelatedTo: {
      "@type": "WebPage",
      url: canonicalUrl,
    },

    ...(dateModified && {
      dateModified,
    }),
  };

  return schema;
}