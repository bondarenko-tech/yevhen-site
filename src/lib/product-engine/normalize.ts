import type {
  ProduktEntry,
  NormalizedProduct,
  ProduktTyp
} from "./types";

const ensureSlash = (u: string) =>
  u.endsWith("/") ? u : `${u}/`;

/* brand helper */

export function getBrandName(
  brand: unknown
): string | undefined {
  if (typeof brand === "string") {
    const s = brand.trim();
    return s.length ? s : undefined;
  }

  if (
    brand &&
    typeof brand === "object" &&
    "name" in brand
  ) {
    const n = (brand as { name?: unknown }).name;

    if (typeof n === "string") {
      const s = n.trim();
      return s.length ? s : undefined;
    }
  }

  return undefined;
}

/* normalize product */

export function normalizeProduct(
  p: ProduktEntry
): NormalizedProduct {
  const d = p.data;

  const brandName = getBrandName(d.brand);

  const preis =
    typeof d.preis === "number" &&
    Number.isFinite(d.preis)
      ? d.preis
      : undefined;

  const currency =
    typeof d.priceCurrency === "string" &&
    d.priceCurrency.trim().length
      ? d.priceCurrency
      : "EUR";

  const kategorie =
    typeof d.kategorie === "string"
      ? d.kategorie
      : "";

  const slug = p.slug;

  const linkIntern = ensureSlash(
    `/empfehlungen/${kategorie}/${slug}/`
  );

  const linkExtern =
    typeof d.linkExtern === "string" &&
    d.linkExtern.startsWith("http")
      ? d.linkExtern
      : undefined;

  const teaser =
    typeof d.teaser === "string" &&
    d.teaser.trim().length
      ? d.teaser.trim()
      : null;

  const description =
    typeof d.description === "string" &&
    d.description.trim().length
      ? d.description.trim()
      : teaser ?? String(d.title ?? "");

  const image =
    d.image == null
      ? null
      : typeof d.image === "string"
        ? (d.image.trim().length ? d.image.trim() : null)
        : d.image;

  const datum =
    typeof d.datum === "string"
      ? d.datum.slice(0, 10)
      : undefined;

  const pros = Array.isArray(d.pros)
    ? d.pros.filter((x): x is string => typeof x === "string")
    : undefined;

  const cons = Array.isArray(d.cons)
    ? d.cons.filter((x): x is string => typeof x === "string")
    : undefined;

  return {
    slug,
    kategorie,

    title: String(d.title ?? ""),

    teaser,
    description,
    image,

    brand: brandName
      ? { name: brandName }
      : undefined,

    preis,
    currency,
    priceCurrency: currency,

    linkIntern,
    linkExtern,

    pros,
    cons,

    typ:
      typeof d.typ === "string"
        ? (d.typ as ProduktTyp)
        : undefined,

    featured: d.featured === true,

    videoShortId:
      typeof d.videoShortId === "string"
        ? d.videoShortId
        : undefined,

    videoMainId:
      typeof d.videoMainId === "string"
        ? d.videoMainId
        : undefined,

    videoDuration:
      typeof d.videoDuration === "number"
        ? d.videoDuration
        : undefined,

    videoLang:
      typeof d.videoLang === "string"
        ? d.videoLang
        : undefined,

    datum,

    specs: Array.isArray(d.specs)
      ? d.specs.filter(
          (x): x is string => typeof x === "string"
        )
      : undefined,

    tags: Array.isArray(d.tags)
      ? d.tags.filter(
          (x): x is string => typeof x === "string"
        )
      : undefined,

    kurzfakten: Array.isArray(d.kurzfakten)
      ? d.kurzfakten
          .filter(
            (
              x
            ): x is {
              label: string;
              value: string;
            } =>
              !!x &&
              typeof x.label === "string" &&
              typeof x.value === "string"
          )
          .map((x) => ({
            label: x.label,
            value: x.value
          }))
      : undefined,

    entry: p
  };
}

export function normalizeAll(
  products: ProduktEntry[]
) {
  return products.map(normalizeProduct);
}