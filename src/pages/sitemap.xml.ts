import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

const SITE = "https://yevhenbondarenko.com";

function normalizePath(path: string) {
  const clean = String(path || "")
    .split("?")[0]
    .split("#")[0]
    .trim();

  const withSlash = clean.startsWith("/")
    ? clean
    : `/${clean}`;

  return withSlash.endsWith("/")
    ? withSlash
    : `${withSlash}/`;
}

function fullUrl(path: string) {
  return `${SITE}${normalizePath(path)}`;
}

function safeDate(input?: string | Date) {
  if (!input) return undefined;

  const d = new Date(input);

  if (Number.isNaN(d.getTime())) {
    return undefined;
  }

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
    p.startsWith("/marken/") ||
    p.startsWith("/tests/") ||
    p.startsWith("/links/") ||
    p.startsWith("/kategorien/") ||
    p.includes(".astro") ||
    p.includes("?") ||
    p.includes("#")
  );
}

function hasEnoughContent(entry: any, minLength = 900) {
  const bodyLength = entry.body?.trim().length ?? 0;

  return bodyLength >= minLength;
}

function getEntryDate(entry: any) {
  return safeDate(
    entry.data?.dateModified ??
    entry.data?.datum ??
    entry.data?.datePublished
  );
}

function getSlug(entry: any) {
  return entry.id
    .replace(/\.mdx?$/, "")
    .trim();
}

function getEntryPath(entry: any, fallbackBase: string) {
  if (
    entry.data?.link &&
    typeof entry.data.link === "string"
  ) {
    return normalizePath(entry.data.link);
  }

  return normalizePath(
    `${fallbackBase}/${getSlug(entry)}/`
  );
}

function isValidEntryPath(path: string) {
  const p = normalizePath(path);

  if (
    p.includes("undefined") ||
    p.includes("null") ||
    p.includes("//")
  ) {
    return false;
  }

  return true;
}

export const GET: APIRoute = async () => {
  const produkte = await getCollection("produkte");
  const verstehen = await getCollection("verstehen");
  const vergleiche = await getCollection("vergleiche");
  const ratgeber = await getCollection("ratgeber");

  const seen = new Set<string>();
  const urls: string[] = [];

  function push(
    path: string,
    lastmod?: string,
    priority = "0.8"
  ) {
    const normalizedPath = normalizePath(path);

    if (shouldSkip(normalizedPath)) return;

    if (!isValidEntryPath(normalizedPath)) return;

    const loc = fullUrl(normalizedPath);

    if (seen.has(loc)) return;

    seen.add(loc);

    urls.push(`  <url>
    <loc>${escapeXml(loc)}</loc>${
      lastmod
        ? `\n    <lastmod>${lastmod}</lastmod>`
        : ""
    }
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`);
  }

  /*
    ===== STATIC PAGES =====
  */

  push("/", undefined, "1.0");

  push("/empfehlungen/", undefined, "0.9");
  push("/vergleiche/", undefined, "0.9");
  push("/verstehen/", undefined, "0.9");
  push("/ratgeber/", undefined, "0.8");

  push("/impressum/", undefined, "0.3");
  push("/datenschutzerklaerung/", undefined, "0.3");
  push("/transparenz/", undefined, "0.4");
  push("/kontakt/", undefined, "0.4");
  push("/ueber-uns/", undefined, "0.4");

  /*
    ===== CATEGORY PAGES =====
  */

  const categoryCounts = new Map<string, number>();

  for (const entry of produkte) {
    const category = entry.data?.kategorie;

    if (
      !category ||
      typeof category !== "string"
    ) {
      continue;
    }

    if (!hasEnoughContent(entry, 900)) {
      continue;
    }

    categoryCounts.set(
      category,
      (categoryCounts.get(category) ?? 0) + 1
    );
  }

  for (const [category, count] of categoryCounts.entries()) {
    if (count >= 2) {
      push(
        `/empfehlungen/${category}/`,
        undefined,
        "0.7"
      );
    }
  }

  /*
    ===== VERSTEHEN =====
  */

  for (const entry of verstehen) {
    if (!hasEnoughContent(entry, 900)) continue;

    const path = getEntryPath(entry, "/verstehen");

    push(path, getEntryDate(entry), "0.7");
  }

  /*
    ===== VERGLEICHE =====
  */

  for (const entry of vergleiche) {
    if (!hasEnoughContent(entry, 900)) continue;

    const path = getEntryPath(entry, "/vergleiche");

    push(path, getEntryDate(entry), "0.8");
  }

  /*
    ===== RATGEBER =====
  */

  for (const entry of ratgeber) {
    if (!hasEnoughContent(entry, 900)) continue;

    const path = getEntryPath(entry, "/ratgeber");

    push(path, getEntryDate(entry), "0.8");
  }

  /*
    ===== PRODUKTE =====
  */

  for (const entry of produkte) {
    const category = entry.data?.kategorie;

    if (
      !category ||
      typeof category !== "string"
    ) {
      continue;
    }

    if (!hasEnoughContent(entry, 900)) {
      continue;
    }

    const fallbackPath =
      `/empfehlungen/${category}/${getSlug(entry)}/`;

    const path =
      entry.data?.link &&
      typeof entry.data.link === "string"
        ? entry.data.link
        : fallbackPath;

    push(path, getEntryDate(entry), "0.6");
  }

  /*
    ===== FINAL XML =====
  */

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type":
        "application/xml; charset=utf-8",

      "Cache-Control":
        "public, max-age=3600"
    }
  });
};