import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import { rehypeCodeMeta, rehypeHeadingIds } from "@/lib/rehype";
import { mdxComponents } from "./mdx-components";

const prettyCodeOptions = {
  theme: "github-dark-default",
  keepBackground: false,
  defaultLang: "text",
};

export default async function ArticleBody({ body }: { body: string }) {
  return (
    <div className="article-body">
      <MDXRemote
        source={body}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [rehypePrettyCode, prettyCodeOptions],
              rehypeCodeMeta,
              rehypeHeadingIds,
            ],
          },
        }}
      />
    </div>
  );
}
