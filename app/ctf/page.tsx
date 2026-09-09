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
      <main className="page-main">
        <SectionHeading
          eyebrow="Practice"
          title="CTF"
          description="Writeups from practice challenges. The focus is the analysis path, not a scoreboard."
        />
        <div className="section-grid">
          {items.map((item) => (
            <CtfCard key={item.slug} item={item} />
          ))}
        </div>
      </main>
    </PageShell>
  );
}
