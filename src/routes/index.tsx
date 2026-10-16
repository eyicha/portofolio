import { createFileRoute } from "@tanstack/react-router";
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
        <CloudDivider swan id="a" />
        <About />
        <Stack />
        <CloudDivider swan flip id="b" />
        <HowIWork />
        <Portfolio />
        <CloudDivider swan id="c" />
        <Honors />
        <Certs />
        <CloudDivider swan flip id="d" />
        <TheEnd />
      </main>
    </>
  );
}
