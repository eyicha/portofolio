import { useId } from "react";
import { Button } from "./ui/button";

/** One cover for the invitation and colophon scenes. */
export function Storybook({ open = false, onBookmark }: { open?: boolean; onBookmark?: () => void }) {
  const id = useId().replace(/:/g, "");
  return <div className={`storybook ${open ? "storybook-open" : ""}`}>
    <div className="storybook-page-edges" aria-hidden="true"><span /><span /><span /></div>
    <div className="storybook-inner-page" aria-hidden="true" />
    <div className="storybook-leaf" aria-hidden="true" />
    <div className="storybook-cover">
      <svg className="storybook-decoration" viewBox="0 0 400 560" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-cloth`} x2="1" y2="1"><stop stopColor="var(--rose)"/><stop offset=".48" stopColor="var(--deep-rose)"/><stop offset="1" stopColor="var(--rose)"/></linearGradient>
          <linearGradient id={`${id}-gold`}><stop stopColor="var(--foil)"/><stop offset=".45" stopColor="var(--foil-light)"/><stop offset=".65" stopColor="var(--cream)"/><stop offset="1" stopColor="var(--foil)"/></linearGradient>
          <radialGradient id={`${id}-petal`} cx=".3" cy=".2"><stop stopColor="var(--pearl)"/><stop offset=".4" stopColor="var(--blush)"/><stop offset="1" stopColor="var(--deep-rose)"/></radialGradient>
          <filter id={`${id}-linen`}><feTurbulence type="fractalNoise" baseFrequency=".8 .07" numOctaves="2" seed="7" result="warp"/><feTurbulence type="fractalNoise" baseFrequency=".06 .8" numOctaves="2" seed="9" result="weft"/><feBlend in="warp" in2="weft" mode="multiply"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".16"/></feComponentTransfer><feBlend in="SourceGraphic" mode="soft-light"/></filter>
          <g id={`${id}-flower`}>
            {[0,72,144,216,288].map(r => <g key={r} transform={`rotate(${r})`}><ellipse cy="-13" rx="10" ry="17" fill={`url(#${id}-petal)`} stroke="var(--blush)" strokeWidth=".7"/><path d="M-4-24Q-9-14 0-3" fill="none" stroke="var(--pearl)" opacity=".7"/></g>)}
            <circle r="6" fill={`url(#${id}-gold)`}/><circle r="2" fill="var(--cream)"/>
          </g>
        </defs>
        <rect width="400" height="560" rx="8" fill={`url(#${id}-cloth)`} filter={`url(#${id}-linen)`}/>
        <rect x="17" y="17" width="366" height="526" rx="4" fill="none" stroke={`url(#${id}-gold)`} strokeWidth="2"/>
        <rect x="23" y="23" width="354" height="514" rx="3" fill="none" stroke="var(--foil-light)" strokeWidth=".65"/>
        <g fill="none" stroke={`url(#${id}-gold)`} strokeWidth="1.6">
          <path d="M29 147C30 60 93 81 87 43C82 18 49 39 66 55C80 67 126 21 154 38M32 110C61 122 85 102 75 87C63 74 48 96 62 100M39 77C13 55 34 27 47 38C64 53 35 65 39 77M246 522C285 536 304 491 327 495C353 501 330 529 317 514C299 493 375 503 365 439M358 494C337 475 365 451 370 470C378 490 352 478 358 494"/>
          <path d="M40 516Q58 450 88 460T133 488M53 487Q32 474 43 456Q62 454 63 477"/>
        </g>
        <g fill="var(--cream)" opacity=".8"><path d="M85 57Q100 43 105 58Q91 68 85 57Z"/><path d="M341 512Q342 494 354 502Q354 516 341 512Z"/></g>
        <g transform="translate(52 485)"><use href={`#${id}-flower`} transform="scale(.85)"/><use href={`#${id}-flower`} transform="translate(36 13) scale(.65)"/><use href={`#${id}-flower`} transform="translate(17 -31) scale(.6)"/></g>
        <path d="M34 489Q61 436 49 374Q47 351 55 335" fill="none" stroke="var(--foil)" strokeWidth="2"/>
        {[0,1,2,3,4,5].map(i => <g key={i} transform={`translate(${51+(i%2)*9} ${345+i*17}) rotate(${i%2 ? -28 : 24}) scale(${.55+i*.06})`}><path d="M0 0Q-13 2-9 18Q0 31 10 17Q12 5 0 0Z" fill={`url(#${id}-petal)`} stroke="var(--rose)"/><path d="M-6 17Q0 12 6 17" fill="none" stroke="var(--pearl)"/><circle cy="19" r="1.5" fill="var(--foil)"/></g>)}
        <path d="M44 421Q32 408 33 422Q39 430 44 421Z" fill="var(--sage)"/>
      </svg>
      <div className="storybook-spine" aria-hidden="true"><i/><i/><i/></div>
      <div className="storybook-star" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M20 0Q23 17 40 20Q23 23 20 40Q17 23 0 20Q17 17 20 0Z" fill="var(--foil-light)"/></svg></div>
      <div className="storybook-plaque"><div className="plaque-lace" aria-hidden="true"/><h2 className="storybook-title"><span>Erisa's</span><span>Fairy Tale</span></h2></div>
      <p className="storybook-subtitle">A portfolio in seven chapters</p>
      <div className="storybook-clasp" aria-hidden="true"><svg viewBox="0 0 25 42"><rect x="1" y="1" width="23" height="40" rx="7" fill="var(--foil)" stroke="var(--foil-light)"/><circle cx="12.5" cy="15" r="4" fill="var(--deep-rose)"/><path d="M11 17H14L17 28H8Z" fill="var(--deep-rose)"/></svg></div>
      {onBookmark ? <Button variant="ghost" className="storybook-bookmark" aria-label="Back to the first page" onClick={onBookmark}><BookmarkCharm /></Button> : <div className="storybook-bookmark" aria-hidden="true"><BookmarkCharm /></div>}
      <div className="storybook-glitter" aria-hidden="true">{Array.from({length:14},(_,i)=><svg key={i} className={`book-glint book-glint-${i}`} viewBox="0 0 10 10"><path d="M5 0L6 4L10 5L6 6L5 10L4 6L0 5L4 4Z" fill="currentColor"/></svg>)}</div>
      <div className="storybook-highlight" aria-hidden="true"/>
    </div>
  </div>;
}

function BookmarkCharm() { return <svg viewBox="0 0 20 25" aria-hidden="true"><path d="M10 2V7" stroke="var(--foil-light)"/><path d="M10 7L17 15L10 23L3 15Z" fill="var(--foil)" stroke="var(--foil-light)"/><path d="M10 10L11 14L14 15L11 16L10 20L9 16L6 15L9 14Z" fill="var(--cream)"/></svg>; }