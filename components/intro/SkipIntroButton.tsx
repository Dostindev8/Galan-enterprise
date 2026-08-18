"use client";

import { useEffect, useRef } from "react";
import styles from "./intro.module.css";

type Props = {
  label: string;
  ariaLabel: string;
  onSkip: () => void;
};

export function SkipIntroButton({ label, ariaLabel, onSkip }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onSkip}
      aria-label={ariaLabel}
      className={`${styles.skip} inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-4 text-xs tracking-[0.22em] text-white/80 uppercase hover:text-[var(--color-gold-300)]`}
    >
      {label}
    </button>
  );
}
