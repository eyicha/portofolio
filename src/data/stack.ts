// Edit freely. `short` is the 1 to 3 letter monogram shown in the tile.
export type StackItem = { label: string; short: string; group: "Language" | "Framework" | "Database" | "Tool" };

export const stack: { shelf: string; items: StackItem[] }[] = [
  {
    shelf: "Data Analyst",
    items: [
      { label: "TODO Language", short: "L1", group: "Language" },
      { label: "TODO Language", short: "L2", group: "Language" },
      { label: "TODO Library", short: "F1", group: "Framework" },
      { label: "TODO Database", short: "D1", group: "Database" },
      { label: "TODO BI Tool", short: "T1", group: "Tool" },
      { label: "TODO Tool", short: "T2", group: "Tool" },
    ],
  },
  {
    shelf: "Backend Engineer",
    items: [
      { label: "TODO Language", short: "L1", group: "Language" },
      { label: "TODO Framework", short: "F1", group: "Framework" },
      { label: "TODO Framework", short: "F2", group: "Framework" },
      { label: "TODO Database", short: "D1", group: "Database" },
      { label: "TODO Database", short: "D2", group: "Database" },
      { label: "TODO Tool", short: "T1", group: "Tool" },
    ],
  },
];
