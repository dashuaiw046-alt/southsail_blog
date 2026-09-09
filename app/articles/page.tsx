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
      <main className="page-main">
        <SectionHeading
          eyebrow="Knowledge base"
          title="Articles"
          description="Technical notes on web security, programming, and the things I am still figuring out."
        />
        <div className="section-grid is-articles">
          {items.map((item) => (
            <ArticleCard key={item.slug} item={item} />
          ))}
        </div>
      </main>
    </PageShell>
  );
}
