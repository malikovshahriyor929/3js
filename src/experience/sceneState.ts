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
  // Full broadside — the "we own the equipment" study.
  why: {
    camX: 11.8, camY: 1.9, camZ: 1.6,
    tgtX: 0, tgtY: 1.25, tgtZ: 0,
    rotY: 0,
    headlights: 0.15,
  },
  // Elevated rear three-quarter — trailer prominent while services change.
  services: {
    camX: 8.6, camY: 3.8, camZ: -7.6,
    tgtX: 0.4, tgtY: 1.0, tgtZ: -0.4,
    rotY: 0,
    headlights: 0.1,
  },
  // Truck yields the frame to the tracking dashboard (sits left, smaller).
  technology: {
    camX: 8.4, camY: 2.4, camZ: 12.6,
    tgtX: 5.4, tgtY: 1.6, tgtZ: 0,
    rotY: 0.42,
    headlights: 0.2,
  },
  // Closing copy sits right — truck holds the left field, low and cinematic.
  closing: {
    camX: 4.6, camY: 1.3, camZ: 9.4,
    tgtX: 2.6, tgtY: 1.6, tgtZ: 0.3,
    rotY: -0.12,
    headlights: 1,
  },
};

/** Mobile: camera pulled back and centered, gentler lateral moves. */
export const mobileKeyframes: Record<SceneName, SceneKeyframe> = {
  hero: {
    camX: 5.4, camY: 2.2, camZ: 12.2,
    tgtX: 0, tgtY: 2.5, tgtZ: 0.4,
    rotY: 0.34,
    headlights: 0.35,
  },
  why: {
    camX: 12.6, camY: 2.2, camZ: 2.0,
    tgtX: 0, tgtY: 1.6, tgtZ: 0,
    rotY: 0,
    headlights: 0.15,
  },
  services: {
    camX: 8.8, camY: 4.4, camZ: -9.4,
    tgtX: 0, tgtY: 1.2, tgtZ: -0.4,
    rotY: 0,
    headlights: 0.1,
  },
  technology: {
    camX: 6.4, camY: 2.8, camZ: 14.2,
    tgtX: 1.6, tgtY: 1.8, tgtZ: 0,
    rotY: 0.42,
    headlights: 0.2,
  },
  closing: {
    camX: 5.2, camY: 1.6, camZ: 12.0,
    tgtX: 0, tgtY: 2.3, tgtZ: 0.4,
    rotY: 0.22,
    headlights: 1,
  },
};

export const sceneTargets = {
  /** Base camera/truck state — owned by the scroll timeline. */
  base: { ...desktopKeyframes.hero },
  /** Additive nudge — owned by the Services interaction. */
  service: { rotY: 0, camX: 0, camY: 0 },
};

export function applyKeyframes(kf: Record<SceneName, SceneKeyframe>) {
  Object.assign(sceneTargets.base, kf.hero);
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

export function resetServiceSceneOffset() {
  gsap.to(sceneTargets.service, {
    rotY: 0,
    camX: 0,
    camY: 0,
    duration: 0.9,
    ease: "power2.out",
    overwrite: true,
  });
}
