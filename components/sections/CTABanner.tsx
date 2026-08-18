"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { whatsappUrl } from "@/lib/constants";

export function CTABanner() {
  const t = useTranslations("cta");
  const prefill = useTranslations()("whatsappPrefill");

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[var(--radius-lg)] border border-[var(--color-gold-500)] bg-[var(--color-surface)] px-6 py-10 text-center sm:px-12"
          style={{ boxShadow: "var(--shadow-gold-glow)" }}
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.8rem,3vw,2.8rem)]">
            {t("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[var(--color-text-secondary)]">{t("body")}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={whatsappUrl(prefill)} variant="whatsapp" external>
              {t("whatsapp")}
            </ButtonLink>
            <ButtonLink href="/careers#apply">{t("apply")}</ButtonLink>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
