"use client";

import Turnstile, { TURNSTILE_SITE_KEY } from "@/components/Turnstile";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { useState } from "react";

interface FormState {
  name: string;
  phone: string;
  message: string;
}

export default function QuickBookForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");

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
        body: JSON.stringify({
          source: "quick-book",
          name: form.name,
          phone: form.phone,
          message: form.message,
          turnstileToken,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Något gick fel. Prova igen.");
      }

      setStatus("ok");
      setForm({ name: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Något gick fel.");
    }
  }

  if (status === "ok") {
    return (
      <div className="bg-card border border-primary/30 rounded-2xl p-8 md:p-10 text-center">
        <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-primary" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
          Tack, vi hör av oss!
        </h3>
        <p className="text-muted-foreground text-[15px] leading-relaxed max-w-md mx-auto">
          Vi återkommer inom 24 timmar. Behöver du svar snabbare, ring{" "}
          <a
            href="tel:+46767166716"
            className="text-primary font-bold hover:underline"
          >
            0767-16 67 16
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="quick-name"
            className="block text-[13px] font-medium text-foreground mb-2"
          >
            Ditt namn
          </label>
          <input
            id="quick-name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            placeholder="För- och efternamn"
          />
        </div>
        <div>
          <label
            htmlFor="quick-phone"
            className="block text-[13px] font-medium text-foreground mb-2"
          >
            Telefon
          </label>
          <input
            id="quick-phone"
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            placeholder="070-123 45 67"
          />
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="quick-message"
          className="block text-[13px] font-medium text-foreground mb-2"
        >
          Kort om vad det gäller
        </label>
        <textarea
          id="quick-message"
          required
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all resize-y"
          placeholder="Ex: Service på Yamaha 60 hk, båten står i Grebbestad."
        />
      </div>

      <Turnstile onToken={setTurnstileToken} />

      {error && (
        <p className="text-destructive text-sm mb-4" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-[0_0_25px_rgba(30,74,107,0.1)] hover:shadow-[0_0_35px_rgba(30,74,107,0.18)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-[15px]"
        >
          {status === "submitting" ? "Skickar..." : "Skicka förfrågan"}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
        <a
          href="tel:+46767166716"
          className="inline-flex items-center justify-center gap-2 text-[14px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <Phone className="w-4 h-4 text-primary" />
          eller ring 0767-16 67 16
        </a>
      </div>
    </form>
  );
}
