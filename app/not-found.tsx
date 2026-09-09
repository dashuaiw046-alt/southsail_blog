import Link from "next/link";

import PageShell from "@/components/layout/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-6 py-24 lg:px-8">
        <p className="text-sm uppercase tracking-[0.25em] text-[var(--primary)]">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold">Page not found</h1>
        <p className="mt-4 text-[var(--muted)]">
          This route does not exist yet. Head back to the technical notes.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full px-5 py-3 text-sm"
          style={{
            background: "var(--foreground)",
            color: "var(--background)",
          }}
        >
          Back home
        </Link>
      </main>
    </PageShell>
  );
}
