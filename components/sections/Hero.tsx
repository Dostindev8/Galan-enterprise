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
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 48]);

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
            className="hero-kenburns object-cover object-[78%_58%] sm:object-[72%_52%]"
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h1
            className="mt-4 font-[family-name:var(--font-playfair)] text-[clamp(2.4rem,4.6vw+0.6rem,4.85rem)] leading-[1.02] text-white"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("title")}
          </motion.h1>
          <motion.p
            className="mt-5 max-w-md text-base text-white/90 sm:text-lg"
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
        </div>
      </Container>
    </section>
  );
}
