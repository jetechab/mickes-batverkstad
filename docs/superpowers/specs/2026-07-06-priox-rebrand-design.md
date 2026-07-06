# Design: Namnbyte till Priox Båtverkstad + fjärde tjänsten

Datum: 2026-07-06
Status: Godkänd av JE (sektion 1-3 godkända i konversation)

## Bakgrund

Klienten Mikael Karlsson har lämnat in namnändring från Mickes Båtverkstad till
Priox Båtverkstad. Verksamheten drivs inom PRIOX AB (org.nr 556677-9624), samma
bolag som redan driver badrumsbesiktningen på priox.se. Klienten har levererat
AI-skisser på tjänstesidan, startsidan, en ny fjärde tjänst (brygganläggningar
& bryggservice) samt en justerad om oss-sida, plus en ny logga som SVG-master.

Under det första året ska "Tidigare Mickes Båtverkstad" synas i header, footer
och på om oss-sidan.

## Beslut

| Fråga | Beslut |
|---|---|
| Angreppssätt | Fullt synligt namnbyte + fjärde tjänsten, domänneutralt |
| Domän | batverkstad.se ligger kvar i `astro.config.mjs` tills JE och klienten spikat domänfrågan. priox.se är upptagen av badrumsbesiktningen. |
| Synlig e-post | Byts till info@priox.se (adressen är live, används av badrumsbesiktningen) |
| Leads-leverans | Rörs inte i koden. Styrs av `CONTACT_TO_EMAIL`/`CONTACT_FROM_EMAIL` i Cloudflare. |
| Juridiskt namn | PRIOX AB, org.nr 556677-9624 (samma bolag, oförändrat nummer) |
| Logga | Märket extraheras ur mastern, ordbilden sätts i HTML-text |
| Foton | Endast äkta foton. AI-kompositerna i skisserna (Priox-folierad skåpbil, AI-brygga) används inte. |
| Palett/tema | Behålls. Ljust tema låst, inget omtema. |

## Sektion 1: Namnbyte, juridik, e-post, domän

### Central data i src/lib/site.ts

`companyName` ersätts av tre fält:

- `displayName: "Priox Båtverkstad"`
- `legalName: "PRIOX AB"`
- `formerName: "Tidigare Mickes Båtverkstad"`

`email` byts till `info@priox.se`. Footer, schema.org, integritetspolicy och
header-tagline hämtar från dessa fält. Borttagningen av "Tidigare..." efter
första året (cirka mitten av 2027) blir därmed en enradsändring.

### Copy

- Alla 75 förekomster av gamla namnet i `src/`, `functions/` och `public/`
  åtgärdas (grep-verifierat).
- Prosan på orter-sidorna (`orter` i site.ts) skrivs om för hand där namnet
  ingår i löptext, inte sök-ersätt.
- Sidtitlar och metabeskrivningar byts till Priox Båtverkstad. Startsidans
  title inkluderar "tidigare Mickes Båtverkstad" under övergångsåret för
  sökbarheten.
- Autosvaret i `functions/api/contact.ts` har mickes@batverkstad.se hårdkodat
  i två strängar. De byts direkt i filen till info@priox.se. Ingen delad
  import läggs in, Cloudflare-funktionen byggs separat från src.
- `public/site.webmanifest`: name/short_name byts.

### Schema.org (BaseLayout.astro)

- `name: "Priox Båtverkstad"`
- `legalName: "PRIOX AB"`
- `alternateName: "Mickes Båtverkstad"` (sökkontinuitet)
- `identifier` oförändrad.

### Footer

Enligt skiss: "Priox Båtverkstad är en verksamhet inom PRIOX AB. Tidigare
Mickes Båtverkstad." plus org.nr som idag.

### Integritetspolicy

Personuppgiftsansvarig skrivs om till: "PRIOX AB (Priox Båtverkstad, tidigare
Mickes Båtverkstad), org.nr 556677-9624, Box 6, 457 02 Grebbestad."

## Sektion 2: Logga och grafiska tillgångar

### Masterfilen

`public/PRIOX_Båtverkstad_Master_Svg.svg` (950 kB rå Inkscape-fil, nästan allt
är en inbäddad ICC-profil) flyttas till `src/assets/brand/` som
versionshanterad källa. Den följer inte med i bygget. "PRIOX" ligger som
levande Montserrat-text i mastern och kan inte renderas säkert på webben,
sajten laddar Inter + Outfit.

### Märke och header

- Märket (mörkblå kvadrat `#1f2f5f` + ljusblå ring `#42b8ea`, 5 banor, ~2 kB)
  extraheras till en ren SVG.
- Headern byggs som i skissen: märket till vänster, "Priox" + "Båtverkstad"
  som HTML-text i sajtens rubriktypsnitt, "Tidigare Mickes Båtverkstad" i
  liten text under. Ingen typsnittsrisk, skarpt i alla storlekar, sökbart.
- Gamla `public/logo.png` tas bort när headern är omlagd.

### Genereras om från märket

- Samtliga favicons: 16/32/48, apple-touch 180, android 192/512, favicon.ico,
  favicon.png. Genereras med sharp som redan finns i projektet.
- og-bild 1200x630 med märke och Priox Båtverkstad.
- Ikonreferenser i `site.webmanifest` verifieras.

## Sektion 3: Fjärde tjänsten och om oss

### Ny tjänstesida: /tjanster/brygganlaggningar/

Byggs på `ServicePage.astro`-mallen, samma struktur som de tre befintliga.

- Rubrik: "Brygganläggningar &" med accent på "bryggservice".
- Ingress enligt skiss: byggnation, ombyggnad, renovering och underhåll av
  bryggor, bryggdäck, landgångar och marina anläggningar längs Bohuskusten.
  För privatpersoner, företag, samfälligheter och marinor.
- Pris: "Från 1 250 kr", inkl. moms, framkörningsavgift 685 kr tillkommer.
- Punkter (bullets): Byggnation och ombyggnad; Reparation och renovering;
  Hållbara och säkra konstruktioner; Marina anläggningar och kajer;
  Kvalitetsmaterial för lång livslängd; Erfarenhet från kustens förhållanden.
- "Det här ingår": Besiktning och bedömning på plats; Planering och förslag på
  åtgärder; Byggnation, ombyggnad och reparation; Montering av landgångar,
  pollare, stegar och utrustning; Byte av bryggvirke och bärande
  konstruktioner; Slutkontroll efter utfört arbete.
- Textsektioner utifrån skissens fyra kort: Havsanknuten verksamhet;
  Verksamma längs Bohuskusten; Kvalitet & hållbarhet; Rådgivning & helhet.
  Copyn skrivs i sajtens ton.
- Bild: endast om ett äkta bryggfoto finns i galleriet. Annars ingen bild
  (mallens bildfält är valfritt).

### Tjänsten in överallt

- `services[]` i site.ts får fjärde posten (slug `brygganlaggningar`).
  Kontaktformulärets tjänsteval följer med automatiskt.
- Tjänster-sidan: "Fyra tjänster. En mobil verkstad." + fjärde kortet med
  passande lucide-ikon. Ingressen utökas så att brygganläggningar nämns,
  skissens ingress räknar bara upp tre tjänster fast rubriken säger fyra.
- Startsidans tjänste-strip får fjärde kortet (etikett "Bryggor & marina").
- Priser-sidan (egen lokal lista) får posten "Från 1 250 kr".
- Bokningsformuläret (QuickBookForm) kontrolleras så tjänsten går att välja.
- Sitemap plockar upp nya sidan automatiskt.

### Om oss (enligt skiss)

- Ny brödtext: "Priox Båtverkstad, tidigare Mickes Båtverkstad, startades med
  en enkel idé..." inklusive raden om Mikaels bakgrund som byggmästare och
  projektledare med kompetens inom bryggor, marina konstruktioner och
  byggprojekt.
- Tjänsteuppräkningen i copyn utökas med bryggservice och marina arbeten.
- Företaget-kortet: Priox Båtverkstad; Tidigare Mickes Båtverkstad; Bas:
  Grebbestad; Område: Bohuslän, Dalsland, Värmland; F-skatt: Ja; Adress:
  Box 6, 457 02 Grebbestad; "Priox Båtverkstad är en verksamhet inom PRIOX AB."
- Kontakt-kortet: telefon, info@priox.se, Facebook. Webbadressraden
  www.priox.se utelämnas tills domänen är spikad.
- Hjältebilden förblir det riktiga fotot (micke-vid-bilen.jpg), inte
  AI-kompositen.

## Verifiering

- `bun run build` grönt.
- Grep visar att enda kvarvarande "Mickes" i källkoden är de avsiktliga
  "Tidigare Mickes Båtverkstad"-strängarna (plus filnamn som
  micke-vid-bilen.jpg och komponentnamnet MeetMickeSection, som behålls).
- Visuell koll i webbläsaren mot skisserna: startsida, tjänster, nya
  tjänstesidan, priser, om oss, header/footer på mobil och desktop.
- Favicon och og-bild kontrolleras i byggresultatet.

## Utanför scope, hanteras senare

1. **Domänbytet.** När beslutet kommer byts: `site` i astro.config.mjs,
   Resend-avsändardomän, 301-pekning från gammal domän, ev. webbadressrad på
   om oss. priox.se är idag upptagen av badrumsbesiktningen, så subdomän eller
   ompekning behöver redas ut av JE och klienten.
2. **Tagline-borttagning.** "Tidigare Mickes Båtverkstad" tas bort efter
   första året, cirka mitten av 2027. Enradsändring i site.ts.
3. **Äkta bryggfoto** till nya tjänstesidan när klienten kan leverera.
4. **Repo- och mappnamn** (mickes-batverkstad) behålls tills vidare.

## Öppna punkter till JE:s klientavstämning

- Vad avser "Från 1 250 kr" (per timme, minsta debitering, startavgift)?
- Domänfrågan: subdomän under priox.se, ny domän eller ompekning av
  batverkstad.se?
- Ska leads gå till info@priox.se eller separat inkorg? (Cloudflare-ändring,
  ingen kodändring.)
