"use client";

import Image from "next/image";
import { motion, type MotionValue } from "framer-motion";
import { createIntroVariants, type IntroTiming } from "./introVariants";
import styles from "./intro.module.css";
import { cn } from "@/lib/cn";

type Props = {
  compact: boolean;
  timing: IntroTiming;
  exiting: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
};

export function IntroTruckReveal({ compact, timing, exiting, x, y }: Props) {
  const variants = createIntroVariants(timing);

  return (
    <motion.div className="absolute inset-0" style={{ x, y }}>
      <motion.div
        className={cn("absolute inset-x-0 bottom-0 h-[48%] sm:h-[55%]", styles.animLayer)}
        variants={variants.truck}
        initial="hidden"
        animate={exiting ? "hidden" : "show"}
      >
        <Image
          src="/images/highway-sunset.png"
          alt=""
          fill
          priority
          draggable={false}
          className={cn(
            "object-cover",
            compact ? "object-[center_82%]" : "object-bottom",
          )}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent" />
      </motion.div>

      <motion.div
        className={cn("absolute inset-0", styles.animLayer)}
        variants={variants.truck}
        initial="hidden"
        animate={exiting ? "hidden" : "show"}
      >
        <Image
          src="/images/truck-sunset.png"
          alt=""
          fill
          priority
          draggable={false}
          className={cn(
            "object-cover",
            compact ? "object-[68%_78%]" : "object-[center_70%]",
          )}
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[color-mix(in_srgb,var(--color-bg-primary)_18%,transparent)] to-transparent" />
      </motion.div>
    </motion.div>
  );
}
