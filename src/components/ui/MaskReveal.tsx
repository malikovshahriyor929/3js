"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

/**
 * Line-mask reveal: each child renders inside an overflow-hidden line and
 * slides up into place. Pass one node per visual line for controlled breaks.
 *
 * The viewport observer sits on the (unclipped) wrapper — the translated
 * inner spans are fully clipped before reveal, so observing them directly
 * would never fire.
 */

const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: (custom: { index: number; delay: number }) => ({
    y: "0%",
    transition: {
      duration: 0.85,
      delay: custom.delay + custom.index * 0.09,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function MaskLines({
  lines,
  as: Tag = "span",
  className,
  delay = 0,
  once = true,
}: {
  lines: ReactNode[];
  as?: "span" | "p";
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const MotionTag = Tag === "p" ? motion.p : motion.span;
  return (
    <MotionTag
      className={`block ${className ?? ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
    >
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <motion.span variants={lineVariants} custom={{ index: i, delay }}>
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Fine divider that grows from the left as it enters the viewport. */
export function RuleGrow({
  tone = "light",
  delay = 0,
  className = "",
}: {
  tone?: "light" | "dark";
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`${tone === "dark" ? "rule-dark" : "rule"} origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.9 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
