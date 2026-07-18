"use client";

import { motion } from "motion/react";
import { MaskLines, RuleGrow } from "@/components/ui/MaskReveal";

const previews = [
  {
    n: "01",
    mode: "Reefer · Cold chain",
    title: "Cold-chain reliability for temperature-critical product",
    body: "Maintaining verified set points and appointment discipline across a multi-state grocery distribution network.",
  },
  {
    n: "02",
    mode: "Dry van · Dedicated",
    title: "Peak-season capacity when routing guides failed",
    body: "Committed company equipment holding contracted rates through a retail peak while spot capacity disappeared.",
  },
  {
    n: "03",
    mode: "Heavy haul · Project",
    title: "Oversized project freight, planned end to end",
    body: "Permits, route surveys, and multi-axle equipment coordinated for over-dimensional industrial machinery.",
  },
] as const;

export function CaseStudies() {
  return (
    <section
      aria-labelledby="case-studies-heading"
      className="bg-white py-28 text-ink lg:py-40"
    >
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-blue">Track Record</p>
            <h2
              id="case-studies-heading"
              className="display mt-6 text-[clamp(2.2rem,4.4vw,4.2rem)] text-ink"
            >
              <MaskLines lines={["Proven results across", "freight modes"]} />
            </h2>
          </div>
          <p className="max-w-[24rem] pb-2 text-[0.9rem] leading-relaxed text-muted">
            Documented outcomes are being prepared with client approval — the
            work below is representative of the freight we run every week.
          </p>
        </div>

        <div className="mt-16">
          {previews.map((p, i) => (
            <div key={p.n}>
              <RuleGrow delay={i * 0.06} />
              <motion.article
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="grid gap-x-8 gap-y-3 py-8 lg:grid-cols-12 lg:items-baseline lg:py-9"
              >
                <span className="label text-[0.62rem]! text-muted lg:col-span-2">
                  {p.mode}
                </span>
                <div className="lg:col-span-7">
                  <h3 className="font-display text-[1.3rem] font-extrabold leading-snug tracking-tight lg:text-[1.5rem]">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 max-w-[36rem] text-[0.92rem] leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
                <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted/70 lg:col-span-3 lg:text-right">
                  Verified case study coming soon
                </p>
              </motion.article>
            </div>
          ))}
          <RuleGrow delay={0.2} />
        </div>
      </div>
    </section>
  );
}
