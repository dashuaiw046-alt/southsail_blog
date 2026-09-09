import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { slugify } from "@/lib/content";
import CodeBlock from "./CodeBlock";

function headingText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(headingText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return headingText((children as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

function Heading({
  as: Tag,
  children,
  ...props
}: ComponentPropsWithoutRef<"h1"> & { as: "h1" | "h2" | "h3" }) {
  const id = props.id ?? slugify(headingText(children));

  return (
    <Tag id={id} {...props} className="scroll-mt-28">
      {children}
    </Tag>
  );
}

function SmartLink({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
}

function MDXImage(props: ComponentPropsWithoutRef<"img">) {
  const src = typeof props.src === "string" ? props.src : "";
  const alt = props.alt ?? "";

  if (!src) return null;

  if (src.startsWith("/")) {
    return (
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={720}
        className="h-auto w-full rounded-2xl border"
        style={{ borderColor: "var(--border)" }}
      />
    );
  }

  return (
    // External images stay as native img to avoid remotePatterns config.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="h-auto w-full rounded-2xl border"
      style={{ borderColor: "var(--border)" }}
    />
  );
}

export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => <Heading as="h1" {...props} />,
  h2: (props: ComponentPropsWithoutRef<"h2">) => <Heading as="h2" {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h3">) => <Heading as="h3" {...props} />,
  p: (props: ComponentPropsWithoutRef<"p">) => <p {...props} />,
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <SmartLink {...props} style={{ color: "var(--primary)" }} />
  ),
  img: MDXImage,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => <ul {...props} />,
  ol: (props: ComponentPropsWithoutRef<"ol">) => <ol {...props} />,
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} />,
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table {...props} />
    </div>
  ),
  pre: CodeBlock,
  code: (props: ComponentPropsWithoutRef<"code">) => <code {...props} />,
};
