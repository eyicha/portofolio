import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { profile, steps } from "@/data/profile";
import { stack } from "@/data/stack";
import { projects, type Project } from "@/data/projects";
import { awards } from "@/data/awards";
import { certs } from "@/data/certs";
import { Chapter, Flower, SafeImage, Star, WaxSeal, Wings } from "./ornaments";
import { Lightbox } from "./Chrome";

export function Hero() {
  const [photoOk, setPhotoOk] = useState(true);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) setPhotoOk(false);
  }, []);
  return (
    <section id="top" className="relative z-10 mx-auto max-w-6xl px-5 pb-10 pt-10 md:pt-16">
      <p className="text-center font-display text-lg italic text-mauve">Chapter One</p>
      <div className="parchment ornate relative mx-auto mt-4 overflow-hidden rounded-t-[10rem] rounded-b-3xl px-6 pb-12 pt-16 md:px-14">
        <Flower className="absolute left-6 top-10" />
        <Flower className="absolute right-6 top-10" />
        <h1 className="text-center font-script text-6xl leading-tight text-deep-rose md:text-8xl">Hi, I'm Erisa</h1>
        <p className="mx-auto mt-3 max-w-md text-center font-display text-xl italic text-plum md:text-2xl">
          I turn data into stories and build the systems behind them
        </p>
        <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
          <div className="relative mx-auto aspect-[3/4] w-64 md:w-80">
            <Wings className="animate-float absolute -inset-x-24 inset-y-0 z-0 h-full w-[calc(100%+12rem)] opacity-90" />
            {photoOk ? (
              <img
                ref={img}
                src={profile.photo}
                alt="Portrait of Erisa Salsabila"
                className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_2px_var(--pearl)] drop-shadow-[0_0_10px_var(--pearl)]"
                onError={() => setPhotoOk(false)}
              />
            ) : (
              <div role="img" aria-label="Portrait placeholder" className="relative z-10 flex h-full w-full items-center justify-center rounded-t-full bg-gradient-to-b from-blush to-baby text-sm text-plum/70">
                TODO add /images/erisa.png
              </div>
            )}
          </div>
          <div className="layered rounded-2xl">
            <dl className="parchment space-y-3 rounded-2xl p-6 md:p-8">
              <p className="font-script text-3xl text-deep-rose">About the heroine</p>
              {[
                ["Name", profile.name],
                ["Role", profile.role],
                ["Campus", profile.campus],
                ["Base", profile.base],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-3 border-b border-blush pb-2 last:border-0">
                  <dt className="w-20 shrink-0 font-display italic text-mauve">{k}</dt>
                  <dd className="text-plum">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#work" className="rounded-full ribbon-bg px-7 py-3 font-display text-lg font-semibold text-primary-foreground glow">View Work</a>
          <a href={profile.cvUrl} className="rounded-full border-2 border-rose bg-pearl px-7 py-3 font-display text-lg font-semibold text-deep-rose">Download CV</a>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <Chapter n="Two" title="About Me" id="story">
      <div className="layered mx-auto max-w-3xl rounded-3xl">
        <div className="parchment ornate space-y-5 rounded-3xl p-8 text-lg leading-relaxed md:p-12">
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
          <div key={s.shelf} className="parchment rounded-3xl p-6 md:p-8">
            <h3 className="text-center font-script text-4xl text-deep-rose">{s.shelf}</h3>
            <ul className="mt-6 grid grid-cols-3 gap-4 border-b-8 border-mauve/40 pb-4">
              {s.items.map((it, i) => (
                <li key={i} className="flex flex-col items-center text-center">
                  <span className={`flex h-16 w-16 items-center justify-center rounded-2xl font-display text-xl font-semibold text-plum shadow-[var(--shadow-paper)] ${i % 2 ? "bg-baby" : "glossy"}`}>{it.short}</span>
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
            <h3 className="mt-2 font-display text-2xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm">{s.text}</p>
          </li>
        ))}
      </ol>
    </Chapter>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link to="/project/$slug" params={{ slug: p.slug }} className="group block rounded-3xl glossy p-3 transition-transform hover:-translate-y-1">
      <article className="parchment ornate rounded-2xl p-4">
        <div className="overflow-hidden rounded-xl border border-rose/40 bg-pearl">
          <div className="flex items-center gap-1.5 bg-blush px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose" />
            <span className="h-2.5 w-2.5 rounded-full bg-baby" />
            <span className="h-2.5 w-2.5 rounded-full bg-peri" />
            <span className="ml-2 h-4 flex-1 rounded-full bg-pearl/80" />
          </div>
          <SafeImage src={p.cover} alt={`${p.title} cover`} className="aspect-video w-full" />
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl font-semibold group-hover:text-deep-rose">{p.title}</h3>
          <span className="font-display italic text-mauve">{p.year}</span>
        </div>
        <p className="text-sm">{p.role} · <span className="italic">{p.status}</span></p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {p.stack.map((s, i) => <li key={i} className="rounded-full bg-baby px-3 py-0.5 text-xs">{s}</li>)}
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
            <h3 className="font-display text-2xl font-semibold">{a.title}</h3>
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
            <button onClick={() => setOpen({ src: c.image, alt: c.title })} className={`w-full rounded-2xl border-4 border-double border-rose bg-gradient-to-b from-blush via-cream to-baby p-3 text-left transition-transform hover:-rotate-1 ${i % 2 ? "md:mt-6" : ""}`}>
              <SafeImage src={c.image} alt={c.title} className="aspect-[4/3] w-full rounded-lg" />
              <div className="mt-3 flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-lg font-semibold leading-tight">{c.title}</h3>
                  <p className="text-xs">{c.issuer} · {c.year}</p>
                </div>
                <WaxSeal size={30} />
              </div>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox src={open?.src ?? null} alt={open?.alt ?? ""} onClose={() => setOpen(null)} />
    </Chapter>
  );
}

export function TheEnd() {
  return (
    <section className="relative z-10 px-5 py-20 text-center">
      <p className="font-script text-6xl text-deep-rose md:text-7xl">The End?</p>
      <p className="mt-2 font-display text-3xl italic">Not yet.</p>
      <p className="mx-auto mt-4 max-w-sm">The next chapter could be one we write together.</p>
      <a href="#contact" className="mt-8 inline-block rounded-full ribbon-bg px-7 py-3 font-display text-lg font-semibold text-primary-foreground glow">Write to me</a>
    </section>
  );
}
