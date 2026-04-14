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

  const clean = (text?: string) =>
    text?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  const canonicalUrl = absolute(
    `/empfehlungen/${data.kategorie}/${entry.slug}/`
  );

  const externalUrl =
    typeof data.linkExtern === "string" && data.linkExtern.startsWith("http")
      ? data.linkExtern
      : canonicalUrl;

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

  const hasValidPrice =
    typeof data.preis === "number" &&
    Number.isFinite(data.preis) &&
    data.preis > 0;

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

    ...(data.sku && { sku: data.sku }),
    ...(data.mpn && { mpn: data.mpn }),

    isRelatedTo: {
      "@type": "WebPage",
      url: canonicalUrl
    }
  };

  if (hasValidPrice) {
    schema.offers = {
      "@type": "Offer",
      url: externalUrl,
      priceCurrency: data.priceCurrency ?? "EUR",
      price: Number(data.preis).toFixed(2),

      availability:
        typeof data.availability === "string" && data.availability.length
          ? data.availability
          : "https://schema.org/InStock",

      itemCondition: "https://schema.org/NewCondition",

      seller: {
        "@type": "Organization",
        name: "Bondarenko Empfehlungen"
      },

      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: data.priceCurrency ?? "EUR"
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "DE"
        }
      },

      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "DE",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn"
      }
    };
  }

  if (dateModified) {
    schema.dateModified = dateModified;
  }

  return schema;
}