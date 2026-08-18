import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-gold-500)] px-4 py-2 text-sm text-[var(--color-gold-300)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
