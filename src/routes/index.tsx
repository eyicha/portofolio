import { createFileRoute } from "@tanstack/react-router";
import { FairyRiver } from "@/components/FairyRiver";
import { Opening } from "@/components/Opening";
import { CloudDivider } from "@/components/CloudDivider";
import { Hero, About, Stack, HowIWork, Portfolio, Honors, PublicationChapter, Certs, TheEnd } from "@/components/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portofolio | Erisa Salsabila" },
      { name: "description", content: "Portfolio of Erisa Salsabila, Data Analyst and Backend Engineer, Software Engineering student at IPB University." },
      { property: "og:title", content: "Portofolio | Erisa Salsabila" },
      { property: "og:description", content: "Erisa Salsabila turns data into stories and builds the systems behind them." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Opening />
      <main>
        <Hero />
        <FairyRiver />
        <About />
        <CloudDivider />
        <Stack />
        <CloudDivider swan id="b" />
        <HowIWork />
        <CloudDivider />
        <Portfolio />
        <CloudDivider swan flip id="c" />
        <Honors />
        <CloudDivider />
        <PublicationChapter />
        <CloudDivider swan flip id="d" />
        <Certs />
        <CloudDivider />
        <TheEnd />
      </main>
    </>
  );
}
