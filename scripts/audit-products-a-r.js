import fs from "fs";
import path from "path";

const ROOT = "./src/content/produkte";
const OUT = "./scripts/audit-products-a-r-report.txt";

const from = "a";
const to = "r";

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
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  return match ? match[1] : "";
}

function hasField(fm, field) {
  return new RegExp(`^${field}:`, "m").test(fm);
}

function getFieldValue(fm, field) {
  const match = fm.match(new RegExp(`^${field}:\\s*(.*)$`, "m"));
  return match ? match[1].trim() : "";
}

const files = walk(ROOT).filter((file) => {
  const name = path.basename(file).toLowerCase();
  const first = name[0];
  return first >= from && first <= to;
});

let report = [];
let badCount = 0;

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const fm = getFrontmatter(content);

  const issues = [];

  if (!fm) issues.push("NO_FRONTMATTER");

  if (/[А-Яа-яЁё]/.test(content)) issues.push("RUSSIAN_TEXT_FOUND");

  if (!hasField(fm, "title")) issues.push("MISSING_title");
  if (!hasField(fm, "description")) issues.push("MISSING_description");
  if (!hasField(fm, "link")) issues.push("MISSING_link");
  if (!hasField(fm, "kategorie")) issues.push("MISSING_kategorie");
  if (!hasField(fm, "typ")) issues.push("MISSING_typ");
  if (!hasField(fm, "brand")) issues.push("MISSING_brand");
  if (!hasField(fm, "image")) issues.push("MISSING_image");
  if (!hasField(fm, "preis")) issues.push("MISSING_preis");
  if (!hasField(fm, "priceCurrency")) issues.push("MISSING_priceCurrency");
  if (!hasField(fm, "availability")) issues.push("MISSING_availability");
  if (!hasField(fm, "linkExtern")) issues.push("MISSING_linkExtern");
  if (!hasField(fm, "videoShortId")) issues.push("MISSING_videoShortId");
  if (!hasField(fm, "videoDuration")) issues.push("MISSING_videoDuration");
  if (!hasField(fm, "videoLang")) issues.push("MISSING_videoLang");
  if (!hasField(fm, "featured")) issues.push("MISSING_featured");
  if (!hasField(fm, "familyFriendly")) issues.push("MISSING_familyFriendly");
  if (!hasField(fm, "tags")) issues.push("MISSING_tags");
  if (!hasField(fm, "specs")) issues.push("MISSING_specs");
  if (!hasField(fm, "kurzfakten")) issues.push("MISSING_kurzfakten");

  if (!hasField(fm, "datum") && !hasField(fm, "datePublished")) {
    issues.push("MISSING_date");
  }

  if (hasField(fm, "dateModified")) {
    const value = getFieldValue(fm, "dateModified");
    if (value === '""' || value === "''" || value === "") {
      issues.push("EMPTY_dateModified");
    }
  }

  if (content.includes("<YouTubeLite") && !content.includes("import YouTubeLite")) {
    issues.push("YOUTUBELITE_NOT_IMPORTED");
  }

  if (issues.length > 0) {
    badCount++;
    report.push(`\n${file}`);
    for (const issue of issues) {
      report.push(`  - ${issue}`);
    }
  }
}

const output = [
  `Checked files: ${files.length}`,
  `Files with issues: ${badCount}`,
  "",
  ...report,
].join("\n");

fs.writeFileSync(OUT, output, "utf8");

console.log(output);
console.log(`\nReport saved to: ${OUT}`);