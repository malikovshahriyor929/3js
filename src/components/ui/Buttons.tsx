import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { ScrollLink } from "@/components/ui/ScrollLink";

export function PrimaryButton({
  href,
  children,
  withArrow = true,
}: {
  href: `#${string}`;
  children: ReactNode;
  withArrow?: boolean;
}) {
  return (
    <ScrollLink href={href} className="btn btn-primary">
      {children}
      {withArrow && (
        <ArrowRight className="btn-arrow size-4" aria-hidden="true" strokeWidth={2} />
      )}
    </ScrollLink>
  );
}

export function GhostButton({
  href,
  children,
  tone = "dark",
}: {
  href: `#${string}`;
  children: ReactNode;
  /** "dark" = on dark backgrounds, "light" = on light backgrounds */
  tone?: "dark" | "light";
}) {
  return (
    <ScrollLink
      href={href}
      className={`btn ${tone === "dark" ? "btn-outline-dark" : "btn-outline-light"}`}
    >
      {children}
    </ScrollLink>
  );
}

/** Low-weight text action with an underline treatment. */
export function TextLink({
  href,
  children,
  tone = "dark",
}: {
  href: `#${string}`;
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <ScrollLink
      href={href}
      className={`group inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.08em] ${
        tone === "dark" ? "text-white/80 hover:text-white" : "text-ink/70 hover:text-ink"
      } transition-colors`}
    >
      <span className="border-b border-current pb-0.5">{children}</span>
      <ArrowRight
        className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </ScrollLink>
  );
}
