// sitemap.xml.ts (SEO FIXED)

import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

const SITE = "https://yevhenbondarenko.com";

function url(path: string) {
  return `${SITE}${path}`;
}

export async function GET(_: APIContext) {

  const urls: string[] = [];
  const now = new Date().toISOString();

  const produkte = await getCollection("produkte");
  const verstehen = await getCollection("verstehen");
  const vergleiche = await getCollection("vergleiche");

  function push(loc: string) {
    urls.push(`
  <url>
    <loc>${url(loc)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
  }

  /* ✅ 1. Главная */
  push("/");

  /* ✅ 2. Категории (ВАЖНО) */
  push("/empfehlungen/");
  push("/empfehlungen/netzwerk/");
  push("/empfehlungen/smart-home/");
  push("/empfehlungen/sicherheit/");

  /* ✅ 3. СТАТЬИ = ОСНОВА SEO */
  for (const a of verstehen.slice(0, 20)) {
    push(`/verstehen/${a.slug}/`);
  }

  for (const v of vergleiche.slice(0, 20)) {
    push(`/vergleiche/${v.slug}/`);
  }

  /* ✅ 4. ТОЛЬКО ЛУЧШИЕ ПРОДУКТЫ */
  const bestProducts = produkte
    .filter(p => p.body && p.body.length > 800)
    .slice(0, 30);

  for (const p of bestProducts) {
    push(`/empfehlungen/${p.data.kategorie}/${p.slug}/`);
  }

  return new Response(
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`,
    {
      headers: { "Content-Type": "application/xml" }
    }
  );
}