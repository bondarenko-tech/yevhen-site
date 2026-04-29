import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

const SITE = "https://yevhenbondarenko.com";

function normalizePath(path: string) {
  const clean = path.split("?")[0].split("#")[0];
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
    p.startsWith("/marken/") ||
    p.startsWith("/tests/") ||
    p.startsWith("/links/") ||
    p.includes(".astro")
  );
}

function hasEnoughContent(entry: any, minLength = 900) {
  const bodyLength = entry.body?.trim().length ?? 0;
  return bodyLength >= minLength;
}

function getEntryDate(entry: any) {
  return safeDate(entry.data?.dateModified ?? entry.data?.datum);
}

function getSlug(entry: any) {
  return entry.id.replace(/\.mdx?$/, "");
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
    <loc>${escapeXml(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`);
  }

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

  const categoryCounts = new Map<string, number>();

  for (const entry of produkte) {
    const slug = getSlug(entry);
    const category = entry.data?.kategorie;

    if (!slug) continue;
    if (!category || typeof category !== "string") continue;
    if (!hasEnoughContent(entry, 900)) continue;

    categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);
  }

  for (const [category, count] of categoryCounts.entries()) {
    if (count >= 2) {
      push(`/empfehlungen/${category}/`, undefined, "0.7");
    }
  }

  for (const entry of verstehen) {
    const slug = getSlug(entry);

    if (!slug) continue;
    if (!hasEnoughContent(entry, 900)) continue;

    push(`/verstehen/${slug}/`, getEntryDate(entry), "0.7");
  }

  for (const entry of vergleiche) {
    const slug = getSlug(entry);

    if (!slug) continue;
    if (!hasEnoughContent(entry, 900)) continue;

    push(`/vergleiche/${slug}/`, getEntryDate(entry), "0.8");
  }

  for (const entry of ratgeber) {
    const slug = getSlug(entry);

    if (!slug) continue;
    if (!hasEnoughContent(entry, 900)) continue;

    push(`/ratgeber/${slug}/`, getEntryDate(entry), "0.8");
  }

  for (const entry of produkte) {
    const slug = getSlug(entry);
    const category = entry.data?.kategorie;

    if (!slug) continue;
    if (!category || typeof category !== "string") continue;
    if (!hasEnoughContent(entry, 900)) continue;

    push(
      `/empfehlungen/${category}/${slug}/`,
      getEntryDate(entry),
      "0.6"
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};