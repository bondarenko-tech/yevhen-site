import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "src");

const replacements = [
  { from: "../../data/", to: "@data/" },
  { from: "../../utils/", to: "@utils/" },
  { from: "../../types/", to: "@types/" },
  { from: "../../styles/", to: "@styles/" },
];

// Рекурсивный проход по src/
function processDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDir(fullPath);
      continue;
    }

    if (!/\.(ts|astro|tsx)$/i.test(file)) continue;

    let content = fs.readFileSync(fullPath, "utf8");
    let updated = content;

    for (const { from, to } of replacements) {
      const regex = new RegExp(from.replace(/\./g, "\\."), "g");
      updated = updated.replace(regex, to);
    }

    if (updated !== content) {
      fs.writeFileSync(fullPath, updated, "utf8");
      console.log("✅ Updated imports in:");
      console.log("   " + fullPath);
    }
  }
}

console.log("🔍 Scanning and fixing imports in:");
console.log("   " + rootDir);
console.log("----------------------------------------------------");
processDir(rootDir);
console.log("✅ Done! All relative imports replaced with aliases.");
