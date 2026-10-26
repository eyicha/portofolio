import { createContext, useContext, useEffect, useState, type ReactNode, type RefObject } from "react";

type MotionMode = "full" | "reduced";
type MotionContextValue = { mode: MotionMode; ready: boolean; toggle: () => void };
type ScrollOptions = { maxDrift?: number; parallaxSpeed?: number; trackPage?: boolean; sourceRef?: RefObject<HTMLElement | null>; glide?: boolean; direction?: 1 | -1; wake?: boolean };

const MotionContext = createContext<MotionContextValue>({ mode: "full", ready: false, toggle: () => undefined });

export function MotionProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<MotionMode>("full");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("erisa-motion-mode");
      if (saved === "full" || saved === "reduced") setMode(saved);
    } catch {
      setMode("full");
    } finally {
      setReady(true);
    }
  }, []);

  const toggle = () => {
    const next = mode === "full" ? "reduced" : "full";
    setMode(next);
    try {
      localStorage.setItem("erisa-motion-mode", next);
    } catch {
      setMode(next);
    }
  };

  useEffect(() => {
    document.documentElement.dataset.motion = mode;
  }, [mode]);

  return (
    <MotionContext.Provider value={{ mode, ready, toggle }}>
      {children}
      <MotionToggle />
    </MotionContext.Provider>
  );
}

export function useMotionSetting() {
  return useContext(MotionContext);
}

export function useScrollProgress<T extends HTMLElement>(ref: RefObject<T | null>, enabled: boolean, options: ScrollOptions = {}) {
  const { maxDrift = 60, parallaxSpeed = 0, trackPage = false, sourceRef, glide = false, direction = 1, wake = false } = options;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    let previousProgress = 0;
    let pageVisible = !document.hidden;
    const reset = () => {
      element.style.setProperty("--swan-drift-x", "0px");
      element.style.setProperty("--swan-bob-y", "0px");
      element.style.setProperty("--swan-parallax-y", "0px");
      element.style.setProperty("--swan-tilt", "0deg");
      element.style.setProperty("--swan-wake-scale", "1");
      setProgress(0);
    };
    if (!enabled) {
      reset();
      return;
    }

    const update = () => {
      if (frame || !pageVisible) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const source = trackPage ? document.documentElement : sourceRef?.current ?? element;
        const rect = source.getBoundingClientRect();
        const pageRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const nextProgress = trackPage
          ? Math.max(0, Math.min(1, window.scrollY / pageRange))
          : Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        const eased = nextProgress * nextProgress * (3 - 2 * nextProgress);
        const range = Math.min(maxDrift / 2, window.innerWidth * 0.12);
        const parent = sourceRef?.current ?? element.parentElement;
        const glideRange = Math.max(0, ((parent?.getBoundingClientRect().width ?? window.innerWidth) - element.getBoundingClientRect().width) / 2 - 12);
        const drift = glide
          ? direction * (eased * 2 - 1) * glideRange
          : (eased - 0.5) * range * 2;
        const bob = Math.sin(nextProgress * Math.PI * 2) * 8;
        const tilt = Math.sin(nextProgress * Math.PI * 2) * 3.5;
        const speed = Math.min(1, Math.abs(nextProgress - previousProgress) * 100);
        const parallax = Math.max(-120, Math.min(120, (nextProgress - 0.5) * window.innerHeight * parallaxSpeed));
        element.style.setProperty("--swan-drift-x", `${drift}px`);
        element.style.setProperty("--scroll-progress", `${nextProgress}`);
        element.style.setProperty("--swan-bob-y", `${bob}px`);
        element.style.setProperty("--swan-parallax-y", `${parallax}px`);
        element.style.setProperty("--swan-tilt", `${tilt}deg`);
        element.style.setProperty("--swan-wake-scale", `${1 + speed * 1.2}`);
        if (Math.abs(nextProgress - previousProgress) > 0.008) setProgress(nextProgress);
        previousProgress = nextProgress;
      });
    };
    const visibilityChange = () => {
      pageVisible = !document.hidden;
      if (!pageVisible) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else {
        update();
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    document.addEventListener("visibilitychange", visibilityChange);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.removeEventListener("visibilitychange", visibilityChange);
      if (!wake) element.style.setProperty("--swan-wake-scale", "1");
    };
  }, [ref, enabled, maxDrift, parallaxSpeed, trackPage, sourceRef, glide, direction, wake]);

  return progress;
}

function MotionToggle() {
  const { mode, toggle } = useMotionSetting();
  return (
    <button type="button" className="motion-toggle" aria-label="Toggle animations" aria-pressed={mode === "full"} onClick={toggle}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z" fill="currentColor" /><circle cx="19" cy="5" r="1.4" fill="var(--foil-light)" /></svg>
    </button>
  );
}