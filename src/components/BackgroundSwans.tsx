import { useRef } from "react";
import { useMotionSetting, useScrollProgress } from "@/hooks/useMotion";
import { Swan } from "./illustrations";

export function BackgroundSwans() {
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);
  const { mode } = useMotionSetting();
  useScrollProgress(left, mode === "full", { maxDrift: 20, parallaxSpeed: 0.2, trackPage: true });
  useScrollProgress(right, mode === "full", { maxDrift: 28, parallaxSpeed: 0.45, trackPage: true });

  return (
    <div className="background-swan-layer" aria-hidden="true">
      <div ref={left} className="background-swan background-swan-left swan-scroll-transform"><Swan variant="resting" /></div>
      <div ref={right} className="background-swan background-swan-right swan-scroll-transform"><Swan variant="resting" flip /></div>
    </div>
  );
}