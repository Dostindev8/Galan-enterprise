import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="pt-24">
      <Container className="flex min-h-[60dvh] flex-col items-center justify-center py-20 text-center">
        <p className="label-caps">404</p>
        <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-4xl">{t("title")}</h1>
        <p className="mt-3 max-w-md text-[var(--color-text-secondary)]">{t("body")}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">{t("home")}</ButtonLink>
          <ButtonLink href="/careers" variant="ghost">
            {t("careers")}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
