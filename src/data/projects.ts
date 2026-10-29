export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  status: string;
  summary: string;
  timeline: string;
  process: string[];
  roleDetails: string[];
  contributions: string[];
  achievements: string[];
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
  {
    slug: "villa-swarna-mandapa",
    title: "Villa Swarna Mandapa",
    year: "2026",
    role: "Project Manager & Backend Developer",
    status: "Client-approved · pending launch",
    summary: "A real-client villa booking website with a guest booking flow and DOKU payment integration.",
    timeline: "January–June 2026",
    process: [
      "Followed the Software Development Life Cycle (SDLC) using Scrum across a six-month project.",
      "Built the guest booking flow: booking page, reservation confirmation with an automatically generated unique booking code, then DOKU payment confirmation.",
      "Completed the wider four-page website around the guest booking and payment journey.",
    ],
    roleDetails: [
      "As Project Manager, planned the work and distributed tasks across the team.",
      "As Backend Developer, owned the guest-facing backend and integrated the DOKU payment gateway.",
    ],
    contributions: [
      "Built a Laravel backend integrated with the DOKU payment gateway.",
      "Coordinated project planning and distributed tasks across the team.",
    ],
    achievements: [
      "The client formally approved the website for use; production deployment is pending while the client settles remaining matters before launch.",
    ],
    problem: "",
    solution: "",
    features: [],
    stack: ["Laravel", "DOKU Payment Gateway", "Scrum", "SDLC"],
    liveUrl: "",
    githubUrl: "https://github.com/thisafif/swarna-mandapa",
    demoVideoUrl: "https://res.cloudinary.com/wibs4rxk/video/upload/v1793181198/1028_1.mp4",
    cover: "https://res.cloudinary.com/wibs4rxk/image/upload/v1793181348/Screenshot_2026-10-28_165510.png",
    screenshots: [],
  },
  {
    slug: "adil",
    title: "ADIL: Competition Work Similarity Detection",
    year: "",
    role: "Backend contributor",
    status: "",
    summary: "A competition-submission platform created to address concerns about plagiarism in Indonesian competitions.",
    timeline: "August–November 2026",
    process: [
      "The team divided work across the interface, backend, and similarity scoring.",
      "Investigated why identical poster uploads were receiving an incorrect similarity percentage.",
      "Improved and checked the scoring logic against identical poster submissions to make the returned percentages consistent.",
    ],
    roleDetails: [
      "Owned the similarity-percentage logic in the backend and worked to make the scores valid and trustworthy.",
      "Focused on scoring logic while teammates handled other interface and backend tasks.",
    ],
    contributions: [
      "Investigated why identical poster uploads initially returned a low similarity score.",
      "Reworked the backend scoring logic so identical submissions receive accurate and consistent similarity percentages.",
    ],
    achievements: ["Similarity percentages became accurate and consistent after my scoring-logic changes."],
    problem: "",
    solution: "",
    features: [],
    stack: ["Python", "Image similarity detection", "Similarity scoring"],
    liveUrl: "https://adil-cyan.vercel.app/",
    githubUrl: "https://github.com/dounfi/adil",
    demoVideoUrl: "https://res.cloudinary.com/wibs4rxk/video/upload/v1793181748/1028.mp4",
    cover: "https://res.cloudinary.com/wibs4rxk/image/upload/v1793181752/Screenshot_2026-10-28_170158.png",
    screenshots: [],
  },
  {
    slug: "ipb-rental",
    title: "IPB Rental",
    year: "",
    role: "Backend Engineer & Data Engineer",
    status: "",
    summary: "An item-rental platform with online payments through Midtrans.",
    timeline: "January–May 2026",
    process: [
      "Developed the rental platform backend and connected its application data in MongoDB.",
      "Integrated Midtrans and implemented online-payment transaction processing.",
      "Tested the booking and payment flow as part of delivering a working website.",
    ],
    roleDetails: [
      "Held the team's largest share of backend ownership and implemented the Midtrans payment integration and transaction processing.",
      "Connected and consolidated the MongoDB data layer, taking on data-engineering and data-administration responsibilities.",
      "Also contributed to parts of the user interface.",
    ],
    contributions: ["Led most of the backend work, connected the MongoDB data layer, and integrated Midtrans transactions."],
    achievements: ["Delivered a working rental website that users can use, with online payment support through Midtrans."],
    problem: "",
    solution: "",
    features: [],
    stack: ["PHP", "MongoDB", "Midtrans", "Backend development", "Transaction processing"],
    liveUrl: "",
    githubUrl: "https://github.com/eyicha/ipb-rental",
    demoVideoUrl: "https://res.cloudinary.com/wibs4rxk/video/upload/v1793184294/1028_2.mp4",
    cover: "https://res.cloudinary.com/wibs4rxk/image/upload/v1793183136/Screenshot_2026-10-28_172443.png",
    screenshots: [],
  },
  {
    slug: "kilau-build",
    title: "KILAU Build",
    year: "",
    role: "Backend Engineer",
    status: "Booking feature implemented",
    summary: "Contributed backend features to KILAU alongside the lead backend engineer.",
    timeline: "January–May 2026",
    process: [
      "Worked with the Laravel application to develop the booking workflow.",
      "Built booking logic that blocks selected dates for other users after a booking is made.",
      "Tested the booking behavior and contributed to interface design.",
    ],
    roleDetails: [
      "Worked as a Backend Engineer alongside the lead backend engineer.",
      "Implemented booking and date-blocking logic, and contributed to testing and UI design.",
    ],
    contributions: ["Implemented selected backend functionality in collaboration with the lead backend engineer."],
    achievements: ["The booking flow blocks dates selected by one user from being booked by other users."],
    problem: "",
    solution: "",
    features: [],
    stack: ["Laravel", "Booking and date-blocking logic", "Testing", "UI design"],
    liveUrl: "",
    githubUrl: "https://github.com/thisafif/projectkilaubuild",
    demoVideoUrl: "https://res.cloudinary.com/wibs4rxk/video/upload/v1793242060/1029_1.mp4",
    cover: "https://res.cloudinary.com/wibs4rxk/image/upload/v1793242066/Screenshot_2026-10-29_093324.png",
    screenshots: [],
  },
  {
    slug: "sentra",
    title: "SENTRA: Regional Data Analysis and Geospatial Mapping",
    year: "",
    role: "Data analyst, GIS analyst and project coordination",
    status: "In progress",
    summary: "An ongoing regional data analysis and geospatial mapping project designed to inform future field research.",
    timeline: "In progress",
    process: [
      "Analyze regional data to prepare it for interpretation and mapping.",
      "Use QGIS to develop geospatial maps from the analysis.",
      "Coordinate team tasks and goals while the project continues.",
    ],
    roleDetails: [
      "Conduct regional data analysis and geospatial mapping in QGIS.",
      "Coordinate team tasks and shared project goals.",
    ],
    contributions: [
      "Conducted data analysis and GIS work in QGIS while coordinating tasks across the team.",
    ],
    achievements: ["The analysis and mapping model is being prepared to support future field research; the project remains in progress."],
    problem: "",
    solution: "",
    features: [],
    stack: ["QGIS", "Data Analysis", "Geographic Information Systems (GIS)"],
    liveUrl: "",
    githubUrl: "https://github.com/NadaaaaH/sentra",
    cover: "/images/projects/sentra/cover.png",
    screenshots: [],
  },
  {
    slug: "facicheck",
    title: "FaciCheck",
    year: "",
    role: "Data and machine learning",
    status: "In progress",
    summary: "An ongoing project exploring the detection of Bell's palsy from facial images.",
    timeline: "In progress",
    process: [
      "Work with facial-image data for the Bell's palsy detection project.",
      "Develop the data and machine-learning components using computer-vision methods.",
      "Continue refining the system as the project progresses.",
    ],
    roleDetails: ["Build the data and machine-learning components of a facial-image analysis system using machine learning and computer vision."],
    contributions: ["Contribute to the data and machine-learning work for facial-image-based Bell's palsy detection."],
    achievements: ["The facial-image analysis system is in development; no final detection results are claimed yet."],
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
