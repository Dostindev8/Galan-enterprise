"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProtectedMedia } from "@/components/ui/ProtectedMedia";

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 56]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <ProtectedMedia className="absolute inset-0">
          <Image
            src="/images/truck-sunset.png"
            alt={t("imageAlt")}
            fill
            priority
            draggable={false}
            className="hero-kenburns object-cover object-[center_58%]"
            sizes="100vw"
          />
          <div className="hero-clouds" aria-hidden="true" />
          <div className="hero-legibility" />
        </ProtectedMedia>
      </motion.div>

      <Container className="relative z-10 flex min-h-[100dvh] flex-col justify-end pb-16 pt-28 sm:pb-24">
        <motion.p
          className="label-caps"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("eyebrow")}
        </motion.p>
        <motion.h1
          className="mt-4 max-w-4xl font-[family-name:var(--font-playfair)] text-[clamp(2.5rem,5vw+1rem,5.5rem)] leading-[0.95] text-[var(--color-text-primary)] drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("title")}
        </motion.h1>
        <motion.p
          className="mt-5 max-w-xl text-lg text-[var(--color-silver-100)]/90"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("subtitle")}
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ButtonLink href="/careers">{t("ctaPrimary")}</ButtonLink>
          <ButtonLink href="/services" variant="ghost">
            {t("ctaSecondary")}
          </ButtonLink>
        </motion.div>
      </Container>
    </section>
  );
}
