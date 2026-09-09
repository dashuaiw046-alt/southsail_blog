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

        <section className="hero-desktop">
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
                <Link href="/articles" className="btn-solid">
                  Explore Articles
                </Link>
                <Link href="/about" className="btn-ghost">
                  About Me
                </Link>
              </div>
            </div>
            </HeroContent>
          </div>
        </section>

        <section id="articles" className="section">
          <div className="page-main" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className="section-head">
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
            <div className="section-grid is-articles">
              {articles.map((item) => (
                <ArticleCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section id="ctf" className="section">
          <div className="page-main" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className="section-head">
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
            <div className="section-grid">
              {writeups.map((item) => (
                <CtfCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="page-main" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className="section-head">
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
            <div className="section-grid">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="page-main" style={{ paddingTop: 0, paddingBottom: 0 }}>
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
