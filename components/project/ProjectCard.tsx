import type { Project } from "@/lib/projects";
import { statusLabel } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="card"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-xl font-medium">{project.name}</h2>
        <span
          className="rounded-full border px-3 py-1 text-xs"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          {statusLabel(project.status)}
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span
            key={item}
            className="rounded-full border px-3 py-1 text-xs text-[var(--muted)]"
            style={{ borderColor: "var(--border)" }}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-4 text-sm text-[var(--primary)]">
        {project.github ? (
          <a href={project.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        ) : (
          <span className="text-[var(--muted)]">GitHub — coming soon</span>
        )}
        {project.demo ? (
          <a href={project.demo} target="_blank" rel="noreferrer">
            Demo
          </a>
        ) : (
          <span className="text-[var(--muted)]">Demo — local only</span>
        )}
      </div>
    </article>
  );
}
