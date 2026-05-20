"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumAccordionItemProps {
  title: string;
  subtitle?: string;
  icon: any;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export function PremiumAccordionItem({
  title,
  subtitle,
  icon: Icon,
  children,
  isOpen,
  onToggle,
}: PremiumAccordionItemProps) {
  return (
    <div
      className={cn(
        "group/accordion relative overflow-hidden rounded-2xl transition-[box-shadow,border-color] duration-300 bg-card my-4 first:mt-0",
        isOpen
          ? "shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-primary/30 z-10"
          : "shadow-sm border border-border hover:border-primary/30 hover:shadow-md",
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left cursor-pointer outline-none bg-transparent"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 md:gap-5">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-heading text-lg md:text-xl font-bold text-foreground">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[13px] md:text-sm text-muted-foreground font-medium mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center shrink-0 pr-2">
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform duration-300",
              isOpen
                ? "rotate-180 text-primary"
                : "text-muted-foreground group-hover/accordion:text-primary",
            )}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8">
              <div className="h-px w-full bg-border mb-8" />
              <div className="text-muted-foreground text-sm md:text-[15px] leading-relaxed">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ChecklistGrid({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3 group/item">
          <div className="w-[22px] h-[22px] rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-primary/20 transition-colors">
            <CheckCircle2
              className="w-3.5 h-3.5 text-primary"
              strokeWidth={2.5}
            />
          </div>
          <span className="text-muted-foreground text-[15px] leading-snug group-hover/item:text-foreground transition-colors">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

export function DarkIncludeBox({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-muted border border-border rounded-2xl p-6 md:p-8 mt-6 shadow-sm">
      <h4 className="font-heading font-bold text-foreground mb-5 text-[17px]">
        {title}
      </h4>
      <ul className="space-y-3.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-muted-foreground text-[15px]"
          >
            <div className="w-[5px] h-[5px] bg-primary rounded-full mt-2.5 shrink-0 opacity-60" />
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
