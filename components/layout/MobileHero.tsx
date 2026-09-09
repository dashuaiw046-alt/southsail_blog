"use client";

import Link from "next/link";

import { getTheme } from "@/lib/themes";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function MobileHero() {
  const { themeId } = useTheme();
  const theme = getTheme(themeId);
  const character = theme.character;

  return (
    <section className="px-4 pb-8 pt-20 md:hidden">
      <article
        className="overflow-hidden rounded-[28px] border"
        style={{
          borderColor: "var(--border)",
          background: "var(--surface)",
          boxShadow: "0 18px 48px var(--glow)",
        }}
      >
        <div
          className="relative isolate h-[42vh] min-h-[240px] max-h-[340px] overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at 50% 10%, var(--glow), transparent 55%), var(--background)`,
          }}
        >
          {character ? (
            // Native img: next/image was omitted from the static HTML on mobile.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={character.src}
              alt={character.alt}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0 flex items-end px-5 pb-6">
              <span
                className="text-7xl font-semibold tracking-tight"
                style={{ color: "var(--primary)" }}
              >
                s
              </span>
            </div>
          )}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
            style={{
              background:
                "linear-gradient(to top, var(--background), transparent)",
            }}
          />
          <span
            className="absolute bottom-3 left-4 z-10 rounded-full border px-3 py-1 text-xs"
            style={{
              borderColor: "var(--border)",
              background: "color-mix(in srgb, var(--background) 78%, transparent)",
            }}
          >
            {theme.name}
          </span>
        </div>

        <div
          className="relative z-10 px-5 pb-6 pt-5"
          style={{ background: "var(--background)" }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--primary)]">
            Cybersecurity · CTF · Coding
          </p>
          <h1 className="mt-3 text-[2.15rem] font-bold leading-[1.08] tracking-tight">
            Hi, I&apos;m
            <span className="mt-1 block text-[var(--muted)]">southsail.</span>
          </h1>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            Notes on cybersecurity, CTF, programming, and what I am still
            learning.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link
              href="/articles"
              className="rounded-full px-4 py-3 text-center text-sm font-medium"
              style={{
                background: "var(--foreground)",
                color: "var(--background)",
              }}
            >
              Articles
            </Link>
            <Link
              href="/about"
              className="rounded-full border px-4 py-3 text-center text-sm font-medium"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              About
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
