import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { projects } from "@/data/projects";
import { SafeImage, Star } from "@/components/ornaments";
import { Lightbox } from "@/components/Chrome";

export const Route = createFileRoute("/project/$slug")({
  loader: ({ params }) => {
    const i = projects.findIndex((p) => p.slug === params.slug);
    if (i < 0) throw notFound();
    return { project: projects[i]!, next: projects[(i + 1) % projects.length]! };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.project.title} | Erisa Salsabila` : "Project | Erisa Salsabila";
    const d = loaderData?.project.summary ?? "A project from Erisa's portfolio.";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectPage,
});

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="parchment rounded-2xl p-6 md:p-8">
      <h2 className="font-display text-3xl font-semibold text-deep-rose">{title}</h2>
      <div className="mt-3 leading-relaxed">{children}</div>
    </section>
  );
}

function ProjectPage() {
  const { project: p, next } = Route.useLoaderData();
  const [open, setOpen] = useState<string | null>(null);
  const shots = p.screenshots.filter(Boolean);
  return (
    <main className="relative z-10 mx-auto max-w-4xl space-y-8 px-5 py-12">
      <Link to="/" hash="work" className="font-display italic text-deep-rose underline underline-offset-4">Back to the story</Link>
      <header className="parchment ornate rounded-t-[6rem] rounded-b-3xl p-8 pt-12 text-center">
        <p className="font-display italic text-mauve">{p.year} · {p.role} · {p.status}</p>
        <h1 className="mt-2 font-script text-5xl text-deep-rose md:text-7xl">{p.title}</h1>
        <SafeImage src={p.cover} alt={`${p.title} cover`} className="mt-6 aspect-video w-full rounded-xl" />
        <ul className="mt-5 flex flex-wrap justify-center gap-2">
          {p.stack.map((s, i) => <li key={i} className="rounded-full bg-baby px-3 py-1 text-sm">{s}</li>)}
        </ul>
        <div className="mt-5 flex justify-center gap-3">
          {p.liveUrl && <a href={p.liveUrl} className="rounded-full ribbon-bg px-5 py-2 text-primary-foreground">Live site</a>}
          {p.githubUrl && <a href={p.githubUrl} className="rounded-full border-2 border-rose px-5 py-2 text-deep-rose">GitHub</a>}
        </div>
      </header>
      {p.summary && <Block title="Overview"><p>{p.summary}</p></Block>}
      {p.problem && <Block title="Problem"><p>{p.problem}</p></Block>}
      {p.solution && <Block title="Solution"><p>{p.solution}</p></Block>}
      {p.features.length > 0 && (
        <Block title="Features">
          <ul className="space-y-2">{p.features.map((f, i) => <li key={i} className="flex gap-2"><Star size={12} className="mt-1.5 shrink-0 text-rose" />{f}</li>)}</ul>
        </Block>
      )}
      {shots.length > 0 && (
        <Block title="Screenshots">
          <div className="grid gap-4 sm:grid-cols-2">
            {shots.map((s, i) => (
              <button key={s} onClick={() => setOpen(s)} className="overflow-hidden rounded-xl border border-rose/40">
                <SafeImage src={s} alt={`${p.title} screenshot ${i + 1}`} className="aspect-video w-full" />
              </button>
            ))}
          </div>
        </Block>
      )}
      <Link to="/project/$slug" params={{ slug: next.slug }} className="glossy block rounded-2xl p-6 text-center">
        <span className="font-display italic text-plum/80">Turn the page</span>
        <span className="block font-script text-4xl text-deep-rose">{next.title}</span>
      </Link>
      <Lightbox src={open} alt={`${p.title} screenshot`} onClose={() => setOpen(null)} />
    </main>
  );
}
