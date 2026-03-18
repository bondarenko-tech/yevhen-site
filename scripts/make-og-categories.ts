import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promises as fs } from "node:fs";
import { createCanvas } from "canvas";

type Kategorie = {
  id: string;
  name: string;
  teaser?: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const KATEGORIEN_PATH = path.join(
  ROOT,
  "src",
  "data",
  "kategorien.ts"
);

const OUT_DIR = path.join(
  ROOT,
  "public",
  "og",
  "category"
);

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function main() {
  console.log("📖 Загружаем kategorien.ts…");

  const mod = await import(pathToFileURL(KATEGORIEN_PATH).href);
  const kategorien: Kategorie[] = mod.kategorien;

  if (!Array.isArray(kategorien)) {
    throw new Error("❌ kategorien.ts не экспортирует массив kategorien");
  }

  await ensureDir(OUT_DIR);

  const width = 1200;
  const height = 630;

  let done = 0;

  for (const k of kategorien) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    /* ───── фон ───── */
    ctx.fillStyle = "#050816";
    ctx.fillRect(0, 0, width, height);

    /* ───── декоративный блок ───── */
    ctx.fillStyle = "#111827";
    ctx.fillRect(80, 140, 1040, 350);

    /* ───── заголовок ───── */
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 64px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    ctx.fillText(k.name, width / 2, 180);

    /* ───── teaser ───── */
    if (k.teaser) {
      ctx.font = "32px sans-serif";
      ctx.fillStyle = "#D1D5DB";

      const maxWidth = 900;
      const words = k.teaser.split(" ");
      let line = "";
      let y = 280;

      for (const w of words) {
        const test = line ? `${line} ${w}` : w;
        if (ctx.measureText(test).width > maxWidth && line) {
          ctx.fillText(line, width / 2, y);
          line = w;
          y += 44;
        } else {
          line = test;
        }
      }
      if (line) ctx.fillText(line, width / 2, y);
    }

    /* ───── бренд ───── */
    ctx.font = "24px sans-serif";
    ctx.fillStyle = "#9CA3AF";
    ctx.fillText(
      "Bondarenko Empfehlungen",
      width / 2,
      height - 90
    );

    const outFile = path.join(OUT_DIR, `${k.id}.png`);
    await fs.writeFile(outFile, canvas.toBuffer("image/png"));

    console.log(`🖼  OG категория → og/category/${k.id}.png`);
    done++;
  }

  console.log(`\n✅ Готово. Категорий: ${done}`);
}

main().catch((err) => {
  console.error("❌ Ошибка:", err);
  process.exit(1);
});
