"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const groups = [
  {
    heading: "Utombordare",
    items: ["Yamaha", "Mercury", "Suzuki", "Honda", "Evinrude", "Tohatsu"],
    tail: "med flera",
  },
];

export default function BrandsStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="bg-background py-16 lg:py-20 relative border-t border-border"
      aria-labelledby="brands-heading"
    >
      <div className="max-w-(--max-w-content) mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-[2px] bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                Märken och leverantörer
              </span>
            </div>
            <h2
              id="brands-heading"
              className="font-heading text-2xl lg:text-3xl font-bold text-foreground tracking-tight leading-tight"
            >
              Det här jobbar vi med dagligen
            </h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
            Reservdelar, originalalternativ och kvalitetsutbyten från etablerade
            leverantörer. Saknas ditt märke, ring så kollar vi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-px rounded-2xl border border-border bg-border overflow-hidden">
          {groups.map((g, gi) => (
            <motion.div
              key={g.heading}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + gi * 0.08 }}
              className="bg-card p-6 lg:p-7"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-4">
                {g.heading}
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-background border border-border text-sm font-medium text-foreground"
                  >
                    {item}
                  </span>
                ))}
                <span className="text-sm text-muted-foreground italic">
                  {g.tail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
