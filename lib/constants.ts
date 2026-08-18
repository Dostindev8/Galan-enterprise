export const COMPANY_NAME = "Galan Operations LLC";

function envText(value: string | undefined): string {
  return value?.trim() ?? "";
}

function resolveSiteUrl(): string {
  const raw = envText(process.env.NEXT_PUBLIC_SITE_URL);
  if (!raw) return "http://localhost:3000";
  try {
    return new URL(raw).origin;
  } catch {
    return "http://localhost:3000";
  }
}

export const WHATSAPP_NUMBER =
  envText(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER).replace(/\D/g, "") ||
  "16892530469";

export const SITE_URL = resolveSiteUrl();

export const INSTAGRAM_URL = envText(process.env.NEXT_PUBLIC_INSTAGRAM_URL);

export const DISPLAY_PHONE = "+1 (689) 253-0469";

export function whatsappUrl(prefill: string): string {
  const text = encodeURIComponent(prefill);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
