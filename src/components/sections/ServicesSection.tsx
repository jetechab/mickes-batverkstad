"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight, Droplets, Fence, Paintbrush, Wrench } from "lucide-react";
import { useRef } from "react";

const services = [
  {
    icon: Wrench,
    title: "Utombordarservice",
    href: "/tjanster/utombordsservice/",
    body: "Vi gör planerad service och underhåll på alla märken av utombordare med mobil verkstad, på plats hos dig. Yamaha, Mercury, Suzuki, Honda, Evinrude, Tohatsu m.fl. Garanti på arbete och delar.",
    bullets: ["Årsservice", "Serviceprotokoll", "Reservdelar"],
  },
  {
    icon: Droplets,
    title: "Krympplastning",
    href: "/tjanster/krympplastning/",
    body: "Skydd mot UV-strålning, regn, snö och nötningar. Båten kan stå kvar på släp eller uppallning, du slipper inomhusförvar.",
    bullets: ["Skräddarsytt täcke", "UV- och fuktskydd", "Görs på plats"],
  },
  {
    icon: Paintbrush,
    title: "Bottenmålning",
    href: "/tjanster/bottenmalning/",
    body: "Bottenmålning med kvalitetsprodukter. Vi målar där båten står, även på släp eller bockar. Slipper transport till varv.",
    bullets: ["Kvalitetsfärg", "Maskerar och målar", "Släp eller bockar"],
  },
  {
    icon: Fence,
    title: "Brygganläggningar & bryggservice",
    href: "/tjanster/brygganlaggningar/",
    body: "Byggnation, ombyggnad, renovering och underhåll av bryggor, bryggdäck, landgångar och marina anläggningar. För privatpersoner, företag, samfälligheter och marinor.",
    bullets: ["Byggnation och ombyggnad", "Reparation och renovering", "Underhåll och service"],
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-background py-28 max-md:py-20 overflow-hidden"
      id="tjanster"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--color-primary)_8%,transparent),transparent_50%)]" />

      <div className="max-w-(--max-w-content) mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Våra tjänster
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-heading text-4xl lg:text-6xl font-bold text-foreground tracking-tight max-w-3xl leading-[1.05]">
              Allt din båt behöver,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-sand">
                där den står.
              </span>
            </h2>
            <p className="text-muted-foreground max-w-[380px] leading-relaxed text-[15px] lg:text-right">
              Fyra kärntjänster, en mobil verkstad. Vi kommer ut till
              hemmaplanen, bryggan eller marinan.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.a
                key={service.title}
                href={service.href}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex flex-col rounded-2xl border border-border bg-card/60 p-6 md:p-8 hover:border-primary/40 hover:bg-card hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
                </div>

                <h3 className="font-heading text-2xl font-bold text-foreground mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed mb-6 flex-1">
                  {service.body}
                </p>

                <ul className="space-y-2 pt-5 border-t border-border">
                  {service.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-[13px] text-foreground"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-muted-foreground text-[15px]">
            Behöver du reservdelar?
          </p>
          <a
            href="/kontakt/"
            className="inline-flex items-center gap-2 text-[15px] font-bold text-primary hover:text-accent-teal transition-colors group"
          >
            Vi har även tillbehör och delar
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
