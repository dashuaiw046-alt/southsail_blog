"use client";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#09090b",
          color: "#f4f4f5",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <main
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "6rem 1.5rem",
          }}
        >
          <title>Error · southsail</title>
          <p style={{ letterSpacing: "0.25em", textTransform: "uppercase", color: "#a78bfa" }}>
            Error
          </p>
          <h1 style={{ fontSize: "2.25rem", marginTop: "1rem" }}>
            southsail failed to load
          </h1>
          <p style={{ marginTop: "1rem", color: "#a1a1aa" }}>
            A root-level error stopped the page. Retry, or come back later.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              marginTop: "2rem",
              border: 0,
              borderRadius: 999,
              padding: "0.75rem 1.25rem",
              background: "#f4f4f5",
              color: "#09090b",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
