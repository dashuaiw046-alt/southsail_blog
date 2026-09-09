"use client";

import Image from "next/image";

import { themes } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";

export default function CharacterThemeGrid() {
  const { themeId, setThemeId } = useTheme();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {themes.map((theme) => {
        const active = themeId === theme.id;

        return (
          <button
            key={theme.id}
            type="button"
            onClick={() => setThemeId(theme.id)}
            className="overflow-hidden rounded-2xl border text-left transition-all hover:-translate-y-0.5"
            style={{
              borderColor: active ? "var(--primary)" : "var(--border)",
              background: active ? "var(--surface-hover)" : "var(--surface)",
              boxShadow: active ? "0 0 28px var(--glow)" : undefined,
            }}
          >
            <div
              className="relative h-28 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.background}, color-mix(in srgb, ${theme.colors.primary} 28%, ${theme.colors.background}))`,
              }}
            >
              {theme.character ? (
                <Image
                  src={theme.character.src}
                  alt=""
                  fill
                  sizes="320px"
                  className="object-cover"
                  style={{
                    objectPosition: theme.character.thumbPosition ?? "center",
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs tracking-[0.3em] text-white/50">
                  DEFAULT
                </div>
              )}
            </div>
            <div className="px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium">{theme.name}</span>
                <span className="flex gap-1">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: theme.colors.primary }}
                  />
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: theme.colors.accent }}
                  />
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                {theme.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
