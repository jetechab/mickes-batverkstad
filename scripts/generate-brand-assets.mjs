/**
 * Genererar favicons, favicon.ico och og-bild från public/img/priox-mark.svg.
 * Körs manuellt vid loggbyte: node scripts/generate-brand-assets.mjs
 */
import { writeFileSync } from "node:fs";
import sharp from "sharp";

const MARK = "public/img/priox-mark.svg";

const render = (size) =>
  sharp(MARK, { density: 300 }).resize(size, size).png().toBuffer();

const sizes = [
  [16, "public/favicon-16x16.png"],
  [32, "public/favicon-32x32.png"],
  [48, "public/favicon-48x48.png"],
  [64, "public/favicon.png"],
  [180, "public/apple-touch-icon.png"],
  [192, "public/android-chrome-192x192.png"],
  [512, "public/android-chrome-512x512.png"],
];

for (const [size, file] of sizes) {
  writeFileSync(file, await render(size));
  console.log("skrev", file);
}

// favicon.ico: ICO-container med PNG-poster (16/32/48), stöds av alla moderna webbläsare
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(icoSizes.map(render));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
let offset = 6 + 16 * pngs.length;
const entries = pngs.map((png, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(icoSizes[i], 0);
  e.writeUInt8(icoSizes[i], 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(png.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += png.length;
  return e;
});
writeFileSync("public/favicon.ico", Buffer.concat([header, ...entries, ...pngs]));
console.log("skrev public/favicon.ico");

// og-bild 1200x630: märke + ordbild på sajtens ljusa bakgrund
const markPng = await sharp(MARK, { density: 300 }).resize(196, 196).png().toBuffer();
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#f5f1ea"/>
  <text x="600" y="412" text-anchor="middle" font-family="Avenir Next, Helvetica Neue, Arial, sans-serif" font-size="76" font-weight="700" fill="#1f2f5f">Priox Båtverkstad</text>
  <text x="600" y="468" text-anchor="middle" font-family="Avenir Next, Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="500" fill="#5a6b7a">Tidigare Mickes Båtverkstad</text>
  <text x="600" y="522" text-anchor="middle" font-family="Avenir Next, Helvetica Neue, Arial, sans-serif" font-size="26" fill="#5a6b7a">Mobil båtverkstad i Bohuslän</text>
</svg>`;
await sharp(Buffer.from(ogSvg))
  .composite([{ input: markPng, left: 502, top: 118 }])
  .jpeg({ quality: 88 })
  .toFile("public/og-image.jpg");
console.log("skrev public/og-image.jpg");
