"use client";

import { motion } from "motion/react";
import { contentFlags } from "@/config/company";
import { MaskLines, RuleGrow } from "@/components/ui/MaskReveal";

/**
 * Verified testimonials only. Structure is production-ready; populate
 * `testimonials` with real, approved quotes and flip the config flag.
 * Never seed this with invented names, companies, or quotes.
 */
type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

const testimonials: Testimonial[] = [];

export function Testimonials() {
  if (!contentFlags.showTestimonials || testimonials.length === 0) {
    // Hidden until verified quotes exist — never ship placeholder voices.
    return null;
  }

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-surface py-28 text-ink lg:py-40"
    >
      <div className="container-x">
        <p className="label text-blue">Shipper Feedback</p>
        <h2
          id="testimonials-heading"
          className="display mt-6 text-[clamp(2.2rem,4.4vw,4.2rem)] text-ink"
        >
          <MaskLines lines={["What shippers say"]} />
        </h2>

        <div className="mt-14">
          {testimonials.map((t, i) => (
            <div key={t.name}>
              <RuleGrow delay={i * 0.06} />
              <motion.blockquote
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-6 py-10 lg:grid-cols-12"
              >
                <p className="font-display text-[1.3rem] font-bold leading-snug tracking-tight lg:col-span-8 lg:text-[1.6rem]">
                  “{t.quote}”
                </p>
                <footer className="self-end text-[0.85rem] lg:col-span-3 lg:col-start-10 lg:text-right">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-muted">
                    {t.role}, {t.company}
                  </p>
                </footer>
              </motion.blockquote>
            </div>
          ))}
          <RuleGrow delay={0.2} />
        </div>
      </div>
    </section>
  );
}
