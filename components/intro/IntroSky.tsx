"use client";

import { motion, type MotionValue } from "framer-motion";
import { INTRO_STARS, starCount, type IntroTiming } from "./introVariants";
import styles from "./intro.module.css";
import { cn } from "@/lib/cn";

type Props = {
  compact: boolean;
  timing: IntroTiming;
  exiting: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
};

export function IntroSky({ compact, timing, exiting, x, y }: Props) {
  const count = starCount(compact);

  return (
    <motion.div
      className={cn("intro-sky absolute inset-0", styles.animLayer)}
      style={{ x, y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{
        duration: exiting ? timing.skipExit : timing.skyFade,
        ease: "easeOut",
      }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{
          delay: exiting ? 0 : timing.gradientDelay,
          duration: exiting ? timing.skipExit : timing.gradient,
          ease: "easeInOut",
        }}
        style={{
          background:
            "linear-gradient(180deg, #0b0618 0%, #2a1240 28%, #7a2a3a 52%, #e07a22 76%, #ffd27a 100%)",
        }}
        aria-hidden="true"
      />
      <div className="intro-cloud intro-cloud-a" aria-hidden="true" />
      <div className="intro-cloud intro-cloud-b" aria-hidden="true" />
      <div className="intro-cloud intro-cloud-c" aria-hidden="true" />
      <div className="intro-sun" aria-hidden="true" />
      <div className="intro-flare" aria-hidden="true" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMin slice"
        aria-hidden="true"
      >
        {INTRO_STARS.slice(0, count).map((star, index) => (
          <motion.circle
            key={`${star.x}-${star.y}-${index}`}
            cx={star.x}
            cy={star.y}
            r={star.r * 0.18}
            fill={index % 3 === 0 ? "#ffe9c2" : "#ffffff"}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: exiting ? 0 : [0.3, 1, 0.3] }}
            transition={
              exiting
                ? { duration: timing.skipExit }
                : {
                    delay: 0.2 + star.delay,
                    duration: star.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          />
        ))}
      </svg>
      <div className={styles.grain} aria-hidden="true" />
    </motion.div>
  );
}
