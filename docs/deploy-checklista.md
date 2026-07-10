# Deploy-checklista: batverkstad.se till Cloudflare Pages

Gäller lansering av Priox Båtverkstad (repo `jetechab/mickes-batverkstad`) i
klientens Cloudflare-konto, med domänen batverkstad.se som idag ligger hos
Loopia och pekar på gamla sajten.

**Grundregel:** få sajten att fungera perfekt på Cloudflares testadress
(pages.dev) innan domänen rörs. Då är domänbytet en ren omkoppling som går
att ångra.

---

## Fas A: Förberedelser i Loopia (innan något ändras)

- [ ] Logga in i Loopia Kundzon, öppna domänen batverkstad.se och
      **skärmdumpa/exportera hela DNS-listan** (A, CNAME, MX, TXT).
      Detta är facit och backup.
- [ ] Identifiera **MX-posterna** (typiskt `mailcluster.loopia.se`) och
      **SPF-posten** (TXT som börjar `v=spf1 ... loopia ...`).
      De driver mickes@batverkstad.se dit alla leads ska. Tappas de
      slutar klientens mail att fungera.
- [ ] Kontrollera om **DNSSEC** är påslaget för domänen. Om ja:
      **stäng av det nu** och vänta ett dygn innan namnserverbytet i fas D.
      Byte av namnservrar med DNSSEC aktivt gör domänen helt onåbar.
      Detta är den farligaste fallgropen i hela flytten.

## Fas B: Cloudflare Pages (i klientens konto)

- [ ] Logga in på klientens Cloudflare-konto.
- [ ] Workers & Pages, Create application, Pages, **Connect to Git**.
- [ ] Auktorisera GitHub (logga in med jetechab-kontot när GitHub frågar)
      och välj repot `jetechab/mickes-batverkstad`, branch `main`.
- [ ] Bygginställningar:
  - Framework preset: **Astro**
  - Build command: `bun run build`
  - Output directory: `dist`
  - `functions/`-mappen blir Pages Functions automatiskt, ingen konfig.
- [ ] Deploya och vänta in första bygget. Notera pages.dev-adressen.
- [ ] Settings, Environment variables, miljö **Production**:

  | Variabel | Värde |
  |---|---|
  | `RESEND_API_KEY` | Ny API-nyckel från Resend-kontot (döp den till "batverkstad" i Resend, klicka **Encrypt** i Cloudflare) |
  | `CONTACT_FROM_EMAIL` | `Priox Båtverkstad <noreply@priox.se>` |
  | `CONTACT_TO_EMAIL` | `mickes@batverkstad.se` |

  - From-adressen måste vara @priox.se eftersom det är den domän som är
    verifierad i Resend (gratiskontot tillåter bara en domän). Adressen
    behöver inte finnas som riktig inkorg.
  - Lämna **Preview-miljön tom**, då kan testdeployer aldrig skicka
    riktiga mail (formuläret svarar med "ring oss"-fallback).
- [ ] **Trigga ny deploy** (Deployments, Retry deployment). Variablerna
      läses inte in retroaktivt.

## Fas C: Fullständigt test på pages.dev

- [ ] Klicka igenom på pages.dev-adressen: startsida, tjänster,
      brygganläggningar, priser, om oss, kontakt. Kolla mobilvy.
- [ ] **Skicka en riktig testförfrågan** via /boka/ med egen mailadress
      som kund. Verifiera tre saker:
  - [ ] Leadet landar i mickes@batverkstad.se (kolla skräpposten första gången)
  - [ ] Autosvaret från "Priox Båtverkstad" kommer till kundadressen
  - [ ] Svar på leadmailet går till kundens adress (reply-to)
- [ ] Vid mailfel: Deployments, aktuell deploy, Functions-loggen.
      Vanligaste felen är felstavad variabel eller ogiltigt from-format.

## Fas D: Flytta domänen till Cloudflare

- [ ] I klientens CF-konto: **Add a site**, `batverkstad.se`, Free-planen.
      Cloudflare skannar och importerar Loopias DNS-poster.
- [ ] **Jämför importen mot skärmdumpen från fas A.** Särskilt:
  - [ ] MX-posterna kom med exakt
  - [ ] SPF-TXT:en kom med exakt
  - [ ] Lägg till det som saknas manuellt
  - Rör inte gamla A-posten för webben ännu, den håller gamla sajten
    vid liv under flytten.
- [ ] Cloudflare visar två namnservrar. I Loopia Kundzon, domänen,
      **Namnservrar**: byt från Loopias till Cloudflares två.
- [ ] Vänta tills Cloudflare markerar zonen som **Active** (oftast under
      en timme, kan ta upp till ett dygn). Under tiden fungerar gamla
      sajten och mailen som vanligt.
- [ ] **Verifiera mailen efter aktiveringen:** skicka testmail till
      mickes@batverkstad.se och bekräfta att det kommer fram,
      INNAN nästa fas.

## Fas E: Koppla domänen till nya sajten

- [ ] Pages-projektet, **Custom domains**, Set up a custom domain:
      `batverkstad.se`. Cloudflare byter själv webbposterna i zonen.
- [ ] Upprepa för `www.batverkstad.se`.
- [ ] HTTPS-certifikat ordnas automatiskt inom några minuter.
- [ ] Sluttest på riktiga domänen:
  - [ ] Sidorna renderar
  - [ ] Formuläret: en sista testförfrågan hela vägen
  - [ ] `https://batverkstad.se/sitemap-index.xml` svarar
- [ ] Google Search Console: verifiera domänen (DNS-TXT, enkelt nu när
      zonen är i CF) och skicka in sitemapen. Ingen adressändring behövs,
      domänen är densamma.

---

## Ångerplan

Går något snett efter fas D/E: byt tillbaka namnservrarna i Loopia till de
gamla, då är läget återställt inom cirka en timme. Släck inte
Loopia-webbhotellet förrän nya sajten rullat felfritt någon vecka.

## Turnstile (spamskydd på formulären)

Koden är förberedd men vilande: utan nycklarna nedan fungerar formulären
exakt som tidigare, utan robotkontroll.

- [ ] Cloudflare dashboard, **Turnstile** (i vänstermenyn på kontonivå),
      **Add widget**:
  - Namn: `batverkstad formulär`
  - Hostnames: `batverkstad.se`, `www.batverkstad.se` och
    `<projekt>.pages.dev` (så testmiljön också fungerar)
  - Mode: **Managed** (osynlig för de flesta människor)
- [ ] Kopiera **Site Key** och **Secret Key**.
- [ ] Pages-projektet, Settings, Environment variables, **Production**:
  - `PUBLIC_TURNSTILE_SITE_KEY` = site key (behövs vid BYGGET, får inte
    vara Encrypt-only om CF frågar, den är publik ändå)
  - `TURNSTILE_SECRET_KEY` = secret key (klicka **Encrypt**)
- [ ] **Retry deployment** så nycklarna bakas in.
- [ ] Testa båda formulären: en liten ruta/snurra visas ovanför
      skicka-knappen, och utskicket fungerar som vanligt.
- [ ] Verifiera skyddet: skicka ett anrop direkt mot
      `/api/contact` utan token (t.ex. via curl), svaret ska bli 400
      "Robotkontrollen gick inte igenom".

## Resend-notiser

- Inget DNS-jobb behövs för mailen: priox.se är redan verifierad i Resend
  och påverkas inte av att batverkstad.se flyttar.
- Leads-inkorgen styrs enbart av `CONTACT_TO_EMAIL` i Cloudflare.
  Mottagaradresser kräver aldrig verifiering, bara avsändardomänen.
- Autosvaret till kund har reply-to satt till `CONTACT_TO_EMAIL`, och
  leadmailet har reply-to satt till kundens adress. Det sköts i koden
  (`functions/api/contact.ts`), inget att konfigurera.
