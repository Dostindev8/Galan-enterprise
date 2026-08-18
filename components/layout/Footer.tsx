import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Instagram } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { ProtectedMedia } from "@/components/ui/ProtectedMedia";
import { DISPLAY_PHONE, INSTAGRAM_URL, whatsappUrl } from "@/lib/constants";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const all = await getTranslations();
  const year = new Date().getFullYear();
  const wa = whatsappUrl(all("whatsappPrefillContact"));

  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--color-chrome-700)_45%,transparent)] bg-[var(--color-bg-secondary)]">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <ProtectedMedia className="relative h-14 w-[220px]">
            <Image
              src="/logo/galan-logo.png"
              alt="Galan Operations LLC"
              fill
              draggable={false}
              className="object-contain object-left"
              sizes="220px"
            />
          </ProtectedMedia>
          <p className="label-caps mt-4">{t("tagline")}</p>
          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
            {t("inquiries")}
          </p>
        </div>

        <div>
          <p className="label-caps mb-4">{t("quickLinks")}</p>
          <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
            <li><Link href="/" className="hover:text-[var(--color-text-primary)]">{nav("home")}</Link></li>
            <li><Link href="/services" className="hover:text-[var(--color-text-primary)]">{nav("services")}</Link></li>
            <li><Link href="/careers" className="hover:text-[var(--color-text-primary)]">{nav("careers")}</Link></li>
            <li><Link href="/about" className="hover:text-[var(--color-text-primary)]">{nav("about")}</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--color-text-primary)]">{nav("contact")}</Link></li>
          </ul>
        </div>

        <div>
          <p className="label-caps mb-4">{t("contact")}</p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="block min-h-11 select-text text-sm text-[var(--color-gold-300)] hover:text-[var(--color-gold-500)]"
          >
            {t("whatsapp")}: {DISPLAY_PHONE}
          </a>
        </div>

        <div>
          <p className="label-caps mb-4">{t("legal")}</p>
          <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
            <li>
              <Link href="/privacy-policy" className="hover:text-[var(--color-text-primary)]">
                {t("privacy")}
              </Link>
            </li>
            <li>
              <Link href="/terms-of-use" className="hover:text-[var(--color-text-primary)]">
                {t("terms")}
              </Link>
            </li>
            {INSTAGRAM_URL ? (
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 hover:text-[var(--color-text-primary)]"
                >
                  <Instagram size={18} aria-hidden />
                  {t("instagram")}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </Container>
      <div className="gold-rule" />
      <Container className="py-6 text-center text-sm text-[var(--color-text-muted)]">
        {t("copyright", { year })}
      </Container>
    </footer>
  );
}
