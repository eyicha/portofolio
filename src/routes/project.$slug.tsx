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

function ProjectSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="project-section">
      <h2><MixedTitle text={title} /></h2>
      <div className="project-section-body">{children}</div>
    </section>
  );
}

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  const [open, setOpen] = useState<string | null>(null);
  const shots = (p.screenshots ?? []).filter(Boolean);
  const stack = p.stack ?? [];
  const features = p.features ?? [];
  const currentIndex = projects.findIndex((item) => item.slug === p.slug);
  const nextProject = projects.length > 1 ? projects[(currentIndex + 1) % projects.length] : undefined;
  return (
    <main className="project-case-study">
      <Link to="/" hash="work" className="project-back-link">← <MixedTitle text="Back to portfolio" /></Link>
      <header className="project-case-hero">
        <p className="project-case-kicker">Project {String(currentIndex + 1).padStart(2, "0")}{p.year && ` · ${p.year}`}</p>
        <h1 className="project-detail-title"><MixedTitle text={p.title} /></h1>
        <div className="project-case-meta">
          {p.role && <span>{p.role}</span>}
          {p.status && <span className={p.status.toLowerCase() === "in progress" ? "project-status is-progress" : "project-status"}>{p.status}</span>}
        </div>
        {p.summary && <p className="project-case-summary">{p.summary}</p>}
        <SafeImage src={p.cover} alt={`${p.title} project cover`} className="project-case-cover" />
        {stack.length > 0 && <ul className="project-case-stack" aria-label="Technologies and skills">
          {stack.map((s) => <li key={s}>{s}</li>)}
        </ul>}
        {(p.liveUrl || p.githubUrl) && <div className="project-case-actions">
          {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="project-action-primary">Visit project</a>}
          {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="project-action-secondary">View source on GitHub</a>}
        </div>}
      </header>
      {p.results?.length ? (
        <ProjectSection title="My contribution">
          <ul className="project-result-list">
            {p.results.map((result) => <li key={result}><Star size={12} aria-hidden="true" /><span>{result}</span></li>)}
          </ul>
        </ProjectSection>
      ) : null}
      {p.demoVideoUrl && (
        <ProjectSection title="Project demo">
          <div className="project-preview">
            <video key={p.slug} controls playsInline preload="metadata" aria-label={`${p.title} demo video`}>
              <source src={p.demoVideoUrl} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </div>
        </ProjectSection>
      )}
      {p.problem && <ProjectSection title="The challenge"><p>{p.problem}</p></ProjectSection>}
      {p.solution && <ProjectSection title="The approach"><p>{p.solution}</p></ProjectSection>}
      {features.length > 0 && (
        <ProjectSection title="Key features">
          <ul className="project-feature-list">{features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </ProjectSection>
      )}
      {shots.length > 0 && (
        <ProjectSection title="Screenshots">
          <div className="project-screenshot-grid">
            {shots.map((s, i) => (
              <Button variant="ghost" key={s} onClick={() => setOpen(s)} aria-label={`Open screenshot ${i + 1} of ${p.title}`} className="project-screenshot-button">
                <SafeImage src={s} alt={`${p.title} screenshot ${i + 1}`} className="aspect-video w-full" />
              </Button>
            ))}
          </div>
        </ProjectSection>
      )}
      {nextProject && <nav className="project-next" aria-label="Project navigation"><span>Next case study</span><Link to="/project/$slug" params={{ slug: nextProject.slug }}><MixedTitle text={nextProject.title} /> <span aria-hidden="true">→</span></Link></nav>}
      <Lightbox src={open} alt={`${p.title} screenshot`} onClose={() => setOpen(null)} />
    </main>
  );
}
