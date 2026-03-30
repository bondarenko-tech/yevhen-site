import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

const SITE = "https://yevhenbondarenko.com";

function fullUrl(path: string) {
  return `${SITE}${path}`;
}

function safeDate(input?: string) {
  if (!input) return undefined;
  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

function shouldSkip(path: string) {
  return (
    path.startsWith("/video/") ||
    path.startsWith("/shorts/") ||
    path.startsWith("/marken/") ||
    path.startsWith("/tests/") ||
    path.startsWith("/links/") ||
    path.includes("?") ||
    path.endsWith(".astro")
  );
}

export const GET: APIRoute = async () => {
  const produkte = await getCollection("produkte");
  const verstehen = await getCollection("verstehen");
  const vergleiche = await getCollection("vergleiche");

  const seen = new Set<string>();
  const urls: string[] = [];

  function push(path: string, lastmod?: string, priority = "0.8") {
    if (!path || shouldSkip(path)) return;

    const loc = fullUrl(path);
    if (seen.has(loc)) return;
    seen.add(loc);

    urls.push(`
  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`);
  }

  // Основные страницы
  push("/", undefined, "1.0");
  push("/empfehlungen/", undefined, "0.9");
  push("/vergleiche/", undefined, "0.9");
  push("/verstehen/", undefined, "0.9");
  push("/impressum/", undefined, "0.3");
  push("/ueber-uns/", undefined, "0.5");
  push("/transparenz/", undefined, "0.4");
  push("/kontakt/", undefined, "0.5");
  push("/datenschutzerklaerung/", undefined, "0.3");

  // Категории только из реальных продуктов
  const kategorien = [
    ...new Set(
      produkte
        .map((p) => p.data.kategorie)
        .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    ),
  ].sort();

  for (const kategorie of kategorien) {
    push(`/empfehlungen/${kategorie}/`, undefined, "0.8");
  }

  // Verstehen
  for (const entry of verstehen) {
    if (!entry.slug) continue;
    push(
      `/verstehen/${entry.slug}/`,
      safeDate(entry.data?.datum),
      "0.7"
    );
  }

  // Vergleiche
  for (const entry of vergleiche) {
    if (!entry.slug) continue;
    push(
      `/vergleiche/${entry.slug}/`,
      safeDate(entry.data?.datum),
      "0.8"
    );
  }

  // Только нормальные product pages
  for (const entry of produkte) {
    const bodyLength = entry.body?.length ?? 0;

    if (!entry.slug) continue;
    if (!entry.data?.kategorie) continue;
    if (bodyLength < 1200) continue;

    push(
      `/empfehlungen/${entry.data.kategorie}/${entry.slug}/`,
      safeDate(entry.data?.datum),
      "0.7"
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