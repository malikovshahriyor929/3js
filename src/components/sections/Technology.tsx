"use client";

import { motion } from "motion/react";
import { MaskLines, RuleGrow } from "@/components/ui/MaskReveal";
import { TrackingDemo } from "@/components/sections/TrackingDemo";

/** One focused operational surface — clearly labelled as a preview. */
function DashboardPreview() {
  return (
    <div
      className="border border-line-dark bg-navy-deep/90"
      role="img"
      aria-label="Illustrative preview of the Ship Smart client tracking dashboard, populated with sample data"
    >
      {/* Surface header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-dark px-6 py-4">
        <div className="flex items-baseline gap-4">
          <p className="font-display text-[1.05rem] font-extrabold tracking-tight text-white">
            SS-84129-IL
          </p>
          <p className="flex items-center gap-1.5 text-[0.75rem] font-medium text-[#4cd39a]">
            <span className="size-1.5 rounded-full bg-[#4cd39a]" />
            In transit — on schedule
          </p>
        </div>
        <p className="label text-[0.6rem]! text-white/35">
          Dashboard preview · Sample data
        </p>
      </div>

      {/* Route region */}
      <div className="px-6 pb-7 pt-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="label text-[0.6rem]! text-white/35">Origin</p>
            <p className="mt-1.5 font-display text-[1rem] font-bold text-white">
              Naperville, IL
            </p>
            <p className="text-[0.72rem] text-white/40">Picked up 06:12 CT</p>
          </div>
          <div className="text-right">
            <p className="label text-[0.6rem]! text-white/35">Destination</p>
            <p className="mt-1.5 font-display text-[1rem] font-bold text-white">
              Atlanta, GA
            </p>
            <p className="text-[0.72rem] text-white/40">ETA tomorrow 09:40 ET</p>
          </div>
        </div>

        {/* Progress line with current position */}
        <div className="relative mt-6" aria-hidden="true">
          <div className="h-px w-full bg-white/12" />
          <motion.div
            className="absolute left-0 top-0 h-px origin-left bg-blue-bright"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 0.64 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 1.6, duration: 0.4 }}
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: "64%" }}
          >
            <span className="relative flex size-3 items-center justify-center">
              <span className="absolute size-3 animate-ping rounded-full bg-blue-bright/30 motion-reduce:animate-none" />
              <span className="size-1.5 rounded-full bg-blue-bright" />
            </span>
          </motion.div>
          <span className="absolute left-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-white/50" />
          <span className="absolute right-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full border border-white/30" />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 1.7, duration: 0.4 }}
          className="mt-3 text-[0.78rem] text-white/50"
          style={{ marginLeft: "max(0px, calc(64% - 6rem))" }}
        >
          Currently near Louisville, KY · I-65 S
        </motion.p>
      </div>

      {/* Status readout — ruled columns, not tiles */}
      <div className="grid grid-cols-3 border-t border-line-dark">
        {[
          ["ETA", "Tomorrow, 09:40 ET"],
          ["Reefer", "34.0°F set · 34.2°F actual"],
          ["Delivery", "Appointment confirmed"],
        ].map(([k, v], i) => (
          <div
            key={k}
            className={`px-6 py-5 ${i > 0 ? "border-l border-line-dark" : ""}`}
          >
            <p className="label text-[0.6rem]! text-white/35">{k}</p>
            <p className="mt-1.5 text-[0.85rem] font-medium text-white/90">
              {v}
            </p>
          </div>
        ))}
      </div>

      {/* Documents */}
      <div className="border-t border-line-dark px-6 py-5">
        <p className="label text-[0.6rem]! text-white/35">Documents</p>
        <ul className="mt-3 space-y-2 text-[0.85rem]">
          {[
            ["Rate confirmation", "Available", true],
            ["Bill of lading", "Available", true],
            ["Proof of delivery", "On delivery", false],
          ].map(([doc, status, ready]) => (
            <li
              key={doc as string}
              className="flex items-center justify-between gap-3"
            >
              <span className={ready ? "text-white/85" : "text-white/40"}>
                {doc}
              </span>
              <span
                className={`text-[0.7rem] font-semibold uppercase tracking-wider ${
                  ready ? "text-[#4cd39a]" : "text-white/35"
                }`}
              >
                {status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Technology() {
  return (
    <section
      id="technology"
      data-truck-visible
      data-scene="technology"
      aria-labelledby="technology-heading"
      className="relative scroll-mt-20 bg-navy-deep/60 py-28 lg:py-44"
    >
      <div className="container-x">
        <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <p className="label text-blue-bright">Technology</p>
            <h2
              id="technology-heading"
              className="display mt-6 text-[clamp(2.2rem,4.4vw,4.2rem)] text-white"
            >
              <MaskLines
                lines={[
                  "Real-time freight",
                  "tracking and shipment",
                  "visibility",
                ]}
              />
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[26rem] text-[0.98rem] leading-relaxed text-muted-dark"
            >
              Every load — on our trucks or vetted overflow capacity — runs
              under the same shipment visibility: live location, ETA,
              temperature where it matters, and documents in one place.
            </motion.p>

            <ul className="mt-10 max-w-[26rem]">
              {[
                "Live GPS location on every active shipment",
                "ETA and appointment status in real time",
                "Reefer temperature monitoring on cold-chain loads",
                "Rate confirmations, BOLs, and PODs in one place",
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.25 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-baseline gap-4 border-b border-line-dark/60 py-3.5 text-[0.9rem] text-white/75 first:border-t"
                >
                  <span className="index-num text-[0.7rem] text-blue-bright/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <DashboardPreview />
            </motion.div>

            <div className="mt-16">
              <RuleGrow tone="dark" />
              <div className="mt-10">
                <TrackingDemo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
