import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center")}>
      {eyebrow ? <p className="label-caps mb-3">{eyebrow}</p> : null}
      <h2
        className={cn(
          "font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,3vw+1rem,3.25rem)] leading-tight text-[var(--color-text-primary)]",
        )}
      >
        {title}
      </h2>
      {body ? (
        <p className="mt-4 max-w-2xl text-[var(--color-text-secondary)]">{body}</p>
      ) : null}
    </div>
  );
}
