import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-chrome-700)_50%,transparent)] bg-[var(--color-surface)] p-6 transition-[transform,box-shadow] duration-200 ease-[var(--ease-apple)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-gold-glow)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
