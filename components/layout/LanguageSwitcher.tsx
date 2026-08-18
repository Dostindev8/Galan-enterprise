"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import type { AppLocale } from "@/i18n/routing";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = (next: AppLocale) => {
    router.replace(pathname, { locale: next });
  };

  return (
    <div
      className={cn(
        "inline-flex min-h-11 items-center rounded-full border border-[color-mix(in_srgb,var(--color-chrome-700)_60%,transparent)] p-1",
        compact && "w-full justify-center",
      )}
      role="group"
      aria-label={t("switchTo")}
    >
      {(["en", "es"] as const).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={cn(
              "min-h-11 min-w-11 rounded-full px-3 text-xs font-semibold tracking-[0.18em]",
              active
                ? "bg-[var(--color-gold-500)] text-[var(--color-bg-primary)]"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
            )}
            aria-pressed={active}
          >
            {t(code)}
          </button>
        );
      })}
    </div>
  );
}
