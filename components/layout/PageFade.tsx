import type { ReactNode } from "react";

export default function PageFade({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
