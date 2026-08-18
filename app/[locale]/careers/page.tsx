import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { JobPostingJsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { whatsappUrl } from "@/lib/constants";
import { setupLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await setupLocale(params);
  const t = await getTranslations("careers");
  const meta = await getTranslations("meta");
  return buildMetadata({
    locale,
    path: "/careers",
    title: `${t("title")} | ${meta("siteName")}`,
    description: t("sub"),
  });
}

export default async function CareersPage({ params }: Props) {
  await setupLocale(params);
  const t = await getTranslations("careers");
  const highlight = await getTranslations("careersHighlight");
  const all = await getTranslations();
  const requirements = all.raw("requirements") as string[];
  const offers = all.raw("offers") as string[];
  const wa = whatsappUrl(all("whatsappPrefill"));

  return (
    <div className="pt-24">
      <JobPostingJsonLd description={`${t("position")}. ${t("sub")}`} />
      <Container className="py-16 sm:py-20">
        <p className="label-caps">{t("eyebrow")}</p>
        <h1 className="display-title chrome-text mt-3 text-[clamp(3.5rem,10vw,7rem)]">
          {highlight("title")}
        </h1>
        <p className="gold-text display-title mt-1 text-[clamp(1.3rem,3.5vw,2.2rem)]">
          — {highlight("drivers")} —
        </p>
        <p className="mt-4 text-[var(--color-text-secondary)]">{t("sub")}</p>

        <div className="mt-8">
          <ButtonLink href={wa} variant="whatsapp" external>
            {highlight("whatsapp")}
          </ButtonLink>
        </div>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">{t("whatsappTop")}</p>

        <p className="label-caps mt-14">{t("positionLabel")}</p>
        <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-[clamp(1.6rem,3vw,2.6rem)]">
          {t("position")}
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <List title={t("requirementsTitle")} items={requirements} />
          <List title={t("offersTitle")} items={offers} />
        </div>

        <div className="mt-16 max-w-2xl">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl">{t("applyTitle")}</h2>
          <p className="mt-2 text-[var(--color-text-secondary)]">{t("applySub")}</p>
          <div className="mt-8">
            <ApplyForm />
          </div>
          <p className="mt-8 text-sm text-[var(--color-text-muted)]">{t("eeo")}</p>
        </div>

        <div className="mt-12">
          <p className="mb-3 text-sm text-[var(--color-text-secondary)]">{t("whatsappBottom")}</p>
          <ButtonLink href={wa} variant="whatsapp" external>
            {highlight("whatsapp")}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-chrome-700)_50%,transparent)] bg-[var(--color-surface)] p-6">
      <h3 className="label-caps mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[var(--color-text-secondary)]">
            <Check className="mt-0.5 text-[var(--color-gold-500)]" size={18} aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
