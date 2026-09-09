import type { Metadata } from "next";

import CtfCard from "@/components/ctf/CtfCard";
import PageShell from "@/components/layout/PageShell";
import SectionHeading from "@/components/ui/SectionHeading";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "CTF",
  description: "CTF writeups, experiments, and lessons learned.",
};

export const dynamic = "force-static";

export default function CtfPage() {
  const items = getContent("ctf");

  return (
    <PageShell>
      <main className="mx-auto min-h-[70vh] max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Practice"
          title="CTF"
          description="Writeups from practice challenges. The focus is the analysis path, not a scoreboard."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {items.map((item) => (
            <CtfCard key={item.slug} item={item} />
          ))}
        </div>
      </main>
    </PageShell>
  );
}
