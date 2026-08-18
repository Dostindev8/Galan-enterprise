import { SITE_URL } from "./constants";

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const allowed = new URL(SITE_URL);
  const hosts = new Set(
    [allowed.host, "localhost:3000", "127.0.0.1:3000"].map((h) => h.toLowerCase()),
  );

  const check = (value: string | null) => {
    if (!value) return false;
    try {
      return hosts.has(new URL(value).host.toLowerCase());
    } catch {
      return false;
    }
  };

  if (origin) return check(origin);
  if (referer) return check(referer);
  return false;
}

export function isHoneypotFilled(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
