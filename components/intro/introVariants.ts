import type { Variants } from "framer-motion";
import type { IntroTiming } from "@/lib/intro";

export type { IntroTiming };
export {
  DESKTOP_TIMING,
  MOBILE_TIMING,
  REDUCED_EXIT,
  starCount,
} from "@/lib/intro";

export const EASE_APPLE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const INTRO_STARS = [
  { x: 8, y: 10, r: 1.05, delay: 0.12, duration: 2.4 },
  { x: 16, y: 22, r: 0.85, delay: 0.4, duration: 3.1 },
  { x: 24, y: 8, r: 1.2, delay: 0.08, duration: 2.7 },
  { x: 33, y: 18, r: 0.75, delay: 0.9, duration: 2.2 },
  { x: 41, y: 6, r: 1.1, delay: 0.22, duration: 2.9 },
  { x: 49, y: 14, r: 0.9, delay: 0.55, duration: 3.4 },
  { x: 57, y: 24, r: 0.7, delay: 1.1, duration: 2.5 },
  { x: 64, y: 9, r: 1.15, delay: 0.18, duration: 2.8 },
  { x: 72, y: 16, r: 0.8, delay: 0.72, duration: 3.0 },
  { x: 79, y: 5, r: 1.0, delay: 0.33, duration: 2.6 },
  { x: 86, y: 20, r: 0.85, delay: 0.95, duration: 2.3 },
  { x: 93, y: 11, r: 1.05, delay: 0.05, duration: 3.2 },
  { x: 12, y: 32, r: 0.7, delay: 0.62, duration: 2.9 },
  { x: 28, y: 28, r: 0.95, delay: 0.48, duration: 2.1 },
  { x: 46, y: 30, r: 0.8, delay: 1.05, duration: 2.7 },
  { x: 61, y: 34, r: 1.1, delay: 0.27, duration: 3.3 },
  { x: 75, y: 29, r: 0.75, delay: 0.88, duration: 2.4 },
  { x: 88, y: 33, r: 0.9, delay: 0.15, duration: 2.8 },
  { x: 5, y: 26, r: 0.65, delay: 0.7, duration: 3.05 },
  { x: 97, y: 27, r: 0.8, delay: 0.42, duration: 2.55 },
] as const;

export function createIntroVariants(timing: IntroTiming): {
  sky: Variants;
  dusk: Variants;
  truck: Variants;
} {
  return {
    sky: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { duration: timing.skyFade, ease: "easeOut" },
      },
      exit: {
        opacity: 0,
        transition: { duration: timing.skipExit, ease: "easeOut" },
      },
    },
    dusk: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          delay: timing.gradientDelay,
          duration: timing.gradient,
          ease: "easeInOut",
        },
      },
    },
    truck: {
      hidden: { clipPath: "inset(100% 0% 0% 0%)", y: 40 },
      show: {
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0,
        transition: {
          delay: timing.truckDelay,
          duration: timing.truck,
          ease: EASE_OUT_EXPO,
        },
      },
    },
  };
}

export const heroCopyVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE_APPLE },
  },
};

export const heroCopyStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0 },
  },
};

