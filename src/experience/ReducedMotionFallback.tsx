/**
 * Static poster backdrop — shown when WebGL is unavailable or the truck
 * model fails to load. Purely decorative (gradient + horizon), it never
 * pretends to be the interactive 3D scene; all real content is HTML.
 */
export function StaticBackdrop() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none">
      <div className="scene-glow absolute inset-0" />
      {/* Subtle road horizon */}
      <div className="absolute inset-x-0 bottom-[22%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-x-[12%] bottom-[14%] h-px bg-gradient-to-r from-transparent via-blue-bright/20 to-transparent" />
    </div>
  );
}
