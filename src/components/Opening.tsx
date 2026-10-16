import { useEffect, useState } from "react";
import { Star, WaxSeal, Flower } from "./ornaments";

const KEY = "erisa-book-opened";
type Phase = "check" | "closed" | "opening" | "invite" | "zoom" | "done";

export function Opening() {
  const [phase, setPhase] = useState<Phase>("check");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setPhase(sessionStorage.getItem(KEY) ? "done" : "closed");
  }, []);

  useEffect(() => {
    document.body.style.overflow = phase === "done" || phase === "check" ? "" : "hidden";
  }, [phase]);

  const finish = () => {
    sessionStorage.setItem(KEY, "1");
    setPhase("done");
  };

  const open = () => {
    if (reduced) {
      setPhase("zoom");
      setTimeout(finish, 500);
      return;
    }
    setPhase("opening");
    setTimeout(() => setPhase("invite"), 1500);
    setTimeout(() => setPhase("zoom"), 3300);
    setTimeout(finish, 4400);
  };

  if (phase === "done" || phase === "check") return null;
  const opened = phase !== "closed";

  return (
    <div
      role="dialog"
      aria-label="Storybook opening"
      className={`fixed inset-0 z-[90] flex items-center justify-center overflow-hidden sky-bg transition-all duration-1000 ${phase === "zoom" ? "scale-150 opacity-0" : ""}`}
    >
      <button onClick={finish} className="absolute right-5 top-5 z-10 font-display text-lg italic text-plum underline decoration-rose underline-offset-4">
        Skip
      </button>
      <Star className="absolute left-[15%] top-[18%] text-pearl animate-shimmer" size={18} />
      <Star className="absolute right-[18%] top-[30%] text-rose animate-shimmer" size={12} />
      <Star className="absolute bottom-[20%] left-[25%] text-baby animate-shimmer" size={14} />

      <div className="relative" style={{ perspective: "1600px" }}>
        {/* inner pages */}
        <div className="parchment relative h-[420px] w-[290px] rounded-r-2xl rounded-l-md md:h-[480px] md:w-[340px]">
          {opened &&
            [0, 1, 2].map((i) => (
              <div
                key={i}
                className="parchment absolute inset-0 origin-left rounded-r-2xl"
                style={{ transform: phase === "opening" ? `rotateY(-${170 - i * 6}deg)` : "rotateY(-175deg)", transition: `transform 1.1s ${0.35 + i * 0.12}s ease-in-out` }}
              />
            ))}
          {/* invitation */}
          <div
            className={`absolute inset-6 flex flex-col items-center justify-center rounded-xl border-4 border-double border-rose bg-gradient-to-b from-blush via-cream to-baby p-6 text-center transition-all duration-1000 ${phase === "invite" ? "-translate-y-6 scale-110 opacity-100 shadow-[var(--shadow-paper)]" : "scale-75 opacity-0"}`}
          >
            <Flower />
            <p className="mt-3 font-display text-sm italic text-mauve">You are cordially invited</p>
            <p className="mt-2 font-script text-4xl text-deep-rose">into the story</p>
            <WaxSeal className="mt-5" />
          </div>
        </div>

        {/* cover */}
        <div
          className="preserve-3d absolute inset-0 origin-left transition-transform duration-[1200ms] ease-in-out"
          style={{ transform: opened ? "rotateY(-178deg)" : "rotateY(0deg)" }}
        >
          <div className="backface-hidden glossy ornate absolute inset-0 flex flex-col items-center justify-center rounded-r-2xl rounded-l-md border-l-8 border-deep-rose p-8 text-center">
            <Flower size={40} />
            <h1 className="mt-6 font-script text-5xl leading-tight text-plum md:text-6xl">Erisa's Fairy Tale</h1>
            <p className="mt-3 font-display text-base italic text-plum/80">A portfolio in seven chapters</p>
            <button
              onClick={open}
              className="mt-10 rounded-full ribbon-bg px-7 py-3 font-display text-lg font-semibold text-primary-foreground glow transition-transform hover:scale-105"
            >
              Open the book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
