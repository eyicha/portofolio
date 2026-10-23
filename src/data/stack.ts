// TODO: remove anything I have not used
export type StackItem = { label: string; short: string; group: string };

export const stack: { shelf: string; items: StackItem[] }[] = [
  {
    shelf: "Frontend",
    items: [
      { label: "HTML", short: "H", group: "Languages" },
      { label: "CSS", short: "C", group: "Languages" },
      { label: "JavaScript", short: "JS", group: "Languages" },
      { label: "TypeScript", short: "TS", group: "Languages" },
      { label: "React", short: "R", group: "Frameworks" },
      { label: "Bootstrap", short: "Bs", group: "Frameworks" },
      { label: "Tailwind CSS", short: "Tw", group: "Frameworks" },
      { label: "Chart.js", short: "Ch", group: "Libraries" },
      { label: "Leaflet", short: "Lf", group: "Libraries" },
      { label: "Vite", short: "V", group: "Tools" },
      { label: "Figma", short: "Fg", group: "Tools" },
      { label: "Canva", short: "Cv", group: "Tools" },
    ],
  },
  {
    shelf: "Backend",
    items: [
      { label: "PHP", short: "PHP", group: "Languages" },
      { label: "JavaScript", short: "JS", group: "Languages" },
      { label: "TypeScript", short: "TS", group: "Languages" },
      { label: "Python", short: "Py", group: "Languages" },
      { label: "SQL", short: "SQL", group: "Languages" },
      { label: "Laravel", short: "La", group: "Frameworks" },
      { label: "Node.js", short: "Nd", group: "Frameworks" },
      { label: "Blade", short: "Bl", group: "Libraries" },
      { label: "Composer", short: "Cp", group: "Libraries" },
      { label: "npm", short: "npm", group: "Libraries" },
      { label: "MySQL", short: "My", group: "Databases" },
      { label: "PostgreSQL", short: "Pg", group: "Databases" },
      { label: "REST API", short: "API", group: "Tools" },
      { label: "Postman", short: "Pm", group: "Tools" },
      { label: "Laragon", short: "Lg", group: "Tools" },
    ],
  },
  {
    shelf: "Data Analyst",
    items: [
      { label: "Python", short: "Py", group: "Languages" },
      { label: "SQL", short: "SQL", group: "Languages" },
      { label: "Pandas", short: "Pd", group: "Libraries" },
      { label: "NumPy", short: "Np", group: "Libraries" },
      { label: "Matplotlib", short: "Mt", group: "Libraries" },
      { label: "MySQL", short: "My", group: "Databases" },
      { label: "PostgreSQL", short: "Pg", group: "Databases" },
      { label: "Microsoft Excel", short: "Ex", group: "Tools" },
      { label: "Google Sheets", short: "Gs", group: "Tools" },
      { label: "Jupyter Notebook", short: "Jn", group: "Tools" },
      { label: "Google Colab", short: "Gc", group: "Tools" },
    ],
  },
  {
    shelf: "Everyday tools",
    items: [
      { label: "Git", short: "Git", group: "Tools" },
      { label: "GitHub", short: "Gh", group: "Tools" },
      { label: "VS Code", short: "VS", group: "Tools" },
    ],
  },
];