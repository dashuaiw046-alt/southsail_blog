import { applyThemeToDocument } from "@/lib/theme-boot";
import {
  APPEARANCE_STORAGE_KEY,
  THEME_STORAGE_KEY,
  isAppearance,
  isThemeId,
  type Appearance,
  type ThemeId,
} from "@/lib/themes";

type ThemeState = {
  themeId: ThemeId;
  appearance: Appearance;
};

const listeners = new Set<() => void>();

const serverState: ThemeState = {
  themeId: "default",
  appearance: "dark",
};

let state: ThemeState = serverState;

function emit() {
  listeners.forEach((listener) => listener());
}

function persist() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(THEME_STORAGE_KEY, state.themeId);
  window.localStorage.setItem(APPEARANCE_STORAGE_KEY, state.appearance);
  applyThemeToDocument(state.themeId, state.appearance, getPrefersDark());
}

export function getPrefersDark() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function getServerPrefersDark() {
  return true;
}

export function hydrateThemeStore() {
  if (typeof window === "undefined") return;
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  const savedAppearance = window.localStorage.getItem(APPEARANCE_STORAGE_KEY);
  const next: ThemeState = {
    themeId: isThemeId(savedTheme) ? savedTheme : "default",
    appearance: isAppearance(savedAppearance) ? savedAppearance : "dark",
  };
  const changed =
    next.themeId !== state.themeId || next.appearance !== state.appearance;
  state = next;
  persist();
  if (changed) emit();
}

export function getThemeState() {
  return state;
}

export function getServerThemeState() {
  return serverState;
}

export function subscribeThemeStore(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setThemeId(themeId: ThemeId) {
  state = { ...state, themeId };
  persist();
  emit();
}

export function setAppearance(appearance: Appearance) {
  state = { ...state, appearance };
  persist();
  emit();
}
