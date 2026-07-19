"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import {
  computeBase,
  sceneTargets,
  type SceneKeyframe,
  type SceneName,
} from "@/experience/sceneState";

/**
 * Composes the base scene state from scroll-chapter progress every frame,
 * then damps the live camera toward it, layering a subtle cursor parallax
 * on desktop. Reading mutable targets in useFrame keeps React completely
 * out of the per-frame path.
 */
export function CameraRig({
  keyframes,
  parallax,
  lambda = 3.4,
}: {
  keyframes: Record<SceneName, SceneKeyframe>;
  /** Enable cursor-based drift (desktop, motion allowed). */
  parallax: boolean;
  lambda?: number;
}) {
  const target = useRef(new Vector3());
  const pointer = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);

  useEffect(() => {
    if (!parallax) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [parallax]);

  useFrame(({ camera }, delta) => {
    const { base, service } = sceneTargets;
    computeBase(base, keyframes);
    const px = parallax ? pointer.current.x * 0.4 : 0;
    const py = parallax ? -pointer.current.y * 0.22 : 0;

    const cx = base.camX + service.camX + px;
    const cy = base.camY + service.camY + py;
    const cz = base.camZ;

    if (!initialized.current) {
      camera.position.set(cx, cy, cz);
      target.current.set(base.tgtX, base.tgtY, base.tgtZ);
      initialized.current = true;
    } else {
      camera.position.set(
        MathUtils.damp(camera.position.x, cx, lambda, delta),
        MathUtils.damp(camera.position.y, cy, lambda, delta),
        MathUtils.damp(camera.position.z, cz, lambda, delta)
      );
      target.current.set(
        MathUtils.damp(target.current.x, base.tgtX, lambda, delta),
        MathUtils.damp(target.current.y, base.tgtY, lambda, delta),
        MathUtils.damp(target.current.z, base.tgtZ, lambda, delta)
      );
    }
    camera.lookAt(target.current);
  });

  return null;
}
