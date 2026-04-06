import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

function safeDate(input?: string) {
  if (!input) return undefined;
  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    return new Response("Site URL missing", { status: 500 });
  }

  const produkte = await getCollection("produkte");
  const seen = new Set<string>();

  const urls = produkte
    .filter((p) => {
      if (!p.slug) return false;
      if (!p.data?.kategorie) return false;
      if (typeof p.data.image !== "string" || p.data.image.trim().length === 0) return false;

      const bodyLength = p.body?.length ?? 0;
      if (bodyLength < 1200) return false;

      return true;
    })
    .map((p) => {
      const pageUrl = new URL(
        `/empfehlungen/${p.data.kategorie}/${p.slug}/`,
        site
      ).href;

      if (seen.has(pageUrl)) return "";
      seen.add(pageUrl);

      const imageUrl = new URL(p.data.image as string, site).href;
      const lastmod = safeDate(p.data?.datum);

      return `
  <url>
    <loc>${pageUrl}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <image:image>
      <image:loc>${imageUrl}</image:loc>
    </image:image>
  </url>`;
    })
    .filter(Boolean)
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${urls}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};