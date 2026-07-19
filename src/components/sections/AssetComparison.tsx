"use client";

import { motion } from "motion/react";
import { MaskLines, RuleGrow } from "@/components/ui/MaskReveal";

/**
 * Two freight flows drawn as literal routes. The broker chain is long with
 * intermediate stops; the Ship Smart flow is short and direct. The geometry
 * itself makes the argument — no cards, no icon chips.
 */

function FlowStop({
  x,
  label,
  sub,
  tone,
  delay,
  align = "center",
}: {
  x: string;
  label: string;
  sub?: string;
  tone: "muted" | "blue";
  delay: number;
  align?: "start" | "center" | "end";
}) {
  const alignClass =
    align === "start"
      ? "items-start text-left"
      : align === "end"
        ? "-translate-x-full items-end text-right"
        : "-translate-x-1/2 items-center text-center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute top-0 flex flex-col ${alignClass}`}
      style={{ left: x }}
    >
      <span
        className={`block size-2.5 rounded-full ${
          tone === "blue" ? "bg-blue" : "bg-ink/30"
        }`}
      />
      <p
        className={`mt-3 font-display text-[0.82rem] font-bold tracking-tight sm:text-[0.95rem] ${
          tone === "blue" ? "text-ink" : "text-ink/55"
        }`}
      >
        {label}
      </p>
      {sub && (
        <p className="mt-0.5 text-[0.68rem] text-muted sm:text-[0.72rem]">
          {sub}
        </p>
      )}
    </motion.div>
  );
}

function FlowLine({
  tone,
  baseDelay,
}: {
  tone: "muted" | "blue";
  baseDelay: number;
}) {
  return (
    <div className="absolute left-0 right-0 top-[4px]" aria-hidden="true">
      <div className="h-px w-full bg-ink/15" />
      <motion.div
        className={`-mt-px h-[2px] origin-left ${
          tone === "blue" ? "bg-blue" : "bg-ink/40"
        }`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, delay: baseDelay, ease: [0.65, 0, 0.35, 1] }}
      />
    </div>
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
            <FlowLine tone="muted" baseDelay={0.2} />
            <FlowStop x="0%" align="start" label="Shipper" tone="muted" delay={0.2} />
            <FlowStop x="34%" label="Broker" sub="adds margin" tone="muted" delay={0.5} />
            <FlowStop x="66%" label="Intermediary" sub="adds distance" tone="muted" delay={0.8} />
            <FlowStop x="100%" align="end" label="Carrier" sub="unknown truck" tone="muted" delay={1.05} />
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
            <FlowLine tone="blue" baseDelay={1.3} />
            <FlowStop x="0%" align="start" label="Shipper" tone="blue" delay={1.3} />
            <FlowStop x="50%" label="Ship Smart" sub="our trucks, our team" tone="blue" delay={1.55} />
            <FlowStop x="100%" align="end" label="Delivery" sub="one point of contact" tone="blue" delay={1.8} />
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
