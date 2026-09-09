export type ThemeId =
  | "default"
  | "aodaita"
  | "gelunbiya"
  | "sanduonie"
  | "feiying"
  | "yaoguangying";

export type Appearance = "dark" | "light" | "system";

export type CharacterConfig = {
  src: string;
  alt: string;
  width?: string;
  position?: string;
  opacity?: number;
  scale?: number;
  right?: string;
  top?: string;
  mask?: "edge" | "radial";
  thumbPosition?: string;
};

export type ThemeColors = {
  background: string;
  foreground: string;
  muted: string;
  surface: string;
  surfaceHover: string;
  primary: string;
  accent: string;
  border: string;
  glow: string;
};

export type ThemeConfig = {
  id: ThemeId;
  name: string;
  description: string;
  character?: CharacterConfig;
  colors: ThemeColors;
  light: ThemeColors;
};

export const THEME_STORAGE_KEY = "southsail-theme";
export const APPEARANCE_STORAGE_KEY = "southsail-appearance";

export const themeIds: ThemeId[] = [
  "default",
  "aodaita",
  "gelunbiya",
  "sanduonie",
  "feiying",
  "yaoguangying",
];

export const themes: ThemeConfig[] = [
  {
    id: "default",
    name: "默认",
    description: "干净的暗色技术画布",
    colors: {
      background: "#09090b",
      foreground: "#f4f4f5",
      muted: "#a1a1aa",
      surface: "rgba(255,255,255,0.04)",
      surfaceHover: "rgba(255,255,255,0.07)",
      primary: "#a78bfa",
      accent: "#818cf8",
      border: "rgba(255,255,255,0.10)",
      glow: "rgba(167,139,250,0.18)",
    },
    light: {
      background: "#f6f7fb",
      foreground: "#18181b",
      muted: "#52525b",
      surface: "rgba(24,24,27,0.04)",
      surfaceHover: "rgba(24,24,27,0.07)",
      primary: "#7c5cde",
      accent: "#6366f1",
      border: "rgba(24,24,27,0.10)",
      glow: "rgba(124,92,222,0.14)",
    },
  },
  {
    id: "aodaita",
    name: "奥黛塔",
    description: "冰蓝舞台 · 冷宝石光",
    character: {
      src: "/characters/genshin/aodaita.png",
      alt: "奥黛塔",
      width: "58%",
      position: "68% 18%",
      opacity: 0.92,
      scale: 1.08,
      right: "-2%",
      top: "-6%",
      mask: "edge",
      thumbPosition: "68% 18%",
    },
    colors: {
      background: "#070b16",
      foreground: "#f3f6ff",
      muted: "#9aa7c4",
      surface: "rgba(140,170,255,0.06)",
      surfaceHover: "rgba(150,180,255,0.12)",
      primary: "#9eb6ff",
      accent: "#c9b8ff",
      border: "rgba(158,182,255,0.20)",
      glow: "rgba(110,150,255,0.24)",
    },
    light: {
      background: "#eef2fb",
      foreground: "#171d2e",
      muted: "#566178",
      surface: "rgba(90,120,200,0.06)",
      surfaceHover: "rgba(90,120,200,0.11)",
      primary: "#4d6fd6",
      accent: "#7c6ad4",
      border: "rgba(77,111,214,0.18)",
      glow: "rgba(110,150,255,0.16)",
    },
  },
  {
    id: "gelunbiya",
    name: "哥伦比娅",
    description: "月光银辉 · 暗玫点缀",
    character: {
      src: "/characters/genshin/gelunbiya.png",
      alt: "哥伦比娅",
      width: "66%",
      position: "58% 38%",
      opacity: 0.9,
      scale: 1.04,
      right: "-8%",
      top: "2%",
      mask: "edge",
      thumbPosition: "55% 32%",
    },
    colors: {
      background: "#0a0c14",
      foreground: "#f6f7ff",
      muted: "#a4acc2",
      surface: "rgba(170,190,255,0.05)",
      surfaceHover: "rgba(200,150,220,0.10)",
      primary: "#c5d0ff",
      accent: "#d48ec8",
      border: "rgba(180,195,255,0.18)",
      glow: "rgba(170,185,255,0.20)",
    },
    light: {
      background: "#f3f4fa",
      foreground: "#1c1e2a",
      muted: "#5c6278",
      surface: "rgba(110,120,180,0.06)",
      surfaceHover: "rgba(170,110,170,0.10)",
      primary: "#6b73c7",
      accent: "#b568a4",
      border: "rgba(107,115,199,0.18)",
      glow: "rgba(150,160,230,0.14)",
    },
  },
  {
    id: "sanduonie",
    name: "桑多涅",
    description: "金与绯红 · 茶室暖光",
    character: {
      src: "/characters/genshin/sangduonie.png",
      alt: "桑多涅",
      width: "62%",
      position: "72% 48%",
      opacity: 0.92,
      scale: 1.06,
      right: "-4%",
      top: "4%",
      mask: "edge",
      thumbPosition: "68% 42%",
    },
    colors: {
      background: "#12090c",
      foreground: "#fff8f4",
      muted: "#b9a8a4",
      surface: "rgba(232,180,106,0.05)",
      surfaceHover: "rgba(212,90,99,0.10)",
      primary: "#e8b46a",
      accent: "#d45a63",
      border: "rgba(232,180,106,0.22)",
      glow: "rgba(210,90,90,0.18)",
    },
    light: {
      background: "#faf4ee",
      foreground: "#2a1c18",
      muted: "#7a625c",
      surface: "rgba(180,120,70,0.06)",
      surfaceHover: "rgba(180,70,70,0.10)",
      primary: "#b56a2a",
      accent: "#c24a54",
      border: "rgba(181,106,42,0.18)",
      glow: "rgba(200,90,80,0.14)",
    },
  },
  {
    id: "feiying",
    name: "绯英",
    description: "绯粉青柠 · 软光",
    character: {
      src: "/characters/starrail/feiying.png",
      alt: "绯英",
      width: "72%",
      position: "54% 46%",
      opacity: 0.88,
      scale: 1.12,
      right: "-10%",
      top: "-2%",
      mask: "radial",
      thumbPosition: "50% 42%",
    },
    colors: {
      background: "#140c12",
      foreground: "#fff6f8",
      muted: "#b8a3ad",
      surface: "rgba(243,160,192,0.06)",
      surfaceHover: "rgba(184,224,122,0.10)",
      primary: "#f3a0c0",
      accent: "#b8e07a",
      border: "rgba(243,160,192,0.22)",
      glow: "rgba(255,140,190,0.20)",
    },
    light: {
      background: "#fbf4f6",
      foreground: "#2a1820",
      muted: "#7a5c68",
      surface: "rgba(210,90,130,0.06)",
      surfaceHover: "rgba(120,160,70,0.10)",
      primary: "#d46a90",
      accent: "#6f9a3a",
      border: "rgba(212,106,144,0.18)",
      glow: "rgba(230,130,170,0.14)",
    },
  },
  {
    id: "yaoguangying",
    name: "爻光",
    description: "孔雀金辉 · 暖焰",
    character: {
      src: "/characters/starrail/yaoguang.png",
      alt: "爻光",
      width: "74%",
      position: "52% 48%",
      opacity: 0.9,
      scale: 1.14,
      right: "-12%",
      top: "-4%",
      mask: "radial",
      thumbPosition: "50% 46%",
    },
    colors: {
      background: "#071218",
      foreground: "#f4faf8",
      muted: "#9db3b0",
      surface: "rgba(95,212,192,0.06)",
      surfaceHover: "rgba(240,176,96,0.10)",
      primary: "#5fd4c0",
      accent: "#f0b060",
      border: "rgba(95,212,192,0.22)",
      glow: "rgba(90,200,180,0.22)",
    },
    light: {
      background: "#eef6f4",
      foreground: "#152422",
      muted: "#4e6a66",
      surface: "rgba(20,140,120,0.06)",
      surfaceHover: "rgba(180,120,40,0.10)",
      primary: "#1f8f82",
      accent: "#c4842a",
      border: "rgba(31,143,130,0.18)",
      glow: "rgba(40,170,150,0.14)",
    },
  },
];

export function isThemeId(value: string | null): value is ThemeId {
  return themeIds.includes(value as ThemeId);
}

export function isAppearance(value: string | null): value is Appearance {
  return value === "dark" || value === "light" || value === "system";
}

export function getTheme(id: ThemeId) {
  return themes.find((theme) => theme.id === id) ?? themes[0];
}

export function resolveAppearance(
  appearance: Appearance,
  prefersDark = true,
): "dark" | "light" {
  if (appearance === "system") return prefersDark ? "dark" : "light";
  return appearance;
}

export function getResolvedColors(
  theme: ThemeConfig,
  resolved: "dark" | "light",
): ThemeColors {
  return resolved === "light" ? theme.light : theme.colors;
}

export function colorEntries(colors: ThemeColors) {
  return {
    "--background": colors.background,
    "--foreground": colors.foreground,
    "--muted": colors.muted,
    "--surface": colors.surface,
    "--surface-hover": colors.surfaceHover,
    "--primary": colors.primary,
    "--accent": colors.accent,
    "--border": colors.border,
    "--glow": colors.glow,
  } as const;
}
