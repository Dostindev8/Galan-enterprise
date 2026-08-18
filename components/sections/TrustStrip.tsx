"use client";

import { Globe, Package } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

export function TrustStrip() {
  const t = useTranslations("trust");
  return (
    <section className="border-y border-[color-mix(in_srgb,var(--color-chrome-700)_40%,transparent)] bg-[var(--color-bg-secondary)] py-8">
      <Container className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge>
            <Package size={18} aria-hidden />
            {t("amazon")}
          </Badge>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge>
            <Globe size={18} aria-hidden />
            {t("otr")}
          </Badge>
        </motion.div>
      </Container>
    </section>
  );
}
