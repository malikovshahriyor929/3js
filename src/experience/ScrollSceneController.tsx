"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import {
  desktopKeyframes,
  mobileKeyframes,
  sceneTargets,
  type SceneKeyframe,
  type SceneName,
} from "@/experience/sceneState";

/**
 * The scroll-driven truck journey.
 *
 * Each homepage chapter scrubs the shared scene targets toward its keyframe
 * as it enters the viewport; the frame loop (CameraRig/TruckModel) applies
 * damping. Runs entirely outside React's render path after setup.
 */

type Chapter = {
  scene: SceneName;
  trigger: string;
  start: string;
  end: string;
};

const chapters: Chapter[] = [
  { scene: "why", trigger: "#why-ship-smart", start: "top 90%", end: "top 25%" },
  { scene: "services", trigger: "#services", start: "top 85%", end: "top 15%" },
  { scene: "technology", trigger: "#technology", start: "top 90%", end: "top 25%" },
  { scene: "closing", trigger: "[data-scene='closing']", start: "top 95%", end: "top 30%" },
];

export function ScrollSceneController({
  isMobile,
  modelReady,
}: {
  isMobile: boolean;
  modelReady: boolean;
}) {
  // Scroll choreography — rebuilt if the breakpoint changes.
  useEffect(() => {
    const keyframes = isMobile ? mobileKeyframes : desktopKeyframes;

    const ctx = gsap.context(() => {
      for (const chapter of chapters) {
        const kf: SceneKeyframe = keyframes[chapter.scene];
        gsap.to(sceneTargets.base, {
          ...kf,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: chapter.trigger,
            start: chapter.start,
            end: chapter.end,
            scrub: 0.6,
          },
        });
      }
    });

    // Fonts/images can shift layout after mount.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [isMobile]);

  // Cinematic entrance once the model is ready (skipped if already scrolled).
  useEffect(() => {
    if (!modelReady) return;
    if (window.scrollY > window.innerHeight * 0.4) return;

    const keyframes = isMobile ? mobileKeyframes : desktopKeyframes;
    const hero = keyframes.hero;

    const from = {
      camX: hero.camX + 2.6,
      camY: hero.camY + 1.4,
      camZ: hero.camZ + 5.5,
      rotY: hero.rotY - 0.55,
      headlights: 0,
    };
    Object.assign(sceneTargets.base, from);

    const tween = gsap.to(sceneTargets.base, {
      camX: hero.camX,
      camY: hero.camY,
      camZ: hero.camZ,
      rotY: hero.rotY,
      headlights: hero.headlights,
      duration: 2.0,
      ease: "expo.out",
      delay: 0.15,
    });
    return () => {
      tween.kill();
    };
    // Entrance should only run once per load — breakpoint at load time is fine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelReady]);

  return null;
}
