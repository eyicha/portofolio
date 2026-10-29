import { useEffect, useRef, useState } from "react";
import { useMotionSetting } from "@/hooks/useMotion";

type Particle = { x: number; y: number; vx: number; vy: number; age: number; lifetime: number; color: string; size: number };

export function FairyCursor() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const fairy = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [systemReduced, setSystemReduced] = useState(false);
  const { mode } = useMotionSetting();
  const reduced = systemReduced || mode === "reduced";

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(motion.matches);
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
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
    let pointerMoved = false;
    let frame = 0;
    let lastFrameTime = 0;
    let pageVisible = !document.hidden;
    let pixelRatio = 1;

    const resize = () => {
      pixelRatio = window.devicePixelRatio || 1;
      element.width = Math.round(window.innerWidth * pixelRatio);
      element.height = Math.round(window.innerHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };
    const addParticles = (x: number, y: number, count: number, directionX: number, directionY: number) => {
      for (let index = 0; index < count; index += 1) {
        const spreadAngle = Math.random() * Math.PI * 2;
        const spreadRadius = Math.random() * 6;
        const drift = reduced ? 0 : 0.2 + Math.random() * 0.4;
        particles.push({
          x: x + Math.cos(spreadAngle) * spreadRadius,
          y: y + Math.sin(spreadAngle) * spreadRadius,
          vx: -directionX * drift,
          vy: -directionY * drift,
          age: 0,
          lifetime: 350 + Math.random() * 250,
          color: colors[Math.floor(Math.random() * colors.length)] || "#fff",
          size: 1.5 + Math.random() * 1.5,
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
    const placeFairy = (angle: number) => {
      const sprite = fairy.current;
      if (!sprite) return;
      sprite.style.transform = `translate3d(${position.x - sprite.offsetWidth / 2}px,${position.y - sprite.offsetHeight / 2}px,0) rotate(${angle}deg)`;
    };
    const animate = (time: number) => {
      frame = 0;
      if (!pageVisible) return;
      const elapsed = Math.min(50, lastFrameTime ? time - lastFrameTime : 16.67);
      const frameScale = elapsed / 16.67;
      lastFrameTime = time;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      let followingTarget = false;
      let directionX = 0;
      let directionY = 0;
      let speed = 0;
      if (hasPointer && fairy.current) {
        position.x += (target.x - position.x) * 0.25;
        position.y += (target.y - position.y) * 0.25;
        const deltaX = position.x - previous.x;
        const deltaY = position.y - previous.y;
        speed = Math.hypot(deltaX, deltaY);
        if (speed > 0) {
          directionX = deltaX / speed;
          directionY = deltaY / speed;
        }
        const angle = speed > 0.1 ? Math.atan2(deltaY, deltaX) * 180 / Math.PI : 0;
        placeFairy(angle);
        previous = { ...position };
        followingTarget = Math.hypot(target.x - position.x, target.y - position.y) > 0.2;

        if (pointerMoved && speed > 0.15 && !reduced) {
          const count = speed > 3 ? 2 : 1;
          addParticles(position.x - directionX * 10, position.y - directionY * 10, count, directionX, directionY);
        }
      }
      pointerMoved = false;

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index]!;
        particle.x += particle.vx * frameScale;
        particle.y += particle.vy * frameScale;
        particle.age += elapsed;
        const life = 1 - particle.age / particle.lifetime;
        if (life <= 0) {
          particles.splice(index, 1);
          continue;
        }
        context.globalAlpha = life;
        context.fillStyle = particle.color;
        context.shadowColor = particle.color;
        context.shadowBlur = 7;
        drawSparkle(particle.x, particle.y, particle.size * (0.45 + life * 0.55));
      }
      context.globalAlpha = 1;
      context.shadowBlur = 0;
      if (followingTarget || particles.length) frame = requestAnimationFrame(animate);
    };
    const requestFrame = () => {
      if (!frame && pageVisible) frame = requestAnimationFrame(animate);
    };
    const pointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      target.x = event.clientX;
      target.y = event.clientY;
      pointerMoved = true;
      if (!hasPointer) {
        hasPointer = true;
        setVisible(true);
        root.classList.add("has-fairy-cursor");
        position.x = target.x;
        position.y = target.y;
        previous = { ...position };
      }
      if (reduced) {
        position.x = target.x;
        position.y = target.y;
        previous = { ...position };
        placeFairy(0);
        return;
      }
      requestFrame();
    };
    const pointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      addParticles(event.clientX, event.clientY, 8, 0, 0);
      requestFrame();
    };
    const visibilityChange = () => {
      pageVisible = !document.hidden;
      if (!pageVisible) {
        cancelAnimationFrame(frame);
        frame = 0;
        lastFrameTime = 0;
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
      <canvas ref={canvas} aria-hidden="true" className="fairy-cursor-canvas" />
      <div ref={fairy} aria-hidden="true" className={`fairy-cursor-sprite${visible ? " is-visible" : ""}${reduced ? " is-reduced" : ""}`}>
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