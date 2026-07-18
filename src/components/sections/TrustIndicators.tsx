"use client";

import { motion } from "motion/react";
import { RuleGrow } from "@/components/ui/MaskReveal";

const capabilities = [
  { label: "Asset-Based", detail: "Company-owned trucks & trailers" },
  { label: "48 States", detail: "Coast-to-coast coverage" },
  { label: "Live Visibility", detail: "GPS tracking on every load" },
  { label: "Dedicated", detail: "Committed equipment & lanes" },
  { label: "Cold-Chain", detail: "Monitored reefer capacity" },
  { label: "Warehousing", detail: "Storage, cross-dock, fulfillment" },
] as const;

export function TrustIndicators() {
  return (
    <section aria-label="Core capabilities" data-truck-visible className="relative">
      <div className="container-x">
        <RuleGrow tone="dark" />
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-stretch">
          {capabilities.map((cap, i) => (
            <motion.li
              key={cap.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex-1 border-b border-line-dark/60 py-6 pr-6 sm:border-b-0 lg:py-7 lg:pl-6 lg:first:pl-0 lg:not-first:border-l lg:not-first:border-line-dark/60"
            >
              <p className="font-display text-[0.95rem] font-extrabold tracking-tight text-white">
                {cap.label}
              </p>
              <p className="mt-1.5 text-[0.78rem] leading-snug text-white/45">
                {cap.detail}
              </p>
            </motion.li>
          ))}
        </ul>
        <RuleGrow tone="dark" delay={0.1} />
      </div>
    </section>
  );
}
