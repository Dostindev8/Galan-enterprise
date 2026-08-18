"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function AnalyticsDeferred() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mark = () => setReady(true);
    try {
      if (sessionStorage.getItem("galan_intro_seen") === "1") {
        mark();
        return;
      }
    } catch {
      mark();
      return;
    }
    const timer = window.setTimeout(mark, 8500);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
