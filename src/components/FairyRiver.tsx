import { Petals, Sparkle, Swan } from "./illustrations";

export function FairyRiver() {
  return <div className="fairy-river" aria-hidden="true">
    <div className="hero-paper-stack"><span /><span /><span /></div>
    <svg className="river-water" viewBox="0 0 900 220" preserveAspectRatio="none">
      <defs><linearGradient id="river-water-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--cream)" /><stop offset=".25" stopColor="var(--blush)" /><stop offset=".6" stopColor="var(--rose)" stopOpacity=".5" /><stop offset="1" stopColor="var(--cream)" /></linearGradient></defs>
      <path d="M0 0H900V220H0Z" fill="url(#river-water-fill)" />
      <g className="river-ripples" fill="none" stroke="var(--pearl)" strokeWidth="1.5" opacity=".6">{[35,75,120,162,195].map((y,i) => <path key={y} d={`M${i*37} ${y}Q180 ${y-9} 350 ${y}T720 ${y}T980 ${y}`} />)}</g>
      <g fill="var(--sage)" opacity=".65"><path d="M110 151a14 5 0 1 0 8-4l-5 5Z" /><path d="M759 68a11 4 0 1 0 7-3l-5 4Z" /></g>
    </svg>
    <div className="river-swimmer"><div className="river-wake"><span /><span /><span /></div><Swan flip variant="resting" /><Swan flip variant="resting" className="river-reflection" /></div>
    <Petals className="river-petal river-petal-one" /><Petals className="river-petal river-petal-two" variant="curl" /><Petals className="river-petal river-petal-three" />
    <Sparkle className="river-glint river-glint-one" animate /><Sparkle className="river-glint river-glint-two" animate />
  </div>;
}