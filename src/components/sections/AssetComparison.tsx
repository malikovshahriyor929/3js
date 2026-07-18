"use client";

import { motion } from "motion/react";
import { MaskLines, RuleGrow } from "@/components/ui/MaskReveal";

/**
 * Two freight flows drawn as literal routes. The broker chain is long with
 * intermediate stops; the Ship Smart flow is short and direct. The geometry
 * itself makes the argument — no cards, no icon chips.
 */

const drawTransition = (delay: number) => ({
  duration: 1.1,
  delay,
  ease: [0.65, 0, 0.35, 1] as const,
});

function FlowStop({
  x,
  label,
  sub,
  tone,
  delay,
}: {
  x: string;
  label: string;
  sub?: string;
  tone: "muted" | "blue";
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-0 -translate-x-1/2"
      style={{ left: x }}
    >
      <span
        className={`mx-auto block size-2.5 rounded-full ${
          tone === "blue" ? "bg-blue" : "bg-ink/30"
        }`}
      />
      <p
        className={`mt-3 text-center font-display text-[0.82rem] font-bold tracking-tight sm:text-[0.95rem] ${
          tone === "blue" ? "text-ink" : "text-ink/55"
        }`}
      >
        {label}
      </p>
      {sub && (
        <p className="mt-0.5 text-center text-[0.68rem] text-muted sm:text-[0.72rem]">
          {sub}
        </p>
      )}
    </motion.div>
  );
}

function FlowLine({
  progressColor,
  baseDelay,
}: {
  progressColor: string;
  baseDelay: number;
}) {
  return (
    <svg
      viewBox="0 0 100 1"
      preserveAspectRatio="none"
      className="absolute left-0 top-[4px] h-px w-full overflow-visible"
      aria-hidden="true"
    >
      <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="rgba(16,24,32,0.15)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <motion.line
        x1="0"
        y1="0.5"
        x2="100"
        y2="0.5"
        stroke={progressColor}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={drawTransition(baseDelay)}
      />
    </svg>
  );
}

export function AssetComparison() {
  return (
    <section
      aria-labelledby="comparison-heading"
      className="bg-white py-28 text-ink lg:py-44"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="label text-blue">Fewer Hands, Fewer Failures</p>
          <h2
            id="comparison-heading"
            className="display mt-6 text-[clamp(2.2rem,4.4vw,4.2rem)] text-ink"
          >
            <MaskLines
              lines={["One accountable team from", "dispatch to delivery"]}
            />
          </h2>
        </div>

        {/* Broker chain — long route */}
        <div className="mt-20 lg:mt-24">
          <div className="flex items-baseline justify-between gap-4">
            <p className="label text-[0.62rem]! text-muted/80">
              Typical broker-only chain
            </p>
            <p className="hidden text-[0.78rem] text-muted sm:block">
              Every hand-off dilutes accountability and adds margin.
            </p>
          </div>
          <div
            className="relative mt-8 h-[5.5rem]"
            role="img"
            aria-label="Broker-only flow: Shipper, then broker, then additional intermediary, then carrier — four hand-offs"
          >
            <FlowLine progressColor="rgba(16,24,32,0.4)" baseDelay={0.2} />
            <FlowStop x="2%" label="Shipper" tone="muted" delay={0.2} />
            <FlowStop x="34%" label="Broker" sub="adds margin" tone="muted" delay={0.5} />
            <FlowStop x="66%" label="Intermediary" sub="adds distance" tone="muted" delay={0.8} />
            <FlowStop x="98%" label="Carrier" sub="unknown truck" tone="muted" delay={1.05} />
          </div>
        </div>

        {/* Ship Smart — short route */}
        <div className="mt-14 lg:mt-16">
          <div className="flex items-baseline justify-between gap-4">
            <p className="label text-[0.62rem]! text-blue">The Ship Smart flow</p>
            <p className="hidden text-[0.78rem] text-muted sm:block">
              Your freight loads on our equipment, dispatched by our team.
            </p>
          </div>
          <div
            className="relative mt-8 h-[5.5rem] lg:w-2/3"
            role="img"
            aria-label="Ship Smart flow: Shipper, then Ship Smart, then delivery — one accountable hand-off"
          >
            <FlowLine progressColor="#0b63f6" baseDelay={1.3} />
            <FlowStop x="2%" label="Shipper" tone="blue" delay={1.3} />
            <FlowStop x="50%" label="Ship Smart" sub="our trucks, our team" tone="blue" delay={1.55} />
            <FlowStop x="98%" label="Delivery" sub="one point of contact" tone="blue" delay={1.8} />
          </div>
        </div>

        <div className="mt-16">
          <RuleGrow />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-[40rem] text-[0.95rem] leading-relaxed text-muted"
          >
            When volume runs past our fleet, vetted partner carriers cover the
            overflow — under the same tracking, the same standards, and the
            same single point of accountability.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
