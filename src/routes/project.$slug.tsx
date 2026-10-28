import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { projects } from "@/data/projects";
import { SafeImage, Star } from "@/components/ornaments";
import { Lightbox } from "@/components/Chrome";
import { MixedTitle } from "@/components/MixedTitle";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/project/$slug")({
  loader: ({ params }) => {
    const project = projects.find((item) => item.slug === params.slug);
    if (!project) throw notFound();
    return { project };
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
      <h2 className="font-display text-3xl font-semibold text-deep-rose"><MixedTitle text={title} /></h2>
      <div className="mt-3 leading-relaxed">{children}</div>
    </section>
  );
}

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  const [open, setOpen] = useState<string | null>(null);
  const shots = (p.screenshots ?? []).filter(Boolean);
  const stack = p.stack ?? [];
  const features = p.features ?? [];
  const metadata = [p.year, p.role, p.status].filter(Boolean).join(" | ");
  const currentIndex = projects.findIndex((item) => item.slug === p.slug);
  const nextProject = projects.length > 1 ? projects[(currentIndex + 1) % projects.length] : undefined;
  return (
    <main className="relative z-10 mx-auto max-w-4xl space-y-8 px-5 py-12">
      <Link to="/" hash="work" className="text-deep-rose underline underline-offset-4"><MixedTitle text="Back to the story" /></Link>
      <header className="parchment ornate rounded-t-[6rem] rounded-b-3xl p-8 pt-12 text-center">
        {metadata && <p className="font-display italic text-mauve">{metadata}</p>}
        <h1 className="mt-2 text-4xl text-deep-rose md:text-7xl"><MixedTitle text={p.title} /></h1>
        <SafeImage src={p.cover} alt={`${p.title} cover`} className="mt-6 aspect-video w-full rounded-xl" />
        {stack.length > 0 && <ul className="mt-5 flex flex-wrap justify-center gap-2">
          {stack.map((s, i) => <li key={i} className="rounded-full bg-blush px-3 py-1 text-sm">{s}</li>)}
        </ul>}
        {(p.liveUrl || p.githubUrl) && <div className="mt-5 flex justify-center gap-3">
          {p.liveUrl && <a href={p.liveUrl} className="rounded-full ribbon-bg px-5 py-2 text-primary-foreground"><MixedTitle text="Live site" /></a>}
          {p.githubUrl && <a href={p.githubUrl} className="rounded-full border-2 border-rose px-5 py-2 text-deep-rose"><MixedTitle text="GitHub" /></a>}
        </div>}
      </header>
      {p.summary && <Block title="Overview"><p>{p.summary}</p></Block>}
      {p.results?.length ? (
        <Block title="What I delivered">
          <ul className="list-none space-y-2">
            {p.results.map((result) => <li key={result} className="flex items-start gap-2"><Star size={10} className="mt-1 shrink-0 text-[var(--foil)]" /><span>{result}</span></li>)}
          </ul>
        </Block>
      ) : null}
      {p.problem && <Block title="Problem"><p>{p.problem}</p></Block>}
      {p.solution && <Block title="Solution"><p>{p.solution}</p></Block>}
      {features.length > 0 && (
        <Block title="Features">
          <ul className="list-none space-y-2">{features.map((f, i) => <li key={i} className="flex gap-2"><Star size={12} className="mt-1.5 shrink-0 text-rose" /><span>{f}</span></li>)}</ul>
        </Block>
      )}
      {shots.length > 0 && (
        <Block title="Screenshots">
          <div className="grid gap-4 sm:grid-cols-2">
            {shots.map((s, i) => (
              <Button variant="ghost" key={s} onClick={() => setOpen(s)} className="h-auto p-0 overflow-hidden rounded-xl border border-rose/40">
                <SafeImage src={s} alt={`${p.title} screenshot ${i + 1}`} className="aspect-video w-full" />
              </Button>
            ))}
          </div>
        </Block>
      )}
      {nextProject && <Block title="Next project"><Link to="/project/$slug" params={{ slug: nextProject.slug }} className="text-deep-rose underline underline-offset-4"><MixedTitle text={nextProject.title} /></Link></Block>}
      <Lightbox src={open} alt={`${p.title} screenshot`} onClose={() => setOpen(null)} />
    </main>
  );
}
