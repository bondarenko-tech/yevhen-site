import fs from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "src", "content", "produkte");

if (!fs.existsSync(DIR)) {
  console.error(`Ordner nicht gefunden: ${DIR}`);
  process.exit(1);
}

let filesChanged = 0;
let replacements = 0;

const files = fs
  .readdirSync(DIR)
  .filter((file) => file.endsWith(".mdx"));

function replaceTestWording(content) {
  let count = 0;

  const rules = [
    // Test 2026 → Überblick 2026
    [/\bTest 2026\b/g, "Überblick 2026"],

    // im Test → im Überblick
    [/\bim Test\b/g, "im Überblick"],

    // Test – → Überblick –
    [/\bTest\s+–/g, "Überblick –"],

    // übrig gebliebenes " Test " vor typischen Trennern
    [/\bTest(?=\s*[—–:-])/g, "Überblick"],
  ];

  let result = content;

  for (const [pattern, replacement] of rules) {
    result = result.replace(pattern, () => {
      count++;
      return replacement;
    });
  }

  return { result, count };
}

console.log("");
console.log("=== TEST-WORDING MIGRATION ===");
console.log("");

for (const file of files) {
  const filePath = path.join(DIR, file);
  const oldContent = fs.readFileSync(filePath, "utf8");

  const { result: newContent, count } =
    replaceTestWording(oldContent);

  if (count === 0) continue;

  fs.writeFileSync(filePath, newContent, "utf8");

  filesChanged++;
  replacements += count;

  console.log(`✓ ${file} → ${count} Änderung(en)`);
}

console.log("");
console.log("==============================");
console.log(`Dateien geändert: ${filesChanged}`);
console.log(`Ersetzungen:      ${replacements}`);
console.log("==============================");
console.log("");

if (filesChanged === 0) {
  console.log("Keine Änderungen notwendig.");
} else {
  console.log("Migration abgeschlossen.");
}