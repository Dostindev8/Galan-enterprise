"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function AboutPreview() {
  const t = useTranslations("aboutPreview");
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
          <div className="mt-8">
            <ButtonLink href="/about" variant="ghost">
              {t("cta")}
            </ButtonLink>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
