"use client";

import { motion } from "motion/react";
import { MaskLines } from "@/components/ui/MaskReveal";
import { PrimaryButton, TextLink } from "@/components/ui/Buttons";

export function ClosingCTA() {
  return (
    <section
      data-truck-visible
      data-scene="closing"
      aria-labelledby="closing-heading"
      className="relative flex min-h-[92svh] items-end py-28 lg:items-center lg:py-36"
    >
      {/* Ground + readability treatment */}
      <div
        aria-hidden="true"
        className="hero-ground pointer-events-none absolute inset-x-0 bottom-0 h-[35%]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy via-navy/50 to-transparent lg:hidden"
      />

      <div className="container-x relative">
        <div className="max-w-3xl lg:ml-auto lg:text-right">
          <h2
            id="closing-heading"
            className="display text-[clamp(2.4rem,5vw,4.8rem)] text-white"
          >
            <MaskLines
              lines={[
                "Move your freight on",
                "trucks you can count on",
              ]}
            />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-[30rem] text-[1rem] leading-relaxed text-muted-dark lg:ml-auto"
          >
            Get committed capacity, real-time visibility, and one accountable
            team across reefer, dry van, open deck, dedicated transportation,
            and warehousing.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-7 lg:justify-end"
          >
            <PrimaryButton href="#quote">Get a Freight Quote</PrimaryButton>
            <TextLink href="#tracking">Track a Shipment</TextLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
