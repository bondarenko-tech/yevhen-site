import fs from "fs";
import path from "path";

const ROOT = "./src/content";
const ruRegex = /[А-Яа-яЁё]/;

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
let hasError = false;

files.forEach((file) => {
  const content = fs.readFileSync(file, "utf-8");
  if (ruRegex.test(content)) {
    console.error(`❌ Russian text found in: ${file}`);
    hasError = true;
  }
});

if (hasError) {
  process.exit(1);
} else {
  console.log("✅ Language check passed");
}