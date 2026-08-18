"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { whatsappUrl } from "@/lib/constants";

export function CareersHighlight() {
  const t = useTranslations("careersHighlight");
  const wa = useTranslations();
  const requirements = wa.raw("requirements") as string[];
  const offers = wa.raw("offers") as string[];
  const href = whatsappUrl(wa("whatsappPrefill"));

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold-500)] to-transparent" />
      <Container>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="label-caps">{t("eyebrow")}</p>
          <h2 className="display-title chrome-text mt-3 text-[clamp(4rem,12vw,8.5rem)]">
            {t("title")}
          </h2>
          <p className="gold-text display-title mt-1 text-[clamp(1.4rem,4vw,2.4rem)]">
            — {t("drivers")} —
          </p>
          <p className="mt-4 text-sm tracking-[0.18em] text-[var(--color-text-secondary)] uppercase">
            {t("sub")}
          </p>
          <p className="label-caps mt-10">{t("positionLabel")}</p>
          <p className="mt-2 font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.4rem)]">
            {t("position")}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Checklist title={t("requirementsTitle")} items={requirements} />
          <Checklist title={t("offersTitle")} items={offers} />
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={href} variant="whatsapp" external>
            {t("whatsapp")}
          </ButtonLink>
          <ButtonLink href="/careers#apply" variant="ghost">
            {t("online")}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <motion.div
      className="rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-chrome-700)_50%,transparent)] bg-[var(--color-surface)] p-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="label-caps mb-5">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
            <Check className="mt-0.5 shrink-0 text-[var(--color-gold-500)]" size={18} aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
