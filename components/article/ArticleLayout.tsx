import Link from "next/link";
import type { ReactNode } from "react";

import ContentMeta from "@/components/article/ContentMeta";
import NeighborNav from "@/components/article/NeighborNav";
import TableOfContents from "@/components/article/TableOfContents";
import type { ContentItem } from "@/lib/content";

type ArticleLayoutProps = {
  item: ContentItem;
  previous?: ContentItem;
  next?: ContentItem;
  backHref: "/articles" | "/ctf";
  backLabel: string;
  extra?: ReactNode;
  children: ReactNode;
};

export default function ArticleLayout({
  item,
  previous,
  next,
  backHref,
  backLabel,
  extra,
  children,
}: ArticleLayoutProps) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
      <Link href={backHref} className="text-sm text-[var(--primary)]">
        ← {backLabel}
      </Link>
      <div className="mt-10 grid gap-12 xl:grid-cols-[minmax(0,1fr)_220px]">
        <article className="min-w-0">
          <header className="border-b pb-10" style={{ borderColor: "var(--border)" }}>
            {item.category ? (
              <p className="text-sm uppercase tracking-[0.25em] text-[var(--primary)]">
                {item.category}
              </p>
            ) : null}
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {item.title}
            </h1>
            {item.description ? (
              <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
                {item.description}
              </p>
            ) : null}
            <ContentMeta item={item} />
            {item.tags.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 text-xs text-[var(--muted)]"
                    style={{ borderColor: "var(--border)" }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
            {extra}
          </header>
          <div className="mt-10">{children}</div>
          <NeighborNav basePath={backHref} previous={previous} next={next} />
        </article>
        <aside className="hidden xl:block">
          <div className="sticky top-28">
            <TableOfContents items={item.toc} />
          </div>
        </aside>
      </div>
    </main>
  );
}
