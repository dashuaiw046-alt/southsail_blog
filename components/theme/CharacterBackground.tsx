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
  const visibleOpacity = isLight
    ? ambient
      ? 0.16
      : Math.min(opacity, 0.5)
    : ambient
      ? Math.min(opacity * 0.34, 0.32)
      : opacity;
  const maskImage = ambient
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
      {!ambient ? (
        <>
          <div
            className="absolute right-[8%] top-[18%] hidden h-[420px] w-[420px] rounded-full blur-3xl md:block"
            style={{ background: "var(--glow)" }}
          />
          <div
            className="absolute right-[28%] bottom-[8%] hidden h-[280px] w-[280px] rounded-full blur-3xl md:block"
            style={{
              background: "color-mix(in srgb, var(--accent) 35%, transparent)",
            }}
          />
        </>
      ) : (
        <div
          className="absolute right-[-4%] top-[18%] hidden h-[360px] w-[360px] rounded-full blur-3xl md:block"
          style={{ background: "var(--glow)" }}
        />
      )}

      <div
        className="absolute hidden transition-all duration-700 ease-out md:block"
        style={{
          top: ambient ? "8%" : top,
          right: ambient ? "-6%" : right,
          width: ambient ? "min(42vw, 520px)" : width,
          height: ambient ? "84%" : "100%",
          opacity: visibleOpacity,
          transform: `scale(${ambient ? scale * 0.92 : scale})`,
          transformOrigin: "right center",
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={!ambient}
          quality={ambient ? 60 : 82}
          sizes={ambient ? "(max-width: 768px) 0vw, 42vw" : "(max-width: 768px) 0vw, 70vw"}
          className="object-contain"
          style={{ objectPosition: position }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: ambient
            ? "linear-gradient(90deg, var(--background) 0%, color-mix(in srgb, var(--background) 96%, transparent) 58%, transparent 88%)"
            : "linear-gradient(90deg, var(--background) 0%, color-mix(in srgb, var(--background) 94%, transparent) 34%, transparent 76%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[38%]"
        style={{
          background: "linear-gradient(to top, var(--background), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[18%]"
        style={{
          background: "linear-gradient(to bottom, var(--background), transparent)",
        }}
      />
    </div>
  );
}
