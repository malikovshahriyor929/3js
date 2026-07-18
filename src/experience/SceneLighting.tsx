"use client";

import { ContactShadows, Environment, Lightformer } from "@react-three/drei";

/**
 * Soft studio-style lighting built procedurally (no HDR downloads):
 * key + rim directionals, hemisphere fill, and a Lightformer environment
 * for realistic paint/glass response. Restrained contact shadows ground
 * the truck without a full shadow-map pass.
 */
export function SceneLighting({ quality }: { quality: "high" | "low" }) {
  return (
    <>
      <hemisphereLight args={["#cfe0f4", "#0b1728", 0.55]} />
      <directionalLight
        position={[7, 11, 8]}
        intensity={2.1}
        color="#ffffff"
      />
      <directionalLight
        position={[-9, 5, -7]}
        intensity={0.8}
        color="#9cc4ff"
      />
      <directionalLight position={[0, 6, -12]} intensity={0.5} color="#6ea8e8" />

      <Environment resolution={quality === "high" ? 128 : 64} frames={1}>
        {/* Overhead softbox */}
        <Lightformer
          intensity={1.6}
          rotation-x={Math.PI / 2}
          position={[0, 6, 0]}
          scale={[12, 12, 1]}
          color="#e8f1fb"
        />
        {/* Long side strips for paint highlights */}
        <Lightformer
          intensity={1.1}
          rotation-y={Math.PI / 2}
          position={[-8, 2.5, 0]}
          scale={[14, 2.2, 1]}
          color="#dbeaff"
        />
        <Lightformer
          intensity={0.9}
          rotation-y={-Math.PI / 2}
          position={[8, 3, 0]}
          scale={[14, 2.6, 1]}
          color="#cfe4ff"
        />
        {/* Cool floor bounce */}
        <Lightformer
          intensity={0.35}
          rotation-x={-Math.PI / 2}
          position={[0, -4, 0]}
          scale={[12, 12, 1]}
          color="#1c3a5e"
        />
      </Environment>

      <ContactShadows
        position={[0, 0.005, 0]}
        opacity={0.72}
        scale={16}
        blur={1.9}
        far={2.6}
        resolution={quality === "high" ? 512 : 256}
        color="#010912"
      />
    </>
  );
}
