"use client";

import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  HandshakeIcon,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useRef } from "react";

const principles = [
  {
    icon: Wrench,
    title: "Service är vårt uppdrag!",
    body: "Att du som kund är nöjd är det viktigaste för mig som företagare och servicetekniker. Jag utför den service som din båt behöver och byter aldrig delar som inte behöver bytas. Hör jag ett ljud som inte stämmer säger jag till. Är något bra som det är så lämnar jag det.",
  },
  {
    icon: HandshakeIcon,
    title: "Du ska veta vad det landar på!",
    body: "Innan jag börjar arbeta ger jag dig ett kostnadsförslag. Dyker något oväntat upp stannar jag upp och stämmer av med dig. Inga överraskningar i fakturan.",
  },
  {
    icon: ShieldCheck,
    title: "Garanti, alltid!",
    body: "Vi lämnar garanti på både arbete och delar. Skulle något inte funka som det ska efter besöket, ring så kommer jag tillbaka och löser det.",
  },
];

export default function MeetMickeSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-background py-24 lg:py-32 relative overflow-hidden border-y border-border"
      id="mot-micke"
      aria-labelledby="meet-micke-heading"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-sand/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-(--max-w-content) mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-[2px] bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Möt din servicetekniker
              </span>
            </div>
            <h2
              id="meet-micke-heading"
              className="font-heading text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-[1.05] mb-8"
            >
              Hej, det är jag som är Micke.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-sand">
                Din båtmekaniker och grundare av Mickes båtverkstad.
              </span>
            </h2>

            <div className="space-y-5 text-muted-foreground text-[17px] leading-relaxed max-w-(--max-w-text)">
              <p>
                Jag grundade Mickes Båtverkstad för att göra båtlivet enklare.
                Vi som älskar vår båt ska inte behöva köra runt med den på
                vägarna i onödan, det känns bakvänt.
              </p>
              <p>
                Sedan dess har jag kört ut till över 150 båtar, där de står.
                Med servicebilen, verktyg och de delar som behövs. Hemma på
                tomten, vid bryggan eller på uppställningsplatsen. Jag står
                själv bakom varje uppdrag, vilket betyder att du alltid pratar
                med samma person. Du vet vem som tar ansvar för din båt från
                första samtal till klart arbete.
              </p>
              <p>
                Jag är utbildad marin servicetekniker och har tagit hand om
                utombordare i många år. När du hör av dig till mig så hjälper
                jag dig med den bästa och smidigaste lösningen för dig och din
                båt.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-primary" />
                <p className="text-sm text-foreground font-medium">
                  Bas i Grebbestad, kör hela Bohuslän, Dalsland och Värmland.
                </p>
              </div>
              <a
                href="/om-oss/"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent-teal transition-colors group whitespace-nowrap"
              >
                Läs hela min historia
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] aspect-[4/3]">
              <img
                src="/img/segelbat-rigg.jpg"
                alt="Segelbåtens däck med riggning, hav i bakgrunden"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 rounded-full bg-accent-sand" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent-sand">
                    Mobil verkstad
                  </p>
                </div>
                <p className="font-heading text-base lg:text-lg font-bold text-foreground leading-snug">
                  Service där båten ligger. När det behövs.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-card to-card/70 border border-border rounded-2xl p-7 lg:p-8 relative overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent-sand/10 rounded-full blur-[60px] pointer-events-none" />
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-4">
                Mina principer
              </p>
              <div className="space-y-5">
                {principles.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <motion.div
                      key={p.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-base font-bold text-foreground leading-snug mb-1.5">
                          {p.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {p.body}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.a
              href="/boka/"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="group flex items-center justify-between gap-4 bg-primary text-primary-foreground rounded-2xl p-6 hover:bg-primary/90 transition-all shadow-[0_15px_40px_-15px_rgba(30,74,107,0.28)]"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-80 mb-1">
                  Redo när du är
                </p>
                <p className="font-heading text-xl font-bold leading-snug">
                  Skicka en kort förfrågan
                </p>
                <p className="text-sm opacity-90 mt-1">
                  Jag återkommer inom 24 timmar.
                </p>
              </div>
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1 flex-shrink-0" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
