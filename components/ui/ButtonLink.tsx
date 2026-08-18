import { cn } from "@/lib/cn";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "ghost" | "whatsapp";

const styles: Record<Variant, string> = {
  primary:
    "bg-[var(--color-gold-500)] text-[var(--color-bg-primary)] hover:bg-[var(--color-gold-300)]",
  ghost:
    "border border-[var(--color-gold-500)] bg-transparent text-white hover:bg-[color-mix(in_srgb,var(--color-gold-500)_12%,transparent)]",
  whatsapp: "bg-[#128C7E] text-white hover:bg-[#075E54]",
};

type Props = {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  ariaLabel?: string;
};

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  external,
  ariaLabel,
}: Props) {
  const classes = cn(
    "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-7 py-3 text-center text-sm font-semibold tracking-wide transition-[transform,background-color,color,border-color,opacity] duration-200 ease-[var(--ease-apple)] hover:scale-[1.02] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold-500)]",
    styles[variant],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
