export type NavLink = {
  label: string;
  href: `#${string}`;
};

/** All navigation stays on the homepage — anchors only. */
export const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Technology", href: "#technology" },
  { label: "Coverage", href: "#coverage" },
  { label: "Why Ship Smart", href: "#why-ship-smart" },
  { label: "Track Shipment", href: "#tracking" },
];

export const primaryCta = { label: "Get a Freight Quote", href: "#quote" } as const;
export const secondaryCta = { label: "Track a Shipment", href: "#tracking" } as const;
