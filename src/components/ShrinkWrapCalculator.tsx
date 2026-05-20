"use client";

import { motion, useInView } from "framer-motion";
import { Calculator, Ruler } from "lucide-react";
import { useRef, useState } from "react";

const BASE = 1800;
const PER_METER = 850;
const MIN = 4;
const MAX = 14;

function formatRange(length: number) {
  const center = BASE + (length - MIN) * PER_METER;
  const low = Math.round((center * 0.85) / 100) * 100;
  const high = Math.round((center * 1.15) / 100) * 100;
  return { low, high };
}

export default function ShrinkWrapCalculator() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [length, setLength] = useState(6);

  const { low, high } = formatRange(length);

  return (
    <div
      ref={ref}
      className="relative bg-card border border-border rounded-3xl p-8 lg:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
              Pris-räknare
            </p>
            <p className="text-xs text-muted-foreground">Ungefärlig kostnad</p>
          </div>
        </div>

        <h3 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-2 leading-tight">
          Vad kostar krympplastning?
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xl">
          Skjut reglaget till din båtlängd så får du en uppskattning. Slutpris
          beror på båtens form, kapell och eventuella förstärkningar. Vi ger
          alltid ett fast pris innan vi börjar.
        </p>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label
              htmlFor="boat-length"
              className="text-sm font-medium text-foreground flex items-center gap-2"
            >
              <Ruler className="w-4 h-4 text-primary" />
              Båtlängd
            </label>
            <div className="font-heading text-2xl font-bold text-foreground tabular-nums">
              {length} m
            </div>
          </div>
          <input
            id="boat-length"
            type="range"
            min={MIN}
            max={MAX}
            step={0.5}
            value={length}
            onChange={(e) => setLength(parseFloat(e.target.value))}
            className="w-full h-2 rounded-full bg-background appearance-none cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(94,195,214,0.4)] [&::-webkit-slider-thumb]:cursor-grab [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background"
          />
          <div className="flex justify-between mt-2 text-[11px] text-muted-foreground font-mono">
            <span>{MIN} m</span>
            <span>{MAX} m</span>
          </div>
        </div>

        <motion.div
          key={length}
          initial={inView ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-center bg-background border border-primary/30 rounded-2xl p-6"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2">
              Uppskattat prisintervall
            </p>
            <p className="font-heading text-3xl lg:text-4xl font-bold text-foreground tabular-nums">
              {low.toLocaleString("sv-SE")}–{high.toLocaleString("sv-SE")} kr
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Inkl. moms. Slutpriset bekräftas före arbete.
            </p>
          </div>
          <a
            href="/boka/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all whitespace-nowrap"
          >
            Boka tid
          </a>
        </motion.div>
      </div>
    </div>
  );
}
