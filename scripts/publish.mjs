import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function usage() {
  console.log(`Publish a Markdown note to GitHub. Netlify updates the blog after push.

Usage:
  npm run note
  npm run note -- <file.md> [...]
  npm run note -- --ctf <file.md>
  npm run note -- --article <file.md>
  npm run note -- --push-content

With no files, a Windows file picker opens, then a section picker.

Options:
  --article          Put files in content/articles
  --ctf              Put files in content/ctf
  --slug <name>      Override the destination filename (single file only)
  --title <text>     Override title when frontmatter is missing
  --force            Overwrite an existing note
  --no-push          Commit locally, do not push
  --dry-run          Show what would happen
  --push-content     Commit and push current content/ changes only
`);
}

function parseArgs(argv) {
  const options = {
    type: "articles",
    typeExplicit: false,
    files: [],
    slug: "",
    title: "",
    force: false,
    push: true,
    dryRun: false,
    pushContent: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      usage();
      process.exit(0);
    }
    if (arg === "--article") {
      options.type = "articles";
      options.typeExplicit = true;
      continue;
    }
    if (arg === "--ctf") {
      options.type = "ctf";
      options.typeExplicit = true;
      continue;
    }
    if (arg === "--force") {
      options.force = true;
      continue;
    }
    if (arg === "--no-push") {
      options.push = false;
      continue;
    }
    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (arg === "--push-content") {
      options.pushContent = true;
      continue;
    }
    if (arg === "--slug" || arg === "--title") {
      const value = argv[i + 1];
      if (!value || value.startsWith("-")) {
        throw new Error(`${arg} needs a value`);
      }
      options[arg.slice(2)] = value;
      i += 1;
      continue;
    }
    if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    }
    options.files.push(arg);
  }

  return options;
}

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^\w\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function quoteYaml(value) {
  return JSON.stringify(String(value));
}

function appendLog(message) {
  try {
    const logPath = path.join(os.tmpdir(), "southsail-publish.log");
    fs.appendFileSync(logPath, `${new Date().toISOString()} ${message}\n`);
  } catch {
    // ignore
  }
}

function runPicker(action) {
  const script = path.join(root, "scripts", "pick-note.ps1");
  const outFile = path.join(
    os.tmpdir(),
    `southsail-pick-${process.pid}-${Date.now()}-${action}.json`,
  );
  appendLog(`picker start action=${action} out=${outFile}`);
  const result = spawnSync(
    "powershell.exe",
    [
      "-NoProfile",
      "-STA",
      "-ExecutionPolicy",
      "Bypass",
      "-File",
      script,
      "-Action",
      action,
      "-OutFile",
      outFile,
    ],
    {
      encoding: "utf8",
      windowsHide: false,
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  const cleanup = () => {
    try {
      fs.unlinkSync(outFile);
    } catch {
      // ignore
    }
  };

  if (result.status === 2) {
    appendLog("picker cancelled");
    cleanup();
    return null;
  }
  if (result.status !== 0) {
    cleanup();
    const detail = (result.stderr || result.stdout || "").trim();
    appendLog(`picker failed status=${result.status} ${detail}`);
    throw new Error(`File picker failed${detail ? `\n${detail}` : ""}`);
  }

  try {
    if (!fs.existsSync(outFile)) {
      throw new Error("文件选择窗口没有返回结果。");
    }
    const raw = fs.readFileSync(outFile, "utf8").replace(/^\uFEFF/, "").trim();
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    const stdout = (result.stdout || "").trim();
    if (stdout) {
      try {
        return JSON.parse(stdout.replace(/^\uFEFF/, ""));
      } catch {
        // fall through
      }
    }
    throw error;
  } finally {
    cleanup();
  }
}

function pickFiles() {
  console.log("Opening file picker...");
  const picked = runPicker("files");
  if (!picked) return [];
  const files = Array.isArray(picked.files)
    ? picked.files
    : picked.files
      ? [picked.files]
      : [];
  return files.filter(Boolean);
}

function pickModule() {
  console.log("Choose Articles or CTF...");
  const picked = runPicker("module");
  if (!picked || (picked.type !== "articles" && picked.type !== "ctf")) {
    return null;
  }
  return picked.type;
}

function gitEnv() {
  const env = { ...process.env };
  if (!env.HOME && env.USERPROFILE) env.HOME = env.USERPROFILE;
  env.GIT_TERMINAL_PROMPT = "0";
  return env;
}

function gitConfigGet(key) {
  const result = spawnSync("git", ["config", "--get", key], {
    cwd: root,
    encoding: "utf8",
    env: gitEnv(),
  });
  return (result.stdout || "").trim();
}

function ensureGitIdentity() {
  if (!gitConfigGet("user.name")) {
    git(["config", "user.name", "southsail"]);
  }
  if (!gitConfigGet("user.email")) {
    git(["config", "user.email", "dashuaiw046-alt@users.noreply.github.com"]);
  }
}

function git(args, extra = {}) {
  const result = spawnSync("git", args, {
    cwd: root,
    encoding: "utf8",
    env: gitEnv(),
    stdio: extra.stdio ?? ["ignore", "pipe", "pipe"],
  });
  if (result.status !== 0) {
    const detail = (result.stderr || result.stdout || "").trim();
    throw new Error(`git ${args.join(" ")} failed${detail ? `\n${detail}` : ""}`);
  }
  return (result.stdout || "").trim();
}

function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: source.trim() };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const index = line.indexOf(":");
    if (index < 0) continue;
    const key = line.slice(0, index).trim();
    const raw = line.slice(index + 1).trim();
    data[key] = raw.replace(/^['"]|['"]$/g, "");
  }
  return { data, body: match[2].trim() };
}

function firstHeading(body) {
  const match = body.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() ?? "";
}

function firstParagraph(body) {
  const lines = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && !line.startsWith("```") && !line.startsWith(">") && !line.startsWith("-") && !line.startsWith("*"));
  return lines[0]?.slice(0, 160) ?? "";
}

function formatTags(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => quoteYaml(item)).join(", ")}]`;
  }
  if (typeof value === "string" && value.startsWith("[")) return value;
  if (typeof value === "string" && value) {
    return `[${value
      .split(",")
      .map((item) => quoteYaml(item.trim()))
      .filter((item) => item !== '""')
      .join(", ")}]`;
  }
  return "[]";
}

function buildFrontmatter(type, data, body, titleOverride) {
  const title = titleOverride || data.title || firstHeading(body) || "Untitled";
  const description = data.description || firstParagraph(body) || title;
  const date = data.date || today();
  const category = data.category || (type === "ctf" ? "CTF" : "Notes");
  const tags = formatTags(data.tags);
  const lines = [
    "---",
    `title: ${quoteYaml(title)}`,
    `description: ${quoteYaml(description)}`,
    `date: ${quoteYaml(date)}`,
    `category: ${quoteYaml(category)}`,
    `tags: ${tags}`,
  ];

  if (type === "ctf") {
    lines.push(`difficulty: ${data.difficulty || 3}`);
    lines.push(`platform: ${quoteYaml(data.platform || "Practice")}`);
  }

  lines.push("---", "");
  return { yaml: lines.join("\n"), title };
}

function destinationSlug(filePath, override) {
  if (override) return slugify(override);
  const base = path.basename(filePath, path.extname(filePath));
  const slug = slugify(base);
  if (!slug) throw new Error(`Cannot build a slug from ${filePath}`);
  return slug;
}

function resolveSource(filePath) {
  const absolute = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(absolute)) {
    throw new Error(`File not found: ${filePath}`);
  }
  if (!/\.(md|mdx)$/i.test(absolute)) {
    throw new Error(`Only .md / .mdx files are supported: ${filePath}`);
  }
  return absolute;
}

function alreadyInContent(filePath) {
  const relative = path.relative(path.join(root, "content"), filePath);
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function writeNote(type, sourcePath, options) {
  const source = fs.readFileSync(sourcePath, "utf8");
  const { data, body } = parseFrontmatter(source);
  const slug = destinationSlug(sourcePath, options.slug);
  const destDir = path.join(root, "content", type);
  const destPath = path.join(destDir, `${slug}.mdx`);
  const { yaml, title } = buildFrontmatter(type, data, body, options.title);
  const output = `${yaml}${body}\n`;

  if (path.resolve(sourcePath) === path.resolve(destPath)) {
    if (!options.dryRun) fs.writeFileSync(destPath, output);
    return { destPath, title, slug, copied: false };
  }

  if (fs.existsSync(destPath) && !options.force) {
    throw new Error(`${path.relative(root, destPath)} already exists. Use --force to overwrite.`);
  }

  if (!options.dryRun) {
    fs.mkdirSync(destDir, { recursive: true });
    fs.writeFileSync(destPath, output);
  }

  return { destPath, title, slug, copied: true };
}

function contentChanges() {
  const output = git(["status", "--porcelain", "--", "content"]);
  if (!output) return [];
  return output.split(/\r?\n/).filter(Boolean);
}

function publishGit(files, title, options) {
  const relative = files.map((file) => path.relative(root, file));
  if (options.dryRun) {
    console.log(`Would git add:\n  ${relative.join("\n  ")}`);
    console.log(`Would commit: publish: ${title}`);
    if (options.push) console.log("Would git push origin HEAD");
    return;
  }

  ensureGitIdentity();
  git(["add", "--", ...relative]);
  const staged = git(["diff", "--cached", "--name-only", "--", "content"]);
  if (!staged) {
    console.log("Nothing new to commit.");
    return;
  }

  git(["commit", "-m", `publish: ${title}`]);
  console.log(`Committed: publish: ${title}`);

  if (!options.push) {
    console.log("Skipped push (--no-push).");
    return;
  }

  try {
    git(["push", "-u", "origin", "HEAD"], { stdio: "inherit" });
  } catch (error) {
    throw new Error(
      `${error instanceof Error ? error.message : error}\n\n推送失败。可检查：\n  1. SSH 密钥 C:\\Users\\31205\\.ssh\\id_ed25519_github\n  2. 手动执行: git -C "${root}" push\n  笔记已经提交在本地，修好网络后再推即可。`,
    );
  }
  console.log("Pushed. Netlify will update https://southsail.netlify.app");
}

function main() {
  appendLog(`publish.mjs argv=${JSON.stringify(process.argv.slice(2))} cwd=${process.cwd()}`);
  const options = parseArgs(process.argv.slice(2));

  if (options.pushContent) {
    const changes = contentChanges();
    if (!changes.length) {
      console.log("No content/ changes to publish.");
      return;
    }
    console.log("Content changes:\n" + changes.join("\n"));
    const files = [path.join(root, "content")];
    publishGit(files, "content update", options);
    return;
  }

  if (!options.files.length) {
    options.files = pickFiles();
    if (!options.files.length) {
      console.log("Cancelled.");
      return;
    }
  }

  if (!options.typeExplicit) {
    const folders = new Set(
      options.files.map((file) => {
        const absolute = path.resolve(process.cwd(), file);
        if (!alreadyInContent(absolute)) return "";
        return path.relative(path.join(root, "content"), absolute).split(path.sep)[0];
      }),
    );
    if (folders.size === 1 && (folders.has("articles") || folders.has("ctf"))) {
      options.type = [...folders][0];
    } else {
      const picked = pickModule();
      if (!picked) {
        console.log("Cancelled.");
        return;
      }
      options.type = picked;
    }
  }

  if (options.slug && options.files.length > 1) {
    throw new Error("--slug can only be used with one file");
  }

  const published = [];
  for (const file of options.files) {
    const sourcePath = resolveSource(file);
    const inContent = alreadyInContent(sourcePath);
    const type = inContent
      ? path.relative(path.join(root, "content"), sourcePath).split(path.sep)[0]
      : options.type;
    if (type !== "articles" && type !== "ctf") {
      throw new Error("Notes must go to content/articles or content/ctf");
    }
    const result = writeNote(type, sourcePath, options);
    published.push(result);
    const dest = path.relative(root, result.destPath).replaceAll("\\", "/");
    console.log(`${result.copied ? "Wrote" : "Updated"} ${dest}`);
    console.log(
      `  URL: /${type === "ctf" ? "ctf" : "articles"}/${result.slug}`,
    );
  }

  const title =
    published.length === 1 ? published[0].title : `${published.length} notes`;
  publishGit(
    published.map((item) => item.destPath),
    title,
    options,
  );
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  appendLog(`error ${message}`);
  console.error(message);
  process.exit(1);
}
