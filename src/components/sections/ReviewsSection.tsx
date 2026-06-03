"use client";

import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { useRef } from "react";

/*
 * PLACEHOLDER-omdömen. Det finns inga publika recensioner på Facebook ännu, så
 * dessa är TEMP-exempel enbart för att visa ytan. Byt ut mot Mickes riktiga
 * kundomdömen (namn, ort, datum, text) innan lansering, eller koppla in en
 * källa när sådan finns. Behåll strukturen, ändra bara innehållet.
 */
const reviews = [
  {
    name: "Anders",
    location: "Grebbestad",
    date: "Maj 2026",
    stars: 5,
    text: "Micke kom ut till bryggan och servade motorn på plats. Smidigt och proffsigt, och fakturan stämde med vad vi sa från början. Båten gick som ny efteråt.",
    initials: "AN",
  },
  {
    name: "Lena",
    location: "Fjällbacka",
    date: "Apr 2026",
    stars: 5,
    text: "Snabb återkoppling och ett riktigt trevligt bemötande. Skönt att slippa släpa båten till varv, allt löstes hemma vid bryggan.",
    initials: "LE",
  },
  {
    name: "Johan",
    location: "Tanumshede",
    date: "Apr 2026",
    stars: 5,
    text: "Krympplastade båten inför vintern. Noggrant jobb och bra pris. Känns tryggt att samma person tar hand om allt.",
    initials: "JO",
  },
  {
    name: "Maria",
    location: "Strömstad",
    date: "Mar 2026",
    stars: 4.5,
    text: "Bottenmålning på plats, så jag slapp transport och uppställning på varv. Tydligt besked om kostnaden innan, inga överraskningar.",
    initials: "MA",
  },
  {
    name: "Per",
    location: "Uddevalla",
    date: "Mar 2026",
    stars: 5,
    text: "Hörde av mig på morgonen och fick tid samma vecka. Micke kan sina motorer och förklarar så man förstår.",
    initials: "PE",
  },
  {
    name: "Karin",
    location: "Lysekil",
    date: "Feb 2026",
    stars: 5,
    text: "Professionellt från första samtal till klart arbete. Rekommenderas till alla med utombordare i Bohuslän.",
    initials: "KA",
  },
];

export default function ReviewsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
          className="mb-12 lg:mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-6 h-[2px] bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Recensioner
            </span>
            <div className="w-6 h-[2px] bg-primary" />
          </div>
          <h2
            id="reviews-heading"
            className="font-heading text-3xl lg:text-5xl font-bold text-foreground tracking-tight leading-[1.1] mb-4"
          >
            Vad kunderna säger
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-xl mx-auto">
            Några röster från båtägare vi hjälpt på plats längs kusten.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.07 }}
              className="group relative"
            >
              <div className="relative h-full bg-card rounded-2xl border border-border p-8 hover:border-primary/40 hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)] transition-all duration-300">
                <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[9px] font-bold uppercase tracking-[0.15em]">
                  Exempel
                </span>
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

                <blockquote className="text-[15px] text-foreground leading-relaxed mb-6">
                  "{r.text}"
                </blockquote>

                <div className="flex items-center gap-4 pt-5 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-[11px] font-bold flex-shrink-0">
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-foreground">
                      {r.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1 font-medium">
                      {r.location} · {r.date}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
