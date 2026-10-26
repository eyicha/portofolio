import { useEffect, useRef, useState } from "react";
import { Storybook } from "./Storybook";
import { OpeningGarden } from "./OpeningGarden";
import { LandingSparkles } from "./LandingSparkles";
import { MixedTitle } from "./MixedTitle";
import { Button } from "./ui/button";
import { LaceEdge, WaxSeal } from "./illustrations";

const KEY = "erisa-book-opened";
type Phase = "closed" | "spinning" | "opening" | "invite" | "zoom" | "done";

function wasOpenedThisSession() {
  try {
    return typeof window !== "undefined" && window.sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

function markOpenedThisSession() {
  try {
    window.sessionStorage.setItem(KEY, "1");
  } catch {
    return false;
  }
  return true;
}

export function Opening() {
  const [phase, setPhase] = useState<Phase>("closed");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const finish = () => {
    clear();
    markOpenedThisSession();
    setPhase("done");
  };
  useEffect(() => {
    if (wasOpenedThisSession()) setPhase("done");
    return clear;
  }, []);
  const run = (replay = false) => {
    clear();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase(reduced ? "opening" : "spinning");
    const timings = reduced ? [350, 750, 1200] : replay ? [600, 1700, 2900, 4200] : [700, 1950, 3200, 4500];
    if (!reduced) timers.current.push(setTimeout(() => setPhase("opening"), timings[0]));
    timers.current.push(
      setTimeout(() => setPhase("invite"), timings[reduced ? 0 : 1]),
      setTimeout(() => setPhase("zoom"), timings[reduced ? 1 : 2]),
      setTimeout(finish, timings[reduced ? 2 : 3]),
    );
  };
  useEffect(() => {
    const replay = () => run(true);
    window.addEventListener("erisa-replay", replay);
    return () => window.removeEventListener("erisa-replay", replay);
  }, []);
  if (phase === "done") return null;
  return <div role="dialog" aria-modal="true" aria-label="Storybook opening" className={`opening-scene opening-${phase}`}>
    <OpeningGarden />
    <LandingSparkles scene="opening" />
    <a className="opening-skip" href="#" onClick={event => { event.preventDefault(); finish(); }}>Skip</a>
    <div className="opening-book-stage"><Storybook open={phase !== "closed" && phase !== "spinning"} calmCover subtitle="A portfolio, told as a storybook"/></div>
    <Button className="open-book-button" aria-label="Open the book" onClick={() => run()} disabled={phase !== "closed"}>
      <span className="open-book-seal"><WaxSeal/><span className="seal-glow-ring" aria-hidden="true"/><svg className="seal-edge-sparkle" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z"/></svg></span>
      <span className="open-book-label"><MixedTitle text="Open the book"/></span>
      <span className="seal-burst" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <svg key={index} className={`seal-burst-sparkle seal-burst-${index}`} viewBox="0 0 20 20"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z"/></svg>)}</span>
    </Button>
    {(phase === "invite" || phase === "zoom") && <div className="opening-invitation" role="status"><LaceEdge className="invitation-lace"/><p>You are cordially invited</p><p className="invitation-script">into the story</p><WaxSeal className="invitation-seal"/></div>}
  </div>;
}