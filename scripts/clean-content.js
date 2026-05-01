import fs from "fs";
import path from "path";

const ROOT = "./src/content"; // при необходимости поправь путь

// простые маркеры RU/смешанного текста
const ruRegex = /[А-Яа-яЁё]/g;

// часто встречающиеся куски
const replacements = [
  [/👉 это инструмент для экономии/g, "👉 ein praktisches Tool zum Sparen"],
  [/👉 если хочешь реально sparen → это стоит/g, "👉 wenn du wirklich sparen willst → lohnt es sich"],
];

// рекурсивный обход
function walk(dir) {
  let results = [];
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith(".md") || filePath.endsWith(".mdx")) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walk(ROOT);

let changed = 0;

files.forEach((file) => {
  let content = fs.readFileSync(file, "utf-8");

  // 1) удалить любые RU-символы (жёстко)
  if (ruRegex.test(content)) {
    content = content.replace(ruRegex, "");
  }

  // 2) точечные замены
  replacements.forEach(([from, to]) => {
    content = content.replace(from, to);
  });

  fs.writeFileSync(file, content, "utf-8");
  changed++;
});

console.log(`Processed ${changed} files`);