export interface Update {
  date: string;
  title: string;
  body: string;
  tag: "register" | "scaffold" | "site" | "project";
  roll?: string;
}

// Curated, human-readable changelog for the whole register. Only high-level
// information belongs here because this site is public.
export const updates: Update[] = [
  {
    date: "2026-09-24",
    title: "Register published",
    body: "All nine CH4114 project entries were standardised into a single register with a consistent problem statement, methodology and analysis plan.",
    tag: "register",
  },
  {
    date: "2026-09-24",
    title: "Per-project repositories scaffolded",
    body: "Each roll number now has a private, view-only repository containing its problem statement, methodology, analysis plan, timeline and a reproducible scaffold.",
    tag: "scaffold",
  },
  {
    date: "2026-09-24",
    title: "Tracker site launched",
    body: "This Astro-based tracker was created to browse every project, read all problem statements in one place and follow activity across the group.",
    tag: "site",
  },
];
