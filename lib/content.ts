import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ContentType = "articles" | "ctf";

export type ContentMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  difficulty?: number;
  platform?: string;
};

export type TocItem = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

export type ContentItem = ContentMeta & {
  body: string;
  readingTime: string;
  toc: TocItem[];
};

const root = path.join(process.cwd(), "content");

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^\w\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function asString(value: unknown, fallback = "") {
  if (typeof value === "string") return value;
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return fallback;
}

function asTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean);
  }
  return [];
}

function asNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && /^\d+$/.test(value.trim())) {
    return Number(value.trim());
  }
  return undefined;
}

export function readingTime(body: string) {
  const text = body.trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  const cjk = (text.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const minutes = Math.max(1, Math.ceil((words + cjk * 0.5) / 180));
  return `${minutes} min read`;
}

export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  let inCode = false;

  for (const line of markdown.replace(/\r/g, "").split("\n")) {
    if (line.trim().startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    const match = /^(#{1,3})\s+(.+)$/.exec(line);
    if (!match) continue;

    const text = match[2].replace(/[#*`]/g, "").trim();
    const id = slugify(text);
    if (!id) continue;

    items.push({
      id,
      text,
      level: match[1].length as 1 | 2 | 3,
    });
  }

  return items;
}

function parseFile(filePath: string): ContentItem {
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const body = content.trim();

  return {
    slug: path.basename(filePath, path.extname(filePath)),
    title: asString(data.title, "Untitled"),
    description: asString(data.description),
    date: asString(data.date),
    category: asString(data.category),
    tags: asTags(data.tags),
    difficulty: asNumber(data.difficulty),
    platform: data.platform ? asString(data.platform) : undefined,
    body,
    readingTime: readingTime(body),
    toc: extractToc(body),
  };
}

export function getContent(type: ContentType): ContentItem[] {
  const directory = path.join(root, type);
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => parseFile(path.join(directory, file)))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getContentBySlug(type: ContentType, slug: string) {
  return getContent(type).find((item) => item.slug === slug);
}

export function getNeighbors(type: ContentType, slug: string) {
  const items = getContent(type);
  const index = items.findIndex((item) => item.slug === slug);

  return {
    previous: index >= 0 ? items[index + 1] : undefined,
    next: index > 0 ? items[index - 1] : undefined,
  };
}

export function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
