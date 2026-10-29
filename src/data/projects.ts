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
  demoVideoUrl?: string;
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
    summary: "A villa-booking website supported by a Laravel backend and DOKU payment integration.",
    results: [
      "Built a Laravel backend integrated with the DOKU payment gateway.",
      "No exploitable access path was identified during the security checks conducted.",
      "Coordinated project planning and distributed tasks across the team.",
    ],
    problem: "",
    solution: "",
    features: [],
    stack: ["Laravel", "DOKU Payment Gateway", "Backend Development", "Project Management"],
    liveUrl: "",
    githubUrl: "https://github.com/thisafif/swarna-mandapa",
    demoVideoUrl: "https://res.cloudinary.com/wibs4rxk/video/upload/v1793181198/1028_1.mp4",
    cover: "https://res.cloudinary.com/wibs4rxk/image/upload/v1793181348/Screenshot_2026-10-28_165510.png",
    screenshots: [],
  },
  // TODO: add liveUrl, problem, solution, features, screenshots
  {
    slug: "adil",
    title: "ADIL: Competition Work Similarity Detection",
    year: "",
    role: "Backend contributor",
    status: "",
    summary: "A web platform that checks competition submissions, including posters, for similarity.",
    results: [
      "Identified an accuracy issue: uploading the same poster twice initially returned a low similarity score.",
      "Reworked the backend comparison logic so identical posters return a 100% similarity score.",
    ],
    problem: "",
    solution: "",
    features: [],
    stack: ["Python", "Back-End Web Development", "Image Similarity Detection", "Similarity Scoring", "Algorithm Improvement"],
    liveUrl: "https://adil-cyan.vercel.app/",
    githubUrl: "https://github.com/dounfi/adil",
    demoVideoUrl: "https://res.cloudinary.com/wibs4rxk/video/upload/v1793181748/1028.mp4",
    cover: "https://res.cloudinary.com/wibs4rxk/image/upload/v1793181752/Screenshot_2026-10-28_170158.png",
    screenshots: [],
  },
  // TODO: add liveUrl, problem, solution, features, screenshots
  {
    slug: "ipb-rental",
    title: "IPB Rental",
    year: "",
    role: "Backend contributor",
    status: "",
    summary: "An item-rental platform with online payments through Midtrans.",
    problem: "",
    solution: "",
    features: [],
    stack: ["Midtrans", "Backend Development", "Payment Gateway Integration", "Item Rental Platform", "Transaction Processing"],
    liveUrl: "",
    githubUrl: "https://github.com/eyicha/ipb-rental",
    demoVideoUrl: "https://res.cloudinary.com/wibs4rxk/video/upload/v1793184294/1028_2.mp4",
    cover: "https://res.cloudinary.com/wibs4rxk/image/upload/v1793183136/Screenshot_2026-10-28_172443.png",
    screenshots: [],
  },
  // TODO: add liveUrl, problem, solution, features, screenshots
  {
    slug: "kilau-build",
    title: "KILAU Build",
    year: "",
    role: "Supporting backend engineer",
    status: "",
    summary: "Contributed backend features to KILAU alongside the lead backend engineer.",
    results: ["Implemented selected backend functionality in collaboration with the lead backend engineer."],
    problem: "",
    solution: "",
    features: [],
    stack: ["Laravel", "Testing", "User Interface Design"],
    liveUrl: "",
    githubUrl: "https://github.com/thisafif/projectkilaubuild",
    demoVideoUrl: "https://res.cloudinary.com/wibs4rxk/video/upload/v1793242060/1029_1.mp4",
    cover: "https://res.cloudinary.com/wibs4rxk/image/upload/v1793242066/Screenshot_2026-10-29_093324.png",
    screenshots: [],
  },
  // TODO: add liveUrl, problem, solution, features, screenshots
  {
    slug: "sentra",
    title: "SENTRA: Regional Data Analysis and Geospatial Mapping",
    year: "",
    role: "Data analyst, GIS analyst and project coordination",
    status: "In progress",
    summary: "An ongoing regional data analysis and geospatial mapping project designed to inform future field research.",
    results: [
      "Developed an analysis and mapping model to support future field research, including potential use by community service (KKN) teams.",
      "Conducted data analysis and GIS work in QGIS while coordinating tasks across the team.",
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
    slug: "facicheck",
    title: "FaciCheck",
    year: "",
    role: "Data and machine learning",
    status: "In progress",
    summary: "An ongoing project exploring the detection of Bell's palsy from facial images.",
    results: ["Contribute to the data and machine-learning work for facial-image-based Bell's palsy detection."],
    problem: "",
    solution: "",
    features: [],
    stack: ["Machine Learning", "Computer Vision", "Facial Image Analysis", "Data Analysis"],
    liveUrl: "",
    githubUrl: "",
    cover: "/images/projects/facicheck/cover.png",
    screenshots: [],
  },
];
