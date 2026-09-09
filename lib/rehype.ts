import { slugify } from "@/lib/content";

type HastNode = {
  type?: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

function walk(node: HastNode, visit: (node: HastNode) => void) {
  visit(node);
  node.children?.forEach((child) => walk(child, visit));
}

function textOf(node: HastNode): string {
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(textOf).join("");
}

export function rehypeHeadingIds() {
  return (tree: HastNode) => {
    walk(tree, (node) => {
      if (node.tagName !== "h1" && node.tagName !== "h2" && node.tagName !== "h3") {
        return;
      }
      const id = slugify(textOf(node));
      if (!id) return;
      node.properties = node.properties ?? {};
      if (!node.properties.id) node.properties.id = id;
    });
  };
}

export function rehypeCodeMeta() {
  return (tree: HastNode) => {
    walk(tree, (node) => {
      if (node.tagName !== "figure") return;

      const titleNode = node.children?.find(
        (child) =>
          child.tagName === "figcaption" &&
          child.properties &&
          "data-rehype-pretty-code-title" in child.properties,
      );
      const pre = node.children?.find((child) => child.tagName === "pre");
      const code = pre?.children?.find((child) => child.tagName === "code");
      if (!pre) return;

      pre.properties = pre.properties ?? {};
      const language = code?.properties?.["data-language"];
      if (typeof language === "string") {
        pre.properties["data-language"] = language;
      }
      if (titleNode) {
        pre.properties["data-filename"] = textOf(titleNode);
      }
    });
  };
}
