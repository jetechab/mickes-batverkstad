"use client";

import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import { useRef } from "react";
import { orter } from "@/lib/site";

const allCities = [
  ...orter.map((o) => ({ name: o.name, slug: o.slug, primary: true })),
  { name: "Munkedal", slug: null, primary: false },
  { name: "Sotenäs", slug: null, primary: false },
  { name: "Orust", slug: null, primary: false },
  { name: "Tjörn", slug: null, primary: false },
  { name: "Stenungsund", slug: null, primary: false },
  { name: "Göteborg", slug: null, primary: false },
  { name: "Trollhättan", slug: null, primary: false },
  { name: "Vänersborg", slug: null, primary: false },
  { name: "Mellerud", slug: null, primary: false },
  { name: "Åmål", slug: null, primary: false },
  { name: "Karlstad", slug: null, primary: false },
];

export default function GeographySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-background py-24 max-md:py-16 relative overflow-hidden border-t border-border"
      aria-labelledby="geography-heading"
    >
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-(--max-w-content) mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-[2px] bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Täckningsområde
              </span>
            </div>
            <h2
              id="geography-heading"
              className="font-heading text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight"
            >
              Bohuslän som bas.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-sand">
                Hela västkusten som arbetsplats.
              </span>
            </h2>
            <p className="text-muted-foreground text-[16px] leading-relaxed mb-10 max-w-[480px]">
              Vi har bas i Grebbestad och kör ut till båten där den står. Hela
              Bohuslän, Dalsland och Värmland. Norge går också bra vid behov.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {allCities.map((city, i) => {
                const className = `inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${
                  city.primary
                    ? "bg-primary text-primary-foreground font-bold shadow-[0_0_15px_rgba(30,74,107,0.1)] hover:scale-105"
                    : "bg-card border border-border text-foreground hover:border-primary/40"
                }`;
                const content = (
                  <>
                    <MapPin
                      className={`h-3.5 w-3.5 ${
                        city.primary ? "text-primary-foreground" : "text-primary"
                      }`}
                    />
                    {city.name}
                  </>
                );
                return city.slug ? (
                  <motion.a
                    key={city.name}
                    href={`/orter/${city.slug}/`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                    className={className}
                  >
                    {content}
                  </motion.a>
                ) : (
                  <motion.span
                    key={city.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                    className={className}
                  >
                    {content}
                  </motion.span>
                );
              })}
            </div>

            <p className="text-[13px] text-muted-foreground">
              Står båten någon annanstans?{" "}
              <a
                href="/kontakt/"
                className="text-primary hover:text-accent-teal font-medium transition-colors"
              >
                Hör av dig
              </a>{" "}
              så kollar vi om det går.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[480px] aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-card">
              {/* TEMP: ersätt med foto från Bohuslän, gärna Grebbestads gästhamn eller liknande */}
              <img
                src="https://images.unsplash.com/photo-1696102825924-26aef2a51d30?auto=format&fit=crop&q=80&w=1200"
                alt="Bohusläns klippkust med hav i bakgrunden"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent pointer-events-none"></div>

              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 z-30">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-primary text-xs tracking-[0.2em] uppercase mb-2 font-bold">
                      Bas
                    </p>
                    <p className="text-foreground font-heading font-bold text-lg md:text-xl mb-1">
                      Grebbestad
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Hela Bohuslän, Dalsland, Värmland
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Grebbestad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-foreground/10 backdrop-blur-md border border-foreground/10 rounded-xl text-foreground text-sm font-medium hover:bg-foreground/20 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Öppna karta
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
