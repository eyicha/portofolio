import { useEffect, useRef } from "react";
import { Cloud, Swan } from "./ornaments";

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
        const r = el.parentElement!.getBoundingClientRect();
        const p = (window.innerHeight - r.top) / (window.innerHeight + r.height);
        const x = (flip ? 1 - p : p) * 90 - 10;
        el.style.transform = `translate3d(${x}vw, ${Math.sin(p * 6) * 8}px, 0) scaleX(${flip ? -1 : 1})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [swan, flip]);

  return (
    <div aria-hidden="true" className="pointer-events-none relative h-24 overflow-hidden md:h-32">
      <Cloud className="absolute bottom-0 h-16 w-[140%] -translate-x-[10%] opacity-70" />
      <Cloud className="absolute bottom-0 h-10 w-full" />
      {swan && (
        <div ref={ref} className="absolute bottom-6 left-0 w-20 will-change-transform md:w-28">
          <Swan id={id} className="w-full drop-shadow-[0_6px_10px_var(--blush)]" />
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
