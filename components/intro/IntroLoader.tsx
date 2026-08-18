"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const INTRO_KEY = "galan_intro_seen";
const MIN_LOGO_MS = 1400;

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function readyAssets() {
  const fonts = document.fonts?.ready ?? Promise.resolve();
  const decode = (src: string) =>
    new Promise<void>((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        if (img.decode) {
          void img.decode().finally(() => resolve());
        } else {
          resolve();
        }
      };
      img.onerror = () => resolve();
      img.src = src;
    });
  await Promise.all([
    fonts,
    decode("/images/truck-sunset.png"),
    decode("/images/highway-sunset.png"),
    decode("/logo/galan-logo.png"),
  ]);
}

export function IntroLoader() {
  const t = useTranslations("intro");
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"sky" | "truck" | "logo" | "out">("sky");
  const [announce, setAnnounce] = useState("");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(INTRO_KEY) === "1") {
        document.documentElement.dataset.intro = "seen";
        return;
      }
    } catch {
      /* private mode */
    }
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    const announceTimer = window.setTimeout(() => {
      if (!cancelled) setAnnounce(t("loading"));
    }, 1500);

    const run = async () => {
      if (reduce) {
        await wait(400);
        finish();
        return;
      }
      setPhase("sky");
      await wait(2200);
      if (cancelled) return;
      setPhase("truck");
      await wait(2400);
      if (cancelled) return;
      setPhase("logo");
      const started = performance.now();
      await readyAssets();
      const elapsed = performance.now() - started;
      if (elapsed < MIN_LOGO_MS) await wait(MIN_LOGO_MS - elapsed);
      if (cancelled) return;
      await wait(500);
      if (cancelled) return;
      setPhase("out");
      await wait(420);
      if (!cancelled) finish();
    };

    void run();
    return () => {
      cancelled = true;
      window.clearTimeout(announceTimer);
    };
  }, [visible, reduce, t]);

  const finish = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* ignore */
    }
    document.documentElement.dataset.intro = "seen";
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="intro-overlay fixed inset-0 z-50 overflow-hidden bg-[var(--color-bg-primary)] select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "out" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden={phase === "out"}
          role="dialog"
          aria-label={t("loading")}
          onContextMenu={(event) => event.preventDefault()}
        >
          <div className="sr-only" aria-live="polite">
            {announce}
          </div>

          <div className="intro-sky">
            <div className="intro-stars" />
            <div className="intro-cloud intro-cloud-a" />
            <div className="intro-cloud intro-cloud-b" />
            <div className="intro-cloud intro-cloud-c" />
            <div className="intro-sun" />
            <div className="intro-flare" />
            <motion.div
              className="absolute inset-x-0 bottom-0 h-[48%] sm:h-[55%]"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{
                opacity: phase === "sky" ? 0.55 : 1,
                scale: 1,
              }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/highway-sunset.png"
                alt=""
                fill
                priority
                draggable={false}
                className="object-cover object-bottom"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent" />
            </motion.div>
          </div>

          <motion.div
            className="absolute inset-0"
            initial={{ x: "42%", opacity: 0, scale: 0.88 }}
            animate={
              phase === "sky"
                ? { x: "28%", opacity: 0, scale: 0.9 }
                : { x: "0%", opacity: 1, scale: 1 }
            }
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/truck-sunset.png"
              alt=""
              fill
              priority
              draggable={false}
              className="object-contain object-bottom sm:object-cover sm:object-[center_70%]"
              sizes="100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent" />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              phase === "logo" || phase === "out"
                ? { opacity: phase === "out" ? 0 : 1, scale: phase === "out" ? 1.04 : 1 }
                : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--color-bg-primary)_55%,transparent)] backdrop-blur-[2px]" />
            <div className="relative flex w-full max-w-[320px] flex-col items-center">
              <div
                className="relative mb-6 h-[72px] w-[220px] sm:h-[92px] sm:w-[320px]"
                style={{ boxShadow: "var(--shadow-gold-glow)" }}
              >
                <Image
                  src="/logo/galan-logo.png"
                  alt="Galan Operations LLC"
                  fill
                  draggable={false}
                  className="object-contain"
                  sizes="(max-width: 640px) 220px, 320px"
                  priority
                />
              </div>
              <p className="label-caps">{t("together")}</p>
              <p className="mt-3 font-[family-name:var(--font-playfair)] text-2xl text-[var(--color-text-primary)] sm:text-3xl">
                {t("welcome")}
              </p>
              <p className="mt-2 text-center text-sm text-[var(--color-text-secondary)]">
                {t("tagline")}
              </p>
              <div className="mt-8 h-px w-full origin-left overflow-hidden bg-[color-mix(in_srgb,var(--color-chrome-700)_50%,transparent)]">
                <motion.div
                  className="h-px bg-[var(--color-gold-500)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: phase === "logo" || phase === "out" ? 1 : 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={finish}
            className="absolute right-4 bottom-6 z-10 min-h-11 rounded-full px-4 text-xs tracking-[0.2em] text-[var(--color-text-secondary)] uppercase hover:text-[var(--color-gold-300)]"
          >
            {t("skip")}
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
