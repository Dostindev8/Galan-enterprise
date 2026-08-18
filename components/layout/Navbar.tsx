"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { ProtectedMedia } from "@/components/ui/ProtectedMedia";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", key: "home" as const },
  { href: "/services", key: "services" as const },
  { href: "/careers", key: "careers" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), select, textarea, input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background,backdrop-filter,border] duration-[var(--duration-base)] ease-[var(--ease-apple)]",
        scrolled || open
          ? "border-b border-[color-mix(in_srgb,var(--color-chrome-700)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-bg-secondary)_86%,transparent)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Link href="/" className="relative block h-10 w-[168px] shrink-0 sm:h-11 sm:w-[196px]">
          <ProtectedMedia className="absolute inset-0">
            <Image
              src="/logo/galan-logo.png"
              alt="Galan Operations LLC"
              fill
              draggable={false}
              className="object-contain object-left"
              sizes="(min-width: 640px) 196px, 168px"
              priority
            />
          </ProtectedMedia>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label={t("primary")}>
          {links.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link text-sm text-[var(--color-text-secondary)]"
                aria-current={active ? "page" : undefined}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ButtonLink href="/careers#apply">{t("applyNow")}</ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[14px] text-[var(--color-text-primary)] lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden /> : <Menu aria-hidden />}
          <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-[color-mix(in_srgb,var(--color-bg-primary)_55%,transparent)] backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              id={menuId}
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={t("primary")}
              className="fixed top-0 right-0 z-50 flex h-dvh w-[min(100%,20rem)] flex-col border-l border-[color-mix(in_srgb,var(--color-chrome-700)_45%,transparent)] bg-[var(--color-bg-secondary)] px-5 py-6 shadow-[-24px_0_60px_rgba(0,0,0,0.35)] lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-8 flex items-center justify-between">
                <p className="label-caps">{t("primary")}</p>
                <button
                  ref={closeRef}
                  type="button"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[14px]"
                  onClick={() => setOpen(false)}
                >
                  <X aria-hidden />
                  <span className="sr-only">{t("closeMenu")}</span>
                </button>
              </div>
              <nav className="flex flex-col gap-1" aria-label={t("primary")}>
                {links.map((item, index) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * index, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex min-h-11 items-center rounded-[14px] px-3 py-3 text-lg",
                          active
                            ? "text-[var(--color-gold-300)]"
                            : "text-[var(--color-text-primary)]",
                        )}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                      >
                        {t(item.key)}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <div className="mt-auto flex flex-col gap-3 pt-8">
                <LanguageSwitcher compact />
                <ButtonLink href="/careers#apply" className="w-full">
                  {t("applyNow")}
                </ButtonLink>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
