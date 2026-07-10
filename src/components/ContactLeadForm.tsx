"use client";

import Turnstile, { TURNSTILE_SITE_KEY } from "@/components/Turnstile";
import { services } from "@/lib/site";
import { ArrowRight, CheckCircle2, Phone, TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  boatModel: string;
  engine: string;
  location: string;
  preferredDate: string;
  message: string;
}

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  boatModel: "",
  engine: "",
  location: "",
  preferredDate: "",
  message: "",
};

export default function ContactLeadForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);

  // Mobil: se till att felet alltid hamnar i synfältet när det dyker upp
  useEffect(() => {
    if (error) {
      errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [error]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError("Vänta tills robotkontrollen ovanför knappen blivit klar och försök igen.");
      return;
    }
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "full-book", ...form, turnstileToken }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Något gick fel. Prova igen.");
      }

      setStatus("ok");
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Något gick fel.");
    }
  }

  if (status === "ok") {
    return (
      <div className="bg-card border border-primary/30 rounded-2xl p-10 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
          Tack för din förfrågan!
        </h2>
        <p className="text-muted-foreground text-[16px] leading-relaxed mb-6">
          Vi har tagit emot din bokning och återkommer inom 24 timmar.
        </p>
        <a
          href="tel:+46767166716"
          className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent-teal transition-colors"
        >
          <Phone className="w-4 h-4" />
          Behöver du svar snabbare? Ring 0767-16 67 16
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.3)] max-w-3xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <Field label="Namn" required>
          <input
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass}
            placeholder="För- och efternamn"
          />
        </Field>
        <Field label="Telefon" required>
          <input
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
            placeholder="070-123 45 67"
          />
        </Field>
        <Field label="E-post" required>
          <input
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
            placeholder="namn@exempel.se"
          />
        </Field>
        <Field label="Plats/ort där båten står">
          <input
            type="text"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            className={inputClass}
            placeholder="Ex: Grebbestad eller Strömstad"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <Field label="Tjänst" required>
          <select
            required
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            className={inputClass}
          >
            <option value="">Välj tjänst</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Reservdelar">Reservdelar</option>
            <option value="Annat">Annat</option>
          </select>
        </Field>
        <Field label="Önskat datum">
          <input
            type="date"
            value={form.preferredDate}
            onChange={(e) => update("preferredDate", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Båtmodell">
          <input
            type="text"
            value={form.boatModel}
            onChange={(e) => update("boatModel", e.target.value)}
            className={inputClass}
            placeholder="Ex: Buster XL"
          />
        </Field>
        <Field label="Motor">
          <input
            type="text"
            value={form.engine}
            onChange={(e) => update("engine", e.target.value)}
            className={inputClass}
            placeholder="Ex: Yamaha F60"
          />
        </Field>
      </div>

      <Field label="Meddelande" required>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={`${inputClass} resize-y`}
          placeholder="Beskriv kort vad du vill ha utfört. Ange gärna årsmodell samt eventuella tillägg som impeller- eller kamremsbyte."
        />
      </Field>

      <div className="mt-6">
        <Turnstile onToken={setTurnstileToken} />
      </div>

      {error && (
        <div
          ref={errorRef}
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3.5"
        >
          <TriangleAlert className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-destructive leading-snug">
            {error}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-[0_0_30px_rgba(30,74,107,0.12)] hover:shadow-[0_0_40px_rgba(30,74,107,0.18)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-[15px]"
        >
          {status === "submitting" ? "Skickar..." : "Skicka bokningsförfrågan"}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
        <p className="text-[12px] text-muted-foreground text-center sm:text-right max-w-xs">
          Vi använder dina uppgifter bara för att kontakta dig om din förfrågan.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[13px] font-medium text-foreground mb-2">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all";
