import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { howIWorkSteps } from "@/data/how-i-work";
import { stack } from "@/data/stack";
import { projects, type Project } from "@/data/projects";
import { awards, type Award } from "@/data/awards";
import { publications } from "@/data/publications";
import { certs, type Cert } from "@/data/certs";
import { Chapter, SafeImage, Star, WaxSeal } from "./ornaments";
import { StoryModal } from "./Chrome";
import { MixedTitle } from "./MixedTitle";
import { Button } from "./ui/button";
import { useGlowCard } from "@/hooks/useGlowCard";

export { StoryHero as Hero } from "./StoryHero";

export function About() {
  return (
    <Chapter n="Two" title="About Me" id="story">
      <div className="about-copy" data-scroll-blur>
        <div className="space-y-5 p-2 text-lg leading-relaxed md:p-6">
          <p className="about-lead" data-scroll-text>I work where numbers meet people.</p>
          <p data-scroll-text><span className="float-left mr-2 font-script text-6xl leading-none text-deep-rose">{profile.bio.charAt(0)}</span><HighlightPhrase text={profile.bio.slice(1)} phrase="data analysis and backend engineering" /></p>
          <p data-scroll-text><HighlightPhrase text={profile.direction} phrase="Project Manager for four client projects" /></p>
          <p className="text-base" data-scroll-text><HighlightPhrase text={profile.otherExperience} phrase="Head of Department D" /> <a href="https://www.linkedin.com/in/erisa-salsabila" target="_blank" rel="noopener noreferrer" className="text-deep-rose underline underline-offset-4">See LinkedIn</a> for the full timeline.</p>
        </div>
      </div>
    </Chapter>
  );
}

function HighlightPhrase({ text, phrase }: { text: string; phrase: string }) {
  const start = text.indexOf(phrase);
  if (start === -1) return text;
  const end = start + phrase.length;
  return <>{text.slice(0, start)}<mark className="text-highlight">{phrase}</mark>{text.slice(end)}</>;
}

export function Stack() {
  const [selectedShelf, setSelectedShelf] = useState(stack[0]?.shelf ?? "");
  const subtitles: Record<string, string> = {
    Frontend: "What I build screens with",
    Backend: "What powers my services",
    "Data Analyst": "How I read and explain data",
    "Everyday tools": "Tools I reach for every day",
  };
  return (
    <Chapter n="Three" title="Stack and Tools" id="stack">
      <div className="stack-area-grid">
        <div className="stack-tabs" role="tablist" aria-label="Technology areas">
          {stack.map((area, index) => {
            const tabId = `stack-tab-${index}`;
            return (
              <button
                key={area.shelf}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={selectedShelf === area.shelf}
                aria-controls="stack-area-panel"
                tabIndex={selectedShelf === area.shelf ? 0 : -1}
                className="stack-tab"
                onClick={() => setSelectedShelf(area.shelf)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                  event.preventDefault();
                  const direction = event.key === "ArrowRight" ? 1 : -1;
                  const next = (index + direction + stack.length) % stack.length;
                  setSelectedShelf(stack[next].shelf);
                  document.getElementById(`stack-tab-${next}`)?.focus();
                }}
              >
                {area.shelf}
              </button>
            );
          })}
        </div>
        {stack.filter((area) => area.shelf === selectedShelf).map((area) => (
          <section key={area.shelf} id="stack-area-panel" role="tabpanel" aria-labelledby={`stack-tab-${stack.indexOf(area)}`} className="stack-area-panel">
            <header className="stack-shelf-header">
              <h3 className="stack-area-heading"><MixedTitle text={area.shelf} /></h3>
              <p className="stack-area-subtitle">{subtitles[area.shelf]}</p>
            </header>
            <div className="stack-groups">
              {[...new Set(area.items.map((item) => item.group))].map((group) => {
                const items = area.items.filter((item) => item.group === group);
                if (!items.length) return null;
                return (
                  <section key={group} className="stack-item-group">
                    <h4 className="stack-group-heading">{group}</h4>
                    <ul className="stack-skill-list">{items.map((item) => <li key={`${item.label}-${item.short}`} className="stack-skill-chip"><span>{item.label}</span>{item.usedIn && <small>Used in: {item.usedIn}</small>}</li>)}</ul>
                  </section>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </Chapter>
  );
}

export function HowIWork() {
  return (
    <Chapter n="Four" title="How I Work">
      <p className="how-tagline" data-scroll-text>Skills start a project. Habits finish it.</p>
      <div className="how-flower-intro">
        <p className="how-flower-letters" aria-hidden="true">{"FLOWER".split("").map((letter, index) => <span key={`${letter}-${index}`}>{letter}</span>)}</p>
        <p className="sr-only">FLOWER: Frame, Listen, Own, Welcome, Examine, Respect</p>
      </div>
      <div className="how-steps-grid">
        {howIWorkSteps.map((step) => (
          <HowStepCard key={step.letter} step={step} />
        ))}
      </div>
      <aside className="how-ai-note">
        <h3><MixedTitle text="How I use AI" /></h3>
        <p>AI is my assistant, not my replacement. I never paste private data, credentials or client information into it, and I read, test and understand everything it produces before it goes into my work.</p>
      </aside>
    </Chapter>
  );
}

function HowStepCard({ step }: { step: (typeof howIWorkSteps)[number] }) {
  const glowRef = useGlowCard<HTMLElement>();
  return (
    <div className="how-step-reveal" data-scroll-reveal="rise">
      <article ref={glowRef} tabIndex={0} className="how-step-card glow-card">
        <span className="how-step-letter" aria-hidden="true">{step.letter}</span>
        <div className="how-step-content">
          <h3 className="mt-2 font-display text-2xl font-semibold"><MixedTitle text={step.title} /></h3>
          <p className="mt-2 text-sm" data-scroll-text>{step.text}</p>
        </div>
      </article>
    </div>
  );
}

export function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const glowRef = useGlowCard<HTMLDivElement>();
  return (
    <div className="project-card-reveal" data-scroll-reveal="rise">
      <div ref={glowRef} role="button" tabIndex={0} aria-label={`View project: ${p.title}`} onClick={onOpen} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpen(); } }} className="group project-card glow-card block rounded-lg p-3">
        <article className="project-plate relative p-4">
          <div className="project-cover-frame overflow-hidden rounded-xl border border-rose/40 bg-pearl" data-scroll-image>
            <div className="flex items-center gap-1.5 bg-blush px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose" />
              <span className="h-2.5 w-2.5 rounded-full bg-blush" />
              <span className="h-2.5 w-2.5 rounded-full bg-foil" />
              <span className="ml-2 h-4 flex-1 rounded-full bg-pearl/80" />
            </div>
            <SafeImage src={p.cover} alt={`${p.title} cover`} className="aspect-video w-full" />
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-3">
            <h3 className="project-title font-display font-semibold"><MixedTitle text={p.title} /></h3>
            {p.year && <span className="font-display italic text-mauve">{p.year}</span>}
          </div>
          {p.role && <p className="text-sm">{p.role}</p>}
          {p.status?.toLowerCase() === "in progress" && <span className="mt-2 inline-flex rounded-full border border-foil bg-cream px-3 py-1 text-xs text-deep-rose">{p.status}</span>}
          {p.stack.length > 0 && <ul className="mt-3 flex flex-wrap gap-2">
            {p.stack.map((s, i) => <li key={i} className="rounded-full bg-blush px-3 py-0.5 text-xs">{s}</li>)}
          </ul>}
        </article>
      </div>
    </div>
  );
}

export function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <Chapter n="Five" title="Portfolio" id="work">
      <div className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">{projects.map((p) => <ProjectCard key={p.slug} p={p} onOpen={() => setSelected(p)} />)}</div>
      {selected && <ProjectViewer project={selected} onClose={() => setSelected(null)} />}
    </Chapter>
  );
}

export function Honors() {
  const [selected, setSelected] = useState<Award | null>(null);
  return (
    <Chapter n="Six" title="Honors and Awards" id="honors">
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {awards.map((award, index) => <AwardCard key={index} award={award} onOpen={() => setSelected(award)} />)}
      </ul>
      {selected && <AwardViewer award={selected} onClose={() => setSelected(null)} />}
    </Chapter>
  );
}

export function PublicationChapter() {
  return (
    <Chapter n="Seven" title="Publications" id="publications">
      <div className="home-publications">
        <p className="home-publications-intro">Research and writing collected along the way.</p>
        <ul className="home-publication-list">
          {publications.map((publication) => (
            <li key={publication.title} className="home-publication-item">
              <span className="home-publication-tape" aria-hidden="true" />
              <article className="home-publication-paper">
                <span className="home-publication-kind">{publication.kind}</span>
                <h3>{publication.title}</h3>
                <p>{[publication.venue, publication.date].filter(Boolean).join(" · ")}</p>
                {publication.url && <a href={publication.url} target="_blank" rel="noopener noreferrer">View publication <span aria-hidden="true">↗</span></a>}
              </article>
            </li>
          ))}
        </ul>
        <Link to="/publications" className="home-publications-details">Publication details</Link>
      </div>
    </Chapter>
  );
}

function AwardCard({ award, onOpen }: { award: Award; onOpen: () => void }) {
  const glowRef = useGlowCard<HTMLDivElement>();
  return (
    <li data-scroll-reveal="rise" className={`min-w-0${award.event === "ITS Summit Fest" ? " award-card-ongoing" : ""}`}>
      <div ref={glowRef} role="button" tabIndex={0} aria-label={`View award: ${award.title}`} onClick={onOpen} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpen(); } }} className="award-card glow-card relative">
        <div aria-hidden="true" data-scroll-image className="award-medal pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-6">
          <svg width="70" height="90" viewBox="0 0 70 90">
            <path d="M20 40l-8 46 13-8 8 12 4-50zM50 40l8 46-13-8-8 12-4-50z" fill="var(--blush)" stroke="var(--rose)" />
            <circle cx="35" cy="32" r="24" fill="var(--rose)" stroke="var(--pearl)" strokeWidth="3" />
            <circle cx="35" cy="32" r="16" fill="var(--blush)" />
            <path d="M35 20l3.5 7.5 8 1-6 5.5 1.5 8-7-4-7 4 1.5-8-6-5.5 8-1z" fill="var(--foil)" />
          </svg>
        </div>
        <div className="award-content">
          <p className="mt-6 font-display text-sm italic text-mauve">{award.placement}</p>
          <h3 className="font-display text-2xl font-semibold"><MixedTitle text={award.title} /></h3>
          <p className="mt-1 text-sm">{[award.event, award.year].filter(Boolean).join(" | ")}</p>
          {award.description && <p className="award-description" data-scroll-text>{award.description}</p>}
          {award.contribution && <p className="award-contribution">{award.contribution}</p>}
          <span className="award-view-hint">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></svg>
            {award.file ? "Click to view proof" : "Click for details"}
          </span>
        </div>
      </div>
    </li>
  );
}

export function Certs() {
  const [selected, setSelected] = useState<Cert | null>(null);
  return (
    <Chapter n="Eight" title="Certifications">
      <ul className="certificate-grid">
        {certs.map((cert) => (
          <CertificateTicket key={cert.image} cert={cert} onView={() => setSelected(cert)} />
        ))}
      </ul>
      {selected && <CertificateViewer cert={selected} onClose={() => setSelected(null)} />}
    </Chapter>
  );
}

function CertificateTicket({ cert, onView }: { cert: Cert; onView: () => void }) {
  const glowRef = useGlowCard<HTMLButtonElement>();
  const [missing, setMissing] = useState(false);
  const filename = cert.image.split("/").pop() || cert.image;

  return (
    <li className="certificate-item">
      <Button ref={glowRef} variant="ghost" aria-label={`View certificate: ${cert.title}`} onClick={onView} className="certificate-card glow-card">
        <span className="certificate-image-frame" data-scroll-image>
          {missing ? (
            <span role="img" aria-label={`Missing certificate image: ${filename}`} className="certificate-placeholder">{filename}</span>
          ) : (
            <img src={cert.image} alt={cert.title} loading="lazy" onError={() => setMissing(true)} />
          )}
          <span className="certificate-frame-inner" aria-hidden="true" />
          <span className="certificate-frame-corners" aria-hidden="true" />
          <span className="certificate-seal" aria-hidden="true"><WaxSeal size={40} /></span>
        </span>
        <span className="certificate-details">
          <span className="certificate-title-row"><Star className="certificate-star" size={15} /><span className="certificate-title"><MixedTitle text={cert.title} /></span></span>
          {(cert.issuer || cert.year) && <span className="certificate-meta">
            {cert.issuer && <span className="certificate-issuer">{cert.issuer}</span>}
            {cert.issuer && cert.year && <span className="certificate-meta-divider" aria-hidden="true" />}
            {cert.year && <span className="certificate-year">{cert.year}</span>}
          </span>}
        </span>
      </Button>
    </li>
  );
}

function CertificateViewer({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  return (
    <StoryModal open label={`Certificate: ${cert.title}`} onClose={onClose}>
      <h3 className="story-modal-heading">{cert.title}</h3>
      {[cert.issuer, cert.year].filter(Boolean).length > 0 && <p className="story-modal-copy">{[cert.issuer, cert.year].filter(Boolean).join(" | ")}</p>}
      {cert.date && <p className="story-modal-copy">{cert.date}</p>}
      {cert.credentialId && <p className="story-modal-copy">Credential ID: {cert.credentialId}</p>}
      {cert.note && <p className="story-modal-note">{cert.note}</p>}
      <PortfolioFile file={cert.file} fileType={cert.fileType} title={cert.title} />
    </StoryModal>
  );
}

function AwardViewer({ award, onClose }: { award: Award; onClose: () => void }) {
  return (
    <StoryModal open label={`Award: ${award.title}`} onClose={onClose}>
      <h3 className="story-modal-heading">{award.title}</h3>
      {[award.placement, award.event, award.year].filter(Boolean).length > 0 && <p className="story-modal-copy">{[award.placement, award.event, award.year].filter(Boolean).join(" | ")}</p>}
      {award.description && <p className="story-modal-copy">{award.description}</p>}
      {award.contribution && <p className="story-modal-copy award-modal-contribution">{award.contribution}</p>}
      <PortfolioFile file={award.file} fileType={award.fileType} title={award.title} />
    </StoryModal>
  );
}

function PortfolioFile({ file, fileType, title }: { file?: string; fileType?: "image" | "pdf" | ""; title: string }) {
  const [zoomed, setZoomed] = useState(false);
  const [missing, setMissing] = useState(false);
  if (!file || missing) return <p className="story-modal-note">Certificate coming soon</p>;
  if (fileType === "pdf") return (
    <>
      <iframe title={`${title} PDF`} src={file} className="story-modal-frame" />
      <a href={file} target="_blank" rel="noopener noreferrer" className="story-modal-link">Open in new tab</a>
    </>
  );
  return (
    <button type="button" aria-label={zoomed ? "Zoom out" : "Zoom image"} onClick={() => setZoomed(!zoomed)} className="story-modal-image-button">
      <img src={file} alt={title} onError={() => setMissing(true)} className={`story-modal-file ${zoomed ? "is-zoomed" : ""}`} />
    </button>
  );
}

function ProjectViewer({ project, onClose }: { project: Project; onClose: () => void }) {
  const configuredLiveUrl = isConfiguredUrl(project.liveUrl) ? project.liveUrl : "";
  const configuredGithubUrl = isConfiguredUrl(project.githubUrl) ? project.githubUrl : "";
  const canOpenCaseStudy = isConfiguredUrl(project.slug);
  const metadata = [project.role, project.year].filter(Boolean).join(" | ");
  return (
    <StoryModal open label={`Project: ${project.title}`} onClose={onClose}>
      <h3 className="story-modal-heading">{project.title}</h3>
      {metadata && <p className="story-modal-copy">{metadata}</p>}
      {project.summary && <p className="mt-3">{project.summary}</p>}
      {project.contributions.length ? (
        <ul className="mt-3 list-none space-y-2">
          {project.contributions.slice(0, 2).map((contribution) => <li key={contribution} className="flex items-start gap-2"><Star size={10} className="mt-1 shrink-0 text-[var(--foil)]" /><span>{contribution}</span></li>)}
        </ul>
      ) : null}
      {project.stack.length > 0 && <ul className="story-modal-chips">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>}
      <ProjectPreview project={project} liveUrl={configuredLiveUrl} />
      <div className="story-modal-actions">
        {configuredLiveUrl && <a href={configuredLiveUrl} target="_blank" rel="noopener noreferrer" className="story-modal-link">Open website</a>}
        {configuredGithubUrl && <a href={configuredGithubUrl} target="_blank" rel="noopener noreferrer" className="story-modal-link">GitHub</a>}
        {canOpenCaseStudy && <Link to="/project/$slug" params={{ slug: project.slug }} className="story-modal-link">View case study</Link>}
      </div>
    </StoryModal>
  );
}

function ProjectPreview({ project, liveUrl }: { project: Project; liveUrl: string }) {
  const [fallback, setFallback] = useState(!liveUrl);
  const [imageMissing, setImageMissing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!liveUrl) return;
    setFallback(false);
    timer.current = setTimeout(() => setFallback(true), 4000);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [liveUrl]);
  return (
    <div className="project-preview">
      {project.demoVideoUrl ? (
        <video key={project.slug} controls playsInline preload="metadata" aria-label={`${project.title} demo video`}>
          <source src={project.demoVideoUrl} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      ) : (
        <>
          {!fallback && <iframe title={`${project.title} live preview`} src={liveUrl} loading="lazy" sandbox="allow-scripts allow-forms allow-popups" onLoad={() => { if (timer.current) clearTimeout(timer.current); setFallback(false); }} />}
          {fallback && (imageMissing ? <span className="project-preview-placeholder">{project.cover.split("/").pop() || project.cover}</span> : <img src={project.cover} alt={`${project.title} preview`} loading="lazy" onError={() => setImageMissing(true)} />)}
        </>
      )}
    </div>
  );
}

function isConfiguredUrl(value: string) {
  return Boolean(value.trim() && !value.toLowerCase().includes("todo"));
}

export { TwilightClosing as TheEnd } from "./TwilightClosing";
