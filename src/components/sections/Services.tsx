"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { services } from "@/config/services";
import { MaskLines, RuleGrow } from "@/components/ui/MaskReveal";
import { TextLink } from "@/components/ui/Buttons";
import { setServiceSceneOffset } from "@/experience/sceneState";

function DesktopServices() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const service = services[active];

  const activate = (index: number) => {
    setActive(index);
    setServiceSceneOffset(services[index].scene);
  };

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next: number | null = null;
    if (e.key === "ArrowDown") next = (index + 1) % services.length;
    if (e.key === "ArrowUp") next = (index - 1 + services.length) % services.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = services.length - 1;
    if (next !== null) {
      e.preventDefault();
      activate(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div className="mt-16 grid grid-cols-12 gap-10">
      {/* Sticky active-service panel */}
      <div className="col-span-5">
        <div className="sticky top-32">
          <div
            role="tabpanel"
            id="service-panel"
            aria-labelledby={`service-tab-${service.id}`}
            className="relative min-h-[21rem]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  aria-hidden="true"
                  className="index-num block text-[clamp(4rem,6vw,6.5rem)] leading-none text-white/[0.07]"
                >
                  {service.index}
                </span>
                <p className="label mt-2 text-blue-bright">
                  {service.equipment}
                </p>
                <h3 className="display mt-5 text-[clamp(1.9rem,2.8vw,2.7rem)] text-white">
                  {service.title}
                </h3>
                <p className="mt-6 max-w-[26rem] text-[0.98rem] leading-relaxed text-muted-dark">
                  {service.description}
                </p>
                {service.id === "brokerage" && (
                  <p className="mt-5 max-w-[26rem] border-l border-white/15 pl-4 text-[0.85rem] leading-relaxed text-white/45">
                    Brokerage is supplementary at Ship Smart — overflow only,
                    never the primary plan for your freight.
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-8">
            <TextLink href="#quote">Quote this service</TextLink>
          </div>
        </div>
      </div>

      {/* Indexed service rail */}
      <div
        role="tablist"
        aria-label="Freight services"
        aria-orientation="vertical"
        className="col-span-6 col-start-7"
      >
        {services.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`service-tab-${s.id}`}
              aria-selected={selected}
              aria-controls="service-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => activate(i)}
              onMouseEnter={() => activate(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`group relative block w-full border-b border-line-dark/70 text-left transition-colors duration-300 first:border-t ${
                selected ? "text-white" : "text-white/35 hover:text-white/75"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-y-0 left-0 w-0.5 bg-blue transition-transform duration-300 origin-top ${
                  selected ? "scale-y-100" : "scale-y-0"
                }`}
              />
              <span className="flex items-baseline gap-6 py-5 pl-6 pr-2">
                <span
                  className={`index-num text-[0.8rem] transition-colors duration-300 ${
                    selected ? "text-blue-bright" : "text-white/25"
                  }`}
                >
                  {s.index}
                </span>
                <span className="font-display text-[1.35rem] font-extrabold tracking-tight lg:text-[1.5rem]">
                  {s.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MobileServices() {
  const [open, setOpen] = useState(0);

  return (
    <div className="mt-12">
      {services.map((s, i) => {
        const expanded = open === i;
        return (
          <div key={s.id} className="border-b border-line-dark/70 first:border-t">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`m-service-${s.id}`}
                onClick={() => setOpen(expanded ? -1 : i)}
                className="flex min-h-14 w-full items-baseline gap-4 py-4 text-left"
              >
                <span
                  className={`index-num text-[0.75rem] ${
                    expanded ? "text-blue-bright" : "text-white/30"
                  }`}
                >
                  {s.index}
                </span>
                <span
                  className={`flex-1 font-display text-[1.1rem] font-extrabold tracking-tight ${
                    expanded ? "text-white" : "text-white/60"
                  }`}
                >
                  {s.title}
                </span>
                <span
                  aria-hidden="true"
                  className={`text-lg leading-none transition-transform duration-300 ${
                    expanded ? "rotate-45 text-blue-bright" : "text-white/40"
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={`m-service-${s.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pl-9">
                    <p className="label text-blue-bright">{s.equipment}</p>
                    <p className="mt-3 text-[0.92rem] leading-relaxed text-muted-dark">
                      {s.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      data-truck-visible
      data-scene="services"
      aria-labelledby="services-heading"
      className="relative scroll-mt-20 py-28 lg:py-44"
    >
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-blue-bright">What We Move</p>
            <h2
              id="services-heading"
              className="display mt-6 text-[clamp(2.2rem,4.4vw,4.2rem)] text-white"
            >
              <MaskLines lines={["Freight services built", "around real capacity"]} />
            </h2>
          </div>
          <p className="max-w-[22rem] pb-2 text-[0.92rem] leading-relaxed text-muted-dark">
            Nine ways to put our equipment — and our accountability — behind
            your freight.
          </p>
        </div>
        <div className="mt-10">
          <RuleGrow tone="dark" />
        </div>

        <div className="hidden lg:block">
          <DesktopServices />
        </div>
        <div className="lg:hidden">
          <MobileServices />
        </div>
      </div>
    </section>
  );
}
