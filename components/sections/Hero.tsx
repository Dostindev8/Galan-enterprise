"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProtectedMedia } from "@/components/ui/ProtectedMedia";
import { INTRO_COMPLETE_EVENT, splitHeroTitle } from "@/lib/intro";
import { heroCopyVariants } from "@/components/intro/introVariants";
import { cn } from "@/lib/cn";

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [copyReady, setCopyReady] = useState(false);
  const [awaitingIntro, setAwaitingIntro] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 48]);
  const titleLines = splitHeroTitle(t("title"));
  const showCopy = Boolean(reduce) || copyReady;

  useLayoutEffect(() => {
    if (document.documentElement.dataset.intro === "seen") {
      setCopyReady(true);
      return;
    }
    setAwaitingIntro(true);
    const onDone = () => setCopyReady(true);
    window.addEventListener(INTRO_COMPLETE_EVENT, onDone);
    return () => window.removeEventListener(INTRO_COMPLETE_EVENT, onDone);
  }, []);

  const copyTransition = reduce
    ? { duration: 0.3, ease: "easeOut" as const }
    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y }}
        initial={false}
        animate={{ scale: showCopy ? 1 : awaitingIntro ? 1.05 : 1 }}
        transition={{
          duration: awaitingIntro && showCopy && !reduce ? 0.9 : 0,
          ease: "easeOut",
        }}
      >
        <ProtectedMedia className="absolute inset-0">
          <Image
            src="/images/truck-sunset.png"
            alt={t("imageAlt")}
            fill
            priority
            draggable={false}
            className={cn(
              "object-cover object-[78%_58%] sm:object-[72%_52%]",
              showCopy && !reduce && "hero-kenburns",
            )}
            sizes="100vw"
          />
          <div className="hero-clouds" aria-hidden="true" />
          <div className="hero-lightning" aria-hidden="true" />
          <svg
            className="hero-bolt"
            viewBox="0 0 64 220"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M38 4L8 108h22L18 216l42-122H36L38 4Z"
              fill="#F8FBFF"
              stroke="#D4E8FF"
              strokeWidth="2"
            />
          </svg>
          <div className="hero-legibility" />
        </ProtectedMedia>
      </motion.div>

      <Container className="relative z-10 flex min-h-[100dvh] items-center pt-24 pb-16">
        <div className="max-w-[36rem]">
          <motion.p
            className="label-caps"
            variants={heroCopyVariants}
            initial={reduce ? false : "hidden"}
            animate={showCopy ? "show" : "hidden"}
            transition={{ ...copyTransition, delay: reduce ? 0 : 0 }}
          >
            {t("eyebrow")}
          </motion.p>
          <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-[clamp(2.25rem,5vw+1rem,5.5rem)] leading-[1.02] text-white">
            {titleLines.map((line, index) => (
              <motion.span
                key={line}
                className="block"
                variants={heroCopyVariants}
                initial={reduce ? false : "hidden"}
                animate={showCopy ? "show" : "hidden"}
                transition={{ ...copyTransition, delay: reduce ? 0 : 0.12 * (index + 1) }}
              >
                {line}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="mt-5 max-w-md text-base text-white/90 sm:text-lg"
            variants={heroCopyVariants}
            initial={reduce ? false : "hidden"}
            animate={showCopy ? "show" : "hidden"}
            transition={{ ...copyTransition, delay: reduce ? 0 : 0.24 }}
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            variants={heroCopyVariants}
            initial={reduce ? false : "hidden"}
            animate={showCopy ? "show" : "hidden"}
            transition={{ ...copyTransition, delay: reduce ? 0 : 0.36 }}
          >
            <ButtonLink href="/careers">{t("ctaPrimary")}</ButtonLink>
            <ButtonLink href="/services" variant="ghost">
              {t("ctaSecondary")}
            </ButtonLink>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
