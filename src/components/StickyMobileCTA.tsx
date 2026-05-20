"use client";

import { ArrowRight, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sync = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    document.addEventListener("astro:page-load", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      document.removeEventListener("astro:page-load", sync);
    };
  }, []);

  return (
    <div
      className={cn(
        "lg:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 motion-reduce:transition-none",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <div className="bg-background/95 backdrop-blur-xl border-t border-border shadow-[0_-10px_30px_rgba(0,0,0,0.4)]">
        <div className="px-4 py-3 flex items-stretch gap-2.5 max-w-(--max-w-content) mx-auto">
          <a
            href="tel:+46767166716"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 border border-border bg-card text-foreground font-medium rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            tabIndex={visible ? 0 : -1}
          >
            <Phone className="w-4 h-4 text-primary" />
            Ring
          </a>
          <a
            href="/boka/"
            className="flex-[1.4] inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-bold rounded-xl text-sm shadow-[0_0_20px_rgba(94,195,214,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            tabIndex={visible ? 0 : -1}
          >
            Boka tid
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
