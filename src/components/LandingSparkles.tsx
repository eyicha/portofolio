import { useEffect, useState, type CSSProperties } from "react";
import { useMotionSetting } from "@/hooks/useMotion";

const points = [
  [2, 5], [12, 14], [21, 7], [33, 18], [47, 9], [59, 15], [71, 5], [84, 12], [97, 7],
  [5, 31], [17, 42], [28, 34], [40, 49], [54, 37], [66, 47], [79, 33], [92, 42],
  [3, 63], [14, 76], [26, 65], [37, 83], [49, 68], [62, 78], [74, 63], [87, 74], [98, 62],
  [8, 94], [20, 88], [32, 97], [45, 89], [58, 95], [70, 86], [82, 96], [94, 89],
] as const;

const colors = ["var(--pearl)", "var(--blush)", "var(--foil-light)"] as const;

export function LandingSparkles({ scene }: { scene: "opening" | "hero" }) {
  const { mode } = useMotionSetting();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  return (
    <div className={`landing-sparkles landing-sparkles-${scene}`} aria-hidden="true" data-motion={mode} data-visible={visible}>
      {points.map(([left, top], index) => {
        const style = {
          left: `${left}%`,
          top: `${top}%`,
          "--sparkle-size": `${3 + index % 7}px`,
          "--sparkle-color": colors[index % colors.length],
          "--sparkle-duration": `${2.5 + (index % 6) * 0.5}s`,
          "--sparkle-delay": `${-((index * 7) % 50) / 10}s`,
          "--sparkle-drift": `${10 + (index * 7) % 21}px`,
          "--sparkle-half-drift": `${(10 + (index * 7) % 21) / 2}px`,
          "--sparkle-peak": `${0.5 + (index % 5) / 10}`,
        } as CSSProperties;

        return <span key={index} className={`landing-sparkle${index % 6 === 0 ? " landing-sparkle-dust" : ""}`} style={style} />;
      })}
    </div>
  );
}