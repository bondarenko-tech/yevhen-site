import fs from "fs";
import path from "path";

const ROOT = "./src/content/produkte";

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

let changed = 0;

for (const file of walk(ROOT)) {
  let content = fs.readFileSync(file, "utf8");
  const before = content;

  // videoDuration: "0" -> videoDuration: 0
  content = content.replace(
    /^videoDuration:\s*["'](\d+)["']\s*$/gm,
    "videoDuration: $1"
  );

  // videoDuration: "" -> videoDuration: 0
  content = content.replace(
    /^videoDuration:\s*["']{2}\s*$/gm,
    "videoDuration: 0"
  );

  // videoDuration пустой -> 0
  content = content.replace(
    /^videoDuration:\s*$/gm,
    "videoDuration: 0"
  );

  if (content !== before) {
    fs.writeFileSync(file, content, "utf8");
    changed++;
  }
}

console.log(`Fixed videoDuration in ${changed} files`);