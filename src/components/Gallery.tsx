"use client";

import { galleryPhotos } from "@/lib/gallery";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const count = galleryPhotos.length;

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + count) % count)),
    [count],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, go]);

  const active = open === null ? null : galleryPhotos[open];

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
        {galleryPhotos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Öppna bild: ${photo.alt}`}
            className="group mb-4 block w-full overflow-hidden rounded-2xl border border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              width={photo.w}
              height={photo.h}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md p-4 sm:p-8"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Bildvisning"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Stäng"
              className="absolute top-4 right-4 w-11 h-11 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:text-primary hover:border-primary/40 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Föregående bild"
              className="absolute left-2 sm:left-6 w-11 h-11 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:text-primary hover:border-primary/40 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Nästa bild"
              className="absolute right-2 sm:right-6 w-11 h-11 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:text-primary hover:border-primary/40 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <motion.figure
              key={active.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="max-w-full max-h-full flex flex-col items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={active.src}
                alt={active.alt}
                className="max-w-full max-h-[80vh] w-auto h-auto rounded-2xl border border-border shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
              />
              <figcaption className="text-sm text-muted-foreground text-center">
                {active.alt}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
