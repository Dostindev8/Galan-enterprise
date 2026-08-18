import type { Metadata } from "next";
import { SITE_URL, COMPANY_NAME } from "./constants";
import type { AppLocale } from "@/i18n/routing";

type MetaInput = {
  locale: AppLocale;
  path: string;
  title: string;
  description: string;
};

export function localizedUrl(locale: string, path: string): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}/${locale}${clean}`;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
}: MetaInput): Metadata {
  const url = localizedUrl(locale, path);
  const og = `${SITE_URL}/images/highway-sunset.png`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: localizedUrl("en", path),
        es: localizedUrl("es", path),
        "x-default": localizedUrl("en", path),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_US" : "en_US",
      url,
      siteName: COMPANY_NAME,
      title,
      description,
      images: [{ url: og, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og],
    },
    robots: { index: true, follow: true },
  };
}
