// src/lib/brand.ts
import { slugify } from "./slugify";

export type BrandLike = string | { name: string } | null | undefined;

export function getBrandName(brand: BrandLike): string | null {
  if (!brand) return null;
  if (typeof brand === "string") {
    const s = brand.trim();
    return s.length ? s : null;
  }
  const s = brand.name?.trim?.() ?? "";
  return s.length ? s : null;
}

export function getBrandSlug(brand: BrandLike): string | null {
  const name = getBrandName(brand);
  return name ? slugify(name) : null;
}