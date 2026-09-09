import {
  APPEARANCE_STORAGE_KEY,
  THEME_STORAGE_KEY,
  colorEntries,
  getResolvedColors,
  getTheme,
  themeIds,
  type Appearance,
  type ThemeId,
} from "@/lib/themes";

const paletteMap = Object.fromEntries(
  themeIds.map((id) => {
    const theme = getTheme(id);
    return [
      id,
      {
        dark: theme.colors,
        light: theme.light,
      },
    ];
  }),
);

export const themeBootScript = `(function(){
  try {
    var themeIds = ${JSON.stringify(themeIds)};
    var storedTheme = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    var storedAppearance = localStorage.getItem(${JSON.stringify(APPEARANCE_STORAGE_KEY)});
    var themeId = themeIds.indexOf(storedTheme) > -1 ? storedTheme : "default";
    var appearance = storedAppearance === "light" || storedAppearance === "dark" || storedAppearance === "system" ? storedAppearance : "dark";
    var prefersDark = true;
    try { prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches; } catch (e) {}
    var resolved = appearance === "system" ? (prefersDark ? "dark" : "light") : appearance;
    var palettes = ${JSON.stringify(paletteMap)};
    var pack = palettes[themeId] || palettes.default;
    var colors = resolved === "light" ? pack.light : pack.dark;
    var root = document.documentElement;
    root.dataset.theme = themeId;
    root.dataset.appearance = resolved;
    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--foreground", colors.foreground);
    root.style.setProperty("--muted", colors.muted);
    root.style.setProperty("--surface", colors.surface);
    root.style.setProperty("--surface-hover", colors.surfaceHover);
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--border", colors.border);
    root.style.setProperty("--glow", colors.glow);
    root.style.colorScheme = resolved;
  } catch (e) {}
})();`;

export function applyThemeToDocument(
  themeId: ThemeId,
  appearance: Appearance,
  prefersDark: boolean,
) {
  const theme = getTheme(themeId);
  const resolved = appearance === "system" ? (prefersDark ? "dark" : "light") : appearance;
  const colors = getResolvedColors(theme, resolved);
  const root = document.documentElement;

  root.dataset.theme = themeId;
  root.dataset.appearance = resolved;
  root.style.colorScheme = resolved;

  for (const [name, value] of Object.entries(colorEntries(colors))) {
    root.style.setProperty(name, value);
  }
}
