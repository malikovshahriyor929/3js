"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import { navLinks, primaryCta } from "@/config/navigation";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ScrollLink } from "@/components/ui/ScrollLink";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-line-dark bg-navy-deep/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`container-x flex items-center justify-between gap-4 transition-[height] duration-300 ${
          scrolled ? "h-14" : "h-[4.75rem]"
        }`}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden items-center lg:flex">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.href}
              href={link.href}
              className="nav-link px-3 py-2 text-[0.82rem] font-medium tracking-[0.01em] text-white/70 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </ScrollLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ScrollLink
            href={primaryCta.href}
            className="btn btn-primary hidden min-h-10! px-5! text-[0.72rem]! sm:inline-flex"
          >
            {primaryCta.label}
          </ScrollLink>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="size-6" aria-hidden="true" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </motion.header>
  );
}
