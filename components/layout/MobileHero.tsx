"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { getTheme } from "@/lib/themes";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function MobileHero() {
  const { themeId, resolvedAppearance } = useTheme();
  const theme = getTheme(themeId);
  const character = theme.character;
  const isLight = resolvedAppearance === "light";

  return (
    <section className="px-4 pb-8 pt-20 md:hidden">
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="overflow-hidden rounded-[28px] border"
        style={{
          borderColor: "var(--border)",
          background: "var(--surface)",
          boxShadow: "0 0 48px var(--glow)",
        }}
      >
        <div className="relative h-[58vw] min-h-[220px] max-h-[320px] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 70% at 50% 20%, var(--glow), transparent 64%), var(--background)`,
            }}
          />
          {character ? (
            <Image
              src={character.src}
              alt={character.alt}
              fill
              priority
              quality={78}
              sizes="100vw"
              className="object-cover"
              style={{
                objectPosition: character.thumbPosition ?? "center 18%",
                opacity: isLight ? 0.88 : 1,
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-6xl font-semibold tracking-tight"
                style={{ color: "var(--primary)" }}
              >
                s
              </span>
            </div>
          )}
          <div
            className="absolute inset-x-0 bottom-0 h-24"
            style={{
              background:
                "linear-gradient(to top, color-mix(in srgb, var(--surface) 92%, var(--background)), transparent)",
            }}
          />
          {character ? (
            <span
              className="absolute bottom-3 left-4 rounded-full border px-3 py-1 text-xs"
              style={{
                borderColor: "var(--border)",
                background: "color-mix(in srgb, var(--background) 70%, transparent)",
                color: "var(--foreground)",
              }}
            >
              {theme.name}
            </span>
          ) : null}
        </div>

        <div className="px-5 pb-6 pt-4">
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
                background: "var(--surface)",
                color: "var(--foreground)",
              }}
            >
              About
            </Link>
          </div>
        </div>
      </motion.article>
    </section>
  );
}
