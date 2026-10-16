import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { Star, WaxSeal, Flower } from "./ornaments";

const items = [
  ["Story", "story"],
  ["Stack", "stack"],
  ["Work", "work"],
  ["Honors", "honors"],
  ["Contact", "contact"],
] as const;

export function Nav() {
  return (
    <nav aria-label="Main" className="sticky top-3 z-50 mx-auto w-fit max-w-[95vw] px-2">
      <div className="parchment flex items-center gap-1 rounded-full px-3 py-1.5 md:gap-3 md:px-6">
        <Link to="/" className="mr-1 font-script text-2xl text-deep-rose">E</Link>
        {items.map(([label, id]) => (
          <Link key={id} to="/" hash={id} className="rounded-full px-2 py-1 font-display text-sm italic text-plum transition-colors hover:bg-blush md:text-base">
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function MusicToggle() {
  const audio = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);
  const toggle = () => {
    const a = audio.current!;
    if (on) a.pause();
    else a.play().catch(() => setOn(false));
    setOn(!on);
  };
  return (
    <>
      <audio ref={audio} src="/music.mp3" loop preload="none" />
      <button
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? "Pause music" : "Play music"}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full glossy text-deep-rose"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 18V5l11-2v13" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="6" cy="18" r="3" fill="currentColor" />
          <circle cx="17" cy="16" r="3" fill="currentColor" />
          {!on && <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" />}
        </svg>
      </button>
    </>
  );
}

export function Footer() {
  const [sent, setSent] = useState(false);
  useEffect(() => {
    if (sent) {
      const t = setTimeout(() => setSent(false), 5000);
      return () => clearTimeout(t);
    }
  }, [sent]);
  const field = "w-full rounded-lg border bg-pearl/70 px-4 py-3 text-plum outline-none focus:border-rose focus:ring-2 focus:ring-rose/30";
  return (
    <footer id="contact" className="relative z-10 scroll-mt-24 px-5 pb-24 pt-10">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-display text-lg italic text-mauve">Epilogue</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">Contact</h2>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-[1.3fr_1fr]">
          {/* letter */}
          <div className="layered rounded-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                (e.target as HTMLFormElement).reset();
                setSent(true);
              }}
              className="parchment relative rounded-2xl p-6 pt-14 md:p-10 md:pt-16"
            >
              <svg aria-hidden="true" viewBox="0 0 400 50" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-12 w-full">
                <path d="M0 0h400L200 48z" fill="var(--blush)" stroke="var(--rose)" strokeWidth="1" />
              </svg>
              <WaxSeal size={52} className="absolute left-1/2 top-4 -translate-x-1/2" />
              <p className="font-script text-3xl text-deep-rose">Dear Erisa,</p>
              <div className="mt-5 space-y-4">
                <label className="block">
                  <span className="font-display italic">Your name</span>
                  <input required name="name" className={field} />
                </label>
                <label className="block">
                  <span className="font-display italic">Your email</span>
                  <input required type="email" name="email" className={field} />
                </label>
                <label className="block">
                  <span className="font-display italic">Your message</span>
                  <textarea required name="message" rows={4} className={field} />
                </label>
              </div>
              <button className="mt-6 rounded-full ribbon-bg px-7 py-3 font-display text-lg font-semibold text-primary-foreground glow">Seal and send</button>
              <p role="status" className="mt-3 text-sm text-deep-rose">{sent ? "Thank you. Your letter is on its way (demo form, TODO connect)." : ""}</p>
            </form>
          </div>
          <address className="parchment ornate flex flex-col justify-center gap-4 rounded-2xl p-8 not-italic">
            <Flower />
            <p><span className="font-display italic text-mauve">Email</span><br /><a className="text-deep-rose underline underline-offset-4" href={`mailto:${profile.email}`}>{profile.email}</a></p>
            <p><span className="font-display italic text-mauve">Location</span><br />{profile.location}</p>
            <ul className="flex flex-wrap gap-2">
              {Object.entries(profile.links).map(([k, v]) => (
                <li key={k}><a href={v} className="inline-block rounded-full bg-blush px-4 py-1.5 text-sm capitalize text-plum hover:bg-rose hover:text-primary-foreground">{k}</a></li>
              ))}
            </ul>
          </address>
        </div>
        <p className="mt-14 flex items-center justify-center gap-2 text-sm text-plum/70">
          <Star size={10} className="text-rose" /> © 2026 Erisa Salsabila <Star size={10} className="text-rose" />
        </p>
      </div>
    </footer>
  );
}

export function Lightbox({ src, alt, onClose }: { src: string | null; alt: string; onClose: () => void }) {
  useEffect(() => {
    if (!src) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [src, onClose]);
  if (!src) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={alt} onClick={onClose} className="fixed inset-0 z-[95] flex items-center justify-center bg-plum/70 p-6">
      <div onClick={(e) => e.stopPropagation()} className="parchment ornate max-h-[85vh] max-w-3xl rounded-2xl p-4">
        <img src={src} alt={alt} className="max-h-[70vh] w-full rounded-lg object-contain" onError={(e) => ((e.target as HTMLImageElement).alt = `${alt} (missing: ${src})`)} />
        <button onClick={onClose} className="mt-3 w-full font-display italic text-deep-rose">Close</button>
      </div>
    </div>
  );
}
