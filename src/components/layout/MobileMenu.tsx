"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { navLinks, primaryCta } from "@/config/navigation";
import { Logo } from "@/components/layout/Logo";
import { ScrollLink } from "@/components/ui/ScrollLink";
import { useSmoothScroll } from "@/lib/SmoothScroll";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { stop, start } = useSmoothScroll();

  // Scroll lock + Escape + focus trap while open.
  useEffect(() => {
    if (!open) return;
    stop();
    document.body.style.overflow = "hidden";
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      start();
      previouslyFocused?.focus();
    };
  }, [open, onClose, stop, start]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-50 flex flex-col bg-navy-deep lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="container-x flex h-[4.75rem] items-center justify-between border-b border-line-dark">
            <Logo onNavigate={onClose} />
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center text-white transition-colors hover:bg-white/10"
              aria-label="Close navigation menu"
              onClick={onClose}
            >
              <X className="size-6" aria-hidden="true" strokeWidth={1.75} />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="container-x mt-8 flex flex-1 flex-col"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.06 + i * 0.05,
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-line-dark/60"
              >
                <ScrollLink
                  href={link.href}
                  onNavigate={onClose}
                  className="flex items-baseline gap-5 py-4"
                >
                  <span className="index-num text-[0.7rem] text-blue-bright/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[1.6rem] font-extrabold tracking-tight text-white/90">
                    {link.label}
                  </span>
                </ScrollLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9"
            >
              <ScrollLink
                href={primaryCta.href}
                onNavigate={onClose}
                className="btn btn-primary w-full"
              >
                {primaryCta.label}
              </ScrollLink>
            </motion.div>
          </nav>

          <p className="container-x pb-8 text-[0.78rem] text-muted-dark">
            Asset-based trucking &amp; logistics · Naperville, Illinois
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
