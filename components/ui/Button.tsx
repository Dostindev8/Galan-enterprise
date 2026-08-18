import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "whatsapp";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const styles: Record<Variant, string> = {
  primary:
    "bg-[var(--color-gold-500)] text-[var(--color-bg-primary)] hover:bg-[var(--color-gold-300)]",
  ghost:
    "border border-[var(--color-gold-500)] bg-transparent text-white hover:bg-[color-mix(in_srgb,var(--color-gold-500)_12%,transparent)]",
  whatsapp:
    "bg-[#128C7E] text-white hover:bg-[#075E54]",
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold tracking-wide transition-[transform,background-color,color,border-color,opacity] duration-200 ease-[var(--ease-apple)] hover:scale-[1.02] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
