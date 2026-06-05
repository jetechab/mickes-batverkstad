export const siteContact = {
  companyName: "Mickes Båtverkstad AB",
  organizationNumber: "556677-9624",
  email: "mickes@batverkstad.se",
  phoneDisplay: "0767-16 67 16",
  phoneHref: "+46767166716",
  openingHours: "Mån-Fre 08:00-17:00",
  address: "Box 6, 457 02 Grebbestad",
  city: "Grebbestad",
  region: "Bohuslän",
  country: "SE",
  facebook: "https://www.facebook.com/profile.php?id=100089773764804",
  fSkatt: true,
  swish: "123 235 38 94",
  quoteSubject: "Förfrågan om service",
};

export const siteContactLinks = {
  phone: `tel:${siteContact.phoneHref}`,
  email: `mailto:${siteContact.email}`,
  quoteEmail: `mailto:${siteContact.email}?subject=${encodeURIComponent(
    siteContact.quoteSubject,
  )}`,
};

export const services = [
  {
    slug: "utombordsservice",
    title: "Utombordsservice",
    short: "Planerad service och underhåll av alla utombordsmärken, på plats hos dig.",
    brands: ["Yamaha", "Mercury", "Suzuki", "Honda", "Evinrude", "Tohatsu"],
  },
  {
    slug: "krympplastning",
    title: "Krympplastning",
    short: "Vintertäck båten med krympplast. Står kvar på släp eller uppallning.",
    brands: [],
  },
  {
    slug: "bottenmalning",
    title: "Bottenmålning",
    short: "Bottenmålning med Jotun-produkter. Görs på släp eller bockar.",
    brands: ["Jotun"],
  },
] as const;

// Orter vi täcker utöver de med egen sida (orter nedan). Visas som täckningslista.
export const coverageCities: string[] = [
  "Ale",
  "Alingsås",
  "Bengtsfors",
  "Bovallstrand",
  "Dals-Ed",
  "Fredrikstad",
  "Färgelanda",
  "Grästorp",
  "Göteborg",
  "Halden",
  "Härryda",
  "Hunnebostrand",
  "Karlstad",
  "Kungälv",
  "Kungshamn",
  "Kungsbacka",
  "Lerum",
  "Lidköping",
  "Lilla Edet",
  "Mellerud",
  "Moss",
  "Munkedal",
  "Orust",
  "Sarpsborg",
  "Sotenäs",
  "Stenungsund",
  "Tjörn",
  "Trollhättan",
  "Vänersborg",
  "Åmål",
];

export type Ort = {
  slug: string;
  name: string;
  municipality: string;
  intro: string;
  knownFor: string[];
  localCopy: string[];
  nearestBase: string;
};

export const orter: Ort[] = [
  {
    slug: "grebbestad",
    name: "Grebbestad",
    municipality: "Tanums kommun",
    intro:
      "Vi har bas i Grebbestad, så här är vi praktiskt taget på hemmaplan.",
    knownFor: [
      "Gästhamn och fiskeläge",
      "Tjurpannans naturreservat",
      "Ostronfisket vid Bohuskusten",
    ],
    localCopy: [
      "Grebbestad är vår hemmaort. Du hittar oss året runt och vi har båtarna i området under ständig översyn. Står din båt i gästhamnen, vid en privat brygga eller på en uppställningsplats utanför samhället så är vi snabbt på plats.",
      "Vi servar båtar både inne i samhället och längs Tjurpannans kust ner mot Lyngnö och Otterön. Många kunder här är fritidsbåtsägare med utombordare i mellanstorleksklassen, vilket är precis det vi gör mest av.",
      "Inför säsongsstart i april och avtäckningen i maj brukar det vara fullt. Boka tidigt om du vet att du behöver service inför sommaren.",
    ],
    nearestBase: "Hemmaplan",
  },
  {
    slug: "stromstad",
    name: "Strömstad",
    municipality: "Strömstads kommun",
    intro:
      "Norra Bohuslän, en kort köra norrut längs E6 från Grebbestad.",
    knownFor: [
      "Kosterhavets nationalpark",
      "Färjeläget mot Sandefjord",
      "Strömstads gästhamn",
    ],
    localCopy: [
      "Strömstad är ett av de tätaste områdena för båtfolk i norra Bohuslän. Vi kör upp regelbundet, både för planerade serviceuppdrag och för krympplastning inför vintern.",
      "Vi tar oss till båtar både i Strömstads gästhamn, ute på Kosterhavet och vid Sydkoster om logistiken finns. Står båten vid en privat brygga någonstans i kommunen så löser vi det med en utryckning.",
      "Många kunder i Strömstad kombinerar utombordsservice med bottenmålning samma vecka. Det är ett bra sätt att få ett bredare jobb utfört på ett enda besök.",
    ],
    nearestBase: "Cirka 30 min från Grebbestad",
  },
  {
    slug: "lysekil",
    name: "Lysekil",
    municipality: "Lysekils kommun",
    intro:
      "Vid Gullmarsfjordens mynning, mitt i Bohuskusten. Vi kör söderut från Grebbestad.",
    knownFor: [
      "Gullmarsfjorden",
      "Stångenäshalvön",
      "Havets Hus",
    ],
    localCopy: [
      "Lysekil ligger vid den enda äkta tröskelfjorden i Sverige, Gullmarsfjorden. Båtfolk här rör sig både i öppet hav och i de skyddade vikarna inåt fjorden, vilket ställer lite olika krav på service och bottenfärg.",
      "Vi tar uppdrag i Lysekils gästhamn, vid Slätten och längs hela Stångenäshalvön. Står båten i Brastad eller på någon av de privata uppställningsplatserna runt staden så hittar vi dit.",
      "För båtar som ligger länge inåt fjorden rekommenderar vi ofta en självpolerande Jotun-färg. Vi går igenom alternativen på plats och föreslår system som passar just din båts trafikmönster.",
    ],
    nearestBase: "Cirka 1 timme från Grebbestad",
  },
  {
    slug: "uddevalla",
    name: "Uddevalla",
    municipality: "Uddevalla kommun",
    intro: "Vid Byfjorden i innersta delen av Bohuskusten.",
    knownFor: [
      "Byfjorden",
      "Bohusläns museum",
      "Marina i centrala Uddevalla",
    ],
    localCopy: [
      "Uddevalla är inlandsstaden i Bohuslän. Många kunder här har båtar som ligger i centrala Uddevalla eller i marinorna runt Byfjorden. Vi kör ut och servar precis som vid kusten.",
      "Vatten- och saltförhållandena är något annorlunda inåt Byfjorden än ute vid kusten. Det påverkar både hur bottenfärg ska väljas och hur lång intervallen mellan servicetillfällen kan vara. Vi anpassar utifrån var båten faktiskt går.",
      "Står båten i Sundskogen, vid Marina i centrum eller i någon av byarna runt staden så är det inga problem. Hör av dig så bokar vi en tid.",
    ],
    nearestBase: "Cirka 1 timme och 15 min från Grebbestad",
  },
  {
    slug: "tanum",
    name: "Tanum",
    municipality: "Tanums kommun",
    intro:
      "Tanums kommun omfattar bland annat Grebbestad och Fjällbacka. Vi är hemma här.",
    knownFor: [
      "Tanums hällristningar (UNESCO)",
      "Världsarv i kommunen",
      "Långsträckt kust från Resö till Hamburgsund",
    ],
    localCopy: [
      "Tanums kommun är vår hemmakommun. Mickes Båtverkstad har bas i Grebbestad och vi kommer ut till båten där den står, var du än befinner dig i kommunen.",
      "Det är ett stort område, från Resö och Havstenssund i norr ner till Hamburgsund i söder. Vi rör oss längs kusten och kommer ut till båtar i alla samhällen och vid alla större bryggor.",
      "Behöver du service i någon av byarna utanför samhällena, säg till vid bokning så ser vi till att hitta rätt direkt utan onödig svängkörning.",
    ],
    nearestBase: "Hemkommun",
  },
  {
    slug: "fjallbacka",
    name: "Fjällbacka",
    municipality: "Tanums kommun",
    intro:
      "Klippsamhället söder om Grebbestad. Kort köra ner längs kusten.",
    knownFor: [
      "Vetteberget och klipporna",
      "Ingrid Bergmans torg",
      "Fjällbacka gästhamn",
    ],
    localCopy: [
      "Fjällbacka är ett tätt båtsamhälle. Mycket folk i rörelse under sommaren och en stor andel privata bryggor utöver gästhamnen. Vi kör hit regelbundet och har korta inställelsetider eftersom det är så nära Grebbestad.",
      "Står båten vid en privat brygga söderut mot Heestrand och Hamburgsund eller norrut mot Tanumstrand så är vi i området ändå. Slå en signal så kollar vi om vi kan stämma av besöket med ett annat jobb i samma område samma dag.",
      "Många i Fjällbacka kör båtarna hårt under en kort intensiv säsong. Inför juli rekommenderar vi serviceavstämning i juni så slipper du stå still mitt i bästa båtveckan.",
    ],
    nearestBase: "Cirka 15 min från Grebbestad",
  },
  {
    slug: "smogen",
    name: "Smögen",
    municipality: "Sotenäs kommun",
    intro:
      "Smögenbryggan och Sotenäs. Söder om Lysekil, längs Bohuskustens yttre stråk.",
    knownFor: [
      "Smögenbryggan",
      "Hållö fyr",
      "Räkfiskelaget",
    ],
    localCopy: [
      "Smögen är ett av Bohusläns mest fotograferade båtsamhällen. Smögenbryggan är en helt egen miljö och båtarna här är allt från små jolar till tunga fiskebåtar.",
      "Vi kör ner till Smögen och Kungshamn med jämna mellanrum, framför allt inför säsongsstart och i augusti när folk hinner planera nästa års arbete. Står båten på Hasselösund, på Smögen eller i Kungshamn så är det samma logistik för oss.",
      "Bottenmålning är en vanlig beställning här. Yttre Bohuskusten med mycket trafik och saltvatten ställer lite tuffare krav på färgsystemet. Vi rekommenderar oftast en Jotun-färg som klarar både fart och stillaliggande.",
    ],
    nearestBase: "Cirka 1 timme och 15 min från Grebbestad",
  },
  {
    slug: "hamburgsund",
    name: "Hamburgsund",
    municipality: "Tanums kommun",
    intro:
      "Mellan Grebbestad och Fjällbacka. Hamburgö på andra sidan strömmen.",
    knownFor: [
      "Hamburgö",
      "Strömmen mellan ö och fastland",
      "Skyddat farvatten",
    ],
    localCopy: [
      "Hamburgsund är ett mindre samhälle men med ett livligt båtliv. Strömmen mellan fastlandet och Hamburgö skapar ett naturligt skyddat farvatten där många båtar ligger året runt.",
      "Vi kör hit ofta som del av en runda som inkluderar Fjällbacka och Grebbestad. Bokar du en tid samma dag som någon annan i området hjälper det oss med planeringen, och det blir enklare att passa in besöket när vi ändå är på väg.",
      "På Hamburgö kan vi bara komma med båt så det kräver lite extra planering. Hör av dig så löser vi det.",
    ],
    nearestBase: "Cirka 20 min från Grebbestad",
  },
];
