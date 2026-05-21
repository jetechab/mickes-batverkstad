"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useRef } from "react";

export default function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative bg-background overflow-hidden py-32 max-md:py-20 border-t border-border"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                className="text-primary"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-(--max-w-content) mx-auto px-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[880px] rounded-3xl border border-primary/30 bg-gradient-to-b from-card/80 to-background/90 backdrop-blur-xl px-8 py-12 md:px-16 md:py-16 shadow-[0_0_50px_rgba(30,74,107,0.06)] text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <p className="text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            Boka tid eller ring direkt
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight mb-6">
            Hör av dig så löser vi det.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-sand">
              Vi svarar samma dag.
            </span>
          </h2>
          <p className="text-muted-foreground text-[16px] leading-relaxed mb-12 max-w-[500px] mx-auto">
            Service, krympplastning eller bottenmålning. Mobil verkstad direkt
            till båten. Snabbt, smidigt, garanterat.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 mb-14">
            <a
              href="/boka/"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-[0_0_30px_rgba(30,74,107,0.12)] hover:shadow-[0_0_40px_rgba(30,74,107,0.18)] hover:-translate-y-1 text-[15px]"
            >
              Boka tid
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+46767166716"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-border bg-card text-foreground font-medium rounded-xl hover:border-primary/40 hover:bg-card/80 transition-all duration-300 text-[15px]"
            >
              <Phone className="h-4 w-4 text-primary" />
              0767-16 67 16
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              "F-skatt",
              "Garanti på arbete",
              "Bas i Grebbestad",
              "Mobil verkstad",
            ].map((item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
