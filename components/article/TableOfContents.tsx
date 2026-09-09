import type { TocItem } from "@/lib/content";

export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="space-y-3">
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--primary)]">
        Contents
      </p>
      <ol className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={`${item.level}-${item.id}`} className={item.level > 2 ? "pl-4" : item.level > 1 ? "pl-2" : ""}>
            <a
              href={`#${item.id}`}
              className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
