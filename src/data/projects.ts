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

export const projects: Project[] = [
  // TODO: add liveUrl, githubUrl, problem, solution, features
  {
    slug: "villa-swarna-mandapa",
    title: "Villa Swarna Mandapa",
    year: "2026",
    role: "Project coordination",
    status: "Completed",
    summary: "Coordinated project planning and task distribution to support the development process.",
    problem: "",
    solution: "",
    features: [],
    stack: ["Project Management", "Web Development"],
    liveUrl: "",
    githubUrl: "",
    cover: "/images/projects/villa-swarna-mandapa/cover.png",
    screenshots: ["/images/projects/villa-swarna-mandapa/1.png", "/images/projects/villa-swarna-mandapa/2.png", "/images/projects/villa-swarna-mandapa/3.png"],
  },
  // TODO: add liveUrl, githubUrl, problem, solution, features
  {
    slug: "adil",
    title: "ADIL: Competition Work Similarity Detection",
    year: "",
    role: "Backend contributor",
    status: "",
    summary: "Contributed to backend development for a web-based platform for competition work similarity detection.",
    problem: "",
    solution: "",
    features: [],
    stack: ["Back-End Web Development", "Web Development"],
    liveUrl: "",
    githubUrl: "",
    cover: "/images/projects/adil/cover.png",
    screenshots: ["/images/projects/adil/1.png", "/images/projects/adil/2.png", "/images/projects/adil/3.png"],
  },
  // TODO: add liveUrl, githubUrl, problem, solution, features
  {
    slug: "kilau-build",
    title: "KILAU Build",
    year: "",
    role: "Backend contributor",
    status: "",
    summary: "Contributed to the development of the KILAU project by supporting selected backend functionality.",
    problem: "",
    solution: "",
    features: [],
    stack: ["Testing", "User Interface Design"],
    liveUrl: "",
    githubUrl: "",
    cover: "/images/projects/kilau-build/cover.png",
    screenshots: ["/images/projects/kilau-build/1.png", "/images/projects/kilau-build/2.png", "/images/projects/kilau-build/3.png"],
  },
  // TODO: add liveUrl, githubUrl, problem, solution, features
  {
    slug: "sentra",
    title: "SENTRA: Regional Data Analysis and Geospatial Mapping",
    year: "",
    role: "Project coordination",
    status: "",
    summary: "Managed project coordination and task distribution to support the team's project objectives.",
    problem: "",
    solution: "",
    features: [],
    stack: ["Data Analysis", "Geographic Information Systems (GIS)"],
    liveUrl: "",
    githubUrl: "",
    cover: "/images/projects/sentra/cover.png",
    screenshots: ["/images/projects/sentra/1.png", "/images/projects/sentra/2.png", "/images/projects/sentra/3.png"],
  },
];
