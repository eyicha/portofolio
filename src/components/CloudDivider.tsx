import { useEffect, useRef } from "react";
import { Cloud, Swan, Sparkle } from "./illustrations";

export function CloudDivider({ swan = false, flip = false, id = "a" }: { swan?: boolean; flip?: boolean; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!swan || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const parent = el.parentElement;
        if (!parent) return;
        const r = parent.getBoundingClientRect();
        const p = (window.innerHeight - r.top) / (window.innerHeight + r.height);
        el.style.transform = `translateX(-50%) translateY(${Math.sin(p * 6) * 6}px)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, [swan, flip]);

  return (
    <div aria-hidden="true" className="pointer-events-none cloud-divider relative h-32 overflow-hidden md:h-32">
      <Cloud className="absolute bottom-0 h-16 w-[140%] -translate-x-[10%] opacity-70" />
      <Cloud className="absolute bottom-0 h-10 w-full" />
      {swan && (
        <div ref={ref} className="absolute divider-swan will-change-transform">
          <Sparkle className="swan-trail" animate />
          <Swan flip={flip} variant={id === "b" ? "resting" : undefined} className="w-full" />
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
