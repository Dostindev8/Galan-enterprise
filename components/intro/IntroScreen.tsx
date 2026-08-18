"use client";

import { useCallback, type MouseEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { IntroSky } from "./IntroSky";
import { IntroTruckReveal } from "./IntroTruckReveal";
import { SkipIntroButton } from "./SkipIntroButton";
import { useIntroSequence } from "./useIntroSequence";
import styles from "./intro.module.css";
import { cn } from "@/lib/cn";

export function IntroScreen() {
  const t = useTranslations("intro");
  const { phase, compact, timing, skip, onOverlayFaded, exitDuration, visible } =
    useIntroSequence();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const skyX = useTransform(pointerX, [-1, 1], compact ? [0, 0] : [-9, 9]);
  const skyY = useTransform(pointerY, [-1, 1], compact ? [0, 0] : [-6, 6]);
  const truckX = useTransform(pointerX, [-1, 1], compact ? [0, 0] : [-28, 28]);
  const truckY = useTransform(pointerY, [-1, 1], compact ? [0, 0] : [-14, 14]);
  const exiting = phase === "exit";

  const onPointerMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (compact || phase !== "play") return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const { innerWidth, innerHeight } = window;
      pointerX.set((event.clientX / innerWidth) * 2 - 1);
      pointerY.set((event.clientY / innerHeight) * 2 - 1);
    },
    [compact, phase, pointerX, pointerY],
  );

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="galan-intro"
          className={cn(
            "intro-overlay fixed inset-0 z-50 overflow-hidden bg-[var(--color-bg-primary)] select-none",
            exiting ? styles.doneLayer : styles.animLayer,
          )}
          initial={{ opacity: 1 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: exiting ? exitDuration : 0.01,
            ease: "easeOut",
          }}
          onAnimationComplete={() => {
            if (exiting) onOverlayFaded();
          }}
          onMouseMove={onPointerMove}
          onContextMenu={(event) => event.preventDefault()}
        >
          <div className="sr-only" aria-live="polite">
            {t("loading")}
          </div>

          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <IntroSky
              compact={compact}
              timing={timing}
              exiting={exiting}
              x={skyX}
              y={skyY}
            />
            <IntroTruckReveal
              compact={compact}
              timing={timing}
              exiting={exiting}
              x={truckX}
              y={truckY}
            />
          </div>

          <SkipIntroButton
            label={t("skip")}
            ariaLabel={t("skipAria")}
            onSkip={skip}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
