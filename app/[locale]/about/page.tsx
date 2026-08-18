import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { CTABanner } from "@/components/sections/CTABanner";
import { buildMetadata } from "@/lib/seo";
import { setupLocale } from "@/lib/locale";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await setupLocale(params);
  const t = await getTranslations("aboutPage");
  const meta = await getTranslations("meta");
  return buildMetadata({
    locale,
    path: "/about",
    title: `${t("title")} | ${meta("siteName")}`,
    description: t("mission"),
  });
}

export default async function AboutPage({ params }: Props) {
  await setupLocale(params);
  const t = await getTranslations("aboutPage");
  const values = t.raw("values") as Array<{ title: string; body: string }>;
  // {{PLACEHOLDER: company history/founding year — confirm with client}}

  return (
    <div className="pt-24">
      <Container className="py-16 sm:py-20">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="label-caps">{t("missionTitle")}</h2>
            <p className="mt-3 text-[var(--color-text-secondary)]">{t("mission")}</p>
          </div>
          <div>
            <h2 className="label-caps">{t("visionTitle")}</h2>
            <p className="mt-3 text-[var(--color-text-secondary)]">{t("vision")}</p>
          </div>
        </div>
        <div className="mt-14 max-w-3xl">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl">{t("storyTitle")}</h2>
          <p className="mt-3 text-[var(--color-text-secondary)]">{t("story")}</p>
        </div>
        <h2 className="label-caps mt-16">{t("valuesTitle")}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {values.map((value) => (
            <Card key={value.title}>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--color-gold-300)]">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{value.body}</p>
            </Card>
          ))}
        </div>
      </Container>
      <CTABanner />
    </div>
  );
}
