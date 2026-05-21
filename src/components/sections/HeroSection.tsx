"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Anchor,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";

const checkmarks = [
  "Alla utombordarmärken",
  "Garanti på arbete och delar",
  "Bohuslän, Dalsland och Värmland",
  "F-skatt",
];

const stats = [
  { label: "Tekniker", value: "Marin", sub: "med utbildning" },
  { label: "Märken", value: "Alla", sub: "större utombordare" },
  { label: "Verkstad", value: "Mobil", sub: "på plats hos dig" },
  { label: "Bas", value: "Grebbestad", sub: "Bohuslän" },
];

interface HeroSectionProps {
  city?: string;
}

export default function HeroSection({ city }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const headingMain = city
    ? `Båtverkstad i ${city}`
    : "Servar utombordare hemma hos dig";
  const headingAccent = city
    ? "vi kommer ut till båten."
    : "Vi kör ut till båten.";

  return (
    <section
      className="relative overflow-hidden min-h-[88vh] lg:min-h-[92vh] flex items-center bg-background pt-24 pb-12 lg:pt-32 lg:pb-24"
      aria-labelledby="hero-heading"
    >
      <HeroBackdrop reduceMotion={reduceMotion ?? false} />

      <div className="relative max-w-(--max-w-content) mx-auto px-6 w-full z-10">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
          <div className="order-1 min-w-0">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-6 flex-wrap"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md">
                <Anchor className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] text-primary">
                  Mobil båtverkstad i Bohuslän
                </span>
              </div>
              <a
                href="https://www.facebook.com/profile.php?id=100089773764804"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-md text-[11px] sm:text-xs text-muted-foreground hover:text-foreground hover:border-accent-sand/40 transition-all group"
              >
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-3 h-3 fill-accent-sand text-accent-sand"
                    />
                  ))}
                </div>
                <span className="font-medium">Recensioner på Facebook</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </a>
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-[2rem] xs:text-[2.4rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.5rem] font-bold text-foreground leading-[1.02] tracking-tight mb-6"
              lang="sv"
            >
              {headingMain}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-sand">
                {headingAccent}
              </span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[1.05rem] md:text-[1.2rem] text-muted-foreground leading-relaxed mb-8 md:mb-10 max-w-(--max-w-text)"
            >
              Mobil service av utombordare. Krympplastning och bottenmålning
              utförs där båten står. Verkstaden kommer ut till dig, så slipper
              du transport och inomhusförvar.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 md:mb-12"
            >
              <a
                href="/boka/"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-[0_0_30px_rgba(30,74,107,0.12)] hover:shadow-[0_0_40px_rgba(30,74,107,0.18)] hover:-translate-y-0.5 text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Boka tid
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="tel:+46767166716"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 border border-border bg-card/40 backdrop-blur-md text-foreground font-medium rounded-2xl hover:bg-card/70 hover:border-primary/40 transition-all duration-300 text-[15px]"
              >
                <Phone className="h-4 w-4 text-primary" />
                Ring 0767-16 67 16
              </a>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="grid grid-cols-1 xs:grid-cols-2 gap-2 md:gap-3 max-w-2xl"
            >
              {checkmarks.map((item, i) => (
                <motion.div
                  key={item}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                  className="w-full flex items-center gap-2.5 rounded-xl bg-card/50 border border-border px-4 py-3 sm:py-2.5 backdrop-blur-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-[13px] md:text-sm font-medium text-foreground">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 hidden lg:block relative"
          >
            <PersonalCard />
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl border border-border bg-border overflow-hidden"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-card/70 backdrop-blur-sm px-5 py-5 md:px-6 md:py-6"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
                {s.label}
              </p>
              <p className="font-heading text-2xl md:text-3xl font-bold text-foreground leading-none mb-1.5">
                {s.value}
              </p>
              <p className="text-[12px] text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HeroBackdrop({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_45%,color-mix(in_srgb,var(--color-primary)_10%,transparent)_0%,transparent_55%)]" />
      <div className="absolute -top-28 -left-24 h-80 w-80 rounded-full bg-primary/10 blur-[110px]" />
      <div className="absolute -bottom-24 right-8 h-80 w-80 rounded-full bg-accent-sand/10 blur-[110px]" />

      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hero-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {!reduceMotion && (
        <div
          className="absolute inset-x-0 top-1/3 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-primary) 30%, transparent), transparent)",
            animation: "hero-sweep 8s ease-in-out infinite",
          }}
        />
      )}

      <style>{`
        @keyframes hero-sweep {
          0%, 100% { transform: translateY(-30vh); opacity: 0; }
          50% { transform: translateY(40vh); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function PersonalCard() {
  return (
    <div className="relative max-w-[440px] mx-auto">
      <div className="relative rounded-[2rem] border border-border bg-card shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)] overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1562603813-fb781dee22fe?auto=format&fit=crop&q=80&w=900"
            alt="Närbild på en utombordsmotor i god skick"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-transparent" />

          <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">
              På uppdrag
            </span>
          </div>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="relative px-8 pb-8 pt-6 lg:px-10 lg:pb-10">
          <div className="flex items-center gap-4 mb-6 -mt-12 relative z-10">
            <div className="relative w-16 h-16 shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent-sand/40 blur-md" />
              <div className="relative w-full h-full rounded-full border border-primary/40 bg-background flex items-center justify-center shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6)]">
                <span className="font-heading font-bold text-3xl text-foreground tracking-tight">
                  M
                </span>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-1">
                Möt Micke
              </p>
              <p className="font-heading text-lg font-bold text-foreground leading-tight">
                Mikael Karlsson
              </p>
              <p className="text-xs text-muted-foreground">
                Grundare och tekniker
              </p>
            </div>
          </div>

          <div className="relative pl-6 mb-6">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-primary to-accent-sand" />
            <p className="font-heading text-base lg:text-lg text-foreground leading-snug italic">
              "Bästa båtservicen är när du knappt märker att den har varit
              där. Båten bara funkar."
            </p>
          </div>

          <div className="flex items-end justify-between gap-4 mb-5">
            <svg
              width="100"
              height="30"
              viewBox="0 0 100 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Signatur Micke"
            >
              <path
                d="M3 22 C 5 12, 9 12, 12 22 L 12 10 C 16 16, 18 18, 22 12 C 22 22, 25 24, 30 18 C 32 10, 36 10, 36 22 C 36 14, 40 14, 44 22 C 44 16, 48 12, 52 16 C 56 22, 60 22, 64 14 C 66 12, 70 12, 74 18 C 76 22, 80 22, 84 16"
                stroke="currentColor"
                className="text-accent-sand"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M86 18 C 88 22, 92 24, 96 20"
                stroke="currentColor"
                className="text-accent-sand"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <p className="text-[11px] text-muted-foreground">
              Mickes Båtverkstad AB
            </p>
          </div>

          <div className="flex items-center gap-3 pt-5 border-t border-border">
            <a
              href="tel:+46767166716"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-border bg-background text-foreground text-sm font-medium rounded-lg hover:border-primary/40 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-primary" />
              0767-16 67 16
            </a>
            <a
              href="/om-oss/"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-accent-teal transition-colors px-1"
            >
              Min historia
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-2xl px-5 py-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Bas
            </p>
            <p className="text-sm font-medium text-foreground leading-snug">
              Grebbestad
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -top-6 -right-6 bg-card border border-border rounded-2xl px-5 py-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-accent-sand/10 border border-accent-sand/30 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-accent-sand" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Garanti
            </p>
            <p className="text-sm font-medium text-foreground leading-snug">
              F-skatt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
