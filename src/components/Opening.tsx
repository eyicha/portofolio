import { useEffect, useRef, useState } from "react";
import { Storybook } from "./Storybook";
import { OpeningGarden } from "./OpeningGarden";
import { MixedTitle } from "./MixedTitle";
import { Button } from "./ui/button";
import { LaceEdge, WaxSeal } from "./illustrations";

const KEY = "erisa-book-opened";
type Phase = "check" | "closed" | "opening" | "invite" | "zoom" | "done";

export function Opening() {
  const [phase, setPhase] = useState<Phase>("check");
  const scene = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const finish = () => { clear(); sessionStorage.setItem(KEY, "1"); setPhase("done"); };
  useEffect(() => {
    setPhase(sessionStorage.getItem(KEY) ? "done" : "closed");
    return clear;
  }, []);
  useEffect(() => {
    const previous = document.body.style.overflow;
    if (phase !== "done" && phase !== "check") document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [phase]);
  const run = (replay = false) => {
    clear();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase(reduced ? "invite" : "opening");
    const timings = reduced ? [0, 350, 750] : replay ? [500, 1050, 1750] : [1450, 2850, 4250];
    if (!reduced) timers.current.push(setTimeout(() => setPhase("invite"), timings[0]));
    timers.current.push(setTimeout(() => setPhase("zoom"), timings[1]), setTimeout(finish, timings[2]));
  };
  useEffect(() => {
    const replay = () => run(true);
    window.addEventListener("erisa-replay", replay);
    return () => window.removeEventListener("erisa-replay", replay);
  }, []);
  useEffect(() => {
    const el = scene.current;
    if (!el || phase !== "closed" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const highlight = (x: number, y: number) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { el.style.setProperty("--light-x", `${x}%`); el.style.setProperty("--light-y", `${y}%`); });
    };
    const pointer = (e: PointerEvent) => highlight(e.clientX / innerWidth * 100, e.clientY / innerHeight * 100);
    const tilt = (e: DeviceOrientationEvent) => { if (e.gamma !== null && e.beta !== null) highlight(Math.max(10, Math.min(90, 50 + e.gamma)), Math.max(10, Math.min(90, 50 + e.beta / 2))); };
    const scroll = () => highlight(50, 30 + Math.min(50, scrollY / 10));
    el.addEventListener("pointermove", pointer);
    window.addEventListener("deviceorientation", tilt);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => { cancelAnimationFrame(frame); el.removeEventListener("pointermove", pointer); window.removeEventListener("deviceorientation", tilt); window.removeEventListener("scroll", scroll); };
  }, [phase]);
  if (phase === "done" || phase === "check") return null;
  return <div ref={scene} role="dialog" aria-modal="true" aria-label="Storybook opening" className={`opening-scene opening-${phase}`}>
    <OpeningGarden />
    <Button variant="link" className="opening-skip" onClick={finish}>Skip</Button>
    <div className="opening-book-stage"><Storybook open={phase !== "closed"}/></div>
    <Button className="open-book-button" aria-label="Open the book" onClick={() => run()} disabled={phase !== "closed"}><WaxSeal/><MixedTitle text="Open the book"/></Button>
    <div className="opening-light" aria-hidden="true"/>
    {(phase === "invite" || phase === "zoom") && <div className="opening-invitation" role="status"><LaceEdge className="invitation-lace"/><p>You are cordially invited</p><p className="invitation-script">into the story</p><WaxSeal className="invitation-seal"/></div>}
  </div>;
}