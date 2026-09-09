"use client";

import Image from "next/image";

import { getTheme } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";

type CharacterBackgroundProps = {
  variant?: "hero" | "ambient";
};

export default function CharacterBackground({
  variant = "hero",
}: CharacterBackgroundProps) {
  const { themeId, resolvedAppearance } = useTheme();
  const theme = getTheme(themeId);

  if (!theme.character) {
    return null;
  }

  const {
    src,
    alt,
    width = "62%",
    position = "right center",
    opacity = 0.8,
    scale = 1,
    right = "-4%",
    top = "0%",
    mask = "edge",
  } = theme.character;

  const ambient = variant === "ambient";
  const isLight = resolvedAppearance === "light";
  const desktopOpacity = isLight
    ? ambient
      ? 0.16
      : Math.min(opacity, 0.5)
    : ambient
      ? Math.min(opacity * 0.34, 0.32)
      : opacity;
  const mobileOpacity = isLight
    ? ambient
      ? 0.14
      : 0.42
    : ambient
      ? 0.22
      : 0.62;

  const desktopMask = ambient
    ? "linear-gradient(90deg, transparent 0%, black 28%, black 100%)"
    : mask === "radial"
      ? "radial-gradient(ellipse 62% 72% at 58% 48%, black 42%, transparent 78%)"
      : "linear-gradient(90deg, transparent 0%, black 16%, black 100%)";
  const mobileMask = ambient
    ? "linear-gradient(180deg, black 8%, black 28%, transparent 72%)"
    : "linear-gradient(180deg, black 18%, black 42%, transparent 88%)";

  return (
    <div
      aria-hidden="true"
      className={
        ambient
          ? "pointer-events-none fixed inset-0 z-0 overflow-hidden"
          : "pointer-events-none absolute inset-0 overflow-hidden"
      }
    >
      <div
        className={
          ambient
            ? "absolute right-[-20%] top-[4%] h-[220px] w-[220px] rounded-full blur-3xl md:right-[-4%] md:top-[18%] md:h-[360px] md:w-[360px]"
            : "absolute right-[-12%] top-[8%] h-[260px] w-[260px] rounded-full blur-3xl md:right-[8%] md:top-[18%] md:h-[420px] md:w-[420px]"
        }
        style={{ background: "var(--glow)" }}
      />
      {ambient ? null : (
        <div
          className="absolute bottom-[18%] left-[-10%] h-[180px] w-[180px] rounded-full blur-3xl md:bottom-[8%] md:left-auto md:right-[28%] md:h-[280px] md:w-[280px]"
          style={{
            background: "color-mix(in srgb, var(--accent) 35%, transparent)",
          }}
        />
      )}

      <div
        className="absolute md:hidden"
        style={{
          top: ambient ? "-4%" : "-8%",
          right: ambient ? "-28%" : "-18%",
          width: ambient ? "88%" : "108%",
          height: ambient ? "46%" : "68%",
          opacity: mobileOpacity,
          transform: `scale(${Math.max(scale * 0.92, 0.9)})`,
          transformOrigin: "right top",
          maskImage: mobileMask,
          WebkitMaskImage: mobileMask,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={!ambient}
          quality={ambient ? 50 : 70}
          sizes="100vw"
          className="object-contain object-right-top"
          style={{ objectPosition: position }}
        />
      </div>

      <div
        className="absolute hidden md:block"
        style={{
          top: ambient ? "8%" : top,
          right: ambient ? "-6%" : right,
          width: ambient ? "min(42vw, 520px)" : width,
          height: ambient ? "84%" : "100%",
          opacity: desktopOpacity,
          transform: `scale(${ambient ? scale * 0.92 : scale})`,
          transformOrigin: "right center",
          maskImage: desktopMask,
          WebkitMaskImage: desktopMask,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={!ambient}
          quality={ambient ? 60 : 82}
          sizes={ambient ? "42vw" : "70vw"}
          className="object-contain"
          style={{ objectPosition: position }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: ambient
            ? "linear-gradient(180deg, color-mix(in srgb, var(--background) 18%, transparent) 0%, var(--background) 58%), linear-gradient(90deg, var(--background) 0%, color-mix(in srgb, var(--background) 88%, transparent) 42%, transparent 100%)"
            : "linear-gradient(180deg, color-mix(in srgb, var(--background) 12%, transparent) 0%, color-mix(in srgb, var(--background) 35%, transparent) 38%, var(--background) 86%), linear-gradient(90deg, var(--background) 0%, color-mix(in srgb, var(--background) 70%, transparent) 36%, transparent 78%)",
        }}
      />
    </div>
  );
}
