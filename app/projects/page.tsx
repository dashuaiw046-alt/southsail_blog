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
      <main className="page-main">
        <SectionHeading
          eyebrow="Build"
          title="Projects"
          description="A short list of things I am building. Links are omitted until a public repository or demo exists."
        />
        <div className="section-grid">
          {items.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </main>
    </PageShell>
  );
}
