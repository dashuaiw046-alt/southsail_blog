import type { Metadata } from "next";
import Link from "next/link";

import PageShell from "@/components/layout/PageShell";
import AppearanceSwitcher from "@/components/theme/AppearanceSwitcher";
import CharacterThemeGrid from "@/components/theme/CharacterThemeGrid";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Settings",
  description: "Appearance and character theme settings.",
  robots: { index: false, follow: false },
};

export default function SettingsPage() {
  return (
    <PageShell>
      <main className="page-main">
        <SectionHeading
          eyebrow="Preferences"
          title="Settings"
          description="Appearance and character themes share a single ThemeProvider. Choices persist in localStorage."
        />

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-medium">Appearance</h2>
          </div>
          <AppearanceSwitcher />
        </section>

        <section className="mt-12 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-medium">Character Theme</h2>
            <ThemeSwitcher compact={false} />
          </div>
          <CharacterThemeGrid />
        </section>

        <p className="mt-12 text-sm text-[var(--muted)]">
          Character art is a visual layer only. Return to{" "}
          <Link href="/" className="text-[var(--primary)]">
            Home
          </Link>{" "}
          when you are done.
        </p>
      </main>
    </PageShell>
  );
}
