import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Castle, Swan, Cloud, Petals, Sparkle } from "./illustrations";
import { Storybook } from "./Storybook";
import { Button } from "./ui/button";
import { useMotionSetting, useScrollProgress } from "@/hooks/useMotion";

export function TwilightClosing() {
  const ref = useRef<HTMLElement>(null);
  const lakeSwan = useRef<HTMLDivElement>(null);
  const { mode } = useMotionSetting();
  const [progress, setProgress] = useState(0);
  const [lockedClosed, setLockedClosed] = useState(false);
  useScrollProgress(lakeSwan, mode === "full", { sourceRef: ref, glide: true, direction: -1, wake: true });
  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    if (mode === "reduced") { setProgress(1); return; }
    if (typeof window.requestAnimationFrame !== "function") {
      if (typeof IntersectionObserver === "undefined") { setProgress(1); return; }
      const observer = new IntersectionObserver((entries) => {
        if ((entries[0]?.intersectionRatio ?? 0) >= .35) {
          setProgress(1);
          observer.disconnect();
        }
      }, { threshold: .35 });
      observer.observe(section);
      return () => observer.disconnect();
    }

    let frame = 0;
    let pageVisible = !document.hidden;
    const update = () => {
      if (frame || !pageVisible) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = section.getBoundingClientRect();
        const range = Math.max(1, rect.height - window.innerHeight);
        const next = Math.max(0, Math.min(1, -rect.top / range));
        setProgress((current) => Math.abs(current - next) < .001 ? current : next);
      });
    };
    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (!pageVisible) { cancelAnimationFrame(frame); frame = 0; }
      else update();
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [mode]);
  const closed = mode === "reduced" || lockedClosed || progress >= .75;
  const entered = !closed && progress >= .4;
  const clamp = (value: number) => Math.max(0, Math.min(1, value));
  const coverProgress = clamp((progress - .5) / .25);
  const pageProgress = clamp((progress - .35) / .2);

  useEffect(() => {
    if (progress >= .75) {
      setLockedClosed(true);
    }
  }, [progress]);
  const stageStyle = {
    "--twilight-shift": clamp(progress / .4),
    "--closing-page-turn": `${-160 * pageProgress}deg`,
    "--closing-page-opacity": 1 - pageProgress,
    "--closing-cover-turn": `${-155 * (1 - coverProgress)}deg`,
    "--closing-copy-opacity": mode === "reduced" ? 1 : clamp((progress - .7) / .3),
  } as CSSProperties;
  const replay = () => {
    setLockedClosed(true);
    setProgress(1);
    window.scrollTo({ top: 0, behavior: mode === "reduced" ? "instant" : "smooth" });
    window.dispatchEvent(new CustomEvent("erisa-replay"));
  };
  return <section ref={ref} aria-label="The book closes at twilight" className={`twilight-scene ${entered ? "twilight-entered" : ""} ${closed ? "book-closed" : ""}`}>
    <div className="twilight-stage" style={stageStyle}>
    <div className="twilight-stars" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <Sparkle key={i} className={`twinkle twinkle-${i}`} animate />)}</div>
    <Castle className="twilight-castle" variant="twilight" />
    <div className="closing-book" style={{ "--closing-cover-turn": `${-155 * (1 - coverProgress)}deg`, "--closing-page-turn": `${-160 * pageProgress}deg`, "--closing-page-opacity": String(1 - pageProgress), "--closing-copy-opacity": String(mode === "reduced" ? 1 : clamp((progress - .7) / .3)) }}>
      <Storybook open={!closed} onBookmark={replay}/>
    </div>
    <div className="colophon"><p>Written and bound by Erisa Salsabila</p><p>Set in Cormorant Garamond, Jost and Pinyon Script.</p><p>Printed in Bogor, West Java, 2026.</p><p>Edition of one.</p></div>
    <div className="lake" aria-hidden="true">
      <svg className="lake-water" viewBox="0 0 900 340" preserveAspectRatio="none"><defs><linearGradient id="lake-fill" x2="0" y2="1"><stop stopColor="var(--twilight-mauve)"/><stop offset=".5" stopColor="var(--twilight-rose)"/><stop offset="1" stopColor="var(--cream)"/></linearGradient><filter id="water-waves"><feTurbulence type="fractalNoise" baseFrequency=".013 .035" numOctaves="2" seed="8" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="6"/></filter></defs><path d="M0 30Q220 4 450 25T900 30V340H0Z" fill="url(#lake-fill)"/><g filter="url(#water-waves)" opacity=".3" fill="var(--foil-light)"><path d="M270 40V60L310 90V50L345 45V110L390 130V50L445 190L490 55V120L550 70V45L600 85V45Z"/>{[90,230,350,630,780].map(x=><path key={x} d={`M${x} 40l3 25 7 4-7 4-3 25-3-25-7-4 7-4Z`}/>)}</g>{[0,1,2].map(i=><ellipse key={i} cx="450" cy="170" rx={80+i*40} ry={6+i*4} className="lake-ring" fill="none" stroke="var(--blush)" strokeWidth="1"/>)}</svg>
      <div ref={lakeSwan} className="lake-swan swan-scroll-transform"><div className="lake-wake"><span /><span /><span /></div><Swan variant="resting" /><Swan className="swan-reflection" variant="resting" /></div>
      <Petals className="lake-petal lake-petal-one" /><Petals className="lake-petal lake-petal-two" variant="curl" />
    </div>
    <div className="closing-links"><Button variant="link" onClick={replay}>Back to the first page</Button><Button asChild variant="link"><a href="#contact">Leave a letter</a></Button></div>
    <Cloud className="closing-cloud" variant="low" />
    </div>
  </section>;
}