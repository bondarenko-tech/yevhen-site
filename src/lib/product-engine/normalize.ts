import type {
  ProduktEntry,
  NormalizedProduct,
  ProduktTyp,
  ProduktImage,
} from "./types";

const ensureSlash = (u: string) => (u.endsWith("/") ? u : `${u}/`);

const cleanString = (v: unknown): string | undefined => {
  if (typeof v !== "string") return undefined;
  const s = v.trim().replace(/\s+/g, " ");
  return s.length ? s : undefined;
};

const normalizeImagePath = (image: unknown): ProduktImage => {
  if (image == null) return null;

  if (typeof image !== "string") {
    return image as ProduktImage;
  }

  const s = image.trim();
  if (!s) return null;

  if (s.startsWith("http")) return s;
  return s.startsWith("/") ? s : `/${s}`;
};

export function getBrandName(brand: unknown): string | undefined {
  if (typeof brand === "string") {
    return cleanString(brand);
  }

  if (brand && typeof brand === "object" && "name" in brand) {
    return cleanString((brand as { name?: unknown }).name);
  }

  return undefined;
}

export function normalizeProduct(p: ProduktEntry): NormalizedProduct {
  const d = p.data;

  const title = cleanString(d.title) ?? "";
  const brandName = getBrandName(d.brand);

  const preis =
    typeof d.preis === "number" && Number.isFinite(d.preis)
      ? d.preis
      : undefined;

  const currency = cleanString(d.priceCurrency) ?? "EUR";
  const kategorie = cleanString(d.kategorie) ?? "";
  const slug = cleanString(p.slug) ?? "";

  const linkIntern = ensureSlash(`/empfehlungen/${kategorie}/${slug}/`);

  const linkExternRaw = cleanString(d.linkExtern);
  const linkExtern =
    linkExternRaw && linkExternRaw.startsWith("http")
      ? linkExternRaw
      : undefined;

  const teaser = cleanString(d.teaser) ?? null;
  const description = cleanString(d.description) ?? teaser ?? title;

  const image = normalizeImagePath(d.image);

  const datum = cleanString(d.datum)?.slice(0, 10);

  const pros = Array.isArray(d.pros)
    ? d.pros.map(cleanString).filter((x): x is string => !!x)
    : undefined;

  const cons = Array.isArray(d.cons)
    ? d.cons.map(cleanString).filter((x): x is string => !!x)
    : undefined;

  const specs = Array.isArray(d.specs)
    ? d.specs.map(cleanString).filter((x): x is string => !!x)
    : undefined;

  const tags = Array.isArray(d.tags)
    ? d.tags.map(cleanString).filter((x): x is string => !!x)
    : undefined;

  const kurzfakten = Array.isArray(d.kurzfakten)
    ? d.kurzfakten
        .filter(
          (x): x is { label: string; value: string } =>
            !!x &&
            typeof x.label === "string" &&
            typeof x.value === "string"
        )
        .map((x) => ({
          label: x.label.trim(),
          value: x.value.trim(),
        }))
        .filter((x) => x.label.length > 0 && x.value.length > 0)
    : undefined;

  return {
    slug,
    kategorie,

    title,

    teaser,
    description,
    image,

    brand: brandName ? { name: brandName } : undefined,

    preis,
    currency,
    priceCurrency: currency,

    linkIntern,
    linkExtern,

    pros,
    cons,

    typ: cleanString(d.typ) as ProduktTyp | undefined,

    featured: d.featured === true,

    videoShortId: cleanString(d.videoShortId),
    videoMainId: cleanString(d.videoMainId),

    videoDuration:
      typeof d.videoDuration === "number" ? d.videoDuration : undefined,

    videoLang: cleanString(d.videoLang),

    datum,

    specs,
    tags,
    kurzfakten,

    entry: p,
  };
}

export function normalizeAll(products: ProduktEntry[]) {
  return products.map(normalizeProduct);
}