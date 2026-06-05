"use client";

import { galleryPhotos } from "@/lib/gallery";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

// Kuraterat urval för startsidan: bil, Micke i arbete, kust, oljebyte, mobil verkstad, porträtt.
const featured = [0, 2, 4, 7, 10, 21].map((i) => galleryPhotos[i]);

export default function GalleryTeaser() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-muted/40 py-24 max-md:py-16 border-y border-border relative overflow-hidden"
      aria-labelledby="gallery-teaser-heading"
    >
      <div className="max-w-(--max-w-content) mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-[2px] bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Galleri
              </span>
            </div>
            <h2
              id="gallery-teaser-heading"
              className="font-heading text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-[1.1]"
            >
              Bilder från jobben
            </h2>
          </div>
          <a
            href="/galleri/"
            className="hidden sm:inline-flex items-center gap-2 text-[15px] font-bold text-primary hover:text-accent-teal transition-colors group whitespace-nowrap"
          >
            Se hela galleriet
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {featured.map((photo, i) => (
            <motion.a
              key={photo.src}
              href="/galleri/"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-card"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.w}
                height={photo.h}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>

        <a
          href="/galleri/"
          className="sm:hidden mt-8 inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all"
        >
          Se hela galleriet
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
