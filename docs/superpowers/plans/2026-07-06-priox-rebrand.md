# Priox-rebrand + fjärde tjänsten: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Byt namn till Priox Båtverkstad (inom PRIOX AB) i hela sajten, inför nya loggan, lägg till fjärde tjänsten Brygganläggningar & bryggservice och uppdatera om oss enligt godkänd spec `docs/superpowers/specs/2026-07-06-priox-rebrand-design.md`.

**Architecture:** Central branddata i `src/lib/site.ts` (displayName/legalName/formerName) som footer, schema.org och header-tagline hämtar ifrån. Märket ur logo-mastern blir en liten statisk SVG i `public/img/`, ordbilden sätts i HTML-text. Fjärde tjänsten byggs på befintliga `ServicePage.astro`-mallen och läggs in i `services[]`.

**Tech Stack:** Astro 5, React 19, Tailwind v4, sharp (finns redan), Cloudflare Pages Functions, bun.

## Global Constraints

- All copy på svenska, jordnära ton. ALDRIG tankstreck "—" i någon text. Förbjudna ord: "robust", "elegant", "sömlös", "i en värld där".
- Befintliga en-dash "–" (U+2013) i copy får stå kvar, inga nya läggs till.
- Kundcitaten i `src/components/sections/ReviewsSection.tsx` är äkta omdömen och får INTE ändras, de nämner "Mickes Båtverkstad" med rätta.
- Referenser till personen Micke (alt-texter i gallery.ts, kommentarer i images.ts/ServicePage, komponentnamnet MeetMickeSection) behålls. Endast företagsnamnet byts.
- Domänen `https://batverkstad.se` i astro.config.mjs och alla schema-URL:er RÖRS INTE (domänbeslut väntar).
- Endast äkta foton. Inga AI-bilder eller stockbilder.
- Tailwind v4: semantiska klasser (text-foreground, bg-card osv.), inga hårdkodade färger i komponenter. Loggans egna färger (#1f2f5f, #42b8ea) ligger enbart inne i SVG-filerna.
- Priset för bryggservice är "Från 1 250 kr" men vad beloppet avser är obekräftat, prisnoten formuleras neutralt (offert efter besiktning).
- Commit efter varje task. Inga tester finns i projektet, verifiering sker med `bun run check`, `bun run build` och grep.

---

### Task 1: Central branddata i site.ts + BaseLayout + Footer-bottenrad

**Files:**
- Modify: `src/lib/site.ts:1-16` (siteContact) och `src/lib/site.ts:175` (Tanum-prosa)
- Modify: `src/layouts/BaseLayout.astro:29-44,110,135,137,143`
- Modify: `src/components/Footer.astro:160-163`

**Interfaces:**
- Produces: `siteContact.displayName: string`, `siteContact.legalName: string`, `siteContact.formerName: string` (ersätter `companyName`). Alla senare tasks använder dessa exakta fältnamn.

- [ ] **Step 1: Uppdatera siteContact i src/lib/site.ts**

Ersätt fälten `companyName` och `email` (rad 2 och 4) så att objektet börjar:

```ts
export const siteContact = {
  displayName: "Priox Båtverkstad",
  legalName: "PRIOX AB",
  formerName: "Tidigare Mickes Båtverkstad",
  organizationNumber: "556677-9624",
  email: "info@priox.se",
```
Resten av objektet (phoneDisplay t.o.m. quoteSubject) lämnas orört.

- [ ] **Step 2: Skriv om Tanum-prosan i site.ts rad 175**

Gammal: `"Tanums kommun är vår hemmakommun. Mickes Båtverkstad har bas i Grebbestad och vi kommer ut till båten där den står, var du än befinner dig i kommunen.",`

Ny: `"Tanums kommun är vår hemmakommun. Priox Båtverkstad, tidigare Mickes Båtverkstad, har bas i Grebbestad och vi kommer ut till båten där den står, var du än befinner dig i kommunen.",`

- [ ] **Step 3: Uppdatera BaseLayout.astro**

Rad 29-31, titelsuffix:
```ts
const fullTitle = title.includes("Priox Båtverkstad")
  ? title
  : `${title} | Priox Båtverkstad`;
```

Rad 37-44 i localBusinessSchema:
```ts
  name: siteContact.displayName,
  legalName: siteContact.legalName,
  alternateName: "Mickes Båtverkstad",
  identifier: siteContact.organizationNumber,
  description:
    "Mobil båtverkstad i Bohuslän. Service av utombordare, krympplastning, bottenmålning och bryggservice på plats hos kunden.",
  url: "https://batverkstad.se",
  logo: "https://batverkstad.se/android-chrome-512x512.png",
  image: "https://batverkstad.se/og-image.jpg",
```

Rad 110: `<meta name="apple-mobile-web-app-title" content="Priox Båtverkstad" />`
Rad 135: `<meta property="og:image:alt" content="Priox Båtverkstad" />`
Rad 137: `<meta property="og:site_name" content="Priox Båtverkstad" />`
Rad 143: `<meta name="twitter:image:alt" content="Priox Båtverkstad" />`

- [ ] **Step 4: Uppdatera Footer-bottenraden (Footer.astro rad 160-163)**

```astro
      <p class="text-[11px] text-muted-foreground">
        © {currentYear}
        {siteContact.displayName}, en verksamhet inom {siteContact.legalName}. Org.nr {siteContact.organizationNumber}. Bas i {siteContact.city}. {siteContact.formerName}.
      </p>
```

- [ ] **Step 5: Verifiera att inget annat refererar companyName**

Run: `grep -rn "companyName" src functions`
Expected: inga träffar. (kontakt.astro och garanti.astro hårdkodar namnet, de tas i Task 4.)

- [ ] **Step 6: Typkontroll**

Run: `bun run check`
Expected: 0 errors.

- [ ] **Step 7: Commit**

```bash
git add src/lib/site.ts src/layouts/BaseLayout.astro src/components/Footer.astro
git commit -m "feat: central branddata för Priox Båtverkstad i site.ts, schema och footer"
```

---

### Task 2: Märkes-SVG + header, footer-logga och UspSection

**Files:**
- Create: `public/img/priox-mark.svg`
- Create: `src/assets/brand/priox-batverkstad-master.svg` (flytt av `public/PRIOX_Båtverkstad_Master_Svg.svg`)
- Modify: `src/components/Header.tsx:1-6,62-73`
- Modify: `src/components/Footer.astro:25-34`
- Modify: `src/components/sections/UspSection.tsx:49-54`
- Delete: `public/logo.png`

**Interfaces:**
- Consumes: `siteContact.formerName` från Task 1.
- Produces: `/img/priox-mark.svg` (kvadratiskt märke, viewBox 158.7x158.7). Task 3 rastrerar från denna fil.

- [ ] **Step 1: Skapa public/img/priox-mark.svg**

Exakt innehåll (extraherat ur mastern, banorna path18-22 med sina transforms, viewBox = kvadratens bounding box):

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="27.123 27.305 158.732 158.732">
  <path d="M 139.391,20.471 H 20.342 V 139.52 h 119.049 z" fill="#1f2f5f" transform="matrix(1.3333333,0.0,0.0,-1.3333333,0.0,213.332)"/>
  <path d="m 0,0 6.829,-6.828 c 0.506,-0.507 1.36,-0.447 1.773,0.138 5.091,7.219 8.116,15.999 8.116,25.505 0,9.506 -3.025,18.285 -8.116,25.505 -0.413,0.585 -1.267,0.644 -1.773,0.138 L 0,37.63 C -0.383,37.247 -0.438,36.658 -0.149,36.2 3.035,31.17 4.88,25.208 4.88,18.815 4.88,12.421 3.035,6.46 -0.149,1.43 -0.438,0.972 -0.383,0.383 0,0" fill="#42b8ea" transform="matrix(1.3333333,0.0,0.0,-1.3333333,143.38507,131.75773)"/>
  <path d="M 0,0 C -0.383,0.383 -0.972,0.438 -1.43,0.149 -6.46,-3.035 -12.421,-4.88 -18.815,-4.88 -25.208,-4.88 -31.17,-3.035 -36.2,0.149 -36.657,0.438 -37.247,0.383 -37.63,0 l -6.828,-6.828 c -0.506,-0.507 -0.447,-1.361 0.138,-1.774 7.22,-5.091 15.999,-8.115 25.505,-8.115 9.506,0 18.286,3.024 25.505,8.115 0.585,0.413 0.645,1.267 0.139,1.773 z" fill="#42b8ea" transform="matrix(1.3333333,0.0,0.0,-1.3333333,131.57493,143.56787)"/>
  <path d="m 0,0 c 0.392,-0.392 0.997,-0.449 1.466,-0.153 5.026,3.177 10.98,5.017 17.365,5.017 6.386,0 12.34,-1.84 17.366,-5.017 0.469,-0.296 1.073,-0.239 1.466,0.153 l 6.787,6.788 c 0.519,0.519 0.458,1.394 -0.142,1.817 -7.214,5.08 -15.983,8.096 -25.477,8.096 C 9.338,16.701 0.569,13.685 -6.645,8.605 -7.246,8.182 -7.307,7.307 -6.788,6.788 Z" fill="#42b8ea" transform="matrix(1.3333333,0.0,0.0,-1.3333333,81.38,69.752667)"/>
  <path d="m 0,0 -6.83,6.83 c -0.506,0.506 -1.359,0.446 -1.771,-0.139 -5.092,-7.219 -8.117,-15.999 -8.117,-25.505 0,-9.507 3.025,-18.287 8.117,-25.506 0.412,-0.585 1.266,-0.644 1.771,-0.138 L 0,-37.629 c 0.383,0.383 0.438,0.972 0.149,1.429 -3.185,5.03 -5.03,10.992 -5.03,17.386 0,6.393 1.845,12.355 5.03,17.385 C 0.438,-0.971 0.383,-0.383 0,0" fill="#42b8ea" transform="matrix(1.3333333,0.0,0.0,-1.3333333,69.592533,81.585467)"/>
</svg>
```

- [ ] **Step 2: Flytta logo-mastern ut ur public/**

```bash
mkdir -p src/assets/brand
mv "public/PRIOX_Båtverkstad_Master_Svg.svg" src/assets/brand/priox-batverkstad-master.svg
```
(Filen är otrackad, vanlig mv räcker. Den versionshanteras i commiten nedan.)

- [ ] **Step 3: Bygg om logotypblocket i Header.tsx**

Lägg till import överst (efter befintliga imports, rad 5):
```tsx
import { siteContact } from "@/lib/site";
```

Ersätt hela `<a href="/" ...>...</a>`-blocket (rad 62-73, det med `aria-label="Mickes Båtverkstad"` och `<img src="/logo.png" ...>`):

```tsx
        <a
          href="/"
          className="flex flex-col flex-shrink-0 group"
          aria-label="Priox Båtverkstad, tidigare Mickes Båtverkstad"
        >
          <span className="flex items-center gap-2.5">
            <img
              src="/img/priox-mark.svg"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 group-hover:scale-105 transition-transform duration-300"
            />
            <span className="flex flex-col">
              <span className="font-heading text-[17px] font-bold text-foreground leading-[1.05]">
                Priox
              </span>
              <span className="font-heading text-[13px] font-semibold text-primary leading-[1.05]">
                Båtverkstad
              </span>
            </span>
          </span>
          <span className="mt-1 text-[10px] text-muted-foreground leading-none">
            {siteContact.formerName}
          </span>
        </a>
```

- [ ] **Step 4: Bygg om logotypblocket i Footer.astro (rad 25-34)**

Ersätt `<a href="/" class="flex items-center gap-2.5 mb-4 group">...<img src="/logo.png" .../></a>` med:

```astro
        <a href="/" class="flex flex-col mb-4 group">
          <span class="flex items-center gap-2.5">
            <img
              src="/img/priox-mark.svg"
              alt=""
              class="h-10 w-10"
              width="40"
              height="40"
            />
            <span class="flex flex-col">
              <span class="font-heading text-lg font-bold text-foreground leading-[1.05]">Priox</span>
              <span class="font-heading text-sm font-semibold text-primary leading-[1.05]">Båtverkstad</span>
            </span>
          </span>
          <span class="mt-1.5 text-[11px] text-muted-foreground leading-none">{siteContact.formerName}</span>
        </a>
```

- [ ] **Step 5: Byt loggan i UspSection.tsx (rad 49-54)**

```tsx
          <img
            src="/img/priox-mark.svg"
            alt="Priox Båtverkstad"
            className="h-12 md:h-14 w-auto mx-auto mb-6"
            loading="lazy"
          />
```

- [ ] **Step 6: Ta bort gamla loggan**

```bash
git rm public/logo.png
```
Run: `grep -rn "logo.png" src functions public`
Expected: inga träffar.

- [ ] **Step 7: Typkontroll**

Run: `bun run check`
Expected: 0 errors.

- [ ] **Step 8: Commit**

```bash
git add public/img/priox-mark.svg src/assets/brand/priox-batverkstad-master.svg src/components/Header.tsx src/components/Footer.astro src/components/sections/UspSection.tsx
git commit -m "feat: ny Priox-logga som märke + HTML-ordbild i header, footer och USP"
```

---

### Task 3: Favicons, og-bild och webmanifest

**Files:**
- Create: `scripts/generate-brand-assets.mjs`
- Modify: `public/site.webmanifest`
- Regenerate: `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/favicon-48x48.png`, `public/favicon.png`, `public/apple-touch-icon.png`, `public/android-chrome-192x192.png`, `public/android-chrome-512x512.png`, `public/favicon.ico`, `public/og-image.jpg`

**Interfaces:**
- Consumes: `public/img/priox-mark.svg` från Task 2.

- [ ] **Step 1: Skapa scripts/generate-brand-assets.mjs**

```js
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
```

- [ ] **Step 2: Kör skriptet**

Run: `node scripts/generate-brand-assets.mjs`
Expected: "skrev ..." för 7 PNG, favicon.ico och og-image.jpg, inga fel.

- [ ] **Step 3: Visuell kontroll av genererade bilder**

Läs `public/og-image.jpg` och `public/android-chrome-192x192.png` med Read-verktyget.
Expected: og-bilden visar märket centrerat över texten "Priox Båtverkstad" i marinblått på ljus botten, å/ä korrekt renderade. Ikonen är märket, skarpt.
Om texten renderar fel (fyrkanter eller fel typsnitt): byt font-family till enbart "sans-serif" och kör om.

- [ ] **Step 4: Uppdatera public/site.webmanifest**

Hela filen:
```json
{
  "name": "Priox Båtverkstad",
  "short_name": "Priox",
  "description": "Mobil båtverkstad i Bohuslän. Service av utombordare, krympplastning, bottenmålning och bryggservice på plats hos kunden.",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#1f2f5f",
  "background_color": "#f5f1ea",
  "display": "browser",
  "start_url": "/",
  "lang": "sv-SE"
}
```

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-brand-assets.mjs public/site.webmanifest public/favicon-16x16.png public/favicon-32x32.png public/favicon-48x48.png public/favicon.png public/apple-touch-icon.png public/android-chrome-192x192.png public/android-chrome-512x512.png public/favicon.ico public/og-image.jpg
git commit -m "feat: favicons, og-bild och manifest genererade från Priox-märket"
```

---

### Task 4: Copy-svep, namnbyte i alla sidor och komponenter

**Files:**
- Modify: `src/pages/404.astro:6`, `src/pages/index.astro:28-29`, `src/pages/galleri.astro:17`, `src/pages/priser.astro:66`, `src/pages/boka.astro:7`, `src/pages/tack.astro:6`, `src/pages/reservdelar.astro:37`, `src/pages/kontakt.astro:17-18,75,88,98`, `src/pages/garanti.astro:16,141,145-146`, `src/pages/vanliga-fragor.astro:32,60`, `src/pages/integritetspolicy.astro:6-7,20,24,62,77-78`, `src/pages/tjanster/index.astro:23` (endast titeln, resten i Task 6), `src/pages/tjanster/utombordsservice.astro:12`, `src/pages/tjanster/krympplastning.astro:12`, `src/pages/tjanster/bottenmalning.astro:12`, `src/pages/orter/[ort].astro:28`, `src/components/sections/FAQSection.tsx:53-55`, `src/components/sections/MeetMickeSection.tsx:68,74`, `src/components/sections/HeroSection.tsx:308-310`, `src/styles/globals.css:10`

Not: om-oss.astro tas i Task 7. ReviewsSection.tsx, gallery.ts, images.ts, ServicePage.astro-kommentaren lämnas medvetet (kundcitat respektive personreferenser).

- [ ] **Step 1: Titlar och beskrivningar, raka byten**

- `404.astro:6`: `title="Sidan hittades inte | Priox Båtverkstad"`
- `galleri.astro:17`: `title="Galleri | Priox Båtverkstad"`
- `priser.astro:66`: `title="Priser | Priox Båtverkstad"`
- `boka.astro:7`: `title="Boka tid | Priox Båtverkstad"`
- `tack.astro:6`: `title="Tack för din förfrågan | Priox Båtverkstad"`
- `reservdelar.astro:37`: `title="Reservdelar utombordare | Priox Båtverkstad"`
- `tjanster/index.astro:23`: `title="Tjänster | Priox Båtverkstad"`
- `vanliga-fragor.astro:32`: `title="Vanliga frågor | Priox Båtverkstad"`

- [ ] **Step 2: Startsidans titel och beskrivning (index.astro rad 28-29)**

```astro
  title="Priox Båtverkstad, tidigare Mickes Båtverkstad | Mobil båtservice i Bohuslän"
  description="Mobil båtverkstad i Bohuslän, tidigare Mickes Båtverkstad. Vi servar utombordare, krympplastar, bottenmålar och tar hand om bryggor, på plats hos dig. Bas i Grebbestad. Bokning på 0767-16 67 16."
```

- [ ] **Step 3: Schema-providernamn i tjänste- och ortssidor**

I `tjanster/utombordsservice.astro:12`, `tjanster/krympplastning.astro:12`, `tjanster/bottenmalning.astro:12` och `orter/[ort].astro:28`, byt
`name: "Mickes Båtverkstad AB",` mot `name: "Priox Båtverkstad",`

- [ ] **Step 4: kontakt.astro**

- Rad 17-18: `title="Kontakt | Priox Båtverkstad"` och `description="Kontakta Priox Båtverkstad, tidigare Mickes Båtverkstad. Telefon 0767-16 67 16, mail info@priox.se. Bas i Grebbestad."`
- Rad 75: `href="mailto:info@priox.se"`
- Rad 88: visningstexten `info@priox.se`
- Rad 98: `<p class="text-foreground font-medium">Priox Båtverkstad</p>` och lägg till direkt efter: `<p class="text-muted-foreground text-xs">En verksamhet inom PRIOX AB. Tidigare Mickes Båtverkstad.</p>`

- [ ] **Step 5: garanti.astro**

- Rad 16: `title="Garanti på arbete och reservdelar | Priox Båtverkstad"`
- Rad 141: `<li><span class="text-foreground font-medium">Priox Båtverkstad, en verksamhet inom PRIOX AB</span></li>`
- Rad 145-146: mailto-länk och text till `info@priox.se`

- [ ] **Step 6: vanliga-fragor.astro rad 60**

`mickes@batverkstad.se så återkommer vi.` byts till `info@priox.se så återkommer vi.`

- [ ] **Step 7: integritetspolicy.astro**

- Rad 6-7: `title="Integritetspolicy | Priox Båtverkstad"` och `description="Så här hanterar Priox Båtverkstad personuppgifter i enlighet med GDPR."`
- Rad 20: `<p class="text-muted-foreground mb-10">Senast uppdaterad: 2026-07-06</p>`
- Rad 24: `PRIOX AB (Priox Båtverkstad, tidigare Mickes Båtverkstad) värnar om din integritet. Den här policyn`
- Rad 62: `info@priox.se så hanterar vi det.`
- Rad 77-78:
```astro
          PRIOX AB (Priox Båtverkstad, tidigare Mickes Båtverkstad), org.nr
          556677-9624, Box 6, 457 02 Grebbestad.
          E-post: <a href="mailto:info@priox.se" class="text-primary hover:underline">info@priox.se</a>.
```

- [ ] **Step 8: FAQSection.tsx rad 53-55**

```tsx
    a: "Ja. Priox Båtverkstad drivs inom PRIOX AB som är godkänt för F-skatt. Företagsuppgifter finns i sidfoten på sajten.",
    plain:
      "Ja. PRIOX AB är godkänt för F-skatt.",
```

- [ ] **Step 9: MeetMickeSection.tsx**

- Rad 68: `Din båtmekaniker och grundare av Priox Båtverkstad.`
- Rad 74: `Jag grundade båtverkstaden för att göra båtlivet enklare.`

- [ ] **Step 10: HeroSection.tsx rad 308-310 (bylinen i PersonalCard)**

```tsx
            <p className="text-[11px] text-muted-foreground text-right">
              Priox Båtverkstad
              <span className="block">Tidigare Mickes Båtverkstad</span>
            </p>
```

- [ ] **Step 11: globals.css rad 10, kommentaren**

`* Byts ut när Mickes/Måns godkänt slutgiltig palett. Komponenter ska aldrig` byts till `* Byts ut när klienten godkänt slutgiltig palett. Komponenter ska aldrig`

- [ ] **Step 12: Grep-verifiering**

Run: `grep -rn "Mickes Båtverkstad" src functions public/site.webmanifest | grep -v "Tidigare Mickes Båtverkstad" | grep -v "tidigare Mickes Båtverkstad" | grep -v ReviewsSection`
Expected: endast träffar i `src/pages/om-oss.astro` (tas i Task 7) och `functions/api/contact.ts` (tas i Task 5).

Run: `grep -rn "mickes@batverkstad.se" src`
Expected: endast `src/pages/om-oss.astro`.

- [ ] **Step 13: Typkontroll och commit**

Run: `bun run check`
Expected: 0 errors.

```bash
git add -A src/pages src/components src/styles
git commit -m "feat: namnbyte till Priox Båtverkstad i titlar, scheman och copy"
```

---

### Task 5: Autosvar och adminmail i functions/api/contact.ts

**Files:**
- Modify: `functions/api/contact.ts:129,142,146,177,204-209,298`

Domänen batverkstad.se på rad 148 och 207 lämnas orörd (domänbeslut väntar). `CONTACT_TO_EMAIL`/`CONTACT_FROM_EMAIL` i Cloudflare rörs inte.

- [ ] **Step 1: Textmailet (buildCustomerTextEmail)**

- Rad 129: `"Tack för din förfrågan till Priox Båtverkstad. Vi har tagit emot ditt meddelande och återkommer så snart vi kan, oftast samma dag på vardagar.",`
- Rad 142: `"Behöver du nå oss direkt, ring 0767-16 67 16 eller maila info@priox.se.",`
- Rad 146: `"Priox Båtverkstad, en verksamhet inom PRIOX AB",`

- [ ] **Step 2: HTML-mailet (buildCustomerHtmlEmail)**

- Rad 177, brand-chippen: `...>Priox Båtverkstad</p>`
- Rad 204: `<p style="margin:0 0 4px 0;font-weight:700;color:#0a1924;">Priox Båtverkstad</p>` och direkt efter, före rad 205, ny rad: `<p style="margin:0 0 4px 0;">En verksamhet inom PRIOX AB · Tidigare Mickes Båtverkstad</p>`
- Rad 209: `<a href="mailto:info@priox.se" style="color:#0a6378;text-decoration:none;">info@priox.se</a>`

- [ ] **Step 3: Ämnesraden rad 298**

`subject: "Tack för din förfrågan – Priox Båtverkstad",`

- [ ] **Step 4: Verifiera**

Run: `grep -n "Mickes\|mickes@" functions/api/contact.ts`
Expected: inga träffar utom eventuell "Tidigare Mickes Båtverkstad".

Run: `bun run check`
Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add functions/api/contact.ts
git commit -m "feat: Priox Båtverkstad och info@priox.se i autosvar och kundmail"
```

---

### Task 6: Fjärde tjänsten Brygganläggningar & bryggservice

**Files:**
- Modify: `src/lib/site.ts:26-45` (services-arrayen)
- Create: `src/pages/tjanster/brygganlaggningar.astro`
- Modify: `src/components/sections/ServicesSection.tsx:4,7-29,64-66,71`
- Modify: `src/components/sections/HeroSection.tsx:21-40,185`
- Modify: `src/components/Footer.astro:35-38,56-64`
- Modify: `src/pages/priser.astro:15-62` (ny post i lokala services-arrayen)
- Modify: `src/pages/tjanster/index.astro:24,46-58`

**Interfaces:**
- Consumes: `ServicePage.astro`-mallens props (eyebrow, title, titleAccent, lede, price, bullets, includesTitle, includes, sections). Bild utelämnas medvetet, inget äkta bryggfoto finns.
- Produces: sidan `/tjanster/brygganlaggningar/`, service-slug `brygganlaggningar` i `services[]` (ContactLeadForm plockar upp den automatiskt).

- [ ] **Step 1: Lägg till tjänsten i services[] i site.ts**

Efter bottenmålning-posten (rad 39-44), före `] as const;`:

```ts
  {
    slug: "brygganlaggningar",
    title: "Brygganläggningar & bryggservice",
    short: "Byggnation, ombyggnad, renovering och underhåll av bryggor och marina anläggningar.",
    brands: [],
  },
```

- [ ] **Step 2: Skapa src/pages/tjanster/brygganlaggningar.astro**

Hela filen:

```astro
---
import CtaSection from "@/components/sections/CtaSection.tsx";
import ServicePage from "@/components/ServicePage.astro";
import BaseLayout from "@/layouts/BaseLayout.astro";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Brygganläggningar & bryggservice",
  provider: {
    "@type": "LocalBusiness",
    name: "Priox Båtverkstad",
  },
  description:
    "Byggnation, ombyggnad, renovering och underhåll av bryggor, bryggdäck, landgångar och marina anläggningar längs Bohuskusten.",
  serviceType: "Dock and pier construction and maintenance",
  areaServed: { "@type": "AdministrativeArea", name: "Bohuslän" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Hem", item: "https://batverkstad.se/" },
    { "@type": "ListItem", position: 2, name: "Tjänster", item: "https://batverkstad.se/tjanster/" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Brygganläggningar & bryggservice",
      item: "https://batverkstad.se/tjanster/brygganlaggningar/",
    },
  ],
};
---

<BaseLayout
  title="Brygganläggningar & bryggservice | Byggnation och underhåll"
  description="Byggnation, ombyggnad, renovering och underhåll av bryggor, bryggdäck och landgångar längs Bohuskusten. För privatpersoner, företag, samfälligheter och marinor."
  schema={[serviceSchema, breadcrumbSchema]}
>
  <ServicePage
    eyebrow="Tjänst"
    title="Brygganläggningar &"
    titleAccent="bryggservice"
    lede="Vi utför byggnation, ombyggnad, renovering och underhåll av bryggor, bryggdäck, landgångar och marina anläggningar längs Bohuskusten. Vi hjälper privatpersoner, företag, samfälligheter och marinor med både mindre och större projekt."
    price="Från 1 250 kr"
    bullets={[
      "Byggnation och ombyggnad",
      "Reparation och renovering",
      "Hållbara och säkra konstruktioner",
      "Marina anläggningar och kajer",
      "Kvalitetsmaterial för lång livslängd",
      "Erfarenhet från kustens förhållanden",
    ]}
    includesTitle="Det här ingår"
    includes={[
      "Besiktning och bedömning på plats",
      "Planering och förslag på åtgärder",
      "Byggnation, ombyggnad och reparation",
      "Montering av landgångar, pollare, stegar och utrustning",
      "Byte av bryggvirke och bärande konstruktioner",
      "Slutkontroll efter utfört arbete",
    ]}
    sections={[
      {
        heading: "Havsanknuten verksamhet",
        body: "Vi är ett anläggningsföretag med inriktning på bryggor och marina anläggningar. Arbetet sker vid och på vattnet, och vi är vana vid de förutsättningar som kusten ger. Väder, vind och saltvatten ställer andra krav än byggen på land.",
      },
      {
        heading: "Verksamma längs Bohuskusten",
        body: "Med bas i Grebbestad utför vi arbeten vid bryggor, marinor, hamnar och kustnära anläggningar längs hela Bohuskusten. Vi tar uppdrag för privatpersoner, företag, samfälligheter och marinor.",
      },
      {
        heading: "Kvalitet och hållbarhet",
        body: "Vi använder kvalitetsmaterial och beprövade metoder. En brygga ska klara många säsonger av väder, vind och saltvatten, så vi bygger för lång livslängd och säker användning.",
      },
      {
        heading: "Rådgivning och helhet",
        body: "Vi hjälper dig hela vägen från planering till färdig brygganläggning. Det börjar med en besiktning på plats, sedan får du ett tydligt förslag på åtgärder och pris innan arbetet sätter igång.",
      },
    ]}
  />

  <CtaSection client:visible />
</BaseLayout>
```

- [ ] **Step 3: Fjärde kortet i ServicesSection.tsx**

Rad 4, lägg till ikonen i importen:
```tsx
import { ArrowRight, ArrowUpRight, Droplets, Fence, Paintbrush, Wrench } from "lucide-react";
```

Efter bottenmålning-posten i services-arrayen (rad 22-28), lägg till:
```tsx
  {
    icon: Fence,
    title: "Brygganläggningar & bryggservice",
    href: "/tjanster/brygganlaggningar/",
    body: "Byggnation, ombyggnad, renovering och underhåll av bryggor, bryggdäck, landgångar och marina anläggningar. För privatpersoner, företag, samfälligheter och marinor.",
    bullets: ["Byggnation och ombyggnad", "Reparation och renovering", "Underhåll och service"],
  },
```

Rad 64-66, högertexten: `Fyra kärntjänster, en mobil verkstad. Vi kommer ut till hemmaplanen, bryggan eller marinan.`

Rad 71, grid: `className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8"`

- [ ] **Step 4: Fjärde kortet i hero-strippen (HeroSection.tsx)**

Efter bottenmålning-posten i heroServices (rad 34-39), lägg till:
```tsx
  {
    label: "Bryggor & marina",
    value: "Brygganläggningar & bryggservice",
    sub: "Byggnation, ombyggnad, renovering och underhåll",
    href: "/tjanster/brygganlaggningar/",
  },
```

Rad 185, grid (5 kort inkl. boka-kortet): `className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4"`

- [ ] **Step 5: Footer, tjänstelista och beskrivning**

Rad 35-38, beskrivningen: `Mobil båtverkstad i Bohuslän. Vi servar utombordare, krympplastar, bottenmålar och tar hand om bryggor, på plats hos dig.`

I tjänstelistan (rad 58-64), efter Bottenmålning-raden:
```astro
              { label: "Brygganläggningar", href: "/tjanster/brygganlaggningar/" },
```

- [ ] **Step 6: Priser-kort (priser.astro)**

Efter bottenmålning-posten i den lokala services-arrayen (rad 49-61), lägg till:
```ts
  {
    title: "Brygganläggningar & bryggservice",
    range: "Från 1 250 kr",
    details:
      "Byggnation, ombyggnad, renovering och underhåll av bryggor, bryggdäck och landgångar. För privatpersoner, företag, samfälligheter och marinor.",
    includes: [
      "Besiktning och bedömning på plats",
      "Planering och förslag på åtgärder",
      "Byggnation, ombyggnad och reparation",
      "Slutkontroll efter utfört arbete",
    ],
    note: "Varje bryggprojekt prissätts efter besiktning på plats. Du får alltid ett tydligt förslag på åtgärder och pris innan arbetet påbörjas. Framkörningsavgift på 685 kr tillkommer.",
  },
```

- [ ] **Step 7: Tjänster-sidan (tjanster/index.astro)**

- Rad 24, description: `description="Utombordarservice, krympplastning, bottenmålning och brygganläggningar. Mobil verkstad som kommer ut till båten i Bohuslän, Dalsland och Värmland."`
- Rad 49, h1: `Fyra tjänster.`
- Rad 55-58, ingressen:
```astro
      <p class="text-muted-foreground text-lg leading-relaxed max-w-(--max-w-text)">
        Vi servar utombordare, vintertäcker med krympplast, bottenmålar och
        tar hand om bryggor och marina anläggningar. Allt görs på plats, så
        slipper du transport och krångel.
      </p>
```

- [ ] **Step 8: Verifiera**

Run: `bun run check`
Expected: 0 errors.

Run: `grep -rln "brygganlaggningar" src`
Expected: exakt dessa filer: `src/lib/site.ts`, `src/pages/tjanster/brygganlaggningar.astro`, `src/components/sections/ServicesSection.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/Footer.astro`. (Priskortet och tjänster-ingressen länkar inte, så priser.astro och tjanster/index.astro ska inte dyka upp.)

- [ ] **Step 9: Commit**

```bash
git add src/lib/site.ts src/pages/tjanster/brygganlaggningar.astro src/components/sections/ServicesSection.tsx src/components/sections/HeroSection.tsx src/components/Footer.astro src/pages/priser.astro src/pages/tjanster/index.astro
git commit -m "feat: fjärde tjänsten Brygganläggningar & bryggservice på alla ytor"
```

---

### Task 7: Om oss enligt skiss

**Files:**
- Modify: `src/pages/om-oss.astro:18-19,70-131`

- [ ] **Step 1: Titel och beskrivning (rad 18-19)**

```astro
  title="Om Priox Båtverkstad | Marin service och bryggor i Grebbestad"
  description="Priox Båtverkstad, tidigare Mickes Båtverkstad, är en mobil båtverkstad i Bohuslän. Service av utombordare, krympplastning, bottenmålning och bryggservice. Bas i Grebbestad."
```

- [ ] **Step 2: Brödtexten (rad 70-91), ersätt de fyra styckena**

```astro
          <div class="space-y-5 text-muted-foreground text-lg leading-relaxed max-w-(--max-w-text)">
            <p>
              Priox Båtverkstad, tidigare Mickes Båtverkstad, startades med en
              enkel idé. Båtägare ska slippa transportera båten till en
              verkstad. Vi kommer ut till dig och utför arbetet där båten står.
            </p>
            <p>
              Bakom företaget står Mikael "Micke" Karlsson, utbildad
              marintekniker med lång erfarenhet av service på utombordare. Med
              en bakgrund som byggmästare och projektledare finns även
              kompetens inom bryggor, marina konstruktioner och byggprojekt.
            </p>
            <p>
              Vi utför service och underhåll av utombordare, krympplastning,
              bottenmålning samt bryggservice och marina arbeten längs
              Bohuskusten, Dalsland och Värmland. Fokus är alltid kvalitet,
              hållbara lösningar och ett personligt bemötande.
            </p>
            <p>
              Hör av dig så hjälper vi dig vidare.
            </p>
          </div>
```

- [ ] **Step 3: Företaget-kortet (rad 95-108)**

```astro
          <div class="bg-card border border-border rounded-2xl p-6 lg:p-7">
            <p class="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2">
              Företaget
            </p>
            <p class="font-heading text-xl font-bold text-foreground mb-1">
              Priox Båtverkstad
            </p>
            <p class="text-sm text-muted-foreground mb-3">
              Tidigare Mickes Båtverkstad
            </p>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li><span class="text-foreground font-medium">Bas:</span> Grebbestad</li>
              <li><span class="text-foreground font-medium">Område:</span> Bohuslän, Dalsland, Värmland</li>
              <li><span class="text-foreground font-medium">F-skatt:</span> Ja</li>
              <li><span class="text-foreground font-medium">Adress:</span> Box 6, 457 02 Grebbestad</li>
            </ul>
            <p class="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
              Priox Båtverkstad är en verksamhet inom PRIOX AB.
            </p>
          </div>
```

- [ ] **Step 4: Kontakt-kortet, e-postraden (rad 120-124)**

```astro
              <li>
                <a href="mailto:info@priox.se" class="text-foreground hover:text-primary transition-colors font-medium">
                  info@priox.se
                </a>
              </li>
```
Webbadressrad läggs INTE till (domänen är inte spikad). Hjältebilden `/img/micke-vid-bilen.jpg` rörs inte.

- [ ] **Step 5: Verifiera och committa**

Run: `bun run check`
Expected: 0 errors.

Run: `grep -rn "Mickes Båtverkstad" src | grep -viE "tidigare Mickes|ReviewsSection"`
Expected: inga träffar.

```bash
git add src/pages/om-oss.astro
git commit -m "feat: om oss uppdaterad för Priox Båtverkstad enligt klientens skiss"
```

---

### Task 8: Slutverifiering, bygge och visuell kontroll

**Files:**
- Ingen kodändring förväntas. Eventuella fixar committas separat.

- [ ] **Step 1: Fullt bygge**

Run: `bun run build`
Expected: bygget grönt, sidan `/tjanster/brygganlaggningar/index.html` finns i dist, sitemap innehåller den nya sidan.

Run: `grep -o "brygganlaggningar" dist/sitemap-0.xml | head -1`
Expected: `brygganlaggningar`

- [ ] **Step 2: Grep-svep i byggresultatet**

Run: `grep -rl "Mickes Båtverkstad" dist --include='*.html' | head` följt av stickprov.
Expected: träffar endast i form av "Tidigare/tidigare Mickes Båtverkstad", kundcitaten i recensionskarusellen och alternateName i schema.org.

- [ ] **Step 3: Visuell kontroll i webbläsare**

Starta `bun run preview` och kontrollera mot klientens skisser på desktop och mobilbredd:
- Startsidan: ny logga med tagline i header, 5 kort i hero-strippen (4 tjänster + Boka nu), PersonalCard-bylinen "Priox Båtverkstad / Tidigare Mickes Båtverkstad".
- /tjanster/: "Fyra tjänster. En mobil verkstad." och fyra kort.
- /tjanster/brygganlaggningar/: rubrik, pris, "Det här ingår", fyra textsektioner.
- /priser/: fyra priskort i 2x2.
- /om-oss/: ny brödtext, Företaget-kortet med PRIOX AB-raden, info@priox.se.
- Footer: ny logga, bryggtjänsten i listan, bottenraden med PRIOX AB.
- Flikikonen visar nya märket.

- [ ] **Step 4: Kontaktformulär mot dev-API**

Kontrollera i webbläsaren att tjänstevalet i formuläret på /kontakt/ eller /boka/ listar "Brygganläggningar & bryggservice". (Själva mailutskicket kräver Resend-nycklar i Cloudflare och testas inte lokalt.)

- [ ] **Step 5: Eventuella fixar committas**

```bash
git add -A && git commit -m "fix: justeringar efter visuell kontroll av Priox-rebranden"
```
(Endast om något behövde rättas.)
