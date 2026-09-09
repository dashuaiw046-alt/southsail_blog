"use client";

import type { Appearance } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";

const options: { id: Appearance; label: string; hint: string }[] = [
  { id: "dark", label: "Dark", hint: "Always use a dark canvas." },
  { id: "light", label: "Light", hint: "Always use a light canvas." },
  { id: "system", label: "System", hint: "Follow the operating system." },
];

export default function AppearanceSwitcher() {
  const { appearance, setAppearance } = useTheme();

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {options.map((option) => {
        const active = appearance === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setAppearance(option.id)}
            className="rounded-2xl border px-4 py-4 text-left transition-all hover:-translate-y-0.5"
            style={{
              borderColor: active ? "var(--primary)" : "var(--border)",
              background: active ? "var(--surface-hover)" : "var(--surface)",
              boxShadow: active ? "0 0 24px var(--glow)" : undefined,
            }}
          >
            <div className="text-sm font-medium">{option.label}</div>
            <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{option.hint}</p>
          </button>
        );
      })}
    </div>
  );
}
