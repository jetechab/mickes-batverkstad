"use client";

import { useEffect, useRef } from "react";

/*
 * Cloudflare Turnstile (spamskydd). Aktiveras genom att sätta
 * PUBLIC_TURNSTILE_SITE_KEY som byggvariabel; utan den renderas ingenting
 * och formulären fungerar som tidigare. Serversidan verifierar token i
 * functions/api/contact.ts när TURNSTILE_SECRET_KEY är satt.
 */

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    __turnstileLoader?: Promise<TurnstileApi>;
  }
}

export const TURNSTILE_SITE_KEY: string | undefined = import.meta.env
  .PUBLIC_TURNSTILE_SITE_KEY;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!window.__turnstileLoader) {
    window.__turnstileLoader = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.onload = () => resolve(window.turnstile!);
      document.head.appendChild(script);
    });
  }
  return window.__turnstileLoader;
}

export default function Turnstile({
  onToken,
}: {
  onToken: (token: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !ref.current) return;
    let widgetId: string | undefined;
    let cancelled = false;

    loadTurnstile().then((turnstile) => {
      if (cancelled || !ref.current) return;
      widgetId = turnstile.render(ref.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => onTokenRef.current(token),
        "expired-callback": () => onTokenRef.current(""),
        theme: "light",
        language: "sv",
      });
    });

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, []);

  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={ref} className="mb-4 min-h-[65px]" />;
}
