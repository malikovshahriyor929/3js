"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import {
  chapterProgress,
  entrance,
  type ChapterName,
} from "@/experience/sceneState";

/**
 * The scroll-driven truck journey.
 *
 * Each chapter's ScrollTrigger only records its transition progress; the
 * R3F frame loop (CameraRig) blends keyframes from those values and damps
 * the live camera toward the result. No React state per scroll tick.
 */

type Chapter = {
  scene: ChapterName;
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

export function ScrollSceneController({ modelReady }: { modelReady: boolean }) {
  useEffect(() => {
    const triggers = chapters.map((chapter) =>
      ScrollTrigger.create({
        trigger: chapter.trigger,
        start: chapter.start,
        end: chapter.end,
        onUpdate: (self) => {
          chapterProgress[chapter.scene] = self.progress;
        },
        onRefresh: (self) => {
          chapterProgress[chapter.scene] = self.progress;
        },
      })
    );

    // Fonts/images can shift layout after mount.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // Cinematic entrance once the model is ready (skipped if already scrolled).
  useEffect(() => {
    if (!modelReady) return;
    if (window.scrollY > window.innerHeight * 0.4) {
      entrance.t = 1;
      return;
    }
    entrance.t = 0;
    const tween = gsap.to(entrance, {
      t: 1,
      duration: 2.0,
      ease: "expo.out",
      delay: 0.15,
    });
    return () => {
      tween.kill();
      entrance.t = 1;
    };
  }, [modelReady]);

  return null;
}
