import type { Metadata } from "next";

import PageShell from "@/components/layout/PageShell";
import ProjectCard from "@/components/project/ProjectCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects and experiments by southsail.",
};

export default function ProjectsPage() {
  const items = getProjects();

  return (
    <PageShell>
      <main className="mx-auto min-h-[70vh] max-w-7xl px-5 py-12 md:px-6 md:py-20 lg:px-8">
        <SectionHeading
          eyebrow="Build"
          title="Projects"
          description="A short list of things I am building. Links are omitted until a public repository or demo exists."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </main>
    </PageShell>
  );
}
