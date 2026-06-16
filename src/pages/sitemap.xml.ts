import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

const SITE = "https://yevhenbondarenko.com";
const MIN_BODY_LENGTH = 900;

function normalizePath(path: string) {
  const clean = String(path || "")
    .split("?")[0]
    .split("#")[0]
    .trim();

  const withSlash = clean.startsWith("/") ? clean : `/${clean}`;

  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
}

function fullUrl(path: string) {
  return `${SITE}${normalizePath(path)}`;
}

function safeDate(input?: string | Date) {
  if (!input) return undefined;

  const d = new Date(input);

  if (Number.isNaN(d.getTime())) return undefined;

  return d.toISOString().split("T")[0];
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shouldSkip(path: string) {
  const p = normalizePath(path);

  return (
    p.startsWith("/video/") ||
    p.startsWith("/shorts/") ||
    p.startsWith("/tests/") ||
    p.startsWith("/kategorien/") ||
    p.includes(".astro") ||
    p.includes("?") ||
    p.includes("#") ||
    p.includes("undefined") ||
    p.includes("null")
  );
}

function hasEnoughContent(entry: any, minLength = MIN_BODY_LENGTH) {
  return (entry.body?.trim().length ?? 0) >= minLength;
}

function getEntryDate(entry: any) {
  return safeDate(
    entry.data?.dateModified ??
      entry.data?.datum ??
      entry.data?.datePublished
  );
}

function newerDate(a?: string, b?: string) {
  if (!a) return b;
  if (!b) return a;

  return new Date(a).getTime() >= new Date(b).getTime() ? a : b;
}

function getSlug(entry: any) {
  return String(entry.id || "")
    .replace(/\.mdx?$/, "")
    .trim();
}

function getEntryPath(entry: any, fallbackBase: string) {
  if (entry.data?.link && typeof entry.data.link === "string") {
    return normalizePath(entry.data.link);
  }

  return normalizePath(`${fallbackBase}/${getSlug(entry)}/`);
}

function slugifyBrand(value: string) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, "und")
    .replace(/\+/g, "plus")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const GET: APIRoute = async () => {
  const produkte = await getCollection("produkte");
  const verstehen = await getCollection("verstehen");
  const vergleiche = await getCollection("vergleiche");
  const ratgeber = await getCollection("ratgeber");

  const seen = new Set<string>();
  const urls: string[] = [];

  function push(path: string, lastmod?: string, priority = "0.8") {
    const normalizedPath = normalizePath(path);

    if (shouldSkip(normalizedPath)) return;

    const loc = fullUrl(normalizedPath);

    if (seen.has(loc)) return;

    seen.add(loc);

    urls.push(`  <url>
    <loc>${escapeXml(loc)}</loc>${
      lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""
    }
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`);
  }

  push("/", undefined, "1.0");

  push("/empfehlungen/", undefined, "0.9");
  push("/vergleiche/", undefined, "0.9");
  push("/verstehen/", undefined, "0.9");
  push("/ratgeber/", undefined, "0.8");
  push("/marken/", undefined, "0.7");

  push("/links/", undefined, "0.8");
  push("/links/alle/", undefined, "0.7");

  push("/impressum/", undefined, "0.3");
  push("/datenschutzerklaerung/", undefined, "0.3");
  push("/transparenz/", undefined, "0.4");
  push("/kontakt/", undefined, "0.4");
  push("/ueber-uns/", undefined, "0.4");

  const categoryMap = new Map<string, { count: number; lastmod?: string }>();

  for (const entry of produkte) {
    const category = entry.data?.kategorie;

    if (!category || typeof category !== "string") continue;
    if (!hasEnoughContent(entry)) continue;

    const current = categoryMap.get(category) ?? { count: 0 };
    current.count += 1;
    current.lastmod = newerDate(current.lastmod, getEntryDate(entry));

    categoryMap.set(category, current);
  }

  for (const [category, item] of categoryMap.entries()) {
    if (item.count >= 2) {
      push(`/empfehlungen/${category}/`, item.lastmod, "0.7");
    }
  }

  const brandMap = new Map<string, { lastmod?: string }>();
  const brandCategoryMap = new Map<string, { path: string; lastmod?: string }>();

  for (const entry of produkte) {
    const brand = entry.data?.brand;
    const category = entry.data?.kategorie;

    if (!brand || typeof brand !== "string") continue;
    if (!category || typeof category !== "string") continue;
    if (!hasEnoughContent(entry)) continue;

    const brandSlug = slugifyBrand(brand);
    if (!brandSlug) continue;

    const entryDate = getEntryDate(entry);

    const brandItem = brandMap.get(brandSlug) ?? {};
    brandItem.lastmod = newerDate(brandItem.lastmod, entryDate);
    brandMap.set(brandSlug, brandItem);

    const key = `${brandSlug}|${category}`;
    const categoryItem = brandCategoryMap.get(key) ?? {
      path: `/marken/${brandSlug}/${category}/`,
    };

    categoryItem.lastmod = newerDate(categoryItem.lastmod, entryDate);
    brandCategoryMap.set(key, categoryItem);
  }

  for (const [brandSlug, item] of brandMap.entries()) {
    push(`/marken/${brandSlug}/`, item.lastmod, "0.5");
  }

  for (const item of brandCategoryMap.values()) {
    push(item.path, item.lastmod, "0.4");
  }

  for (const entry of verstehen) {
    if (!hasEnoughContent(entry)) continue;

    push(getEntryPath(entry, "/verstehen"), getEntryDate(entry), "0.7");
  }

  for (const entry of vergleiche) {
    if (!hasEnoughContent(entry)) continue;

    push(getEntryPath(entry, "/vergleiche"), getEntryDate(entry), "0.8");
  }

  for (const entry of ratgeber) {
    if (!hasEnoughContent(entry)) continue;

    push(getEntryPath(entry, "/ratgeber"), getEntryDate(entry), "0.8");
  }

  for (const entry of produkte) {
    const category = entry.data?.kategorie;

    if (!category || typeof category !== "string") continue;
    if (!hasEnoughContent(entry)) continue;

    const path =
      entry.data?.link && typeof entry.data.link === "string"
        ? entry.data.link
        : `/empfehlungen/${category}/${getSlug(entry)}/`;

    push(path, getEntryDate(entry), "0.6");
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};