function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

function withHttps(host: string) {
  if (host.startsWith("http://") || host.startsWith("https://")) {
    return stripTrailingSlash(host);
  }
  return `https://${stripTrailingSlash(host)}`;
}

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return withHttps(explicit);

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProduction) return withHttps(vercelProduction);

  return "http://localhost:3000";
}

function resolveGithubUrl() {
  const value = process.env.NEXT_PUBLIC_GITHUB_URL?.trim();
  if (value) return withHttps(value);
  return "https://github.com/dashuaiw046-alt";
}

export const site = {
  name: "southsail",
  title: "southsail Blog",
  description:
    "Personal technical blog covering cybersecurity, CTF, programming, cryptography and learning notes.",
  url: resolveSiteUrl(),
  author: "southsail",
  github: resolveGithubUrl(),
  keywords: [
    "Cybersecurity",
    "CTF",
    "Cryptography",
    "Programming",
    "Python",
    "C++",
    "Big Data",
    "Learning Notes",
  ],
} as const;
