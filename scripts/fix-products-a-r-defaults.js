import fs from "fs";
import path from "path";

const ROOT = "./src/content/produkte";

function walk(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) files = files.concat(walk(full));
    else if (full.endsWith(".md") || full.endsWith(".mdx")) files.push(full);
  }
  return files;
}

function getFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : null;
}

function hasField(fm, field) {
  return new RegExp(`^${field}:`, "m").test(fm);
}

function getField(fm, field) {
  const match = fm.match(new RegExp(`^${field}:\\s*(.*)$`, "m"));
  return match ? match[1].trim().replace(/^["']|["']$/g, "") : "";
}

function addField(fm, field, value) {
  if (hasField(fm, field)) return fm;
  return `${fm.trimEnd()}\n${field}: ${value}`;
}

function slugFromFile(file) {
  return path.basename(file).replace(/\.(md|mdx)$/i, "");
}

function inferCategoryFromSlug(slug) {
  if (/fritz|devolo|repeater|wifi|wlan|router|powerline|mesh/i.test(slug)) return "netzwerk";
  if (/steckdose|steckdosen|plug|powerbank|lade|usb|strom/i.test(slug)) return "strom";
  if (/kamera|cam|doorbell|tuer|klingel|lock|alarm|airtag|tag|tracker|ring|reolink|eufy|dahua|hikvision|philips-hue-secure/i.test(slug)) return "sicherheit";
  if (/thermo|heiz|klima|luft|ventilator|comfee|dreo/i.test(slug)) return "klima";
  return "sonstiges";
}

function inferTypFromSlug(slug) {
  if (/repeater/i.test(slug)) return "wlan-repeater";
  if (/router|fritzbox|fritz-box/i.test(slug)) return "router";
  if (/powerline/i.test(slug)) return "powerline";
  if (/steckdosenleiste/i.test(slug)) return "steckdosenleiste";
  if (/steckdose|plug|zwischenstecker/i.test(slug)) return "smart-steckdose";
  if (/kamera|cam/i.test(slug)) return "ueberwachungskamera";
  if (/tuer|doorbell|klingel/i.test(slug)) return "tuerklingel";
  if (/thermo/i.test(slug)) return "thermostat";
  return "sonstiges";
}

const files = walk(ROOT).filter((file) => {
  const first = path.basename(file).toLowerCase()[0];
  return first >= "a" && first <= "r";
});

let changed = 0;
let skipped = [];

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  let fm = getFrontmatter(original);

  if (!fm) {
    skipped.push(file);
    continue;
  }

  const slug = slugFromFile(file);
  const category = getField(fm, "kategorie") || inferCategoryFromSlug(slug);
  const typ = getField(fm, "typ") || inferTypFromSlug(slug);

  let newFm = fm;

  newFm = addField(newFm, "link", `"/empfehlungen/${category}/${slug}/"`);
  newFm = addField(newFm, "typ", `"${typ}"`);
  newFm = addField(newFm, "priceCurrency", `"EUR"`);
  newFm = addField(newFm, "availability", `"https://schema.org/InStock"`);
  newFm = addField(newFm, "featured", `false`);
  newFm = addField(newFm, "familyFriendly", `true`);
  newFm = addField(newFm, "videoMainId", `""`);
  newFm = addField(newFm, "videoShortId", `""`);
  newFm = addField(newFm, "videoDuration", `0`);
  newFm = addField(newFm, "videoLang", `"de"`);
  newFm = addField(newFm, "specs", `[]`);

  if (!hasField(newFm, "kurzfakten")) {
    newFm = `${newFm.trimEnd()}

kurzfakten:
  - label: "Kategorie"
    value: "${category}"
  - label: "Produkttyp"
    value: "${typ}"
  - label: "Einsatzbereich"
    value: "Haushalt & Alltag"`;
  }

  if (newFm !== fm) {
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
console.log(`Skipped no frontmatter: ${skipped.length}`);

if (skipped.length) {
  console.log("\nSkipped:");
  for (const f of skipped) console.log(`- ${f}`);
}