import Link from "next/link";

import { site } from "@/lib/site";

const links = [
  { href: "/articles", label: "Articles" },
  { href: "/ctf", label: "CTF" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/settings", label: "Settings" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-col gap-1" style={{ color: "var(--muted)" }}>
          <span>© 2026 southsail</span>
          <span>Technology First · Character Themed</span>
        </div>
        <nav className="flex flex-wrap gap-4" style={{ color: "var(--muted)" }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[var(--foreground)]"
            >
              {link.label}
            </Link>
          ))}
          {site.github ? (
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[var(--foreground)]"
            >
              GitHub
            </a>
          ) : null}
        </nav>
      </div>
    </footer>
  );
}
