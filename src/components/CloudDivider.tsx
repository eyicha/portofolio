import { useEffect, useRef, useState } from "react";
import { Petals, Swan, Sparkle } from "./illustrations";

export function CloudDivider({ swan = true, flip, id = "a" }: { swan?: boolean; flip?: boolean; id?: string }) {
  const divider = useRef<HTMLDivElement>(null);
  const [dividerIndex, setDividerIndex] = useState(0);
  useEffect(() => {
    const element = divider.current;
    if (!element?.parentElement) return;
    const dividers = Array.from(element.parentElement.querySelectorAll<HTMLElement>(":scope > .cloud-divider"));
    setDividerIndex(dividers.indexOf(element));
  }, []);
  const facingRight = flip ?? dividerIndex % 2 === 1;

  return (
    <div ref={divider} aria-hidden="true" className="pointer-events-none cloud-divider relative h-32 md:h-32">
      <div className="divider-pink-wash" />
      {[0, 1, 2, 3].map((index) => <Petals key={index} className={`divider-falling-petal divider-falling-petal-${index}`} variant={index % 2 ? "curl" : "round"} />)}
      {swan && (
        <div className="absolute divider-swan">
          <span className="divider-swan-wake" aria-hidden="true"><i /><i /><i /></span>
          <Sparkle className="swan-trail" animate />
          <Swan flip={facingRight} variant={dividerIndex % 2 === 1 || id === "b" ? "resting" : undefined} className="w-full" />
        </div>
      )}
    </div>
  );
}

export function Dust() {
  const dots = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden motion-reduce:hidden">
      {dots.map((i) => (
        <span
          key={i}
          className="animate-dust absolute h-1 w-1 rounded-full bg-pearl glow"
          style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%`, animationDelay: `${(i * 0.7) % 9}s` }}
        />
      ))}
    </div>
  );
}
