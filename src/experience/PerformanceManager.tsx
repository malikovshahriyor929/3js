"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useCallback } from "react";

/**
 * Steps device pixel ratio down when frame rate suffers (and back up when
 * headroom returns), within the bounds chosen for the device class.
 */
export function PerformanceManager({ maxDpr }: { maxDpr: number }) {
  const setDpr = useThree((s) => s.setDpr);

  const onIncline = useCallback(() => {
    setDpr(Math.min(window.devicePixelRatio, maxDpr));
  }, [setDpr, maxDpr]);

  const onDecline = useCallback(() => {
    setDpr(Math.max(1, Math.min(window.devicePixelRatio, maxDpr) - 0.5));
  }, [setDpr, maxDpr]);

  return (
    <PerformanceMonitor
      onIncline={onIncline}
      onDecline={onDecline}
      flipflops={2}
    />
  );
}
