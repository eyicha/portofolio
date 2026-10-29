import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import { SafeImage, Star } from "@/components/ornaments";
import { Lightbox } from "@/components/Chrome";
import { MixedTitle } from "@/components/MixedTitle";
import { Button } from "@/components/ui/button";
import { useScrollEffects } from "@/components/ScrollEffects";

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
    <section className="project-section" data-case-reveal>
      <h2><MixedTitle text={title} /></h2>
      <div className="project-section-body">{children}</div>
    </section>
  );
}

function ProjectPage() {
  const { project: p } = Route.useLoaderData();
  const scrollEffects = useScrollEffects();
  const [open, setOpen] = useState<string | null>(null);
  useEffect(() => {
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        scrollEffects?.lenis?.scrollTo(0, { duration: 0 });
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      if (secondFrame) cancelAnimationFrame(secondFrame);
    };
  }, [p.slug, scrollEffects]);

  useEffect(() => {
    const root = document.documentElement;
    const main = document.querySelector<HTMLElement>(".project-case-study");
    if (!main) return;
    const targets = Array.from(main.querySelectorAll<HTMLElement>("[data-case-reveal]"));
    const reduceMotion = root.dataset.motion === "reduced" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((element) => element.style.setProperty("--case-scroll-progress", "1"));
      return;
    }

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const start = window.innerHeight * 0.94;
      const end = window.innerHeight * 0.58;
      targets.forEach((element, index) => {
        const top = element.getBoundingClientRect().top;
        const stagger = Math.min(index % 3, 2) * 0.035;
        const progress = Math.max(0, Math.min(1, (start - top) / (start - end) - stagger));
        element.style.setProperty("--case-scroll-progress", String(progress));
      });
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };

    main.dataset.caseScrollReady = "true";
    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
      delete main.dataset.caseScrollReady;
    };
  }, [p.slug]);
  const shots = (p.screenshots ?? []).filter(Boolean);
  const stack = p.stack ?? [];
  const achievements = p.achievements ?? [];
  const currentIndex = projects.findIndex((item) => item.slug === p.slug);
  const nextProject = projects.length > 1 ? projects[(currentIndex + 1) % projects.length] : undefined;
  return (
    <main className="project-case-study">
      <Link to="/" hash="work" className="project-back-link">← <MixedTitle text="Back to portfolio" /></Link>
      <header className="project-case-hero" data-case-reveal>
        <p className="project-case-kicker">Project {String(currentIndex + 1).padStart(2, "0")}</p>
        <h1 className="project-detail-title"><MixedTitle text={p.title} /></h1>
        <div className="project-case-meta">
          {p.role && <span className="project-role-badge">{p.role}</span>}
          {p.status && <span className={p.status.toLowerCase() === "in progress" ? "project-status is-progress" : "project-status"}>{p.status}</span>}
        </div>
        {p.timeline && <p className="project-timeline"><span>Timeline</span>{p.timeline}</p>}
        {p.summary && <p className="project-case-summary">{p.summary}</p>}
        <div className="project-case-cover-frame" data-case-reveal data-scroll-image>
          <SafeImage src={p.cover} alt={`${p.title} project cover`} className="project-case-cover" />
        </div>
        {stack.length > 0 && <>
          <p className="project-case-stack-label">Tech stack</p>
          <ul className="project-case-stack" aria-label="Technologies and skills">
            {stack.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </>}
        {(p.liveUrl || p.githubUrl) && <div className="project-case-actions">
          {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="project-action-primary">Visit project</a>}
          {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="project-action-secondary">View source on GitHub</a>}
        </div>}
      </header>
      <ProjectSection title="Process">
        <ol className="project-process-list">
          {p.process.map((step, index) => <li key={`${index}-${step}`}><span className="project-process-number">{String(index + 1).padStart(2, "0")}</span><span>{step}</span></li>)}
        </ol>
      </ProjectSection>
      <ProjectSection title="My role">
        <ul className="project-role-list">
          {p.roleDetails.map((detail) => <li key={detail}><Star size={12} aria-hidden="true" /><span>{detail}</span></li>)}
        </ul>
      </ProjectSection>
      <ProjectSection title={p.status.toLowerCase() === "in progress" ? "Result so far" : "Result"}>
        <ul className="project-role-list">
          {achievements.map((achievement) => <li key={achievement}><Star size={12} aria-hidden="true" /><span>{achievement}</span></li>)}
        </ul>
      </ProjectSection>
      {(p.demoVideoUrl || shots.length > 0) && (
        <ProjectSection title="Project media">
          {p.demoVideoUrl && (
            <div className="project-preview" data-case-reveal data-scroll-image>
              <video key={p.slug} controls playsInline preload="metadata" aria-label={`${p.title} demo video`}>
                <source src={p.demoVideoUrl} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </div>
          )}
          {shots.length > 0 && (
          <div className="project-screenshot-grid">
            {shots.map((s, i) => (
              <Button variant="ghost" key={s} onClick={() => setOpen(s)} aria-label={`Open screenshot ${i + 1} of ${p.title}`} className="project-screenshot-button" data-case-reveal data-scroll-image>
                <SafeImage src={s} alt={`${p.title} screenshot ${i + 1}`} className="aspect-video w-full" />
              </Button>
            ))}
          </div>
          )}
        </ProjectSection>
      )}
      {nextProject && <nav className="project-next" aria-label="Project navigation" data-case-reveal><span>Next case study</span><Link to="/project/$slug" params={{ slug: nextProject.slug }}><MixedTitle text={nextProject.title} /> <span aria-hidden="true">→</span></Link></nav>}
      <Lightbox src={open} alt={`${p.title} screenshot`} onClose={() => setOpen(null)} />
    </main>
  );
}
