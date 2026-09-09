import { formatDate } from "@/lib/content";
import type { ContentItem } from "@/lib/content";

export default function ContentMeta({ item }: { item: ContentItem }) {
  return (
    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
      {item.date ? <span>{formatDate(item.date)}</span> : null}
      <span>{item.readingTime}</span>
      {item.category ? <span>{item.category}</span> : null}
      {item.platform ? <span>{item.platform}</span> : null}
      {item.difficulty ? <span>Difficulty {item.difficulty} / 5</span> : null}
    </div>
  );
}
