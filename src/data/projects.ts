export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  status: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  liveUrl: string;
  githubUrl: string;
  cover: string;
  screenshots: string[];
};

const make = (n: number): Project => ({
  slug: `project-${n}`,
  title: `TODO Project ${n}`,
  year: "TODO",
  role: n % 2 ? "Data Analyst" : "Backend Engineer",
  status: "TODO",
  summary: "TODO: One sentence on what this project does and who it helps.",
  problem: "TODO: What was broken, slow or unclear before this project.",
  solution: "TODO: What you built and the key decision behind it.",
  features: ["TODO feature one", "TODO feature two", "TODO feature three"],
  stack: ["TODO", "TODO"],
  liveUrl: "",
  githubUrl: "",
  cover: `/images/projects/project-${n}.png`,
  screenshots: [`/images/projects/project-${n}-1.png`, `/images/projects/project-${n}-2.png`],
});

export const projects: Project[] = [1, 2, 3, 4].map(make);
