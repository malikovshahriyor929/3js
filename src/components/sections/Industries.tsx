"use client";

import { motion } from "motion/react";
import { industries } from "@/config/industries";
import { MaskLines, RuleGrow } from "@/components/ui/MaskReveal";

export function Industries() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="scroll-mt-20 bg-surface py-28 text-ink lg:py-44"
    >
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label text-blue">Who We Serve</p>
            <h2
              id="industries-heading"
              className="display mt-6 text-[clamp(2.2rem,4.4vw,4.2rem)] text-ink"
            >
              <MaskLines
                lines={["Built for the freight each", "industry actually moves"]}
              />
            </h2>
          </div>
          <div className="flex items-end lg:col-span-4 lg:col-start-9">
            <p className="max-w-[22rem] text-[0.92rem] leading-relaxed text-muted">
              Equipment, timing, and handling matched to the freight — not
              forced into a one-size-fits-all trailer.
            </p>
          </div>
        </div>

        {/* Spec-sheet column header */}
        <div className="mt-16 hidden grid-cols-12 gap-8 pb-3 lg:grid">
          <span className="label col-span-3 text-[0.62rem]! text-muted/70">
            Industry
          </span>
          <span className="label col-span-4 text-[0.62rem]! text-muted/70">
            Freight &amp; equipment
          </span>
          <span className="label col-span-2 text-[0.62rem]! text-muted/70">
            Timing &amp; handling
          </span>
          <span className="label col-span-3 text-[0.62rem]! text-muted/70">
            The asset-based difference
          </span>
        </div>

        <div className="max-lg:mt-12">
          {industries.map((ind, i) => (
            <div key={ind.id}>
              <RuleGrow delay={Math.min(i, 3) * 0.05} />
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="grid gap-x-8 gap-y-5 py-9 lg:grid-cols-12 lg:py-10"
              >
                <div className="lg:col-span-3">
                  <h3 className="display text-[1.6rem] text-ink lg:text-[1.85rem]">
                    {ind.name}
                  </h3>
                </div>

                <div className="lg:col-span-4">
                  <p className="text-[0.95rem] leading-relaxed text-ink/85">
                    {ind.freight}
                  </p>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
                    {ind.equipment}
                  </p>
                </div>

                <div className="lg:col-span-2">
                  <p className="text-[0.85rem] leading-relaxed text-muted">
                    {ind.timing}
                  </p>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
                    {ind.handling}
                  </p>
                </div>

                <div className="lg:col-span-3">
                  <p className="border-l-2 border-blue/60 pl-4 text-[0.88rem] leading-relaxed text-ink/75">
                    {ind.whyAssetBased}
                  </p>
                </div>
              </motion.article>
            </div>
          ))}
          <RuleGrow delay={0.2} />
        </div>
      </div>
    </section>
  );
}
