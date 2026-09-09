import Link from "next/link";

import type { ContentItem } from "@/lib/content";

type NeighborNavProps = {
  basePath: "/articles" | "/ctf";
  previous?: ContentItem;
  next?: ContentItem;
};

export default function NeighborNav({
  basePath,
  previous,
  next,
}: NeighborNavProps) {
  return (
    <nav
      className="mt-16 grid gap-4 border-t pt-6 sm:grid-cols-2"
      style={{ borderColor: "var(--border)" }}
    >
      {previous ? (
        <Link
          href={`${basePath}/${previous.slug}`}
          className="rounded-2xl border p-4 transition-colors hover:bg-[var(--surface-hover)]"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs uppercase tracking-widest text-[var(--muted)]">
            Previous
          </p>
          <p className="mt-2 text-sm">← {previous.title}</p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`${basePath}/${next.slug}`}
          className="rounded-2xl border p-4 text-right transition-colors hover:bg-[var(--surface-hover)]"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs uppercase tracking-widest text-[var(--muted)]">Next</p>
          <p className="mt-2 text-sm">{next.title} →</p>
        </Link>
      ) : null}
    </nav>
  );
}
