"use client";

import { useTheme, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Menu, Monitor, Moon, Phone, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const themeLabels: Record<Theme, string> = {
  system: "Systemtema",
  light: "Ljust tema",
  dark: "Mörkt tema",
};

const themeIcons: Record<Theme, typeof Sun> = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

const themeOrder: Theme[] = ["system", "light", "dark"];

function ThemeDropdown({
  theme,
  setTheme,
  mounted,
  className,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
  mounted: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const Icon = themeIcons[theme];
  const label = themeLabels[theme];

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Tema: ${label}. Öppna temameny.`}
        title={label}
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
      >
        {/* Reservera plats även före hydration så layouten inte hoppar. */}
        <Icon
          className={cn("h-4 w-4 transition-opacity", !mounted && "opacity-0")}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 min-w-[170px] py-1 rounded-lg border border-border bg-card shadow-[0_10px_30px_rgba(0,0,0,0.08)] z-50"
        >
          {themeOrder.map((t) => {
            const ItemIcon = themeIcons[t];
            const isActive = t === theme;
            return (
              <button
                key={t}
                role="menuitemradio"
                aria-checked={isActive}
                type="button"
                onClick={() => {
                  setTheme(t);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 text-sm text-left transition-colors",
                  isActive
                    ? "text-foreground font-medium bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                )}
              >
                <ItemIcon className="h-4 w-4" aria-hidden="true" />
                {themeLabels[t]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const navLinks = [
  { label: "Tjänster", href: "/tjanster/" },
  { label: "Priser", href: "/priser/" },
  { label: "Om oss", href: "/om-oss/" },
  { label: "Vanliga frågor", href: "/vanliga-fragor/" },
  { label: "Kontakt", href: "/kontakt/" },
];

const phoneDisplay = "0767-16 67 16";
const phoneHref = "tel:+46767166716";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme, mounted } = useTheme();

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
        <a
          href="/"
          className="flex items-center gap-2.5 flex-shrink-0 group"
          aria-label="Mickes Båtverkstad"
        >
          <img
            src="/logo.png"
            alt="Mickes Båtverkstad"
            className="h-10 w-auto group-hover:scale-105 transition-transform duration-300"
          />
        </a>

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
          <ThemeDropdown theme={theme} setTheme={setTheme} mounted={mounted} />
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
          <ThemeDropdown theme={theme} setTheme={setTheme} mounted={mounted} />
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
