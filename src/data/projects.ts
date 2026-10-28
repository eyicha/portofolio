export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  status: string;
  summary: string;
  results?: string[];
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
  // TODO: add liveUrl, problem, solution, features, screenshots
  {
    slug: "villa-swarna-mandapa",
    title: "Villa Swarna Mandapa",
    year: "2026",
    role: "Backend and project coordination",
    status: "Completed",
    summary: "A villa booking website with a Laravel backend integrated with the DOKU payment gateway.",
    results: [
      "Built a Laravel backend that integrates cleanly with the DOKU payment gateway.",
      "In the security checks carried out so far, no way to break in was found.",
      "Coordinated project planning and task distribution across the team.",
    ],
    problem: "",
    solution: "",
    features: [],
    stack: ["Laravel", "DOKU Payment Gateway", "Backend Development", "Project Management"],
    liveUrl: "",
    githubUrl: "https://github.com/thisafif/swarna-mandapa",
    cover: "/images/projects/villa-swarna-mandapa/cover.png",
    screenshots: [],
  },
  // TODO: add liveUrl, problem, solution, features, screenshots
  {
    slug: "adil",
    title: "ADIL: Competition Work Similarity Detection",
    year: "",
    role: "Backend contributor",
    status: "",
    summary: "A web platform that checks competition entries, such as posters, for similarity.",
    results: [
      "Found that the early similarity check was inaccurate: uploading the same poster twice reported only a small similarity.",
      "Rewrote the checking logic in the backend until identical posters scored 100 percent.",
    ],
    problem: "",
    solution: "",
    features: [],
    stack: ["Python", "Back-End Web Development"],
    liveUrl: "",
    githubUrl: "https://github.com/dounfi/adil",
    cover: "/images/projects/adil/cover.png",
    screenshots: [],
  },
  // TODO: add liveUrl, problem, solution, features, screenshots
  {
    slug: "ipb-rental",
    title: "IPB Rental",
    year: "",
    role: "Backend contributor",
    status: "",
    summary: "An item rental platform with online payment through Midtrans.",
    problem: "",
    solution: "",
    features: [],
    stack: ["Midtrans"],
    liveUrl: "",
    githubUrl: "https://github.com/eyicha/ipb-rental",
    cover: "/images/projects/ipb-rental/cover.png",
    screenshots: [],
  },
  // TODO: add liveUrl, problem, solution, features, screenshots
  {
    slug: "kilau-build",
    title: "KILAU Build",
    year: "",
    role: "Supporting backend engineer",
    status: "",
    summary: "Supported the backend of the KILAU project alongside the lead backend engineer.",
    results: ["Contributed selected backend functionality, working under the lead backend engineer."],
    problem: "",
    solution: "",
    features: [],
    stack: ["Laravel", "Testing", "User Interface Design"],
    liveUrl: "",
    githubUrl: "https://github.com/thisafif/projectkilaubuild",
    cover: "/images/projects/kilau-build/cover.png",
    screenshots: [],
  },
  // TODO: add liveUrl, problem, solution, features, screenshots
  {
    slug: "sentra",
    title: "SENTRA: Regional Data Analysis and Geospatial Mapping",
    year: "",
    role: "Data analyst, GIS analyst and project coordination",
    status: "In progress",
    summary: "A regional data analysis and geospatial mapping project built so that later field research can rely on it.",
    results: [
      "Built an analysis and mapping model that is accurate and ready for further field research, for example by community service (KKN) teams.",
      "Carried out the data analysis and GIS work in QGIS, and coordinated tasks across the team.",
    ],
    problem: "",
    solution: "",
    features: [],
    stack: ["QGIS", "Data Analysis", "Geographic Information Systems (GIS)"],
    liveUrl: "",
    githubUrl: "https://github.com/NadaaaaH/sentra",
    cover: "/images/projects/sentra/cover.png",
    screenshots: [],
  },
  // TODO: add liveUrl, problem, solution, features, screenshots
  {
    slug: "fastvision",
    title: "FastVision",
    year: "",
    role: "Data and machine learning",
    status: "In progress",
    summary: "A project in progress to detect Bell's palsy from facial images.",
    results: ["I work on the machine learning and data for facial Bell's palsy detection."],
    problem: "",
    solution: "",
    features: [],
    stack: [],
    liveUrl: "",
    githubUrl: "",
    cover: "/images/projects/fastvision/cover.png",
    screenshots: [],
  },
];
