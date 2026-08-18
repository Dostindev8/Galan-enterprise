"use client";

import { Globe, Package } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function ServicesOverview() {
  const t = useTranslations("services");
  const items = [
    { key: "amazon" as const, icon: Package },
    { key: "otr" as const, icon: Globe },
  ];

  return (
    <section className="bg-[var(--color-bg-secondary)] py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="h-full">
                  <Icon className="text-[var(--color-gold-500)]" aria-hidden />
                  <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-2xl">
                    {t(`${item.key}.title`)}
                  </h3>
                  <p className="mt-3 text-[var(--color-text-secondary)]">
                    {t(`${item.key}.summary`)}
                  </p>
                  <div className="mt-6">
                    <ButtonLink href="/services" variant="ghost">
                      {t("learnMore")}
                    </ButtonLink>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
