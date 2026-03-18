import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { kategorien } from "../data/kategorien";
import { getBrandSlug } from "../lib/brand";

import {
  getProduktUrl,
  getVergleichUrl,
  getVerstehenUrl
} from "../lib/domain/product";

export const prerender = true;

const SITE = "https://yevhenbondarenko.com";

/* ───────── STATIC PAGES ───────── */
const STATIC_PAGES = [
  "/",
  "/empfehlungen/",
  "/links/",
  "/marken/",
  "/kontakt/",
  "/impressum/",
  "/datenschutzerklaerung/",
  "/transparenz/",
  "/ueber-uns/",
  "/verstehen/",
  "/vergleiche/"
];

/* ───────── HELPERS ───────── */
function iso(d?: Date) {
  return d && !isNaN(d.getTime()) ? d.toISOString() : undefined;
}

function abs(path: string) {
  return `${SITE}${path.startsWith("/") ? path : `/${path}`}`;
}

function safeDate(input?: string): Date | undefined {
  if (!input) return undefined;
  const d = new Date(input);
  return isNaN(d.getTime()) ? undefined : d;
}

function normalize(path: string) {
  return path.replace(/\/{2,}/g, "/");
}

/* ───────── PRIORITY HELPERS ───────── */

function priorityFor(path: string) {
  if (path === "/") return "1.0";
  if (path.startsWith("/empfehlungen")) return "0.9";
  if (path.startsWith("/verstehen")) return "0.8";
  if (path.startsWith("/vergleiche")) return "0.8";
  if (path.startsWith("/marken")) return "0.7";
  return "0.6";
}

function freqFor(path: string) {
  if (path === "/") return "daily";
  if (path.startsWith("/empfehlungen")) return "weekly";
  if (path.startsWith("/verstehen")) return "monthly";
  if (path.startsWith("/vergleiche")) return "monthly";
  return "monthly";
}

/* ───────── SITEMAP GENERATOR ───────── */

export async function GET(_: APIContext) {
  const urls: string[] = [];
  const seen = new Set<string>();
  const now = new Date();

  const produkte = await getCollection("produkte");
  const verstehen = await getCollection("verstehen");
  const vergleiche = await getCollection("vergleiche");

  function push(loc: string, lastmod?: Date) {
    const path = normalize(loc);
    const url = abs(path);

    if (seen.has(url)) return;
    seen.add(url);

    const last = iso(lastmod);

    urls.push(
`  <url>
    <loc>${url}</loc>${
      last ? `\n    <lastmod>${last}</lastmod>` : ""
    }
    <changefreq>${freqFor(path)}</changefreq>
    <priority>${priorityFor(path)}</priority>
  </url>`
    );
  }

  /* 1. Статические страницы */
  for (const p of STATIC_PAGES) {
    push(p, now);
  }

  /* 2. Категории */
  for (const k of kategorien) {
    push(`/empfehlungen/${k.id}/`, now);
  }

  /* 3. Продукты */
  for (const p of produkte) {
    const lastmod = safeDate(p.data?.datum) ?? now;

    push(
      getProduktUrl(
        p.slug,
        p.data.kategorie as typeof kategorien[number]["id"]
      ),
      lastmod
    );
  }

  /* 4. Бренды */
  const brands = new Set<string>();

  for (const p of produkte) {
    const brand = p.data.brand;

    const brandSlug =
      typeof brand === "string"
        ? getBrandSlug(brand)
        : brand?.name
        ? getBrandSlug(brand.name)
        : undefined;

    if (brandSlug) brands.add(brandSlug);
  }

  for (const brand of brands) {
    push(`/marken/${brand}/`, now);
  }

  /* 5. Статьи (Verstehen) */
  for (const a of verstehen) {
    const lastmod = safeDate(a.data?.datum) ?? now;
    push(getVerstehenUrl(a.slug), lastmod);
  }

  /* 6. Сравнения (Vergleiche) */
  for (const v of vergleiche) {
    const lastmod = safeDate(v.data?.datum) ?? now;
    push(getVergleichUrl(v.slug), lastmod);
  }

  return new Response(
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      }
    }
  );
}