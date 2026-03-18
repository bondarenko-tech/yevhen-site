import fs from "fs";
import path from "path";
import { produkte } from "../src/data/produkte";

const OUTPUT_DIR = path.join(process.cwd(), "src/content/produkte");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function esc(str?: string) {
  if (!str) return "";
  return str.replace(/"/g, "'").replace(/\n/g, " ").trim();
}

for (const p of produkte) {
  if (!p.link) continue;

  const slug = p.link
    .split("/")
    .filter(Boolean)
    .pop();

  if (!slug) continue;

  const brand =
    typeof p.brand === "object"
      ? p.brand.name
      : p.brand ?? "";

  const frontmatter = `---
title: "${esc(p.title)}"
link: "${p.link}"
kategorie: "${p.kategorie}"
typ: "${p.typ ?? "sonstiges"}"
brand: "${esc(brand)}"
image: "${p.image ?? ""}"
teaser: "${esc(p.teaser)}"
description: "${esc(p.description)}"
linkExtern: "${p.linkExtern ?? ""}"
preis: ${typeof p.preis === "number" ? p.preis : "null"}
priceCurrency: "${p.priceCurrency ?? "EUR"}"
availability: "${p.availability ?? ""}"
videoMainId: "${p.videoMainId ?? ""}"
videoShortId: "${p.videoShortId ?? ""}"
${typeof p.videoDuration === "number" ? `videoDuration: ${p.videoDuration}` : ""}
videoLang: "${p.videoLang ?? ""}"
featured: ${p.featured ?? false}
familyFriendly: ${p.familyFriendly ?? false}
sku: "${p.sku ?? ""}"
mpn: "${p.mpn ?? ""}"
tags: ${JSON.stringify(p.tags ?? [])}
specs: ${JSON.stringify(p.specs ?? [])}
kurzfakten: ${JSON.stringify(p.kurzfakten ?? [])}
datum: "${p.datum ?? ""}"
dateModified: "${p.dateModified ?? ""}"
---
`;

  const body = `
${p.description ?? p.teaser ?? ""}
`;

  const filePath = path.join(OUTPUT_DIR, `${slug}.mdx`);

  fs.writeFileSync(filePath, frontmatter + body);

  console.log(`✔ ${slug}.mdx erstellt`);
}

console.log("🚀 SEO-Migration abgeschlossen.");