import type { ReactNode } from "react";

import CharacterBackground from "@/components/theme/CharacterBackground";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PageFade from "./PageFade";

type PageShellProps = {
  children: ReactNode;
  transparentNav?: boolean;
};

export default function PageShell({
  children,
  transparentNav = false,
}: PageShellProps) {
  return (
    <div className="relative min-h-screen text-[var(--foreground)]">
      {transparentNav ? null : <CharacterBackground variant="ambient" />}
      <Navbar transparent={transparentNav} />
      <div className="relative z-10">
        <PageFade>{children}</PageFade>
        <Footer />
      </div>
    </div>
  );
}
