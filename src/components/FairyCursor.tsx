import { useEffect, useRef, useState } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number };

export function FairyCursor() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const fairy = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(motion.matches);
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d");
    if (!element || !context) return;

    const root = document.documentElement;
    const colors = ["--rose", "--pearl", "--foil-light", "--blush"].map((token) => getComputedStyle(root).getPropertyValue(token).trim());
    const particles: Particle[] = [];
    const target = { x: -30, y: -30 };
    const position = { x: -30, y: -30 };
    let previous = { x: -30, y: -30 };
    let hasPointer = false;
    let frame = 0;
    let pageVisible = !document.hidden;
    let pixelRatio = 1;

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      element.width = Math.round(window.innerWidth * pixelRatio);
      element.height = Math.round(window.innerHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };
    const addParticles = (x: number, y: number, count: number, spread: number) => {
      for (let index = 0; index < count; index += 1) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * spread,
          vy: (Math.random() - 0.5) * spread + 0.25,
          life: 1,
          color: colors[Math.floor(Math.random() * colors.length)] || "#fff",
          size: 1 + Math.random() * 2,
        });
      }
      if (particles.length > 60) particles.splice(0, particles.length - 60);
    };
    const drawSparkle = (x: number, y: number, radius: number) => {
      context.beginPath();
      context.moveTo(x, y - radius * 2);
      context.quadraticCurveTo(x, y, x + radius * 2, y);
      context.quadraticCurveTo(x, y, x, y + radius * 2);
      context.quadraticCurveTo(x, y, x - radius * 2, y);
      context.quadraticCurveTo(x, y, x, y - radius * 2);
      context.fill();
    };
    const animate = () => {
      frame = 0;
      if (!pageVisible) return;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      let stillMoving = false;
      if (hasPointer && fairy.current) {
        position.x += (target.x - position.x) * 0.24;
        position.y += (target.y - position.y) * 0.24;
        stillMoving = Math.abs(target.x - position.x) > 0.2 || Math.abs(target.y - position.y) > 0.2;
        const deltaX = position.x - previous.x;
        const deltaY = position.y - previous.y;
        const angle = Math.max(-38, Math.min(38, Math.atan2(deltaY, Math.max(1, Math.abs(deltaX))) * 180 / Math.PI));
        fairy.current.style.transform = `translate3d(${position.x}px,${position.y}px,0) rotate(${deltaX < 0 ? -angle : angle}deg)`;
        previous = { ...position };
      }
      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index]!;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.025;
        if (particle.life <= 0) {
          particles.splice(index, 1);
          continue;
        }
        context.globalAlpha = particle.life;
        context.fillStyle = particle.color;
        context.shadowColor = particle.color;
        context.shadowBlur = 7;
        drawSparkle(particle.x, particle.y, particle.size);
      }
      context.globalAlpha = 1;
      context.shadowBlur = 0;
      if (stillMoving || particles.length) frame = requestAnimationFrame(animate);
    };
    const requestFrame = () => {
      if (!frame && pageVisible) frame = requestAnimationFrame(animate);
    };
    const pointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      target.x = event.clientX - 15;
      target.y = event.clientY - 15;
      if (!hasPointer) {
        hasPointer = true;
        setVisible(true);
        root.classList.add("has-fairy-cursor");
        if (fairy.current) fairy.current.style.transform = `translate3d(${target.x}px,${target.y}px,0)`;
        position.x = target.x;
        position.y = target.y;
        previous = { ...position };
      }
      if (reduced) {
        position.x = target.x;
        position.y = target.y;
        previous = { ...position };
        if (fairy.current) fairy.current.style.transform = `translate3d(${target.x}px,${target.y}px,0)`;
        return;
      }
      addParticles(event.clientX, event.clientY + 8, 2, 1.5);
      requestFrame();
    };
    const pointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch" && !reduced) {
        addParticles(event.clientX, event.clientY, 12, 5);
        requestFrame();
      }
    };
    const visibilityChange = () => {
      pageVisible = !document.hidden;
      if (!pageVisible) {
        cancelAnimationFrame(frame);
        frame = 0;
        return;
      }
      requestFrame();
    };

    resize();
    window.addEventListener("pointermove", pointerMove, { passive: true });
    window.addEventListener("pointerdown", pointerDown, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", visibilityChange);
    return () => {
      root.classList.remove("has-fairy-cursor");
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibilityChange);
    };
  }, [reduced]);

  return (
    <>
      <canvas ref={canvas} aria-hidden="true" className="fairy-cursor-canvas pointer-events-none fixed inset-0" />
      <div ref={fairy} aria-hidden="true" className={`fairy-cursor-sprite pointer-events-none fixed left-0 top-0 ${visible ? "is-visible" : ""}`}>
        {reduced ? (
          <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 2L23 16L38 20L23 24L20 38L17 24L2 20L17 16Z" fill="var(--foil-light)" stroke="var(--rose)" strokeWidth="1.5" /></svg>
        ) : (
          <svg viewBox="0 0 44 40" aria-hidden="true">
            <defs><radialGradient id="fairy-glow"><stop stopColor="var(--foil-light)" stopOpacity=".75" /><stop offset="1" stopColor="var(--foil-light)" stopOpacity="0" /></radialGradient></defs>
            <circle cx="22" cy="20" r="19" fill="url(#fairy-glow)" />
            <g className="fairy-wing fairy-wing-left"><path d="M21 18C13 2 1 4 4 14C7 20 14 21 21 22Z" fill="var(--blush)" stroke="var(--pearl)" strokeWidth="1.2" /><path d="M20 22C10 18 5 25 12 29C16 31 19 27 22 24Z" fill="var(--rose)" stroke="var(--pearl)" strokeWidth="1" /></g>
            <g className="fairy-wing fairy-wing-right"><path d="M23 18C31 2 43 4 40 14C37 20 30 21 23 22Z" fill="var(--rose)" stroke="var(--pearl)" strokeWidth="1.2" /><path d="M24 22C34 18 39 25 32 29C28 31 25 27 22 24Z" fill="var(--blush)" stroke="var(--pearl)" strokeWidth="1" /></g>
            <path d="M22 15C18 12 16 9 18 8M22 15C26 12 28 9 26 8" fill="none" stroke="var(--foil-light)" strokeWidth="1" />
            <ellipse cx="22" cy="22" rx="2.2" ry="7" fill="var(--pearl)" stroke="var(--deep-rose)" strokeWidth=".8" />
            <circle cx="22" cy="14" r="2.5" fill="var(--foil-light)" stroke="var(--deep-rose)" strokeWidth=".8" />
          </svg>
        )}
      </div>
    </>
  );
}