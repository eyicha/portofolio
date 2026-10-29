import { createFileRoute, Link } from "@tanstack/react-router";
import { Chapter } from "@/components/ornaments";
import { publications } from "@/data/publications";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications | Erisa Salsabila" },
      { name: "description", content: "Research and literary publications by Erisa Salsabila." },
      { property: "og:title", content: "Publications | Erisa Salsabila" },
      { property: "og:description", content: "Research and literary publications by Erisa Salsabila." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PublicationsPage,
});

function PublicationsPage() {
  return (
    <main>
      <Chapter n="Seven" title="Publications">
        <div className="publication-archive">
          <p className="publication-archive-intro">Research and writing collected along the way.</p>
          <ol className="publication-archive-list">
            {publications.map((publication) => (
              <li key={publication.title} className="publication-archive-item">
                <article>
                  <p className="publication-archive-kind">{publication.kind ?? "Publication"}</p>
                  <h3>{publication.title}</h3>
                  {publication.venue && <p className="publication-archive-venue">{publication.venue}</p>}
                  <p className="publication-archive-meta">
                    {[publication.role, publication.date].filter(Boolean).join(" · ")}
                  </p>
                  {publication.description && <p className="publication-archive-description">{publication.description}</p>}
                  {publication.url && (
                    <a href={publication.url} target="_blank" rel="noopener noreferrer" className="publication-archive-source">
                      {publication.kind === "Journal article" ? "Read journal article" : "View book publication"} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </article>
              </li>
            ))}
          </ol>
          <Link to="/" hash="honors" className="publication-archive-back">Back to honors and awards</Link>
        </div>
      </Chapter>
    </main>
  );
}
