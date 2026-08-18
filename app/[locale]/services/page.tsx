import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Globe, Package } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CTABanner } from "@/components/sections/CTABanner";
import { ProtectedMedia } from "@/components/ui/ProtectedMedia";
import { buildMetadata } from "@/lib/seo";
import { setupLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await setupLocale(params);
  const t = await getTranslations("services");
  const meta = await getTranslations("meta");
  return buildMetadata({
    locale,
    path: "/services",
    title: `${t("title")} | ${meta("siteName")}`,
    description: t("amazon.summary"),
  });
}

export default async function ServicesPage({ params }: Props) {
  await setupLocale(params);
  const t = await getTranslations("services");
  const amazonExpect = t.raw("amazon.expect") as string[];
  const otrExpect = t.raw("otr.expect") as string[];
  const hero = await getTranslations("hero");

  return (
    <div className="pt-24">
      <section className="relative overflow-hidden py-16 sm:py-20">
        <ProtectedMedia className="absolute inset-0">
          <Image
            src="/images/highway-sunset.png"
            alt={hero("imageAlt")}
            fill
            draggable={false}
            className="object-cover object-center opacity-40"
            sizes="100vw"
            priority
          />
        </ProtectedMedia>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-primary)]/70 to-[var(--color-bg-primary)]" />
        <Container className="relative">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        </Container>
      </section>

      <Container className="space-y-20 py-16 sm:py-24">
        <article>
          <Package className="text-[var(--color-gold-500)]" aria-hidden />
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl">
            {t("amazon.title")}
          </h2>
          <p className="mt-4 max-w-3xl text-[var(--color-text-secondary)]">{t("amazon.body")}</p>
          <h3 className="label-caps mt-8">{t("amazon.expectTitle")}</h3>
          <ul className="mt-4 max-w-2xl space-y-2 text-[var(--color-text-secondary)]">
            {amazonExpect.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </article>

        <div className="gold-rule" />

        <article>
          <Globe className="text-[var(--color-gold-500)]" aria-hidden />
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl">{t("otr.title")}</h2>
          <p className="mt-4 max-w-3xl text-[var(--color-text-secondary)]">{t("otr.body")}</p>
          <h3 className="label-caps mt-8">{t("otr.expectTitle")}</h3>
          <ul className="mt-4 max-w-2xl space-y-2 text-[var(--color-text-secondary)]">
            {otrExpect.map((item) => (
              <li key={item}>— {item}</li>
            ))}
          </ul>
        </article>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/careers">{t("learnMore")}</ButtonLink>
        </div>
      </Container>
      <CTABanner />
    </div>
  );
}
