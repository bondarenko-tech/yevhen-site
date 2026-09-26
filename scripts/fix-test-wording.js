import fs from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "src", "content", "produkte");

const patterns = [
  "Test 2026",
  "im Test",
  "Test –",
];

const stats = {
  title: 0,
  description: 0,
  teaser: 0,
  heading: 0,
  body: 0,
  otherFrontmatter: 0,
};

const examples = {
  title: [],
  description: [],
  teaser: [],
  heading: [],
  body: [],
  otherFrontmatter: [],
};

let filesAffected = new Set();
let totalMatches = 0;

function countPatterns(line) {
  let count = 0;

  for (const pattern of patterns) {
    let pos = 0;

    while ((pos = line.indexOf(pattern, pos)) !== -1) {
      count++;
      pos += pattern.length;
    }
  }

  return count;
}

const files = fs
  .readdirSync(DIR)
  .filter((file) => file.endsWith(".mdx"));

for (const file of files) {
  const filePath = path.join(DIR, file);
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  let inFrontmatter = false;
  let frontmatterEnded = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim() === "---") {
      if (!inFrontmatter && !frontmatterEnded) {
        inFrontmatter = true;
        continue;
      }

      if (inFrontmatter) {
        inFrontmatter = false;
        frontmatterEnded = true;
        continue;
      }
    }

    const matches = countPatterns(line);

    if (matches === 0) continue;

    filesAffected.add(file);
    totalMatches += matches;

    let type;

    if (inFrontmatter) {
      if (/^\s*title\s*:/.test(line)) {
        type = "title";
      } else if (/^\s*description\s*:/.test(line)) {
        type = "description";
      } else if (/^\s*teaser\s*:/.test(line)) {
        type = "teaser";
      } else {
        type = "otherFrontmatter";
      }
    } else if (/^\s*#{1,6}\s+/.test(line)) {
      type = "heading";
    } else {
      type = "body";
    }

    stats[type] += matches;

    if (examples[type].length < 5) {
      examples[type].push(
        `${file}:${i + 1} → ${line.trim()}`
      );
    }
  }
}

console.log("");
console.log("=== TEST-WORDING AUDIT ===");
console.log("");
console.log(`Dateien betroffen: ${filesAffected.size}`);
console.log(`Treffer insgesamt: ${totalMatches}`);
console.log("");
console.log(`title:              ${stats.title}`);
console.log(`description:        ${stats.description}`);
console.log(`teaser:             ${stats.teaser}`);
console.log(`heading:            ${stats.heading}`);
console.log(`body:               ${stats.body}`);
console.log(`otherFrontmatter:   ${stats.otherFrontmatter}`);

console.log("");
console.log("=== BEISPIELE ===");

for (const [type, list] of Object.entries(examples)) {
  console.log("");
  console.log(`[${type}]`);

  if (list.length === 0) {
    console.log("keine");
    continue;
  }

  for (const item of list) {
    console.log(item);
  }
}

console.log("");
console.log("NUR AUDIT – keine Dateien geändert.");