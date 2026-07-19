import { gsap } from "@/animations/gsap";

/**
 * Shared mutable scene state.
 *
 * GSAP (scroll triggers, service interactions) writes TARGET values here;
 * the R3F frame loop reads them and damps the live camera/truck toward them.
 * Nothing in here triggers React renders — that is intentional.
 */

export type SceneKeyframe = {
  camX: number;
  camY: number;
  camZ: number;
  tgtX: number;
  tgtY: number;
  tgtZ: number;
  /** Truck yaw in radians (truck nose faces +Z at 0). */
  rotY: number;
  /** 0–1 headlight emissive amount. */
  headlights: number;
};

export type SceneName = "hero" | "why" | "services" | "technology" | "closing";

/** Truck is normalized to this length (world units) along Z, grounded at y=0. */
export const TRUCK_LENGTH = 9;

export const desktopKeyframes: Record<SceneName, SceneKeyframe> = {
  // Low front three-quarter — truck heavy in the lower-right field,
  // nose pushing slightly past the right edge of the frame.
  hero: {
    camX: 6.2, camY: 1.55, camZ: 8.4,
    tgtX: -3.7, tgtY: 1.95, tgtZ: 0.8,
    rotY: 0.34,
    headlights: 0.35,
  },
  // Small broadside study tucked low-left, beneath the editorial intro —
  // the truck aligns with content instead of running through it.
  why: {
    camX: 24, camY: 3.6, camZ: -2,
    tgtX: 0, tgtY: 5.3, tgtZ: -4.6,
    rotY: 0,
    headlights: 0.15,
  },
  // Compact elevated rear three-quarter on a low-left "stage" while the
  // service rail occupies the right column.
  services: {
    camX: 17, camY: 5.6, camZ: -14.5,
    tgtX: -2.0, tgtY: 3.9, tgtZ: -2.2,
    rotY: 0,
    headlights: 0.1,
  },
  // Truck becomes a small contextual object low-left; the dashboard leads.
  technology: {
    camX: 9.5, camY: 2.6, camZ: 14.5,
    tgtX: 7.0, tgtY: 2.6, tgtZ: 0,
    rotY: 0.42,
    headlights: 0.2,
  },
  // Closing copy sits right — front three-quarter holds the left field,
  // headlights up. Mirrors the hero without repeating it.
  closing: {
    camX: 5.8, camY: 1.45, camZ: 8.8,
    tgtX: 3.4, tgtY: 1.85, tgtZ: 0.7,
    rotY: 0.3,
    headlights: 1,
  },
};

/** Mobile: camera pulled back and centered, gentler lateral moves. */
export const mobileKeyframes: Record<SceneName, SceneKeyframe> = {
  hero: {
    camX: 5.4, camY: 2.1, camZ: 12.6,
    tgtX: 0, tgtY: 3.05, tgtZ: 0.4,
    rotY: 0.34,
    headlights: 0.35,
  },
  why: {
    camX: 17, camY: 2.8, camZ: 0,
    tgtX: 0, tgtY: 3.0, tgtZ: 0,
    rotY: 0,
    headlights: 0.15,
  },
  services: {
    camX: 14, camY: 5.0, camZ: -12.5,
    tgtX: 0, tgtY: 2.8, tgtZ: -0.5,
    rotY: 0,
    headlights: 0.1,
  },
  technology: {
    camX: 7.5, camY: 2.9, camZ: 15.5,
    tgtX: 2.2, tgtY: 2.4, tgtZ: 0,
    rotY: 0.42,
    headlights: 0.2,
  },
  closing: {
    camX: 5.2, camY: 1.7, camZ: 12.4,
    tgtX: 0, tgtY: 2.9, tgtZ: 0.4,
    rotY: 0.22,
    headlights: 1,
  },
};

export const sceneTargets = {
  /** Base camera/truck state — recomputed every frame from chapter progress. */
  base: { ...desktopKeyframes.hero },
  /** Additive nudge — owned by the Services interaction. */
  service: { rotY: 0, camX: 0, camY: 0 },
};

/**
 * Scroll progress (0–1) through each chapter's transition range, written by
 * ScrollTrigger. The frame loop blends keyframes from these values, which is
 * deterministic at any scroll position — unlike chained scrub tweens, which
 * depend on update order after large scroll jumps.
 */
export const CHAPTER_ORDER = ["why", "services", "technology", "closing"] as const;
export type ChapterName = (typeof CHAPTER_ORDER)[number];

export const chapterProgress: Record<ChapterName, number> = {
  why: 0,
  services: 0,
  technology: 0,
  closing: 0,
};

/** Hero entrance: 0 = raised/rotated intro pose, 1 = settled. */
export const entrance = { t: 1 };

const KEYS: (keyof SceneKeyframe)[] = [
  "camX", "camY", "camZ", "tgtX", "tgtY", "tgtZ", "rotY", "headlights",
];

export function computeBase(
  out: SceneKeyframe,
  kfs: Record<SceneName, SceneKeyframe>
) {
  Object.assign(out, kfs.hero);
  for (const name of CHAPTER_ORDER) {
    const p = chapterProgress[name];
    if (p <= 0) continue;
    const kf = kfs[name];
    for (const key of KEYS) {
      out[key] += (kf[key] - out[key]) * p;
    }
  }
  const settled = entrance.t;
  if (settled < 1) {
    const inv = 1 - settled;
    out.camX += 2.6 * inv;
    out.camY += 1.4 * inv;
    out.camZ += 5.5 * inv;
    out.rotY -= 0.55 * inv;
    out.headlights *= settled;
  }
}

/**
 * Called when the active service changes. Additive channel, so it never
 * fights the scroll-scrubbed base values.
 */
export function setServiceSceneOffset(offset: {
  rotY: number;
  camX: number;
  camY: number;
}) {
  gsap.to(sceneTargets.service, {
    ...offset,
    duration: 1.2,
    ease: "power3.out",
    overwrite: true,
  });
}

