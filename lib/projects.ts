export type ProjectStatus = "active" | "in-progress" | "paused";

export type Project = {
  slug: string;
  name: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "personal-blog",
    name: "Personal Blog",
    description:
      "A personal technical blog for cybersecurity notes, CTF writeups, and programming logs. Built as a static content site with a character-themed visual layer.",
    stack: ["Next.js", "TypeScript", "MDX", "Tailwind CSS"],
    status: "in-progress",
  },
  {
    slug: "ai-coding-platform",
    name: "AI Coding Platform",
    description:
      "An experimental workspace for AI-assisted coding, local workflows, and collaborative programming experiments.",
    stack: ["TypeScript", "Python", "Next.js"],
    status: "in-progress",
  },
];

export function getProjects() {
  return projects;
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function statusLabel(status: ProjectStatus) {
  if (status === "active") return "Active";
  if (status === "paused") return "Paused";
  return "In progress";
}
