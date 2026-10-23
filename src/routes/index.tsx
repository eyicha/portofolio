import { createFileRoute } from "@tanstack/react-router";
import { FairyRiver } from "@/components/FairyRiver";
import { Opening } from "@/components/Opening";
import { CloudDivider } from "@/components/CloudDivider";
import { Hero, About, Stack, HowIWork, Portfolio, Honors, Certs, TheEnd } from "@/components/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Erisa's Fairy Tale | Erisa Salsabila, Data Analyst & Backend Engineer" },
      { name: "description", content: "Portfolio of Erisa Salsabila, Data Analyst and Backend Engineer, Software Engineering student at IPB University." },
      { property: "og:title", content: "Erisa's Fairy Tale" },
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
        <Certs />
        <CloudDivider />
        <TheEnd />
      </main>
    </>
  );
}
