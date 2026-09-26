import fs from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "src", "content", "produkte");

const replacements = [
  ["Test 2026", "Überblick 2026"],
  ["im Test", "im Überblick"],
  ["Test –", "Überblick –"],
];

let filesFound = 0;
let replacementsFound = 0;

const files = fs
  .readdirSync(DIR)
  .filter((file) => file.endsWith(".mdx"));

for (const file of files) {
  const filePath = path.join(DIR, file);
  const content = fs.readFileSync(filePath, "utf8");

  let fileChanges = 0;

  for (const [from] of replacements) {
    const count = content.split(from).length - 1;
    fileChanges += count;
  }

  if (fileChanges > 0) {
    filesFound++;
    replacementsFound += fileChanges;

    console.log(`${file} → ${fileChanges} Änderung(en)`);
  }
}

console.log("");
console.log("================================");
console.log(`Dateien betroffen: ${filesFound}`);
console.log(`Ersetzungen gefunden: ${replacementsFound}`);
console.log("================================");
console.log("");
console.log("NUR PRÜFUNG – keine Dateien geändert.");