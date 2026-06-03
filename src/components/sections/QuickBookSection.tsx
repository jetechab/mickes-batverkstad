"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import QuickBookForm from "@/components/QuickBookForm";

export default function QuickBookSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="bg-muted/40 py-24 max-md:py-16 relative border-y border-border"
      id="snabbokning"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,color-mix(in_srgb,var(--color-primary)_6%,transparent),transparent_60%)]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Snabbokning
            </span>
            <div className="w-6 h-[2px] bg-primary" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-4">
            Skicka kort förfrågan
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-xl mx-auto">
            Namn, telefon och vad det gäller. Vi hör av oss inom 24 timmar.
            Behöver du beskriva mer kan du istället gå till{" "}
            <a
              href="/boka/"
              className="text-primary hover:text-accent-teal font-medium transition-colors"
            >
              fullständig bokning
            </a>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <QuickBookForm />
        </motion.div>
      </div>
    </section>
  );
}
