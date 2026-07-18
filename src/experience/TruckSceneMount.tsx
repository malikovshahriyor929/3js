"use client";

import dynamic from "next/dynamic";
import { Component, useSyncExternalStore, type ReactNode } from "react";
import { StaticBackdrop } from "@/experience/ReducedMotionFallback";
import { ModelLoadingFallback } from "@/experience/ModelLoadingFallback";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const TruckExperience = dynamic(
  () => import("@/experience/TruckExperience"),
  { ssr: false }
);

/** Catches WebGL/context/model failures — page continues on the poster. */
class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.error("3D scene failed — continuing with static backdrop.", error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

let webglCache: boolean | null = null;

function detectWebGL(): boolean {
  if (webglCache !== null) return webglCache;
  try {
    const canvas = document.createElement("canvas");
    webglCache = Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    webglCache = false;
  }
  return webglCache;
}

const noopSubscribe = () => () => {};

/**
 * The single persistent WebGL layer, fixed behind all homepage content.
 * Decorative only (aria-hidden) — every fact shown in 3D also exists as HTML.
 */
export function TruckSceneMount() {
  // false during SSR/hydration, real detection result on the client.
  const webglSupported = useSyncExternalStore(
    noopSubscribe,
    detectWebGL,
    () => false
  );
  const reducedMotion = usePrefersReducedMotion();

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        {/* Gradient glow renders at first paint and stays behind the canvas */}
        <StaticBackdrop />
        {webglSupported && (
          <SceneErrorBoundary>
            <TruckExperience reducedMotion={reducedMotion} />
          </SceneErrorBoundary>
        )}
      </div>
      <ModelLoadingFallback />
    </>
  );
}
