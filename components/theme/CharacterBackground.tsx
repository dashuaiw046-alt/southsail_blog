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
    thumbPosition = "center 18%",
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

  const desktopMask = ambient
    ? "linear-gradient(90deg, transparent 0%, black 28%, black 100%)"
    : mask === "radial"
      ? "radial-gradient(ellipse 62% 72% at 58% 48%, black 42%, transparent 78%)"
      : "linear-gradient(90deg, transparent 0%, black 16%, black 100%)";

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
            ? "absolute right-[-18%] top-0 h-[200px] w-[200px] rounded-full blur-3xl md:right-[-4%] md:top-[18%] md:h-[360px] md:w-[360px]"
            : "absolute right-[-8%] top-[8%] h-[240px] w-[240px] rounded-full blur-3xl md:right-[8%] md:top-[18%] md:h-[420px] md:w-[420px]"
        }
        style={{ background: "var(--glow)" }}
      />

      <div
        className={
          ambient
            ? "absolute right-0 top-14 h-40 w-28 overflow-hidden md:hidden"
            : "absolute inset-0 md:hidden"
        }
        style={{
          opacity: isLight ? (ambient ? 0.22 : 0.92) : ambient ? 0.34 : 1,
          maskImage: ambient
            ? "linear-gradient(180deg, black 20%, transparent 100%), linear-gradient(90deg, transparent 0%, black 30%)"
            : "linear-gradient(to top, transparent 0%, black 28%)",
          WebkitMaskImage: ambient
            ? "linear-gradient(180deg, black 20%, transparent 100%), linear-gradient(90deg, transparent 0%, black 30%)"
            : "linear-gradient(to top, transparent 0%, black 28%)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={!ambient}
          quality={ambient ? 45 : 72}
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: thumbPosition }}
        />
      </div>

      {ambient ? null : (
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 md:hidden"
          style={{
            background:
              "linear-gradient(to top, var(--background) 8%, color-mix(in srgb, var(--background) 70%, transparent) 46%, transparent 100%)",
          }}
        />
      )}

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
        className="absolute inset-0 hidden md:block"
        style={{
          background: ambient
            ? "linear-gradient(90deg, var(--background) 0%, color-mix(in srgb, var(--background) 96%, transparent) 58%, transparent 88%)"
            : "linear-gradient(90deg, var(--background) 0%, color-mix(in srgb, var(--background) 94%, transparent) 34%, transparent 76%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 hidden h-[38%] md:block"
        style={{
          background: "linear-gradient(to top, var(--background), transparent)",
        }}
      />
    </div>
  );
}
