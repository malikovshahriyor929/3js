"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraRig } from "@/experience/CameraRig";
import { SceneLighting } from "@/experience/SceneLighting";
import { TruckModel } from "@/experience/TruckModel";
import { PerformanceManager } from "@/experience/PerformanceManager";
import { ScrollSceneController } from "@/experience/ScrollSceneController";
import {
  desktopKeyframes,
  mobileKeyframes,
} from "@/experience/sceneState";
import { useMediaQuery } from "@/lib/useMediaQuery";

function ModelReadySignal({ onReady }: { onReady: () => void }) {
  // Mounts only once Suspense resolves — i.e. the GLB finished loading.
  useEffect(() => {
    const id = requestAnimationFrame(onReady);
    return () => cancelAnimationFrame(id);
  }, [onReady]);
  return null;
}

export default function TruckExperience({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const finePointer = useMediaQuery("(pointer: fine)");
  const [modelReady, setModelReady] = useState(false);
  const [sceneInView, setSceneInView] = useState(true);

  // Pause rendering entirely while solid sections cover the canvas.
  useEffect(() => {
    const sections = document.querySelectorAll("[data-truck-visible]");
    if (sections.length === 0) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setSceneInView(visible.size > 0);
      },
      { rootMargin: "10% 0px 10% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const frameloop = useMemo(() => {
    if (reducedMotion) return "demand" as const;
    return sceneInView ? ("always" as const) : ("demand" as const);
  }, [reducedMotion, sceneInView]);

  const keyframes = isMobile ? mobileKeyframes : desktopKeyframes;
  const initialCam = desktopKeyframes.hero;

  return (
    <>
      <Canvas
        frameloop={frameloop}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{
          fov: 34,
          near: 0.5,
          far: 90,
          position: [initialCam.camX, initialCam.camY, initialCam.camZ],
        }}
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <SceneLighting quality={isMobile ? "low" : "high"} />
        <CameraRig
          keyframes={keyframes}
          parallax={!reducedMotion && !isMobile && finePointer}
          lambda={reducedMotion ? 1000 : 3.4}
        />
        <PerformanceManager maxDpr={isMobile ? 1.5 : 2} />
        <Suspense fallback={null}>
          <TruckModel />
          <ModelReadySignal onReady={() => setModelReady(true)} />
        </Suspense>
      </Canvas>

      {!reducedMotion && <ScrollSceneController modelReady={modelReady} />}
    </>
  );
}
