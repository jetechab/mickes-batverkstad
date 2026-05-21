"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Facebook, Quote, Star } from "lucide-react";
import { useRef } from "react";

const highlights = [
  {
    label: "Bemötande",
    value: "Personligt och jordnära",
  },
  {
    label: "Genomförande",
    value: "På plats, garanterat",
  },
  {
    label: "Återkoppling",
    value: "Samma dag på vardagar",
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
            Vårt aktiva flöde av kundomdömen finns på Facebook. Här samlar
            vi de utvalda när Micke väljer ut sina favoriter.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative bg-card border border-border rounded-3xl p-8 md:p-12 lg:p-14 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-5 h-5 fill-accent-sand text-accent-sand"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
                    Omdömen på Facebook
                  </span>
                </div>

                <Quote className="w-10 h-10 text-primary/30 mb-4" />

                <blockquote className="font-heading text-xl md:text-2xl text-foreground leading-snug mb-8 font-medium">
                  "Vi kör ut med servicebilen och löser det där båten står. När
                  arbetet är klart har du svar på alla frågor och en faktura
                  som matchar det vi sa från början."
                </blockquote>

                <p className="text-sm text-muted-foreground italic mb-8">
                  Så funkar det. Hör vad våra kunder själva säger om
                  upplevelsen direkt i flödet på Facebook.
                </p>

                <a
                  href="https://www.facebook.com/profile.php?id=100089773764804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_25px_rgba(30,74,107,0.1)] hover:shadow-[0_0_35px_rgba(30,74,107,0.18)] group"
                >
                  <Facebook className="w-4 h-4" />
                  Se omdömen på Facebook
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="hidden lg:block w-px h-72 bg-border" aria-hidden="true" />

              <div className="space-y-4 lg:min-w-[220px]">
                {highlights.map((h, i) => (
                  <motion.div
                    key={h.label}
                    initial={{ opacity: 0, x: 12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
                      {h.label}
                    </p>
                    <p className="text-sm font-medium text-foreground leading-snug">
                      {h.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
