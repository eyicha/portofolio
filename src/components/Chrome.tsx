import { Link, useNavigate } from "@tanstack/react-router";
import { createPortal } from "react-dom";
import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { socials } from "@/data/socials";
import { MixedTitle } from "./MixedTitle";
import { ContactLetter } from "./ContactLetter";
import { Button } from "./ui/button";
import { Sparkle } from "./illustrations";
import { useScrollEffects } from "./ScrollEffects";

const items = [
  ["Story", "story"],
  ["Stack", "stack"],
  ["Work", "work"],
  ["Honors", "honors"],
  ["Publications", "publications"],
  ["Contact", "contact"],
] as const;

export function Nav() {
  const navigate = useNavigate();
  const scrollEffects = useScrollEffects();
  const handleSectionLink = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const lenis = scrollEffects?.lenis;
    if (!lenis) return;
    event.preventDefault();
    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (!target) return;
      const navHeight = document.querySelector("nav[aria-label='Main']")?.getBoundingClientRect().height ?? 0;
      lenis.scrollTo(target, { offset: -(navHeight + 16), duration: 1.2 });
    };
    if (window.location.pathname !== "/") void navigate({ to: "/", hash: id }).then(() => requestAnimationFrame(scrollToTarget));
    else scrollToTarget();
  };
  return (
    <nav aria-label="Main" className="sticky top-3 z-50 mx-auto w-fit max-w-[95vw] px-2">
      <div className="parchment flex items-center gap-1 rounded-full px-3 py-1.5 md:gap-3 md:px-6">
        <Link to="/" className="mr-1 font-script text-2xl text-deep-rose">E</Link>
        {items.map(([label, id]) => (
          <Link key={id} to="/" hash={id} onClick={(event) => handleSectionLink(event, id)} className="rounded-full px-2 py-1 text-sm text-plum transition-colors hover:bg-blush md:text-base">
            <MixedTitle text={label} />
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
    const a = audio.current;
    if (!a) return;
    if (on) a.pause();
    else a.play().catch(() => setOn(false));
    setOn(!on);
  };
  return (
    <>
      <audio ref={audio} src="/music.mp3" loop preload="none" />
      <Button
        variant="ghost"
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
      </Button>
    </>
  );
}

export function Footer() {
  return <><ContactLetter /><footer className="icon-footer"><div className="social-row">{socials.filter(item => item.url).map(item => <div key={item.icon} className="social-icon-reveal"><Button asChild className="social-button"><a href={item.url} aria-label={item.label} {...(item.url.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}><SocialIcon icon={item.icon} /><span className="social-sparkle" aria-hidden="true"><Sparkle /></span></a></Button></div>)}</div><p>© 2026 Erisa Salsabila</p></footer></>;
}
function SocialIcon({ icon }: { icon: string }) {
 const paths: Record<string, string> = {
 linkedin: "M4 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4M2 9h4v13H2ZM9 9h4v2c1-2 7-4 9 2v9h-4v-8c0-3-5-3-5 0v8H9Z",
 github: "M12 2a10 10 0 0 0-3 19.5v-2c-3 .5-3-1-4-2-1-1 0-1 1 0 1 1 2 1 3 1 0-1 .5-2 1-2-4 0-5-2-5-4 0-1 0-2 1-3-1-1-1-3 0-4 2 0 3 1 3 1 2-1 4-1 6 0 0 0 2-1 3-1 1 1 1 3 0 4 1 1 1 2 1 3 0 2-1 4-5 4 1 1 1 2 1 3v3A10 10 0 0 0 12 2Z",
 email: "M2 5h20v14H2Zm2 2 8 6 8-6v-1l-8 6-8-6Z",
 };
 return <svg viewBox="0 0 24 24" aria-hidden="true">{icon === "instagram" ? <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2.5"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/></> : <path d={paths[icon]} fill="currentColor" fillRule="evenodd"/>}</svg>;
}

export function StoryModal({ open, label, onClose, children, panelClassName = "" }: { open: boolean; label: string; onClose: () => void; children: ReactNode; panelClassName?: string }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollEffects = useScrollEffects();
  useEffect(() => {
    if (!open) return;
    const releaseScrollLock = scrollEffects?.acquireScrollLock();
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], iframe, [tabindex]:not([tabindex="-1"])') ?? []);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last || !focusable.includes(document.activeElement as HTMLElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first ?? dialogRef.current)?.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      releaseScrollLock?.();
      previousFocus?.focus();
    };
  }, [open, onClose, scrollEffects?.acquireScrollLock]);
  if (!open) return null;
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={label} className="story-modal-backdrop" onClick={onClose}>
      <div ref={dialogRef} tabIndex={-1} data-lenis-prevent className={`story-modal-panel ${panelClassName}`} onClick={(event) => event.stopPropagation()}>
        <Button variant="ghost" className="story-modal-close" onClick={onClose} aria-label="Close dialog">Close</Button>
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function Lightbox({ src, alt, caption, trapFocus = false, onClose }: { src: string | null; alt: string; caption?: string; trapFocus?: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollEffects = useScrollEffects();
  useEffect(() => {
    if (!src) return;
    const releaseScrollLock = scrollEffects?.acquireScrollLock();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previousFocus = trapFocus && document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (trapFocus) dialogRef.current?.focus();
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !trapFocus) return;
      const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last || !focusable.includes(document.activeElement as HTMLElement)) {
        e.preventDefault();
        (e.shiftKey ? last : first ?? dialogRef.current)?.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", k);
    return () => {
      document.removeEventListener("keydown", k);
      document.body.style.overflow = previousOverflow;
      releaseScrollLock?.();
      previousFocus?.focus();
    };
  }, [src, onClose, trapFocus, scrollEffects?.acquireScrollLock]);
  if (!src) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={alt} onClick={onClose} className="fixed inset-0 z-[10002] flex items-center justify-center bg-plum/70 p-6">
      <div ref={dialogRef} tabIndex={trapFocus ? -1 : undefined} data-lenis-prevent onClick={(e) => e.stopPropagation()} className="parchment ornate max-h-[85vh] max-w-3xl overflow-y-auto rounded-2xl p-4">
        <img src={src} alt={alt} className="max-h-[70vh] w-full rounded-lg object-contain" onError={(e) => ((e.target as HTMLImageElement).alt = `${alt} (missing: ${src})`)} />
        {caption && <p className="lightbox-caption">{caption}</p>}
        <Button variant="ghost" onClick={onClose} className={`mt-3 ${trapFocus ? "min-h-11" : ""} w-full text-deep-rose`}><MixedTitle text="Close" /></Button>
      </div>
    </div>
  );
}
