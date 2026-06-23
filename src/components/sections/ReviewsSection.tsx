"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useRef, useState } from "react";

/*
 * Riktiga kundomdömen insamlade av Micke (juni 2026). Inga datum visas, enligt
 * önskemål. Lägg gärna till fler i samma format. Initialerna räknas ut
 * automatiskt från namnet.
 */
const reviews = [
  {
    name: "Magnus",
    location: "Resö",
    stars: 5,
    text: "Härligt med en båtverkstad som kommer hem till dig med alla grejor, som är trevlig, trygg, flexibel, inte hittar på jobb som inte behövs, och som dessutom är mycket prisvärd och riktigt skicklig. Hurra för Micke och hans mobila verkstad!",
  },
  {
    name: "Mats",
    location: "Fjällbacka",
    stars: 5,
    text: "Snabb och proffsig service med mycket bra kommunikation hela vägen. Fantastiskt smidigt att få hjälpen på plats hemma och till vettiga priser, man slipper allt krångel med transporter och väntetider. Mycket nöjd och kan varmt rekommendera Mickes Båtverkstad.",
  },
  {
    name: "Martin",
    location: "",
    stars: 5,
    text: "Idén med att Micke kom till oss och gjorde servicen istället för att vi skulle ta oss till honom verkade väldigt smidig. Vi tog kontakt och fick snabbt svar. Nu har vi fått hjälp av honom i tre år och det har fungerat hur bra som helst. Motorn spinner som en katt!",
  },
  {
    name: "Juha",
    location: "",
    stars: 5,
    text: "Mickes Båtverkstad hjälpte oss med bottenmålning av vår båt samt service av motorn på förnämligt sätt på plats. Snabb respons på vår förfrågan och professionellt utförande som underlättade för oss. Vi är mycket nöjda med både arbetet och bemötandet.",
  },
  {
    name: "Johan",
    location: "Kämpersvik",
    stars: 5,
    text: "Smidig kontakt, fint bemötande och tydlig återkoppling efter genomförd service. Fick hjälp med byte av impeller och service på äldre motor. Perfekt att få båten servad där den står.",
  },
  {
    name: "Henrik",
    location: "",
    stars: 5,
    text: "Mickes Båtverkstad levererade ett utmärkt arbete på min Yamaha utombordare. Mycket trevlig och professionell i sitt bemötande. Arbetet utfördes noggrant och med hög kvalitet. Jag kan varmt rekommendera till alla som behöver pålitlig hjälp med sin båt.",
  },
  {
    name: "João",
    location: "",
    stars: 5,
    text: "Mickes service vid bryggkanten är ett väldigt bra alternativ till att ta upp båten och transportera den till en verkstad. Han har bred kunskap om båtmotorer så man känner sig trygg. Prisvärt och lätt att rekommendera för alla som värderar smidigt och effektivt.",
  },
  {
    name: "Pertti",
    location: "",
    stars: 4,
    text: "Micke utförde en bra service på båtmotorn, men det kanske var tillgängligheten som betydde mest. Han utförde servicen där båten stod så jag slapp åka många mil till närmaste serviceverkstad.",
  },
  {
    name: "Peter",
    location: "Hunnebostrand",
    stars: 5,
    text: "Vi har anlitat Mickes Båtverkstad för service av våra utombordsmotorer under några år och alltid varit mycket nöjda med tillgängligheten, kvalitén och bemötandet. Service gjord på tomten. Rekommenderas!",
  },
  {
    name: "Richard",
    location: "Strömstad",
    stars: 5,
    text: "Utført service og skifte av impeller på påhengsmotor i Strømstad. Profesjonelt og raskt utført. Ok pris, og rask til å svare på henvendelser.",
  },
  {
    name: "Rasmus",
    location: "",
    stars: 5,
    text: "Fungerade kanonbra, enkelt och smidigt. Dessutom förklarade och visade Micke alla moment han genomförde. Det kändes väldigt betryggande.",
  },
  {
    name: "Henrik",
    location: "Norge",
    stars: 5,
    text: "Vi har benyttet Micke til service på båten vår de to siste årene. Bare gode erfaringer. Servicen er utført til avtalt tid og pris, og dokumentert med bilder. Fem stjerner.",
  },
  {
    name: "Annette",
    location: "",
    stars: 5,
    text: "Alltid skönt att veta att båten är i goda händer när sommaren är slut. Micke åtgärdar snabbt och professionellt alla problem som kan uppstå, så den är i perfekt skick när nästa båtsäsong drar igång.",
  },
  {
    name: "Jörgen",
    location: "",
    stars: 5,
    text: "Micke gjorde ett mycket bra jobb när han servade min Honda utombordare inför vintern. Han är trevlig och kunnig. Jag kan rekommendera honom.",
  },
  {
    name: "Jonatan",
    location: "Fjällbacka",
    stars: 5,
    text: "Kontaktade Mickes Båtverkstad för service och kamremsbyte på båtar som förvaras i Fjällbacka. Enkel och smidig kontakt och bra utförande, rent och snyggt efteråt. Tacksam att få servicen utförd hemma i trädgården. Kan rekommenderas!",
  },
  {
    name: "Gabriel",
    location: "Kungshamn",
    stars: 5,
    text: "Enkelt och smidigt, trevligt bemötande och ett mycket professionellt intryck. Kan absolut rekommendera.",
  },
];

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

export default function ReviewsSection() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const visible = useInView(ref, { margin: "-10px" });
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);

  // Kontinuerlig marquee: spåret glider åt vänster och loopar sömlöst när
  // den första uppsättningen omdömen har passerat. Pausar vid hover, när
  // sektionen är ur bild och om användaren valt mindre rörelse.
  useAnimationFrame((_, delta) => {
    if (paused || reduceMotion || !visible) return;
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    if (half <= 0) return;
    let next = x.get() - (delta / 1000) * 40;
    if (next <= -half) next += half;
    x.set(next);
  });

  const loop = [...reviews, ...reviews];

  return (
    <section
      ref={ref}
      className="bg-muted/40 py-32 max-md:py-20 relative border-y border-border overflow-hidden"
      id="recensioner"
      aria-labelledby="reviews-heading"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-accent-sand/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-(--max-w-content) mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 lg:mb-16 max-w-2xl"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-6 h-[2px] bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Recensioner
            </span>
          </div>
          <h2
            id="reviews-heading"
            className="font-heading text-3xl lg:text-5xl font-bold text-foreground tracking-tight leading-[1.1] mb-4"
          >
            Vad kunderna säger
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-xl">
            Röster från båtägare längs kusten som vi hjälpt på plats, hemma
            eller i marinan.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        className={
          reduceMotion
            ? "relative overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            : "relative"
        }
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 w-max px-6 will-change-transform"
        >
          {loop.map((r, i) => (
            <article
              key={`${r.name}-${i}`}
              aria-hidden={i >= reviews.length}
              className="shrink-0 w-[86vw] sm:w-[360px] lg:w-[380px] flex"
            >
              <div className="flex h-full flex-col bg-card rounded-2xl border border-border p-8 hover:border-primary/40 hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)] transition-all duration-300">
                <Quote className="w-8 h-8 text-primary/25 mb-4" />
                <div className="flex gap-1 mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={
                        s <= Math.floor(r.stars)
                          ? "h-4 w-4 fill-accent-sand text-accent-sand"
                          : s - 0.5 <= r.stars
                            ? "h-4 w-4 fill-accent-sand/50 text-accent-sand"
                            : "h-4 w-4 fill-none text-border"
                      }
                    />
                  ))}
                </div>

                <blockquote className="text-[15px] text-foreground leading-relaxed mb-6 flex-1">
                  "{r.text}"
                </blockquote>

                <div className="flex items-center gap-4 pt-5 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-[11px] font-bold flex-shrink-0">
                    {initials(r.name)}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-foreground">
                      {r.name}
                    </p>
                    {r.location && (
                      <p className="text-[11px] text-muted-foreground mt-1 font-medium">
                        {r.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
