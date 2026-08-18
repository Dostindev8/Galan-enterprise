import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Inter, Playfair_Display, Bebas_Neue } from "next/font/google";
import { AnalyticsDeferred } from "@/components/layout/AnalyticsDeferred";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { IntroLoader } from "@/components/intro/IntroLoader";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { SITE_URL } from "@/lib/constants";
import { resolveLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("meta");
  return {
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: "/favicon.png",
      apple: "/apple-touch-icon.png",
    },
    ...buildMetadata({
      locale,
      path: "/",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
    }),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("nav");

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfair.variable} ${bebas.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('galan_intro_seen')==='1')document.documentElement.dataset.intro='seen'}catch(e){}",
          }}
        />
      </head>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>
          <Link
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded-[14px] focus:bg-[var(--color-gold-500)] focus:px-4 focus:py-3 focus:text-[var(--color-bg-primary)]"
          >
            {t("skip")}
          </Link>
          <IntroLoader />
          <Navbar />
          <main id="content">{children}</main>
          <Footer />
          <AnalyticsDeferred />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
