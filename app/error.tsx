"use client";

import Link from "next/link";

export default function ErrorPage({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-5 py-16 md:px-6 md:py-24 lg:px-8">
      <p className="text-sm uppercase tracking-[0.25em] text-[var(--primary)]">
        Error
      </p>
      <h1 className="mt-4 text-4xl font-semibold">Something went wrong</h1>
      <p className="mt-4 text-[var(--muted)]">
        The page failed to render. You can retry, or go back to the notes.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => retry()}
          className="rounded-full px-5 py-3 text-sm"
          style={{
            background: "var(--foreground)",
            color: "var(--background)",
          }}
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border px-5 py-3 text-sm"
          style={{ borderColor: "var(--border)" }}
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
