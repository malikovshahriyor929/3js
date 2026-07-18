"use client";

import { motion } from "motion/react";
import { MaskLines } from "@/components/ui/MaskReveal";
import {
  MAP_W,
  MAP_H,
  US_OUTLINE,
  STATE_BORDERS,
  CITIES,
} from "@/lib/usMapData";

const HUB = CITIES.naperville;

type Route = { to: keyof typeof CITIES; regional?: boolean };

/** Representative lanes only — illustrative, not guaranteed routes. */
const routes: Route[] = [
  { to: "minneapolis", regional: true },
  { to: "kansasCity", regional: true },
  { to: "columbus", regional: true },
  { to: "seattle" },
  { to: "losAngeles" },
  { to: "dallas" },
  { to: "atlanta" },
  { to: "newYork" },
];

const cityLabels: Partial<Record<keyof typeof CITIES, [string, number, number]>> =
  {
    seattle: ["Seattle", 8, -8],
    losAngeles: ["Los Angeles", 10, 16],
    dallas: ["Dallas", 10, 14],
    atlanta: ["Atlanta", 12, 12],
    newYork: ["New York", 10, -6],
  };

const regionLabels: [string, number, number][] = [
  ["West", 170, 200],
  ["Midwest", 520, 250],
  ["South", 600, 460],
  ["East", 800, 290],
];

function routePath(
  [x1, y1]: readonly [number, number],
  [x2, y2]: readonly [number, number]
) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const lift = Math.min(dist * 0.16, 60);
  return `M ${x1} ${y1} Q ${mx} ${my - lift} ${x2} ${y2}`;
}

export function Coverage() {
  return (
    <section
      id="coverage"
      aria-labelledby="coverage-heading"
      className="scroll-mt-20 overflow-hidden bg-navy-deep py-28 lg:py-40"
    >
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label text-blue-bright">Coverage</p>
            <h2
              id="coverage-heading"
              className="display mt-6 text-[clamp(2.2rem,4.4vw,4.2rem)] text-white"
            >
              <MaskLines lines={["48-state coverage", "from a Midwest hub"]} />
            </h2>
          </div>
          <div className="flex items-end lg:col-span-4 lg:col-start-9">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[24rem] text-[0.92rem] leading-relaxed text-muted-dark"
            >
              From Naperville, Illinois, Ship Smart Solutions supports
              coast-to-coast and regional freight with efficient access to
              Midwest, East Coast, Southern, and West Coast lanes.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Full-bleed map */}
      <div className="relative mx-auto mt-16 w-full max-w-[110rem] px-2 sm:px-8 lg:mt-20">
        <svg
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          className="h-auto w-full"
          role="img"
          aria-label="Map of the contiguous United States showing representative freight lanes radiating from the Naperville, Illinois hub to cities nationwide"
        >
          <path
            d={US_OUTLINE}
            fill="#0c1a2c"
            stroke="rgba(45,156,255,0.22)"
            strokeWidth="1"
          />
          <path
            d={STATE_BORDERS}
            fill="none"
            stroke="rgba(255,255,255,0.045)"
            strokeWidth="0.8"
          />

          {/* Region labels */}
          {regionLabels.map(([label, x, y]) => (
            <text
              key={label}
              x={x}
              y={y}
              fontSize="11"
              letterSpacing="3"
              fill="rgba(255,255,255,0.18)"
              fontFamily="var(--font-inter)"
              fontWeight="600"
              style={{ textTransform: "uppercase" }}
            >
              {label.toUpperCase()}
            </text>
          ))}

          {/* Routes */}
          <g fill="none" strokeLinecap="round">
            {routes.map((route, i) => (
              <motion.path
                key={route.to}
                d={routePath(HUB, CITIES[route.to])}
                stroke={
                  route.regional
                    ? "rgba(45,156,255,0.9)"
                    : "rgba(11,99,246,0.5)"
                }
                strokeWidth={route.regional ? 1.8 : 1.3}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 1.3,
                  delay: 0.3 + i * 0.09,
                  ease: [0.65, 0, 0.35, 1],
                }}
              />
            ))}
          </g>

          {/* Destination dots */}
          {routes.map((route, i) => {
            const [cx, cy] = CITIES[route.to];
            return (
              <motion.circle
                key={`dot-${route.to}`}
                cx={cx}
                cy={cy}
                r={3}
                fill="#2d9cff"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.9, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.4, delay: 1.2 + i * 0.09 }}
              />
            );
          })}

          {/* City labels */}
          {Object.entries(cityLabels).map(([key, value]) => {
            if (!value) return null;
            const [label, ox, oy] = value;
            const [cx, cy] = CITIES[key];
            return (
              <text
                key={key}
                x={cx + ox}
                y={cy + oy}
                fontSize="12"
                fill="rgba(255,255,255,0.4)"
                fontFamily="var(--font-inter)"
              >
                {label}
              </text>
            );
          })}

          {/* Hub */}
          <g>
            <circle
              cx={HUB[0]}
              cy={HUB[1]}
              r={14}
              fill="rgba(11,99,246,0.16)"
              className="motion-safe:animate-pulse"
            />
            <circle cx={HUB[0]} cy={HUB[1]} r={5.5} fill="#0b63f6" />
            <circle cx={HUB[0]} cy={HUB[1]} r={2.2} fill="#fff" />
            <text
              x={HUB[0] + 16}
              y={HUB[1] - 12}
              fontSize="13"
              fontWeight="700"
              fill="#fff"
              fontFamily="var(--font-inter)"
            >
              Naperville, IL — HQ
            </text>
          </g>
        </svg>

        <p className="mt-8 text-[0.72rem] text-white/30 sm:text-right">
          Representative lanes shown for illustration. Alaska and Hawaii are
          outside standard truckload coverage.
        </p>
      </div>
    </section>
  );
}
