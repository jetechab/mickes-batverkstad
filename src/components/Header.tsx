"use client";

import { cn } from "@/lib/utils";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

/*
 * Temaväxlaren är tillfälligt borttagen – sajten är låst till ljust tema
 * (se inline-scriptet i BaseLayout.astro). Mörkt tema ses över som eventuell
 * plusmeny längre fram; logiken finns kvar i @/lib/theme för återaktivering.
 */

const navLinks = [
  { label: "Tjänster", href: "/tjanster/" },
  { label: "Priser", href: "/priser/" },
  { label: "Galleri", href: "/galleri/" },
  { label: "Om oss", href: "/om-oss/" },
  { label: "Vanliga frågor", href: "/vanliga-fragor/" },
  { label: "Kontakt", href: "/kontakt/" },
];

const phoneDisplay = "0767-16 67 16";
const phoneHref = "tel:+46767166716";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 30);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    document.addEventListener("astro:page-load", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      document.removeEventListener("astro:page-load", sync);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const close = () => setMobileOpen(false);
    document.addEventListener("astro:page-load", close);
    return () => document.removeEventListener("astro:page-load", close);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border py-3.5 shadow-[0_8px_24px_-20px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-5",
      )}
    >
      <div className="max-w-(--max-w-content) mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-shrink-0 min-w-0">
          <a
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Priox Båtverkstad"
          >
            <img
              src="/img/priox-mark.svg"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 group-hover:scale-105 transition-transform duration-300"
            />
            <span className="flex flex-col">
              <span className="font-heading text-[19px] font-bold text-foreground leading-[1.02] tracking-tight">
                Priox
              </span>
              <span className="font-heading text-[15px] font-medium text-foreground leading-[1.02]">
                Båtverkstad
              </span>
            </span>
          </a>
          <span className="text-[10px] text-muted-foreground leading-snug border-l border-border pl-3">
            Tidigare
            <span className="block">Mickes Båtverkstad</span>
          </span>
        </div>

        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Huvudnavigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={phoneHref}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4 text-primary" />
            {phoneDisplay}
          </a>
          <a
            href="/boka/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(30,74,107,0.1)] hover:shadow-[0_0_25px_rgba(30,74,107,0.18)] hover:-translate-y-0.5"
          >
            Boka tid
          </a>
        </div>

        <div className="lg:hidden flex items-center gap-1 -mr-1">
          <button
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Stäng meny" : "Öppna meny"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border shadow-xl">
          <nav className="max-w-(--max-w-content) mx-auto px-6 py-5 flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3.5 text-[15px] font-medium text-muted-foreground hover:text-foreground border-b border-border last:border-none transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 mt-2 flex flex-col gap-3">
              <a
                href={phoneHref}
                className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground"
              >
                <Phone className="h-4 w-4 text-primary" />
                {phoneDisplay}
              </a>
              <a
                href="/boka/"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center px-5 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                Boka tid
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
