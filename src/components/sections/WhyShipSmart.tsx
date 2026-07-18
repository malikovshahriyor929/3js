"use client";

import { motion } from "motion/react";
import { MaskLines, RuleGrow } from "@/components/ui/MaskReveal";

const points = [
  {
    n: "01",
    title: "We own the equipment",
    body: "Tractors, trailers, and drivers on our payroll — not capacity resold from a load board. When we commit a truck, it's our truck.",
  },
  {
    n: "02",
    title: "One team owns the outcome",
    body: "Dispatch, tracking, and problem-solving sit in the same operation. One phone call reaches the people actually moving your freight.",
  },
  {
    n: "03",
    title: "Capacity that remains available",
    body: "We quote what our fleet can actually run — dedicated options included. Overflow moves only on vetted partner carriers, under our tracking and accountability.",
  },
  {
    n: "04",
    title: "Transportation and warehousing together",
    body: "Nationwide linehaul anchored by dense Midwest lanes, with storage, cross-dock, and fulfillment under the same roof.",
  },
] as const;

export function WhyShipSmart() {
  return (
    <section
      id="why-ship-smart"
      data-truck-visible
      data-scene="why"
      aria-labelledby="why-heading"
      className="relative scroll-mt-20 py-28 lg:py-44"
    >
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Sticky editorial intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p className="label text-blue-bright">Asset-Based Advantage</p>
              <h2
                id="why-heading"
                className="display mt-6 text-[clamp(2.2rem,4.4vw,4.2rem)] text-white"
              >
                <MaskLines
                  lines={["Why businesses", "choose Ship Smart", "Solutions"]}
                />
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 max-w-[24rem] text-[0.98rem] leading-relaxed text-muted-dark"
              >
                The difference between a carrier and a middleman shows up the
                week capacity gets tight. Owning the equipment changes what we
                can promise — and keep.
              </motion.p>
            </div>
          </div>

          {/* Numbered value rows */}
          <div className="lg:col-span-6 lg:col-start-7">
            {points.map((p, i) => (
              <div key={p.n}>
                <RuleGrow tone="dark" delay={i * 0.06} />
                <motion.div
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="grid grid-cols-[3.5rem_1fr] items-baseline gap-5 py-8 lg:py-9"
                >
                  <span className="index-num text-[1.05rem] text-blue-bright/90">
                    {p.n}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.35rem] font-extrabold tracking-tight text-white lg:text-[1.5rem]">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-[30rem] text-[0.95rem] leading-relaxed text-muted-dark">
                      {p.body}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
            <RuleGrow tone="dark" delay={0.3} />
          </div>
        </div>
      </div>
    </section>
  );
}
