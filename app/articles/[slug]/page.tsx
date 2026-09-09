import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ArticleBody from "@/components/article/ArticleBody";
import ArticleLayout from "@/components/article/ArticleLayout";
import PageShell from "@/components/layout/PageShell";
import { getContent, getContentBySlug, getNeighbors } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getContent("articles").map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug("articles", slug);
  if (!item) return { title: "Article" };

  return {
    title: item.title,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const item = getContentBySlug("articles", slug);
  if (!item) notFound();

  const { previous, next } = getNeighbors("articles", slug);

  return (
    <PageShell>
      <ArticleLayout
        item={item}
        previous={previous}
        next={next}
        backHref="/articles"
        backLabel="All articles"
      >
        <ArticleBody body={item.body} />
      </ArticleLayout>
    </PageShell>
  );
}
