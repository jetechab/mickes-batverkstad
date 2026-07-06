"use client";

import { motion, useInView } from "framer-motion";
import { Truck, ShieldCheck, Wrench, MapPin } from "lucide-react";
import { useRef } from "react";

const usps = [
  {
    icon: Truck,
    title: "Vi kommer ut till båten",
    body: "Du behöver inte tänka på transport. Vi kommer ut med servicebilen där båten står, hemma, vid fritidshuset eller i marinan.",
  },
  {
    icon: Wrench,
    title: "Alla utombordarmärken",
    body: "Yamaha, Mercury, Suzuki, Honda, Evinrude, Tohatsu med flera. Marin servicetekniker med utbildning på samtliga större märken.",
  },
  {
    icon: ShieldCheck,
    title: "Garanti och F-skatt",
    body: "Garanti på utfört arbete och reservdelar. F-skatt och fullständig dokumentation efter varje uppdrag.",
  },
  {
    icon: MapPin,
    title: "Brett täckningsområde",
    body: "Vi utför service i hela Bohuslän, Västra Götaland, Dalsland och Värmland samt i Norge vid behov. Vår bas är i Grebbestad.",
  },
];

export default function UspSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative bg-muted/40 overflow-hidden py-20 lg:py-28 border-y border-border"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,color-mix(in_srgb,var(--color-primary)_10%,transparent),transparent)]" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-(--max-w-content) mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 lg:mb-20"
        >
          <img
            src="/img/priox-mark.svg"
            alt="Priox Båtverkstad"
            className="h-12 md:h-14 w-auto mx-auto mb-6"
            loading="lazy"
          />
          <h2 className="font-heading text-2xl md:text-3xl lg:text-[2.5rem] font-bold text-foreground leading-tight max-w-2xl mx-auto">
            Båtservice på dina villkor
            <span className="block text-primary/80 mt-1">
              utan transport, lyft eller stress
            </span>
          </h2>
          <p className="mt-5 text-muted-foreground text-base lg:text-lg max-w-(--max-w-text) mx-auto leading-relaxed">
            Mobil verkstad betyder att service, krympplastning och
            bottenmålning sker där båten redan står. Mindre tid med båten på
            vägen, mer tid med båten i vattnet!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {usps.map((usp, i) => {
            const Icon = usp.icon;
            return (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.25 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex flex-col p-6 md:p-7 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:bg-card/90 hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-105">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2 leading-snug">
                  {usp.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {usp.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
}
