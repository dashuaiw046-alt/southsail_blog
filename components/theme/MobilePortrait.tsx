"use client";

import { getTheme } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";

export default function MobilePortrait() {
  const { themeId } = useTheme();
  const theme = getTheme(themeId);

  if (!theme.character) return null;

  return (
    <div className="relative z-10 px-4 pt-20 md:hidden">
      <div
        className="relative h-36 overflow-hidden rounded-[24px] border"
        style={{
          borderColor: "var(--border)",
          boxShadow: "0 12px 36px var(--glow)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={theme.character.src}
          alt={theme.character.alt}
          className="h-full w-full object-cover object-top"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--background), transparent 55%)",
          }}
        />
        <span
          className="absolute bottom-3 left-3 rounded-full border px-3 py-1 text-xs"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--background) 78%, transparent)",
          }}
        >
          {theme.name}
        </span>
      </div>
    </div>
  );
}
