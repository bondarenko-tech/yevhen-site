import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

const SITE = "https://yevhenbondarenko.com";

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

function hasEnoughContent(entry: any, minLength = 900) {
  const bodyLength = entry.body?.trim().length ?? 0;
  return bodyLength >= minLength;
}

export const GET: APIRoute = async () => {
  const produkte = await getCollection("produkte");
  const vergleiche = await getCollection("vergleiche");

  const seen = new Set<string>();
  const urls: string[] = [];

  function push(pagePath: string, imagePath?: string, lastmod?: string) {
    if (!imagePath || typeof imagePath !== "string") return;

    const loc = new URL(pagePath, SITE).toString();
    const imageLoc = new URL(imagePath, SITE).toString();

    if (seen.has(`${loc}|${imageLoc}`)) return;
    seen.add(`${loc}|${imageLoc}`);

    urls.push(`  <url>
    <loc>${escapeXml(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <image:image>
      <image:loc>${escapeXml(imageLoc)}</image:loc>
    </image:image>
  </url>`);
  }

  for (const p of produkte) {
    if (!p.slug) continue;
    if (!p.data?.kategorie || typeof p.data.kategorie !== "string") continue;
    if (!hasEnoughContent(p, 900)) continue;

    push(
      `/empfehlungen/${p.data.kategorie}/${p.slug}/`,
      typeof p.data.image === "string" ? p.data.image : undefined,
      safeDate((p.data as any).dateModified ?? p.data.datum)
    );
  }

  for (const v of vergleiche) {
    if (!v.slug) continue;
    if (!hasEnoughContent(v, 900)) continue;

    push(
      `/vergleiche/${v.slug}/`,
      typeof v.data.image === "string" ? v.data.image : undefined,
      safeDate((v.data as any).dateModified ?? v.data.datum)
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${urls.join("\n")}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};