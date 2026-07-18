import { ScrollLink } from "@/components/ui/ScrollLink";
import { companyConfig } from "@/config/company";

/**
 * Typographic wordmark with an abstract forward-motion mark —
 * two offset road chevrons, not an illustration.
 */
export function Logo({
  onNavigate,
  tone = "dark",
}: {
  onNavigate?: () => void;
  tone?: "dark" | "light";
}) {
  return (
    <ScrollLink
      href="#top"
      onNavigate={onNavigate}
      className="inline-flex items-baseline gap-2.5"
      aria-label={`${companyConfig.name} — back to top`}
    >
      <svg
        viewBox="0 0 18 14"
        className="h-3 w-auto shrink-0 self-center"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0 0h7l5 7-5 7H0l5-7L0 0Z" fill="#0b63f6" />
        <path d="M8 0h4l5 7-5 7H8l5-7L8 0Z" fill="#2d9cff" fillOpacity="0.85" />
      </svg>
      <span
        className={`font-display text-[1.02rem] font-extrabold leading-none tracking-[-0.02em] ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        Ship Smart
        <span className="ml-1.5 font-semibold opacity-55">Solutions</span>
      </span>
    </ScrollLink>
  );
}
