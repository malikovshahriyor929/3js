"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  Box3,
  Color,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Vector3,
} from "three";
import { sceneTargets, TRUCK_LENGTH } from "@/experience/sceneState";

export const MODEL_PATH = "/models/ship-smart-truck.glb";

/*
 * Model: "semi truck" by zairiq-123 (Sketchfab, CC BY 4.0).
 * Measured GLB facts (see project docs):
 *   - root "Sketchfab_model" → "a3dsemi.3ds" → 23 meshes Object_2…Object_24
 *   - world bounds ≈ 88.7 × 132.4 × 523.0 units, length along Z, nose at +Z
 *   - real headlight meshes exist: materials "semiltr_sub" / "semiltf_sub"
 *   - no animations, 19 embedded PNG textures
 * We keep the original materials and correct scale/position from the
 * measured bounding box — never from guessed constants.
 */

const HEADLIGHT_MATERIALS = new Set(["semiltr_sub", "semiltf_sub"]);
const HEADLIGHT_COLOR = new Color("#d6e9ff");
const MAX_HEADLIGHT_INTENSITY = 2.4;

/** Module-level registry — imperative three.js state, outside React. */
const headlightRegistry: MeshStandardMaterial[] = [];

export function TruckModel() {
  const { scene } = useGLTF(MODEL_PATH);
  const group = useRef<Group>(null);

  const { position, scale } = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const s = TRUCK_LENGTH / size.z;
    return {
      // Center the footprint on the origin and rest the wheels on y=0.
      position: new Vector3(-center.x * s, -box.min.y * s, -center.z * s),
      scale: s,
    };
  }, [scene]);

  // Imperative material setup happens post-render, never during it.
  useEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof Mesh) {
        const material = obj.material as MeshStandardMaterial;
        if (material?.name && HEADLIGHT_MATERIALS.has(material.name)) {
          material.emissive = HEADLIGHT_COLOR.clone();
          material.emissiveIntensity = 0;
          if (!headlightRegistry.includes(material)) {
            headlightRegistry.push(material);
          }
        }
      }
    });
    return () => {
      headlightRegistry.length = 0;
    };
  }, [scene]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetRot = sceneTargets.base.rotY + sceneTargets.service.rotY;
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      targetRot,
      3.2,
      delta
    );
    const targetGlow =
      sceneTargets.base.headlights * MAX_HEADLIGHT_INTENSITY;
    for (const mat of headlightRegistry) {
      mat.emissiveIntensity = MathUtils.damp(
        mat.emissiveIntensity,
        targetGlow,
        2.6,
        delta
      );
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} position={position} scale={scale} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
