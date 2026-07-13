/*
 * Förhandsgranska mailmallarna utan att skicka något:
 *
 *   bun scripts/preview-mail.ts && open mail-previews/*.html
 *
 * Skriver leadmailet (till Micke) och bekräftelsen (till kunden) som
 * HTML-filer i mail-previews/ (gitignorerad). Öppna dem i webbläsaren,
 * gärna med mobilbredd i devtools, det är där de oftast läses.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import {
  buildCustomerHtmlEmail,
  buildOwnerHtmlEmail,
} from "../functions/api/contact";

const exempel = {
  source: "full-book",
  name: "Petter Browallius",
  phone: "+46724509219",
  email: "petter.browallius@exempel.se",
  service: "Utombordarservice",
  boatModel: "Grand Silverline 27",
  engine: "Yamaha F150",
  location: "Fjällbacka",
  preferredDate: "2026-07-12",
  message:
    "Hej! Skulle behöva årsservice innan midsommar om det går. Båten ligger vid bryggan i Fjällbacka och det är även dags för impellerbyte.",
  website: "",
  turnstileToken: "",
} as Parameters<typeof buildOwnerHtmlEmail>[0];

mkdirSync("mail-previews", { recursive: true });
writeFileSync("mail-previews/lead-till-micke.html", buildOwnerHtmlEmail(exempel));
writeFileSync(
  "mail-previews/bekraftelse-till-kund.html",
  buildCustomerHtmlEmail(exempel),
);
console.log("Skrev mail-previews/lead-till-micke.html");
console.log("Skrev mail-previews/bekraftelse-till-kund.html");
console.log("Öppna med: open mail-previews/*.html");
