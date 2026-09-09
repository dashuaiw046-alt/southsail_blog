"use client";

import { useId } from "react";
import Link from "next/link";

import { themes } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";

type ThemeSwitcherProps = {
  compact?: boolean;
};

export default function ThemeSwitcher({ compact = true }: ThemeSwitcherProps) {
  const { themeId, setThemeId } = useTheme();
  const selectId = useId();

  return (
    <div className="flex items-center gap-2">
      <label className="sr-only" htmlFor={selectId}>
        Character theme
      </label>
      <div className="relative">
        <span
          className="pointer-events-none absolute left-3 top-1/2 z-10 h-2 w-2 -translate-y-1/2 rounded-full"
          style={{ background: "var(--primary)", boxShadow: "0 0 10px var(--glow)" }}
        />
        <select
          id={selectId}
          value={themeId}
          onChange={(event) => setThemeId(event.target.value as typeof themeId)}
          className="appearance-none rounded-full border bg-black/20 py-2 pl-7 pr-10 text-sm backdrop-blur-md outline-none transition-all focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          style={{
            borderColor: "var(--border)",
            color: "var(--foreground)",
            boxShadow: "0 0 20px var(--glow)",
            background: "color-mix(in srgb, var(--surface) 80%, transparent)",
          }}
        >
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id} className="bg-zinc-900 text-white">
              {theme.name}
            </option>
          ))}
        </select>
        <div
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs"
          style={{ color: "var(--muted)" }}
        >
          ▼
        </div>
      </div>
      {compact ? (
        <Link
          href="/settings"
          className="rounded-full border px-3 py-2 text-xs text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          style={{ borderColor: "var(--border)" }}
          aria-label="Open settings"
        >
          Settings
        </Link>
      ) : null}
    </div>
  );
}
