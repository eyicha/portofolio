export type Publication = {
  title: string;
  venue?: string;
  date?: string;
  role?: string;
  description?: string;
  url?: string;
};

export const publications: Publication[] = [
  // TODO: add url
  {
    title: "Analisis Usability dan Credibility Platform IPB DiSign Menggunakan System Usability Scale dan User Experience Honeycomb",
    venue: "IRPI MALCOM: Indonesian Journal of Machine Learning and Computer Science",
    date: "January 2026",
    role: "Author and data analyst",
    description: "Evaluated the usability and credibility of the IPB DiSign platform with the System Usability Scale and the User Experience Honeycomb framework. I carried out the data analysis.",
    url: "",
  },
  // TODO: add url
  {
    title: "Rindu yang Tersembunyi di Hati",
    venue: "Detak Pustaka",
    date: "March 2026",
    role: "Contributing writer",
    description: "Selected as a contributing writer for a poetry anthology, with an original poem.",
    url: "",
  },
];