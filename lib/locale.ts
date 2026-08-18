import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export function resolveLocale(locale: string): AppLocale {
  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}

export async function setupLocale(
  params: Promise<{ locale: string }>,
): Promise<AppLocale> {
  const { locale } = await params;
  const resolved = resolveLocale(locale);
  setRequestLocale(resolved);
  return resolved;
}

