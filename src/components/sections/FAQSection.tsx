"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { useRef, useState } from "react";

export const faqs: { q: string; a: ReactNode; plain: string }[] = [
  {
    q: "Vad kostar service av en utombordare?",
    a: "Årsservice från 2 195 kr i arbetskostnad. Framkörningsavgift 685 kr tillkommer. Servicedelar och miljöavgift tillkommer. Du får alltid ett tydligt kostnadsbesked på arbetskostnaden innan arbetet påbörjas.",
    plain:
      "Årsservice från 2 195 kr i arbetskostnad. Framkörningsavgift 685 kr tillkommer. Servicedelar och miljöavgift tillkommer. Du får alltid ett tydligt kostnadsbesked på arbetskostnaden innan arbetet påbörjas.",
  },
  {
    q: "Vilka områden täcker ni?",
    a: "Bas i Grebbestad. Vi servar hela Bohuslän, Dalsland och Värmland, plus angränsande delar av Västra Götaland. Norge funkar också. Är du osäker, ring så löser vi det.",
    plain:
      "Bas i Grebbestad. Vi servar hela Bohuslän, Dalsland och Värmland, plus angränsande delar av Västra Götaland. Norge funkar också.",
  },
  {
    q: "Servar ni alla utombordarmärken?",
    a: "Ja, alla större märken: Yamaha, Mercury, Suzuki, Honda, Evinrude, Tohatsu med flera. Även äldre motorer. Hör av dig om din modell så bekräftar vi.",
    plain:
      "Ja, alla större märken: Yamaha, Mercury, Suzuki, Honda, Evinrude, Tohatsu med flera. Även äldre motorer.",
  },
  {
    q: "Kan båten stå kvar där den är?",
    a: "Ja, det är hela poängen med oss. Vi rullar fram med verkstaden där båten står. På släp, vid bryggan eller uppallad på tomten, det funkar. Det sparar dig både frakt och tid.",
    plain:
      "Ja, vi kommer ut till båten. På släp, vid bryggan eller uppallad på tomten.",
  },
  {
    q: "Hur lång framförhållning behöver ni?",
    a: "Vi försöker komma ut samma vecka. Inför säsongsstart och inför täckning på hösten är det full fart, så hör gärna av dig i god tid om det ska göras under den perioden.",
    plain:
      "Vi försöker komma ut samma vecka. Inför säsongsstart och inför täckning på hösten är det full fart, så hör gärna av dig i god tid.",
  },
  {
    q: "Vad gäller för garanti?",
    a: "Garanti på utfört arbete och på reservdelar enligt svensk konsumentlagstiftning.",
    plain:
      "Garanti på utfört arbete och på reservdelar enligt svensk konsumentlagstiftning.",
  },
  {
    q: "Kan jag stanna kvar med båten på släp under bottenmålning?",
    a: "Ja, det går utmärkt. Vi målar där båten står. Du slipper transport och inomhusvarv. Krympplastning fungerar också lika bra på släp.",
    plain:
      "Ja, vi utför bottenmålning på släp eller bockar. Krympplastning funkar också lika bra på släp.",
  },
  {
    q: "Gör ni även jobb på bryggor?",
    a: "Ja. Vi bygger, renoverar och underhåller bryggor, bryggdäck och landgångar längs Bohuskusten. Det börjar med en besiktning på plats, sedan får du ett tydligt förslag på åtgärder och pris innan vi sätter igång.",
    plain:
      "Ja, vi utför byggnation, renovering och underhåll av bryggor och marina anläggningar längs Bohuskusten.",
  },
  {
    q: "Har ni F-skatt?",
    a: "Ja. Priox Båtverkstad drivs inom PRIOX AB som är godkänt för F-skatt. Företagsuppgifter finns i sidfoten på sajten.",
    plain: "Ja. PRIOX AB är godkänt för F-skatt.",
  },
];

function FAQItem({
  faq,
  index,
  inView,
}: {
  faq: (typeof faqs)[0];
  index: number;
  inView: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.05 }}
      className="border-b border-border last:border-none"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-[16px] font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
          {faq.q}
        </span>
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
            open
              ? "bg-primary/20 border-primary/50"
              : "border-border group-hover:border-primary/40 group-hover:bg-card"
          }`}
        >
          {open ? (
            <Minus className="h-4 w-4 text-primary" />
          ) : (
            <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="text-[15px] text-muted-foreground leading-relaxed pb-6 pr-12">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface FAQSectionProps {
  items?: typeof faqs;
}

export default function FAQSection({ items = faqs }: FAQSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-background py-32 max-md:py-20 relative"
      id="vanliga-fragor"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-card/50 to-transparent pointer-events-none" />

      <div className="max-w-(--max-w-content) mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-[2px] bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Vanliga frågor
              </span>
            </div>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-[1.1] mb-6">
              Något du undrar?
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-sand">
                Här är svaren.
              </span>
            </h2>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-8">
              Hittar du inte det du letar efter? Ring eller maila så svarar vi
              snarast möjligt.
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="/vanliga-fragor/"
                className="inline-flex items-center gap-2 text-[15px] font-bold text-primary hover:text-accent-teal transition-colors group"
              >
                Se alla frågor
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </a>
              <a
                href="/kontakt/"
                className="text-[14px] text-muted-foreground hover:text-foreground transition-colors"
              >
                Kontakta oss direkt
              </a>
            </div>
          </motion.div>

          <div className="lg:col-span-3 bg-card/40 backdrop-blur-sm rounded-2xl border border-border p-6 lg:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
            {items.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
