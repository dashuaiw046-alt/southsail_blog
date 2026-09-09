"use client";

import Link from "next/link";

import { getTheme } from "@/lib/themes";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function MobileHero() {
  const { themeId } = useTheme();
  const theme = getTheme(themeId);
  const character = theme.character;

  return (
    <section className="hero-mobile">
      <article className="hero-card">
        <div className="hero-art">
          {character ? (
            // Native img so older mobile browsers still paint the portrait.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={character.src} alt={character.alt} />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "flex-end",
                padding: "0 1.25rem 1.25rem",
                color: "var(--primary)",
                fontSize: "4.5rem",
                fontWeight: 700,
              }}
            >
              s
            </div>
          )}
          <span className="chip">{theme.name}</span>
        </div>
        <div className="hero-copy">
          <p className="hero-kicker">Cybersecurity · CTF · Coding</p>
          <h1 className="hero-title">
            Hi, I&apos;m
            <span>southsail.</span>
          </h1>
          <p className="hero-lead">
            Notes on cybersecurity, CTF, programming, and what I am still
            learning.
          </p>
          <div className="hero-actions">
            <Link href="/articles" className="btn-solid">
              Articles
            </Link>
            <Link href="/about" className="btn-ghost">
              About
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
