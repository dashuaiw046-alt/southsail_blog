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
          : "pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
      }
    >
      <div
        className={
          ambient
            ? "absolute right-[-18%] top-0 h-[160px] w-[160px] rounded-full blur-3xl md:right-[-4%] md:top-[18%] md:h-[360px] md:w-[360px]"
            : "absolute right-[8%] top-[18%] h-[420px] w-[420px] rounded-full blur-3xl"
        }
        style={{ background: "var(--glow)" }}
      />

      {ambient ? (
        <div
          className="absolute right-[-8%] top-16 hidden h-[360px] w-[240px] md:block"
          style={{
            opacity: desktopOpacity,
            maskImage:
              "linear-gradient(90deg, transparent 0%, black 40%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, black 40%, black 100%)",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            quality={55}
            sizes="240px"
            className="object-contain object-right"
            style={{ objectPosition: position }}
          />
        </div>
      ) : (
        <div
          className="absolute"
          style={{
            top,
            right,
            width,
            height: "100%",
            opacity: desktopOpacity,
            transform: `scale(${scale})`,
            transformOrigin: "right center",
            maskImage: desktopMask,
            WebkitMaskImage: desktopMask,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            quality={82}
            sizes="70vw"
            className="object-contain"
            style={{ objectPosition: position }}
          />
        </div>
      )}

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
