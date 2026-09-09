import Link from "next/link";

import type { ContentItem } from "@/lib/content";
import { formatDate } from "@/lib/content";

function difficultyLabel(value?: number) {
  if (!value) return "Unrated";
  return `${value} / 5`;
}

export default function CtfCard({ item }: { item: ContentItem }) {
  return (
    <Link
      href={`/ctf/${item.slug}`}
      className="group rounded-2xl border p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--surface-hover)]"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
      }}
    >
      <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-widest text-[var(--muted)]">
        <span>{item.category || "CTF"}</span>
        <span>{difficultyLabel(item.difficulty)}</span>
      </div>
      <h2 className="mt-4 text-xl font-medium">{item.title}</h2>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
      <div className="mt-6 flex items-center justify-between text-xs text-[var(--muted)]">
        <span>{item.platform ?? "Practice"}</span>
        <span>{formatDate(item.date)}</span>
      </div>
      <div className="mt-4 text-sm text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-1">
        Open writeup →
      </div>
    </Link>
  );
}
