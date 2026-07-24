"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "huygen-cookie-consent";

type ConsentValue = "accepted" | "essential";

function enableAnalytics(analyticsId: string) {
  if (document.querySelector(`script[data-huygen-ga="${analyticsId}"]`)) return;

  const external = document.createElement("script");
  external.async = true;
  external.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`;
  external.dataset.huygenGa = analyticsId;
  document.head.appendChild(external);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  }
  gtag("js", new Date());
  gtag("config", analyticsId, { page_path: window.location.pathname });
}

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function CookieConsent({ analyticsId }: { analyticsId?: string }) {
  const [choice, setChoice] = useState<ConsentValue | null | undefined>(undefined);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY) as ConsentValue | null;
    const updateChoice = window.requestAnimationFrame(() => setChoice(stored));
    if (stored === "accepted" && analyticsId) enableAnalytics(analyticsId);
    return () => window.cancelAnimationFrame(updateChoice);
  }, [analyticsId]);

  const save = (value: ConsentValue) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setChoice(value);
    if (value === "accepted" && analyticsId) enableAnalytics(analyticsId);
  };

  if (choice !== null) return null;

  return (
    <aside className="cookie-consent" aria-label="Cookie preferences">
      <p>
        We use optional analytics cookies only with your permission. Essential site
        functions do not require analytics cookies. Read our{" "}
        <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>
      <div>
        <button type="button" onClick={() => save("essential")}>
          Essential only
        </button>
        <button type="button" className="cookie-consent-primary" onClick={() => save("accepted")}>
          Accept analytics
        </button>
      </div>
    </aside>
  );
}
