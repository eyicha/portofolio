import { useEffect, useId, useRef, useState, type ReactNode } from "react";
export type ArtProps = { className?: string; width?: number | string; flip?: boolean; animate?: boolean; variant?: string | undefined; alt?: string };
export function ArtFrame({ name, viewBox, children, className = "", width, flip, animate, alt, transparentGrain = false }: ArtProps & { name: string; viewBox: string; children: (id: string) => ReactNode; transparentGrain?: boolean }) {
 const id = useId().replace(/:/g, ""); const [custom, setCustom] = useState(false);
 const element = useRef<HTMLSpanElement>(null);
 useEffect(() => {
   const el = element.current;
   if (!el) return;
   const observer = new IntersectionObserver(entries => {
     if (!entries[0]?.isIntersecting) return;
     const image = new Image();
     image.onload = () => setCustom(image.naturalWidth > 0);
     image.src = `/images/art/${name}.png`;
     observer.disconnect();
   }, { rootMargin: "200px" });
   observer.observe(el);
   return () => observer.disconnect();
 }, [name]);
 return <span ref={element} className={`story-art ${flip ? "art-flipped" : ""} ${animate ? "art-animated" : ""} ${className}`}>
 <img src={`/images/art/${name}.png`} alt={alt ?? ""} aria-hidden={!alt} loading="lazy" width={width} onLoad={() => setCustom(true)} onError={e => { e.currentTarget.hidden = true; }} className={custom ? "art-custom" : "art-probe"} />
 {!custom && <svg width={width} viewBox={viewBox} role={alt ? "img" : undefined} aria-label={alt} aria-hidden={!alt}>
 <defs>
 <linearGradient id={`${id}-pink`} x1="0" y1="0" x2=".8" y2="1"><stop stopColor="var(--pearl)"/><stop offset=".25" stopColor="var(--blush)"/><stop offset=".68" stopColor="var(--rose)"/><stop offset="1" stopColor="var(--deep-rose)"/></linearGradient>
 <linearGradient id={`${id}-paper`} x1="0" y1="0" x2=".4" y2="1"><stop stopColor="var(--pearl)"/><stop offset=".5" stopColor="var(--cream)"/><stop offset="1" stopColor="var(--blush)"/></linearGradient>
 <linearGradient id={`${id}-gold`}><stop stopColor="var(--foil-light)"/><stop offset=".45" stopColor="var(--foil)"/><stop offset=".7" stopColor="var(--cream)"/><stop offset="1" stopColor="var(--foil)"/></linearGradient>
 <radialGradient id={`${id}-fur`} cx=".35" cy=".25"><stop stopColor="var(--pearl)"/><stop offset=".65" stopColor="var(--cream)"/><stop offset="1" stopColor="var(--mauve)"/></radialGradient>
 <filter id={`${id}-grain`} x="-15%" y="-15%" width="130%" height="130%"><feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="2" seed="4" result="noise"/><feColorMatrix in="noise" type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".045"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/>{transparentGrain && <feComposite in2="SourceAlpha" operator="in" />}<feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="var(--mauve)" floodOpacity=".18"/></filter>
 </defs><g filter={`url(#${id}-grain)`} strokeLinejoin="round">{children(id)}</g></svg>}
 </span>;
}
