"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  hasSeenIntro,
  isCompactIntroViewport,
  markIntroSeen,
  prefersSaveData,
} from "@/lib/intro";
import {
  DESKTOP_TIMING,
  MOBILE_TIMING,
  REDUCED_EXIT,
  type IntroTiming,
} from "@/lib/intro";

export type IntroPhase = "play" | "exit" | "gone";

export function useIntroSequence() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<IntroPhase>("play");
  const [compact, setCompact] = useState(false);
  const [timing, setTiming] = useState<IntroTiming>(DESKTOP_TIMING);
  const [exitDuration, setExitDuration] = useState(REDUCED_EXIT);
  const playTimerRef = useRef(0);
  const goneTimerRef = useRef(0);

  const beginExit = useCallback((durationMs: number) => {
    window.clearTimeout(playTimerRef.current);
    window.clearTimeout(goneTimerRef.current);
    markIntroSeen();
    setExitDuration(durationMs / 1000);
    setPhase("exit");
    goneTimerRef.current = window.setTimeout(() => {
      setPhase("gone");
    }, durationMs);
  }, []);

  const skip = useCallback(() => {
    beginExit(REDUCED_EXIT * 1000);
  }, [beginExit]);

  const onOverlayFaded = useCallback(() => {
    window.clearTimeout(goneTimerRef.current);
    setPhase("gone");
  }, []);

  useEffect(() => {
    const mobile = isCompactIntroViewport();
    const saveData = prefersSaveData();
    const nextTiming = mobile ? MOBILE_TIMING : DESKTOP_TIMING;
    setCompact(mobile || saveData);
    setTiming(nextTiming);

    if (hasSeenIntro()) {
      markIntroSeen();
      setPhase("gone");
      return;
    }

    if (reduce || saveData) {
      beginExit(REDUCED_EXIT * 1000);
      return;
    }

    setPhase("play");
    playTimerRef.current = window.setTimeout(() => {
      beginExit(nextTiming.overlayExit * 1000);
    }, nextTiming.exitAt * 1000);

    return () => {
      window.clearTimeout(playTimerRef.current);
    };
  }, [beginExit, reduce]);

  useEffect(() => {
    if (phase === "gone") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        skip();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, skip]);

  useEffect(() => {
    if (phase === "gone") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  useEffect(() => {
    return () => {
      window.clearTimeout(playTimerRef.current);
      window.clearTimeout(goneTimerRef.current);
    };
  }, []);

  return {
    phase,
    compact,
    timing,
    skip,
    onOverlayFaded,
    exitDuration,
    visible: phase !== "gone",
  };
}
