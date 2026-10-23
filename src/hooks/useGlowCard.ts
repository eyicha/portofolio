import { useEffect, useRef } from "react";

export function useGlowCard<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const showTapState = (event: PointerEvent) => {
      if (event.pointerType !== "touch" && !matchMedia("(hover: none)").matches) return;
      card.classList.add("is-tap-glow");
      clearTimeout(timeout);
      timeout = setTimeout(() => card.classList.remove("is-tap-glow"), 600);
    };
    card.addEventListener("pointerdown", showTapState, { passive: true });
    return () => {
      clearTimeout(timeout);
      card.removeEventListener("pointerdown", showTapState);
      card.classList.remove("is-tap-glow");
    };
  }, []);

  return ref;
}