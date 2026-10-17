import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { profile, steps } from "@/data/profile";
import { stack } from "@/data/stack";
import { projects, type Project } from "@/data/projects";
import { awards } from "@/data/awards";
import { certs } from "@/data/certs";
import { Chapter, SafeImage, Star, WaxSeal } from "./ornaments";
import { Lightbox } from "./Chrome";
import { MixedTitle } from "./MixedTitle";
import { Button } from "./ui/button";
import { OrnateFrame } from "./illustrations";

export { StoryHero as Hero } from "./StoryHero";

export function About() {
  return (
    <Chapter n="Two" title="About Me" id="story">
      <div className="mx-auto max-w-3xl">
        <div className="space-y-5 p-2 text-lg leading-relaxed md:p-6">
          <p><span className="float-left mr-2 font-script text-6xl leading-none text-deep-rose">O</span>nce upon a time. {profile.bio}</p>
          <p>{profile.direction}</p>
          <p className="text-base">{profile.otherExperience} <a href={profile.links.linkedin} className="text-deep-rose underline underline-offset-4">See LinkedIn</a></p>
          <p className="text-base">{profile.fnb}</p>
        </div>
      </div>
    </Chapter>
  );
}

export function Stack() {
  return (
    <Chapter n="Three" title="Stack and Tools" id="stack">
      <div className="grid gap-10 md:grid-cols-2">
        {stack.map((s) => (
          <div key={s.shelf} className="stack-shelf p-6 md:p-8">
            <h3 className="text-center text-3xl text-deep-rose"><MixedTitle text={s.shelf} /></h3>
            <ul className="mt-6 grid grid-cols-3 gap-4 border-b-8 border-mauve/40 pb-4">
              {s.items.map((it, i) => (
                <li key={i} className="flex flex-col items-center text-center">
                  <span className={`flex h-16 w-16 items-center justify-center rounded-2xl font-display text-xl font-semibold text-plum shadow-[var(--shadow-paper)] ${i % 2 ? "bg-blush" : "glossy"}`}>{it.short}</span>
                  <span className="mt-2 text-sm">{it.label}</span>
                  <span className="text-xs italic text-mauve">{it.group}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Chapter>
  );
}

export function HowIWork() {
  return (
    <Chapter n="Four" title="How I Work">
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s.title} className={`parchment ornate relative rounded-t-[4rem] rounded-b-2xl px-5 pb-6 pt-10 text-center ${i % 2 ? "lg:mt-10" : ""}`}>
            <span className="absolute left-1/2 top-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ribbon-bg font-display text-lg text-primary-foreground">{i + 1}</span>
            <Star className="mx-auto text-rose" size={18} />
            <h3 className="mt-2 font-display text-2xl font-semibold"><MixedTitle text={s.title} /></h3>
            <p className="mt-2 text-sm">{s.text}</p>
          </li>
        ))}
      </ol>
    </Chapter>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link to="/project/$slug" params={{ slug: p.slug }} className="group project-card block rounded-lg p-3 transition-transform hover:-translate-y-1">
      <article className="project-plate relative p-4">
        <OrnateFrame className="project-ornament" />
        <div className="overflow-hidden rounded-xl border border-rose/40 bg-pearl">
          <div className="flex items-center gap-1.5 bg-blush px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose" />
            <span className="h-2.5 w-2.5 rounded-full bg-blush" />
            <span className="h-2.5 w-2.5 rounded-full bg-peri" />
            <span className="ml-2 h-4 flex-1 rounded-full bg-pearl/80" />
          </div>
          <SafeImage src={p.cover} alt={`${p.title} cover`} className="aspect-video w-full" />
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl font-semibold group-hover:text-deep-rose"><MixedTitle text={p.title} /></h3>
          <span className="font-display italic text-mauve">{p.year}</span>
        </div>
        <p className="text-sm">{p.role} · <span className="italic">{p.status}</span></p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {p.stack.map((s, i) => <li key={i} className="rounded-full bg-blush px-3 py-0.5 text-xs">{s}</li>)}
        </ul>
      </article>
    </Link>
  );
}

export function Portfolio() {
  return (
    <Chapter n="Five" title="Portfolio" id="work">
      <div className="grid gap-8 md:grid-cols-2">{projects.map((p) => <ProjectCard key={p.slug} p={p} />)}</div>
    </Chapter>
  );
}

export function Honors() {
  return (
    <Chapter n="Six" title="Honors and Awards" id="honors">
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {awards.map((a, i) => (
          <li key={i} className="parchment relative rounded-2xl px-6 pb-6 pt-14 text-center">
            <div aria-hidden="true" className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-6">
              <svg width="70" height="90" viewBox="0 0 70 90">
                <path d="M20 40l-8 46 13-8 8 12 4-50zM50 40l8 46-13-8-8 12-4-50z" fill="var(--baby)" stroke="var(--peri)" />
                <circle cx="35" cy="32" r="24" fill="var(--rose)" stroke="var(--pearl)" strokeWidth="3" />
                <circle cx="35" cy="32" r="16" fill="var(--blush)" />
                <path d="M35 20l3.5 7.5 8 1-6 5.5 1.5 8-7-4-7 4 1.5-8-6-5.5 8-1z" fill="var(--deep-rose)" />
              </svg>
            </div>
            <p className="mt-6 font-display text-sm italic text-mauve">{a.placement}</p>
            <h3 className="font-display text-2xl font-semibold"><MixedTitle text={a.title} /></h3>
            <p className="mt-1 text-sm">{a.event} · {a.year}</p>
          </li>
        ))}
      </ul>
    </Chapter>
  );
}

export function Certs() {
  const [open, setOpen] = useState<{ src: string; alt: string } | null>(null);
  return (
    <Chapter n="Seven" title="Certifications">
      <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {certs.map((c, i) => (
          <li key={i}>
            <Button variant="ghost" onClick={() => setOpen({ src: c.image, alt: c.title })} className={`certificate-card h-auto whitespace-normal w-full rounded-2xl border-4 border-double border-rose bg-gradient-to-b from-blush via-cream to-rose p-3 text-left transition-transform hover:-rotate-1 ${i % 2 ? "md:mt-6" : ""}`}>
              <SafeImage src={c.image} alt={c.title} className="aspect-[4/3] w-full rounded-lg" />
              <div className="mt-3 flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-lg font-semibold leading-tight"><MixedTitle text={c.title} /></h3>
                  <p className="text-xs">{c.issuer} · {c.year}</p>
                </div>
                <WaxSeal size={30} />
              </div>
            </Button>
          </li>
        ))}
      </ul>
      <Lightbox src={open?.src ?? null} alt={open?.alt ?? ""} onClose={() => setOpen(null)} />
    </Chapter>
  );
}

export { TwilightClosing as TheEnd } from "./TwilightClosing";
