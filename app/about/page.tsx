import type { Metadata } from "next";

import PageShell from "@/components/layout/PageShell";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "About southsail — cybersecurity, CTF, programming, and learning notes.",
};

const focus = [
  "Cybersecurity",
  "CTF",
  "Programming",
  "Cryptography",
  "Big Data",
];

const learning = [
  "Web security fundamentals",
  "CTF problem-solving patterns",
  "Python tooling",
  "C / C++ systems basics",
];

const stack = [
  "Python",
  "C / C++",
  "TypeScript",
  "Next.js",
  "Linux",
  "SQL",
];

export default function AboutPage() {
  return (
    <PageShell>
      <main className="mx-auto min-h-[70vh] max-w-7xl px-5 pb-12 pt-6 md:px-6 md:py-20 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="southsail"
          description="A personal technical blog. Character themes are visual only."
        />

        <div className="mb-12 flex flex-wrap gap-2">
          {focus.map((item) => (
            <span
              key={item}
              className="rounded-full border px-4 py-2 text-sm text-[var(--muted)]"
              style={{ borderColor: "var(--border)" }}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section
            className="rounded-2xl border p-6"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <h2 className="text-xl font-medium">About Me</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              I write down what I am studying: cybersecurity, CTF writeups,
              cryptography, programming, and notes that help me keep a clear
              trail of how a problem was actually understood.
            </p>
          </section>

          <section
            className="rounded-2xl border p-6"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <h2 className="text-xl font-medium">Currently Learning</h2>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--muted)]">
              {learning.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section
            className="rounded-2xl border p-6"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <h2 className="text-xl font-medium">Tech Stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border px-3 py-1 text-xs text-[var(--muted)]"
                  style={{ borderColor: "var(--border)" }}
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section
            className="rounded-2xl border p-6"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <h2 className="text-xl font-medium">Contact</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              This site is a public notebook, not a resume. No company history
              or competition records are listed here.
            </p>
            {site.github ? (
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm text-[var(--primary)]"
              >
                GitHub · dashuai
              </a>
            ) : (
              <p className="mt-4 text-sm text-[var(--muted)]">
                GitHub is not listed yet.
              </p>
            )}
          </section>
        </div>
      </main>
    </PageShell>
  );
}
