import Link from "next/link";

import type { ContentItem } from "@/lib/content";
import { formatDate } from "@/lib/content";

export default function ArticleCard({ item }: { item: ContentItem }) {
  return (
    <Link
      href={`/articles/${item.slug}`}
      className="card"
      style={{
        borderColor: "var(--border)",
        background: "var(--surface)",
      }}
    >
      <p className="text-xs uppercase tracking-widest text-[var(--muted)]">
        {item.category}
      </p>
      <h2 className="mt-4 text-xl font-medium">{item.title}</h2>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
      <div className="mt-6 flex items-center justify-between text-xs text-[var(--muted)]">
        <span>{formatDate(item.date)}</span>
        <span>{item.readingTime}</span>
      </div>
      <div className="mt-4 text-sm text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-1">
        Read article →
      </div>
    </Link>
  );
}
