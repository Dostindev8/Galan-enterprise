"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { INTRO_COMPLETE_EVENT, hasSeenIntro } from "@/lib/intro";

export function AnalyticsDeferred() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mark = () => setReady(true);
    if (hasSeenIntro()) {
      mark();
      return;
    }
    window.addEventListener(INTRO_COMPLETE_EVENT, mark);
    const timer = window.setTimeout(mark, 8500);
    return () => {
      window.removeEventListener(INTRO_COMPLETE_EVENT, mark);
      window.clearTimeout(timer);
    };
  }, []);

  if (!ready) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
