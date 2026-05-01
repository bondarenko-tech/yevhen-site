import fs from "fs";
import path from "path";

const ROOT = "./src/content/produkte";
const FROM = "a";
const TO = "r";

function walk(dir) {
  let files = [];

  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      files = files.concat(walk(full));
    } else if (full.endsWith(".md") || full.endsWith(".mdx")) {
      files.push(full);
    }
  }

  return files;
}

function getFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : null;
}

function getField(fm, field) {
  const match = fm.match(new RegExp(`^${field}:\\s*(.*)$`, "m"));
  return match ? match[1].trim().replace(/^["']|["']$/g, "") : "";
}

function setOrReplaceField(fm, field, value) {
  const line = `${field}: "${value}"`;

  if (new RegExp(`^${field}:`, "m").test(fm)) {
    return fm.replace(new RegExp(`^${field}:.*$`, "m"), line);
  }

  return `${fm.trimEnd()}\n${line}`;
}

function hasField(fm, field) {
  return new RegExp(`^${field}:`, "m").test(fm);
}

const files = walk(ROOT).filter((file) => {
  const first = path.basename(file).toLowerCase()[0];
  return first >= FROM && first <= TO;
});

let changed = 0;
let skippedNoFrontmatter = [];

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  const fm = getFrontmatter(original);

  if (!fm) {
    skippedNoFrontmatter.push(file);
    continue;
  }

  let newFm = fm;
  let touched = false;

  const datum = getField(newFm, "datum");
  const datePublished = getField(newFm, "datePublished");

  const baseDate = datePublished || datum || "2026-05-01";

  // dateModified: "" -> dateModified: baseDate
  const dateModified = getField(newFm, "dateModified");
  if (hasField(newFm, "dateModified") && !dateModified) {
    newFm = setOrReplaceField(newFm, "dateModified", baseDate);
    touched = true;
  }

  // если dateModified вообще нет — добавляем
  if (!hasField(newFm, "dateModified")) {
    newFm = setOrReplaceField(newFm, "dateModified", baseDate);
    touched = true;
  }

  // если есть datum, но нет datePublished — добавляем datePublished
  if (datum && !hasField(newFm, "datePublished")) {
    newFm = setOrReplaceField(newFm, "datePublished", datum);
    touched = true;
  }

  // missing videoDuration -> 0
  if (!hasField(newFm, "videoDuration")) {
    newFm = setOrReplaceField(newFm, "videoDuration", "0");
    touched = true;
  }

  // missing videoMainId -> ""
  if (!hasField(newFm, "videoMainId")) {
    newFm = setOrReplaceField(newFm, "videoMainId", "");
    touched = true;
  }

  // missing videoLang -> de
  if (!hasField(newFm, "videoLang")) {
    newFm = setOrReplaceField(newFm, "videoLang", "de");
    touched = true;
  }

  if (touched) {
    const updated = original.replace(
      /^---\r?\n[\s\S]*?\r?\n---/,
      `---\n${newFm.trim()}\n---`
    );

    fs.writeFileSync(file, updated, "utf8");
    changed++;
  }
}

console.log(`Checked: ${files.length}`);
console.log(`Changed: ${changed}`);
console.log(`Skipped no frontmatter: ${skippedNoFrontmatter.length}`);

if (skippedNoFrontmatter.length) {
  console.log("\nFiles without frontmatter:");
  for (const file of skippedNoFrontmatter) {
    console.log(`- ${file}`);
  }
}