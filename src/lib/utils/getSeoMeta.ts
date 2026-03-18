import type { CollectionEntry } from "astro:content";

// Используем тип из твоих новых контент-коллекций
type ProduktData = CollectionEntry<"produkte">["data"];

/**
 * Генерирует SEO-заголовки и описания для Product страниц.
 * Адаптировано под тренды поиска 2026 года.
 */
export function getSeoMeta(data: ProduktData) {
  const currentYear = new Date().getFullYear(); // 2026
  
  const rawBrand = typeof data.brand === "object" ? data.brand?.name : data.brand || "";
  const brandName = (rawBrand || "").trim();

  // Используем заголовок или динамический fallback
  const baseTitle = (data.title || `Empfehlung ${currentYear}`).trim();
  
  const kategorie = data.kategorie
    ? data.kategorie.replace(/[-_]/g, " ").trim()
    : "";

  const teaserClean = cleanText(data.description || data.teaser || "");

  // 🔹 Формирование Title (Цель: кликабельность в Google)
  let title = baseTitle;

  // Добавляем бренд, если его еще нет
  if (brandName && !title.toLowerCase().includes(brandName.toLowerCase())) {
    title = `${title} – ${brandName}`;
  }

  // Добавляем категорию и год для свежести (SEO Freshness)
  if (kategorie) {
    title = `${title} | ${capitalize(kategorie)} Test ${currentYear}`;
  }

  // 🔹 Формирование Description
  let description: string;

  if (teaserClean.length > 80) {
    description = teaserClean;
  } else {
    const brandPart = brandName ? ` von ${brandName}` : "";
    // Добавляем "Ehrliche Einschätzung" — это повышает доверие (E-E-A-T)
    description = `${baseTitle}${brandPart}. Unabhängiger Test & ehrliche Einschätzung für dein smartes Zuhause. Jetzt informieren!`;
  }

  return {
    title: truncateByPixels(title, 580),
    description: truncateByPixels(description, 920)
  };
}

/** Визуальное ограничение для Google SERP */
function truncateByPixels(text: string, maxPx: number): string {
  const avgWidth = 8; // Символы в верхнем регистре шире, берем с запасом
  const maxChars = Math.floor(maxPx / avgWidth);
  const clean = text.trim();
  
  if (clean.length <= maxChars) return clean;
  
  // Режем по словам, чтобы не обрывать на полуслове
  const truncated = clean.slice(0, maxChars - 3);
  return truncated.slice(0, truncated.lastIndexOf(" ")).trimEnd() + "...";
}

function cleanText(s: string): string {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
}