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
    <header
      className={`z-40 border-b backdrop-blur-xl ${transparent ? "absolute inset-x-0 top-0" : "sticky top-0"}`}
      style={{
        borderColor: transparent ? "transparent" : "var(--border)",
        background: transparent
          ? "transparent"
          : "color-mix(in srgb, var(--background) 88%, transparent)",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          southsail
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active = isActive(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-colors"
                style={{
                  color: active ? "var(--foreground)" : "var(--muted)",
                  textShadow: active ? "0 0 18px var(--glow)" : undefined,
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
          className="rounded-full border px-3 py-2 text-sm md:hidden"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-nav"
          className="space-y-4 border-t px-6 py-4 md:hidden"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--background) 94%, transparent)",
          }}
        >
          {links.map((link) => {
            const active = isActive(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-sm"
                style={{ color: active ? "var(--foreground)" : "var(--muted)" }}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeSwitcher />
        </div>
      ) : null}
    </header>
  );
}
