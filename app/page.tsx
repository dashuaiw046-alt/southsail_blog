import Link from "next/link";

import ArticleCard from "@/components/article/ArticleCard";
import CtfCard from "@/components/ctf/CtfCard";
import HeroContent from "@/components/layout/HeroContent";
import MobileHero from "@/components/layout/MobileHero";
import PageShell from "@/components/layout/PageShell";
import ProjectCard from "@/components/project/ProjectCard";
import CharacterBackground from "@/components/theme/CharacterBackground";
import { getContent } from "@/lib/content";
import { getProjects } from "@/lib/projects";

export default function Home() {
  const articles = getContent("articles").slice(0, 3);
  const writeups = getContent("ctf").slice(0, 2);
  const projects = getProjects().slice(0, 2);

  return (
    <PageShell transparentNav>
      <main>
        <MobileHero />

        <section className="relative hidden min-h-screen items-center overflow-hidden md:flex">
          <CharacterBackground />
          <div
            className="pointer-events-none absolute left-[18%] top-[42%] z-0 h-[320px] w-[320px] -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: "color-mix(in srgb, var(--accent) 28%, transparent)" }}
          />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 lg:px-8">
            <HeroContent>
            <div className="max-w-3xl">
              <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-[var(--primary)]">
                Cybersecurity · CTF · Coding
              </p>
              <h1 className="text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
                Hi, I&apos;m
                <span className="block text-[var(--muted)]">southsail.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                A personal space for cybersecurity, CTF writeups, programming
                projects, and everything I&apos;m learning along the way.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/articles"
                  className="rounded-full px-6 py-3 text-sm font-medium transition-transform hover:scale-105"
                  style={{
                    background: "var(--foreground)",
                    color: "var(--background)",
                  }}
                >
                  Explore Articles
                </Link>
                <Link
                  href="/about"
                  className="rounded-full border px-6 py-3 text-sm font-medium backdrop-blur transition-colors"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--surface)",
                    color: "var(--foreground)",
                  }}
                >
                  About Me
                </Link>
              </div>
            </div>
            </HeroContent>
          </div>
        </section>

        <section
          id="articles"
          className="border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="mx-auto max-w-7xl px-5 py-14 md:px-6 md:py-24 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-6 md:mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary)] sm:text-sm sm:tracking-[0.25em]">
                  Latest
                </p>
                <h2 className="mt-3 text-3xl font-semibold">Articles</h2>
              </div>
              <Link href="/articles" className="text-sm text-[var(--primary)]">
                All articles →
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {articles.map((item) => (
                <ArticleCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="ctf"
          className="border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="mx-auto max-w-7xl px-5 py-14 md:px-6 md:py-24 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-6 md:mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary)] sm:text-sm sm:tracking-[0.25em]">
                  Practice
                </p>
                <h2 className="mt-3 text-3xl font-semibold">Recent CTF</h2>
              </div>
              <Link href="/ctf" className="text-sm text-[var(--primary)]">
                All writeups →
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {writeups.map((item) => (
                <CtfCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="mx-auto max-w-7xl px-5 py-14 md:px-6 md:py-24 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-6 md:mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary)] sm:text-sm sm:tracking-[0.25em]">
                  Build
                </p>
                <h2 className="mt-3 text-3xl font-semibold">Projects</h2>
              </div>
              <Link href="/projects" className="text-sm text-[var(--primary)]">
                All projects →
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          className="border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="mx-auto max-w-7xl px-5 py-14 md:px-6 md:py-24 lg:px-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--primary)] sm:text-sm sm:tracking-[0.25em]">
              About
            </p>
            <div className="mt-8 max-w-3xl">
              <h2 className="text-3xl font-semibold">Learning by building.</h2>
              <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
                I&apos;m interested in cybersecurity, CTF, cryptography,
                programming, and building things that actually work.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex text-sm text-[var(--primary)]"
              >
                More about southsail →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
