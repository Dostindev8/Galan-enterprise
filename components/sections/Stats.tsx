"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Stats() {
  const t = useTranslations("stats");
  const items = t.raw("items") as Array<{ label: string; detail: string }>;
  // {{CONFIRM WITH CLIENT}} numeric KPIs are intentionally omitted until verified.

  return (
    <section className="bg-[var(--color-bg-secondary)] py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--color-chrome-700)_50%,transparent)] bg-[var(--color-surface)] p-5"
            >
              <p className="font-[family-name:var(--font-playfair)] text-xl text-[var(--color-gold-300)]">
                {item.label}
              </p>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
