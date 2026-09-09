"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import {
  getPrefersDark,
  getServerPrefersDark,
  getServerThemeState,
  getThemeState,
  hydrateThemeStore,
  setAppearance as writeAppearance,
  setThemeId as writeThemeId,
  subscribeThemeStore,
} from "@/lib/theme-store";
import { resolveAppearance, type Appearance, type ThemeId } from "@/lib/themes";

type ThemeContextValue = {
  themeId: ThemeId;
  setThemeId: (themeId: ThemeId) => void;
  appearance: Appearance;
  setAppearance: (appearance: Appearance) => void;
  resolvedAppearance: "dark" | "light";
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function subscribePrefersDark(listener: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(
    subscribeThemeStore,
    getThemeState,
    getServerThemeState,
  );
  const prefersDark = useSyncExternalStore(
    subscribePrefersDark,
    getPrefersDark,
    getServerPrefersDark,
  );

  useEffect(() => {
    hydrateThemeStore();
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeId: snapshot.themeId,
      setThemeId: writeThemeId,
      appearance: snapshot.appearance,
      setAppearance: writeAppearance,
      resolvedAppearance: resolveAppearance(snapshot.appearance, prefersDark),
    }),
    [prefersDark, snapshot.appearance, snapshot.themeId],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
