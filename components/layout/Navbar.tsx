"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

const links = [
  { href: "/articles", label: "Articles" },
  { href: "/ctf", label: "CTF" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={`site-header${transparent ? " is-transparent" : ""}`}>
      <nav className="site-nav">
        <Link href="/" className="site-logo">
          southsail
        </Link>

        <div className="nav-desktop">
          {links.map((link) => {
            const active = isActive(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm"
                style={{
                  color: active ? "var(--foreground)" : "var(--muted)",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeSwitcher />
        </div>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open ? (
        <div id="mobile-nav" className="nav-mobile">
          {links.map((link) => {
            const active = isActive(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ color: active ? "var(--foreground)" : "var(--muted)" }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            style={{
              color: pathname.startsWith("/settings")
                ? "var(--foreground)"
                : "var(--muted)",
            }}
          >
            Settings
          </Link>
          <div style={{ paddingTop: "0.75rem" }}>
            <ThemeSwitcher compact={false} />
          </div>
        </div>
      ) : null}
    </header>
  );
}
