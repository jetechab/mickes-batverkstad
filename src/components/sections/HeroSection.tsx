"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Anchor,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  Phone,
  Star,
} from "lucide-react";

const checkmarks = [
  "Alla utombordarmärken",
  "Garanti på arbete och delar",
  "Bohuslän, Dalsland och Värmland",
  "F-skatt",
];

const heroServices = [
  {
    label: "Utombordare",
    value: "Service",
    sub: "Gäller alla märken",
    href: "/tjanster/utombordsservice/",
  },
  {
    label: "Krympplast",
    value: "Täckning",
    sub: "Båtar upp till 9 meter",
    href: "/tjanster/krympplastning/",
  },
  {
    label: "Skydda skrovet",
    value: "Bottenmålning",
    sub: "Båtar mellan 2-12 meter",
    href: "/tjanster/bottenmalning/",
  },
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
      className="relative overflow-hidden min-h-[82vh] lg:min-h-[86vh] flex items-center bg-background pt-20 pb-12 lg:pt-24 lg:pb-24"
      aria-labelledby="hero-heading"
    >
      <HeroBackdrop />

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
                href="/#recensioner"
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
                <span className="font-medium">Se recensioner</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </a>
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-[2rem] xs:text-[2.4rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.5rem] font-bold text-foreground leading-[1.02] tracking-tight mb-3"
              lang="sv"
            >
              {headingMain}
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-xl sm:text-2xl md:text-[1.75rem] font-bold leading-snug tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-sand"
              lang="sv"
            >
              {headingAccent}
            </motion.p>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[1.05rem] md:text-[1.2rem] text-muted-foreground leading-relaxed mb-8 md:mb-10 max-w-(--max-w-text)"
            >
              Service av utombordare, krympplastning och bottenmålning utförs
              där båten står. Vi kommer ut till dig så att du slipper transport
              och inomhusförvar.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10 md:mb-12"
            >
              <a
                href="/boka/"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-bold rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-[0_0_30px_rgba(30,74,107,0.12)] hover:shadow-[0_0_40px_rgba(30,74,107,0.18)] hover:-translate-y-0.5 text-[17px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Boka tid
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="tel:+46767166716"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 border border-border bg-card/40 backdrop-blur-md text-foreground font-semibold rounded-2xl hover:bg-card/70 hover:border-primary/40 transition-all duration-300 text-[17px]"
              >
                <Phone className="h-5 w-5 text-primary" />
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
          className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {heroServices.map((service) => (
            <a
              key={service.label}
              href={service.href}
              className="group rounded-2xl border border-border bg-card/70 backdrop-blur-sm px-5 py-5 md:px-6 md:py-6 hover:border-primary/40 hover:bg-card transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {service.label}
                </p>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground/60 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <p
                lang="sv"
                className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-tight mb-1.5 hyphens-auto break-words"
              >
                {service.value}
              </p>
              <p className="text-[12px] text-muted-foreground">{service.sub}</p>
            </a>
          ))}

          <a
            href="/boka/"
            className="group flex flex-col justify-between rounded-2xl bg-primary text-primary-foreground px-5 py-5 md:px-6 md:py-6 hover:bg-primary/90 transition-all duration-300 shadow-[0_0_30px_rgba(30,74,107,0.12)] hover:shadow-[0_0_40px_rgba(30,74,107,0.18)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground/70">
              Redo att boka?
            </p>
            <span className="flex items-center justify-between gap-2 mt-2">
              <span className="font-heading text-xl md:text-2xl font-bold leading-tight">
                Boka nu
              </span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_45%,color-mix(in_srgb,var(--color-primary)_10%,transparent)_0%,transparent_55%)]" />
      <div className="absolute -top-28 -left-24 h-80 w-80 rounded-full bg-primary/10 blur-[110px]" />
      <div className="absolute -bottom-24 right-8 h-80 w-80 rounded-full bg-accent-sand/10 blur-[110px]" />
    </div>
  );
}

function PersonalCard() {
  return (
    <div className="relative max-w-[440px] mx-auto">
      <div className="relative rounded-[2rem] border border-border bg-card shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)] overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src="/img/micke-vid-bilen.jpg"
            alt="Micke vid sin servicebil vid vattnet i Bohuslän"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-transparent to-transparent" />

          <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">
              Tillgänglig för bokning
            </span>
          </div>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="relative px-8 pb-8 pt-6 lg:px-10 lg:pb-10">
          <div className="mb-6 relative z-10">
            <p className="font-heading text-2xl lg:text-[1.7rem] font-bold text-foreground leading-tight">
              Mikael Karlsson
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Grundare och utbildad tekniker
            </p>
          </div>

          <div className="relative pl-6 mb-6">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-primary to-accent-sand" />
            <p className="font-heading text-base lg:text-lg text-foreground leading-snug italic">
              "Att äga båt ska vara enkelt. Vi tar hand om din båt där den står,
              så att du slipper krångel och får mer tid på vattnet."
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

      <div className="absolute -top-6 -right-6 bg-card border border-border rounded-2xl px-5 py-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl">
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
    </div>
  );
}
