"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

/**
 * Branded, lightweight loading state. Server-rendered so it is present at
 * first paint, then fades out when the truck model is ready — or on a short
 * timeout so content is never held hostage by the 3D scene.
 */
export function ModelLoadingFallback() {
  const progress = useProgress((s) => s.progress);
  const [phase, setPhase] = useState<"visible" | "fading" | "gone">("visible");

  useEffect(() => {
    let started = false;
    let fadeTimer: number | undefined;

    const beginFade = () => {
      setPhase((p) => (p === "visible" ? "fading" : p));
      if (fadeTimer === undefined) {
        fadeTimer = window.setTimeout(() => setPhase("gone"), 700);
      }
    };

    // React to the GLB loader starting/finishing.
    const unsubscribe = useProgress.subscribe((state) => {
      if (state.active) started = true;
      else if (started) beginFade();
    });
    // Nothing started loading (no WebGL / reduced motion / error) — don't wait.
    const idleTimer = window.setTimeout(() => {
      if (!started) beginFade();
    }, 1100);
    // Hard cap: never block the page on the model.
    const capTimer = window.setTimeout(beginFade, 3500);

    return () => {
      unsubscribe();
      window.clearTimeout(idleTimer);
      window.clearTimeout(capTimer);
      if (fadeTimer !== undefined) window.clearTimeout(fadeTimer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      data-loading-overlay
      className={`fixed inset-0 z-[70] flex flex-col items-center justify-center gap-6 bg-navy transition-opacity duration-700 ease-out ${
        phase === "fading" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <p className="font-display text-xl font-extrabold tracking-tight text-white">
        Ship Smart <span className="font-medium opacity-70">Solutions</span>
      </p>
      <div className="relative h-0.5 w-44 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-blue-bright transition-[width] duration-300 ease-out"
          style={{ width: `${Math.max(progress, 12)}%` }}
        />
        <div
          className="absolute inset-y-0 w-1/3 bg-white/25"
          style={{ animation: "loader-sheen 1.1s ease-in-out infinite" }}
        />
      </div>
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.25em] text-white/40">
        Asset-based trucking &amp; logistics
      </p>
    </div>
  );
}
