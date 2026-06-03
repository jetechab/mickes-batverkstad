"use client";

import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  MessageCircle,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: MessageCircle,
    title: "Kontakta oss",
    description:
      "Ring, mejla eller fyll i bokningsformuläret. Berätta vad du vill ha hjälp med och var båten står.",
  },
  {
    icon: CalendarDays,
    title: "Vi bokar tid",
    description:
      "Vi återkommer inom 24 timmar och hittar en tid som passar dig. Ofta kan vi utföra jobbet redan samma vecka.",
  },
  {
    icon: Truck,
    title: "Vi kommer ut",
    description:
      "Servicebilen rullar fram med allt som behövs. Vi utför arbetet där din båt är.",
  },
  {
    icon: CheckCircle2,
    title: "Klart, med garanti",
    description:
      "Du får dokumentation på utfört arbete och faktura. Garanti på arbete och reservdelar.",
  },
];

export default function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-muted/40 py-32 max-md:py-20 relative border-y border-border"
      id="hur-det-fungerar"
    >
      <div className="max-w-(--max-w-content) mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-[2px] bg-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Så går det till
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-[1.1]">
              Från samtal till klar båt
            </h2>
            <p className="text-muted-foreground max-w-[400px] text-[15px] leading-relaxed">
              Alltid lika smidigt. Vi tar hand om allt från första kontakt till
              klart arbete.
            </p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-border via-primary/40 to-border z-0" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                className="relative z-10 flex flex-col px-7 pb-9 pt-9 rounded-2xl border border-border bg-card backdrop-blur-md hover:border-primary/50 hover:bg-card/95 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="absolute -top-3 -left-3 w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-heading text-sm font-bold shadow-[0_8px_20px_-5px_rgba(30,74,107,0.22)] z-10">
                  {i + 1}
                </div>

                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="font-heading text-xl font-bold text-foreground mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="mt-12 flex justify-center sm:justify-start"
        >
          <a
            href="/boka/"
            className="inline-flex items-center gap-2.5 px-12 py-3.5 bg-primary text-primary-foreground text-[15px] font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-[0_0_25px_rgba(30,74,107,0.12)] hover:shadow-[0_0_35px_rgba(30,74,107,0.18)] hover:-translate-y-0.5"
          >
            Boka tid
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
