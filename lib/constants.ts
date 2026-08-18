export const COMPANY_NAME = "Galan Operations LLC";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "16892530469";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "";

export const DISPLAY_PHONE = "+1 (689) 253-0469";

export function whatsappUrl(prefill: string): string {
  const text = encodeURIComponent(prefill);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
