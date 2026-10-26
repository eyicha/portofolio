import { MixedTitle } from "./MixedTitle";
import { Sparkle } from "./illustrations";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Star({ className = "", size = 14 }: { className?: string; size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path d="M12 0c.8 6.5 4.7 10.6 12 12-7.3 1.4-11.2 5.5-12 12-.8-6.5-4.7-10.6-12-12 7.3-1.4 11.2-5.5 12-12z" fill="currentColor" />
    </svg>
  );
}

export function Flower({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 40 40" className={className}>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="20" cy="10" rx="6" ry="9" fill="var(--blush)" stroke="var(--rose)" strokeWidth=".8" transform={`rotate(${r} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="4" fill="var(--rose)" />
      <path d="M30 32c4-1 7 1 8 4-4 1-7-1-8-4z" fill="var(--sage)" />
    </svg>
  );
}

export function WaxSeal({ className = "", size = 64, letter = "E" }: { className?: string; size?: number; letter?: string }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 64 64" className={className}>
      <defs>
        <radialGradient id="seal" cx="35%" cy="30%">
          <stop offset="0" stopColor="var(--rose)" />
          <stop offset="1" stopColor="var(--deep-rose)" />
        </radialGradient>
      </defs>
      <path d="M32 3c5 0 7 4 11 5s8 0 10 4 0 8 2 11 6 6 5 10-5 5-6 9 1 8-2 11-8 1-11 3-5 6-9 6-6-4-10-5-8 1-11-2-1-8-3-11-6-5-6-9 4-6 5-10-2-8 1-11 8-1 11-3 5-6 9-6z" fill="url(#seal)" />
      <circle cx="32" cy="32" r="17" fill="none" stroke="var(--blush)" strokeOpacity=".7" strokeWidth="1.5" />
      <text x="32" y="41" textAnchor="middle" fontFamily="Pinyon Script, cursive" fontSize="26" fill="var(--pearl)">{letter}</text>
    </svg>
  );
}

export function Swan({ className = "", id = "s" }: { className?: string; id?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 80" className={className}>
      <defs>
        <linearGradient id={`sw-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--pearl)" />
          <stop offset=".55" stopColor="var(--blush)" />
          <stop offset="1" stopColor="var(--rose)" />
        </linearGradient>
      </defs>
      <path d="M28 18c-6-10 8-16 12-8 3 6-6 14-4 26 2 10 16 14 30 10 10-3 18-14 30-18-6 10-4 20-14 28-14 10-46 10-58-2C16 46 20 34 30 30c4-2 4-6-2-12z" fill={`url(#sw-${id})`} stroke="var(--rose)" strokeWidth=".8" />
      <path d="M44 40c10-4 26-6 40-16-4 12-18 20-34 22z" fill="var(--pearl)" opacity=".85" />
      <path d="M26 14l-6 2 6 1z" fill="var(--deep-rose)" />
      <circle cx="31" cy="13" r="1" fill="var(--plum)" />
      <g fill="var(--pearl)" className="animate-shimmer">
        <circle cx="60" cy="34" r="1.2" /><circle cx="78" cy="30" r="1" /><circle cx="50" cy="50" r="1" />
      </g>
    </svg>
  );
}

export function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 60" preserveAspectRatio="none" className={className}>
      <path d="M0 60V40c10-12 26-14 36-6 6-14 26-20 38-8 10-16 36-16 46 0 10-10 30-8 36 6 12-8 30-4 44 8v20z" fill="var(--pearl)" opacity=".9" />
    </svg>
  );
}

export function Wings({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 300" className={className}>
      <defs>
        <linearGradient id="wing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--baby)" stopOpacity=".8" />
          <stop offset=".6" stopColor="var(--blush)" stopOpacity=".55" />
          <stop offset="1" stopColor="var(--pearl)" stopOpacity=".3" />
        </linearGradient>
      </defs>
      {[1, -1].map((s) => (
        <g key={s} transform={s === -1 ? "translate(400 0) scale(-1 1)" : undefined}>
          <path d="M200 150C150 40 40 10 20 60c-18 46 60 90 180 90z" fill="url(#wing)" stroke="var(--pearl)" strokeWidth="1.5" />
          <path d="M200 160c-90 0-150 30-140 80 10 40 90 20 140-80z" fill="url(#wing)" stroke="var(--pearl)" strokeWidth="1.5" />
          <path d="M200 150C140 90 80 60 40 62M200 156c-60 20-110 46-130 70" stroke="var(--pearl)" strokeOpacity=".8" fill="none" />
        </g>
      ))}
    </svg>
  );
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Chapter({ n, title, id, children, numberless = false }: { n: string; title: string; id?: string; children: ReactNode; numberless?: boolean }) {
  const ref = useReveal<HTMLElement>();
  const number = ({ One: "1", Two: "2", Three: "3", Four: "4", Five: "5", Six: "6", Seven: "7" } as Record<string, string>)[n] ?? n;
  return <section ref={ref} id={id} data-page-number={number} className="chapter-page page-in">
    <span className="chapter-sheet-front" aria-hidden="true" />
    <span className="chapter-inner-border" aria-hidden="true" />
    <p className="chapter-running-line" aria-hidden="true">{title}</p>
    <header className="chapter-header"><span className="chapter-bookmark" aria-hidden="true"/>{!numberless && <p className="chapter-number-label"><span className="chapter-numeral font-script">{number}</span></p>}<h2><MixedTitle text={title} write /></h2><Sparkle className="chapter-sparkle" /></header>
    <div className="chapter-content">{children}</div>{!numberless && <span className="page-number" aria-hidden="true">{number}</span>}<span className="page-curl" aria-hidden="true"/>
  </section>;
}

export function SafeImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = new Image();
    t.onerror = () => setFailed(true);
    t.src = el.currentSrc || el.src;
  }, []);
  if (failed || !src)
    return (
      <div role="img" aria-label={alt} className={`flex items-center justify-center bg-gradient-to-br from-blush via-cream to-rose p-3 text-center text-xs text-plum/70 ${className}`}>
        {src.split("/").pop() || "image"}
      </div>
    );
  return <img ref={ref} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}
