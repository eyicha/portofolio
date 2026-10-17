import { useEffect, useRef, useState } from "react";
import { Castle, Swan, Cloud, Petals, OrnateFrame, Sparkle, RibbonBow, Star } from "./illustrations";
import { MixedTitle } from "./MixedTitle";
import { Button } from "./ui/button";

export function TwilightClosing() {
  const ref = useRef<HTMLElement>(null);
  const [closed, setClosed] = useState(false);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setClosed(true); setEntered(true); return; }
    const observer = new IntersectionObserver(entries => {
      const e = entries[0];
      if (e?.isIntersecting) setEntered(true);
      if (e && e.intersectionRatio >= .6) setClosed(true);
    }, { threshold: [0, .2, .6] });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const replay = () => {
    window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    window.dispatchEvent(new CustomEvent("erisa-replay"));
  };
  return <section ref={ref} aria-label="The book closes at twilight" className={`twilight-scene ${entered ? "twilight-entered" : ""} ${closed ? "book-closed" : ""}`}>
    <div className="twilight-stars" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <Sparkle key={i} className={`twinkle twinkle-${i}`} animate />)}</div>
    <Castle className="twilight-castle" variant="twilight" />
    <div className="closing-book">
      <div className="book-pages"><span /><span /><span /><span /></div>
      <div className="closing-cover">
        <OrnateFrame className="cover-frame" />
        <Star className="book-crest" />
        <h2><MixedTitle text="Erisa's Fairy Tale" /></h2>
        <div className="gold-clasp" aria-hidden="true"><svg viewBox="0 0 30 60"><rect x="3" y="3" width="24" height="54" rx="7" fill="var(--foil)" stroke="var(--foil-light)"/><circle cx="15" cy="24" r="5" fill="var(--deep-rose)"/><path d="M13 25H17L20 38H10Z" fill="var(--deep-rose)"/></svg></div>
      </div>
      <Button variant="ghost" className="book-bookmark" aria-label="Back to the first page" onClick={replay}><RibbonBow /><span className="bookmark-charm" aria-hidden="true"><Star /></span></Button>
    </div>
    <div className="colophon"><p>Written and bound by Erisa Salsabila</p><p>Set in Cormorant Garamond, Jost and Pinyon Script.</p><p>Printed in Bogor, West Java, 2026.</p><p>Edition of one.</p></div>
    <div className="lake" aria-hidden="true">
      <svg className="lake-water" viewBox="0 0 900 340" preserveAspectRatio="none"><defs><linearGradient id="lake-fill" x2="0" y2="1"><stop stopColor="var(--twilight-mauve)"/><stop offset=".5" stopColor="var(--twilight-rose)"/><stop offset="1" stopColor="var(--cream)"/></linearGradient><filter id="water-waves"><feTurbulence type="fractalNoise" baseFrequency=".013 .035" numOctaves="2" seed="8" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="6"/></filter></defs><path d="M0 30Q220 4 450 25T900 30V340H0Z" fill="url(#lake-fill)"/><g filter="url(#water-waves)" opacity=".3" fill="var(--foil-light)"><path d="M270 40V60L310 90V50L345 45V110L390 130V50L445 190L490 55V120L550 70V45L600 85V45Z"/>{[90,230,350,630,780].map(x=><path key={x} d={`M${x} 40l3 25 7 4-7 4-3 25-3-25-7-4 7-4Z`}/>)}</g>{[0,1,2].map(i=><ellipse key={i} cx="450" cy="170" rx={80+i*40} ry={6+i*4} className="lake-ring" fill="none" stroke="var(--blush)" strokeWidth="1"/>)}</svg>
      <div className="lake-swan"><Swan variant="resting" /><Swan className="swan-reflection" variant="resting" /></div>
      <Petals className="lake-petal lake-petal-one" /><Petals className="lake-petal lake-petal-two" variant="curl" />
    </div>
    <div className="closing-links"><Button variant="link" onClick={replay}>Back to the first page</Button><Button asChild variant="link"><a href="#contact">Leave a letter</a></Button></div>
    <Cloud className="closing-cloud" variant="low" />
  </section>;
}