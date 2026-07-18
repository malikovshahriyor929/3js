"use client";

import { motion } from "motion/react";
import { MaskLines } from "@/components/ui/MaskReveal";
import { PrimaryButton, GhostButton } from "@/components/ui/Buttons";

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function Hero() {
  return (
    <section
      id="top"
      data-truck-visible
      data-scene="hero"
      className="relative flex min-h-[100svh] flex-col justify-end pb-24 pt-32 sm:justify-center sm:pb-0 sm:pt-0"
    >
      {/* Ground plane hint anchoring the truck */}
      <div
        aria-hidden="true"
        className="hero-ground pointer-events-none absolute inset-x-0 bottom-0 h-[30%]"
      />
      {/* Mobile readability scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-navy via-navy/65 to-transparent sm:hidden"
      />

      <div className="container-x relative">
        <div className="max-w-4xl">
          <motion.h1 {...enter(0.35)} className="label text-blue-bright">
            Asset-Based Trucking Company and Nationwide Logistics Services
          </motion.h1>

          <p className="display-hero mt-7 text-[clamp(2.7rem,6.2vw,6.4rem)] text-white">
            <span aria-hidden="true">
              <MaskLines
                delay={0.45}
                lines={[
                  "Freight moved on",
                  "our own trucks —",
                  <span key="l3" className="text-white/40">
                    not passed down
                  </span>,
                  <span key="l4" className="text-white/40">
                    a broker chain.
                  </span>,
                ]}
              />
            </span>
            <span className="sr-only">
              Freight moved on our own trucks — not passed down a broker chain.
            </span>
          </p>

          <motion.p
            {...enter(0.85)}
            className="mt-8 max-w-[26rem] text-[1rem] leading-relaxed text-muted-dark sm:max-w-[30rem]"
          >
            Committed capacity, direct accountability, and service that holds
            when the market tightens — from Naperville, Illinois to all 48
            states, on equipment we own and operate.
          </motion.p>

          <motion.div
            {...enter(1.0)}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <PrimaryButton href="#quote">Get a Freight Quote</PrimaryButton>
            <GhostButton href="#tracking">Track a Shipment</GhostButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.7 }}
        aria-hidden="true"
        className="absolute bottom-7 left-5 hidden items-center gap-3 sm:flex lg:left-16"
      >
        <span className="relative h-9 w-px overflow-hidden bg-white/15">
          <span
            className="absolute inset-x-0 top-0 h-3 bg-blue-bright"
            style={{ animation: "scroll-cue 2.2s ease-in-out infinite" }}
          />
        </span>
        <span className="label text-white/40">Scroll</span>
      </motion.div>
    </section>
  );
}
