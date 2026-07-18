"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faqItems } from "@/config/faq";
import { MaskLines } from "@/components/ui/MaskReveal";

export function FAQ() {
  const [open, setOpen] = useState<string | null>(faqItems[0].id);

  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-surface pb-32 pt-4 text-ink lg:pb-44"
    >
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="label text-blue">Questions</p>
            <h2
              id="faq-heading"
              className="display mt-6 text-[clamp(2.2rem,4vw,3.6rem)] text-ink"
            >
              <MaskLines lines={["Freight shipping", "FAQs"]} />
            </h2>
            <p className="mt-6 max-w-[20rem] text-[0.92rem] leading-relaxed text-muted">
              Straight answers about how an asset-based carrier works — and how
              your freight actually moves.
            </p>
          </div>
        </div>

        <div className="border-t border-line lg:col-span-8">
          {faqItems.map((item) => {
            const expanded = open === item.id;
            return (
              <div key={item.id} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${item.id}`}
                    aria-expanded={expanded}
                    aria-controls={`faq-panel-${item.id}`}
                    onClick={() => setOpen(expanded ? null : item.id)}
                    className="group flex min-h-12 w-full items-baseline justify-between gap-6 py-6 text-left transition-colors hover:text-blue"
                  >
                    <span className="font-display text-[1.05rem] font-bold tracking-tight lg:text-[1.2rem]">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`relative block size-4 shrink-0 self-center transition-transform duration-300 ${
                        expanded ? "rotate-45" : ""
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 ${
                          expanded ? "bg-blue" : "bg-ink/50 group-hover:bg-blue"
                        }`}
                      />
                      <span
                        className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 ${
                          expanded ? "bg-blue" : "bg-ink/50 group-hover:bg-blue"
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-button-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[42rem] pb-7 text-[0.95rem] leading-relaxed text-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
