"use client";

import { motion } from "motion/react";
import { MaskLines } from "@/components/ui/MaskReveal";

const steps = [
  {
    n: "01",
    title: "Request a Quote",
    body: "Tell us the lane, freight, timing, and equipment requirements. We come back with real pricing on capacity we can actually commit.",
  },
  {
    n: "02",
    title: "Book With Confidence",
    body: "Ship Smart equipment is assigned to your load first. Vetted overflow capacity steps in only when volume runs past our fleet.",
  },
  {
    n: "03",
    title: "Track in Real Time",
    body: "Location, ETA, and status stay visible from pickup to delivery — no check-in calls, no black holes between hand-offs.",
  },
  {
    n: "04",
    title: "Deliver and Document",
    body: "Freight delivers on the appointment, and BOLs and proof of delivery become available as soon as the trailer doors close.",
  },
] as const;

export function ShippingProcess() {
  return (
    <section
      aria-labelledby="process-heading"
      className="bg-surface py-28 text-ink lg:py-44"
    >
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="label text-blue">How It Works</p>
          <h2
            id="process-heading"
            className="display mt-6 text-[clamp(2.2rem,4.4vw,4.2rem)] text-ink"
          >
            <MaskLines
              lines={["How shipping with", "Ship Smart Solutions works"]}
            />
          </h2>
        </div>

        {/* Desktop: one connected horizontal route */}
        <div className="relative mt-24 hidden lg:block">
          <div className="absolute left-0 right-0 top-[5px] h-px bg-line" aria-hidden="true">
            <motion.div
              className="h-px origin-left bg-blue"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
            />
          </div>

          <ol className="grid grid-cols-4 gap-10">
            {steps.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.7,
                  delay: 0.25 + i * 0.28,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative pr-4"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-[0px] left-0 block size-[11px] -translate-y-[0px] rounded-full border-2 border-blue bg-surface"
                />
                <span className="index-num mt-8 block text-[3.4rem] leading-none text-ink/[0.12]">
                  {step.n}
                </span>
                <h3 className="mt-4 font-display text-[1.25rem] font-extrabold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">
                  {step.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Mobile: vertical route */}
        <div className="relative mt-14 lg:hidden">
          <div
            className="absolute bottom-4 left-[5px] top-1 w-px bg-line"
            aria-hidden="true"
          >
            <motion.div
              className="w-px origin-top bg-blue"
              style={{ height: "100%" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
            />
          </div>
          <ol className="space-y-12">
            {steps.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative pl-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 block size-[11px] rounded-full border-2 border-blue bg-surface"
                />
                <div className="flex items-baseline gap-4">
                  <span className="index-num text-[1.6rem] leading-none text-ink/[0.18]">
                    {step.n}
                  </span>
                  <h3 className="font-display text-[1.15rem] font-extrabold tracking-tight">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-muted">
                  {step.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
