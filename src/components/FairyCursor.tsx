import { useEffect, useRef, useState } from "react";

type P = { x: number; y: number; vx: number; vy: number; life: number; c: string; s: number };

export function FairyCursor() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const fairy = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"off" | "fine" | "touch" | "still">("off");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    setMode(fine ? (reduced ? "still" : "fine") : reduced ? "off" : "touch");
  }, []);

  useEffect(() => {
    if (mode === "off") return;
    const root = document.documentElement;
    if (mode === "fine" || mode === "still") root.style.cursor = "none";
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const css = getComputedStyle(root);
    const colors = ["--rose", "--baby", "--pearl", "--blush"].map((v) => css.getPropertyValue(v).trim());
    const ps: P[] = [];
    let raf = 0;
    const resize = () => {
      cv.width = innerWidth * devicePixelRatio;
      cv.height = innerHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    const spawn = (x: number, y: number, n: number, spread: number) => {
      for (let i = 0; i < n; i++)
        ps.push({ x, y, vx: (Math.random() - 0.5) * spread, vy: (Math.random() - 0.5) * spread + 0.4, life: 1, c: colors[(Math.random() * 4) | 0]!, s: 1 + Math.random() * 2.5 });
    };
    const star = (x: number, y: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y - r * 2);
      ctx.quadraticCurveTo(x, y, x + r * 2, y);
      ctx.quadraticCurveTo(x, y, x, y + r * 2);
      ctx.quadraticCurveTo(x, y, x - r * 2, y);
      ctx.quadraticCurveTo(x, y, x, y - r * 2);
      ctx.fill();
    };
    const loop = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i]!;
        p.x += p.vx; p.y += p.vy; p.life -= 0.02;
        if (p.life <= 0) { ps.splice(i, 1); continue; }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.c;
        ctx.shadowColor = p.c; ctx.shadowBlur = 6;
        star(p.x, p.y, p.s);
      }
      raf = ps.length ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const move = (e: PointerEvent) => {
      if (fairy.current) fairy.current.style.transform = `translate3d(${e.clientX - 6}px, ${e.clientY - 6}px, 0)`;
      if (mode === "fine" && e.pointerType === "mouse") { spawn(e.clientX, e.clientY + 6, 2, 1.2); kick(); }
    };
    const down = (e: PointerEvent) => {
      if (mode === "touch" && e.pointerType !== "mouse") { spawn(e.clientX, e.clientY, 18, 4); kick(); }
    };
    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerdown", down, { passive: true });
    addEventListener("resize", resize);
    return () => {
      root.style.cursor = "";
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      removeEventListener("pointerdown", down);
      removeEventListener("resize", resize);
    };
  }, [mode]);

  if (mode === "off") return null;
  return (
    <>
      <canvas ref={canvas} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] h-full w-full" />
      {(mode === "fine" || mode === "still") && (
        <div ref={fairy} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[101]" style={{ transform: "translate3d(-100px,-100px,0)" }}>
          <svg width="28" height="28" viewBox="0 0 28 28" className="drop-shadow-[0_0_6px_var(--rose)]">
            {mode === "fine" ? (
              <>
                <g className="animate-flap" style={{ transformOrigin: "10px 12px" }}>
                  <ellipse cx="5" cy="8" rx="5" ry="7" fill="var(--baby)" opacity=".75" />
                  <ellipse cx="15" cy="8" rx="5" ry="7" fill="var(--blush)" opacity=".75" />
                </g>
                <circle cx="10" cy="9" r="2" fill="var(--cream)" />
                <path d="M10 11l-2.5 7h5z" fill="var(--rose)" />
                <circle cx="6" cy="6" r="1.4" fill="var(--pearl)" />
              </>
            ) : (
              <path d="M8 0c.5 4 3 6.5 8 8-5 1.5-7.5 4-8 8-.5-4-3-6.5-8-8 5-1.5 7.5-4 8-8z" fill="var(--rose)" />
            )}
          </svg>
        </div>
      )}
    </>
  );
}
