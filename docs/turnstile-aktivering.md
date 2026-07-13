# Turnstile: aktivera spamskyddet på formulären

Cloudflare Turnstile ligger färdigt i koden men vilar tills nycklarna sätts.
Utan nycklar renderas ingen widget och formulären fungerar exakt som idag,
så det är riskfritt att merga koden långt innan skyddet slås på.

Allt ligger på branchen `feat/turnstile` tills klienten vill ha skyddet.

## Vad som ingår i koden

- `src/components/Turnstile.tsx`: widgeten. Renderar bara om
  `PUBLIC_TURNSTILE_SITE_KEY` fanns när sajten byggdes.
- `src/components/QuickBookForm.tsx` och `src/components/ContactLeadForm.tsx`:
  visar widgeten ovanför skicka-knappen och skickar med token.
- `functions/api/contact.ts`: verifierar token mot Cloudflare, men bara om
  `TURNSTILE_SECRET_KEY` är satt i miljön. Utan hemligheten släpps allt
  igenom som vanligt.

## Steg 1: merga koden

```bash
git checkout main
git merge feat/turnstile
git push
```

Detta kan göras när som helst. Så länge nycklarna i steg 2 inte är satta
ändras ingenting för besökarna.

## Steg 2: skapa widgeten i Cloudflare

1. Cloudflare dashboard, **Turnstile** i vänstermenyn på kontonivå,
   klicka **Add widget**.
2. Namn: `batverkstad formulär`.
3. Hostnames: `batverkstad.se`, `www.batverkstad.se` och
   `<projekt>.pages.dev` (så testmiljön också fungerar).
4. Mode: **Managed** (osynlig för de flesta människor).
5. Kopiera **Site Key** och **Secret Key**.

## Steg 3: sätt nycklarna i Pages

Pages-projektet, Settings, Environment variables, **Production**:

- `PUBLIC_TURNSTILE_SITE_KEY` = site key. Behövs vid BYGGET, så den får
  inte vara Encrypt-only om Cloudflare frågar. Den är publik ändå.
- `TURNSTILE_SECRET_KEY` = secret key, klicka **Encrypt**.

Kör sedan **Retry deployment** så att site key bakas in i bygget.
Det räcker inte att bara spara variablerna, en ny build krävs.

## Steg 4: testa

- [ ] Öppna sajten och testa båda formulären: en liten ruta eller snurra
      visas ovanför skicka-knappen, och utskicket fungerar som vanligt.
- [ ] Verifiera skyddet: skicka ett anrop direkt mot `/api/contact` utan
      token, svaret ska bli 400 "Robotkontrollen gick inte igenom".

```bash
curl -i -X POST https://batverkstad.se/api/contact \
  -H "Content-Type: application/json" \
  -d '{"source":"quick-book","name":"Testbot","phone":"0701234567","message":"test utan token"}'
```

## Stänga av igen

Ta bort de två variablerna i Pages och kör Retry deployment. Koden kan
ligga kvar, den gör ingenting utan nycklarna.
