"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("error");
  return (
    <div className="flex min-h-[50dvh] flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="font-[family-name:var(--font-playfair)] text-3xl">{t("title")}</h1>
      <p className="mt-3 max-w-md text-[var(--color-text-secondary)]">{t("body")}</p>
      <Button className="mt-6" onClick={() => reset()}>
        {t("retry")}
      </Button>
    </div>
  );
}
