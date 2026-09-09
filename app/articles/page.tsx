import type { Metadata } from "next";

import ArticleCard from "@/components/article/ArticleCard";
import PageShell from "@/components/layout/PageShell";
import SectionHeading from "@/components/ui/SectionHeading";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Articles",
  description: "Cybersecurity, programming, and learning notes.",
};

export const dynamic = "force-static";

export default function ArticlesPage() {
  const items = getContent("articles");

  return (
    <PageShell>
      <main className="mx-auto min-h-[70vh] max-w-7xl px-5 py-12 md:px-6 md:py-20 lg:px-8">
        <SectionHeading
          eyebrow="Knowledge base"
          title="Articles"
          description="Technical notes on web security, programming, and the things I am still figuring out."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ArticleCard key={item.slug} item={item} />
          ))}
        </div>
      </main>
    </PageShell>
  );
}
