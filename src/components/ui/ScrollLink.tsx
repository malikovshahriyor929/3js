"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useSmoothScroll } from "@/lib/SmoothScroll";

type ScrollLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: `#${string}`;
  children: ReactNode;
  onNavigate?: () => void;
};

/** Anchor that scrolls smoothly to a homepage section via Lenis. */
export function ScrollLink({
  href,
  children,
  onNavigate,
  ...rest
}: ScrollLinkProps) {
  const { scrollTo } = useSmoothScroll();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate?.();
    // Let a closing mobile menu release its scroll lock first.
    requestAnimationFrame(() => scrollTo(href));
    if (history.replaceState) history.replaceState(null, "", href);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
