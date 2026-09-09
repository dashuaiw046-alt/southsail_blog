"use client";

import { useState, type ComponentPropsWithoutRef } from "react";

type CodeBlockProps = ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
  "data-filename"?: string;
};

export default function CodeBlock({
  children,
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const language = props["data-language"] ?? "text";
  const filename = props["data-filename"];

  async function copy() {
    const text = extractText(children);
    if (!text) return;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div
      className="group relative my-6 overflow-hidden rounded-2xl border"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--background) 72%, black)",
      }}
    >
      <div
        className="flex items-center justify-between gap-3 border-b px-3 py-2 text-xs sm:px-4"
        style={{ borderColor: "var(--border)", color: "var(--muted)" }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="uppercase tracking-wider">{language}</span>
          {filename ? (
            <span className="truncate text-[var(--foreground)]">{filename}</span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={copy}
          className="rounded-full border px-3 py-1 transition-colors hover:text-[var(--foreground)]"
          style={{ borderColor: "var(--border)" }}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        {...props}
        className={`max-w-full overflow-x-auto p-3 text-[13px] leading-6 sm:p-4 sm:text-sm sm:leading-7 ${className ?? ""}`}
      >
        {children}
      </pre>
    </div>
  );
}

function extractText(node: unknown): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: unknown } }).props;
    return extractText(props?.children);
  }
  return "";
}
