"use client";

import { getTheme } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";

export default function MobilePortrait() {
  const { themeId } = useTheme();
  const theme = getTheme(themeId);

  if (!theme.character) return null;

  return (
    <div className="portrait-mobile">
      <div className="portrait-card">
        <div className="portrait-art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={theme.character.src} alt={theme.character.alt} />
          <span className="chip">{theme.name}</span>
        </div>
      </div>
    </div>
  );
}
