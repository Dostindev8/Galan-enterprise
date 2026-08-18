import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";
import { setupLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await setupLocale(params);
  const t = await getTranslations("terms");
  const meta = await getTranslations("meta");
  return buildMetadata({
    locale,
    path: "/terms-of-use",
    title: `${t("title")} | ${meta("siteName")}`,
    description: t("disclaimer"),
  });
}

export default async function TermsPage({ params }: Props) {
  await setupLocale(params);
  const t = await getTranslations("terms");
  const sections = t.raw("sections") as Array<{ title: string; body: string }>;
  // {{LEGAL REVIEW REQUIRED — have a licensed US attorney review before publishing}}

  return (
    <div className="pt-24">
      <Container className="max-w-3xl py-16 sm:py-20">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl">{t("title")}</h1>
        <p className="mt-3 text-sm text-[var(--color-text-muted)]">{t("updated")}</p>
        <p className="mt-6 rounded-[14px] border border-[var(--color-gold-700)] bg-[var(--color-surface)] p-4 text-sm text-[var(--color-text-secondary)]">
          {t("disclaimer")}
        </p>
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl text-[var(--color-gold-300)]">{section.title}</h2>
              <p className="mt-2 text-[var(--color-text-secondary)]">{section.body}</p>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
