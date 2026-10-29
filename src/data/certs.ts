export type Cert = { title: string; issuer: string; year: string; image: string; file: string; fileType: "image" | "pdf"; date?: string; credentialId?: string; note?: string };

export const certs: Cert[] = [
  {
    title: "Google Gemini AI Student",
    issuer: "Gemini",
    year: "2026",
    date: "Issued Sep 2026, expires Sep 2029",
    image: "https://res.cloudinary.com/wibs4rxk/image/upload/v1793245465/gemini.jpg",
    file: "https://res.cloudinary.com/wibs4rxk/image/upload/v1793245465/gemini.jpg",
    fileType: "image",
  },
  {
    title: "think-cell Certified Professional",
    issuer: "think-cell Software",
    year: "2026",
    date: "Issued Sep 2026",
    credentialId: "think-cell CP",
    note: "Earned after following the DWDG BCC SEA webinar",
    image: "https://res.cloudinary.com/wibs4rxk/image/upload/v1793245467/thinkcel.jpg",
    file: "https://res.cloudinary.com/wibs4rxk/image/upload/v1793245467/thinkcel.jpg",
    fileType: "image",
  },
  {
    title: "Seven Habits",
    issuer: "",
    year: "2024",
    date: "August 2024",
    image: "https://res.cloudinary.com/wibs4rxk/image/upload/v1793245408/Screenshot_2026-10-29_104249.png",
    file: "https://res.cloudinary.com/wibs4rxk/image/upload/v1793245408/Screenshot_2026-10-29_104249.png",
    fileType: "image",
  },
  {
    title: "Motion Graphics Editing",
    issuer: "",
    year: "2025",
    date: "May 2025",
    image: "https://res.cloudinary.com/wibs4rxk/image/upload/v1793248820/Erisa_Salsabila_1.jpg",
    file: "https://res.cloudinary.com/wibs4rxk/image/upload/v1793248820/Erisa_Salsabila_1.jpg",
    fileType: "image",
  },
];
