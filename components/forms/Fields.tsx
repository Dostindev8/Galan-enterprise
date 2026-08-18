import { cn } from "@/lib/cn";

export const fieldClass =
  "min-h-11 w-full rounded-[14px] border border-[color-mix(in_srgb,var(--color-chrome-700)_55%,transparent)] bg-[var(--color-bg-primary)] px-4 py-3 text-[var(--color-text-primary)]";

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[var(--color-text-secondary)]">{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block text-sm text-[var(--color-error)]">{error}</span>
      ) : null}
    </label>
  );
}

export function Honeypot({
  name = "company_website",
  label,
}: {
  name?: string;
  label: string;
}) {
  return (
    <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
      <label>
        {label}
        <input name={name} tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function FormStatus({ ok, text }: { ok: boolean; text: string }) {
  return (
    <p
      className={cn(
        "text-sm",
        ok ? "text-[var(--color-success)]" : "text-[var(--color-error)]",
      )}
      role="status"
    >
      {text}
    </p>
  );
}
