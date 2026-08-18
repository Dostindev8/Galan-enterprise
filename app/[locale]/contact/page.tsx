import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { buildMetadata } from "@/lib/seo";
import { DISPLAY_PHONE, whatsappUrl } from "@/lib/constants";
import { setupLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await setupLocale(params);
  const t = await getTranslations("contactPage");
  const meta = await getTranslations("meta");
  return buildMetadata({
    locale,
    path: "/contact",
    title: `${t("title")} | ${meta("siteName")}`,
    description: t("body"),
  });
}

export default async function ContactPage({ params }: Props) {
  await setupLocale(params);
  const t = await getTranslations("contactPage");
  const all = await getTranslations();
  const wa = whatsappUrl(all("whatsappPrefillContact"));
  // {{PLACEHOLDER: legal business address — confirm with client before displaying}}

  return (
    <div className="pt-24">
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
          <p className="label-caps mt-10">{t("business")}</p>
          <p className="mt-3 text-[var(--color-text-secondary)]">{t("whatsappLabel")}</p>
          <p className="mt-1 font-[family-name:var(--font-playfair)] text-2xl text-[var(--color-gold-300)]">
            {DISPLAY_PHONE}
          </p>
          <div className="mt-6">
            <ButtonLink href={wa} variant="whatsapp" external>
              {t("whatsappLabel")}
            </ButtonLink>
          </div>
          <p className="mt-8 text-sm text-[var(--color-text-muted)]">{t("addressNote")}</p>
        </div>
        <div className="rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-chrome-700)_50%,transparent)] bg-[var(--color-surface)] p-6 sm:p-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl">{t("formTitle")}</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
