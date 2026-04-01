"use client";

import { Monitor, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";

type ThemeMode = "light" | "dark" | "system";

function getNextThemeMode(mode: ThemeMode): ThemeMode {
  if (mode === "light") return "dark";
  if (mode === "dark") return "system";
  return "light";
}

export default function ThemeModeToggle() {
  const themeMode = usePreferencesStore((state) => state.themeMode);
  const setThemeMode = usePreferencesStore((state) => state.setThemeMode);

  const nextMode = getNextThemeMode(themeMode);

  const CurrentIcon =
    themeMode === "light" ? Sun : themeMode === "dark" ? Moon : Monitor;

  const currentLabel =
    themeMode === "light"
      ? "Chế độ sáng"
      : themeMode === "dark"
        ? "Chế độ tối"
        : "Theo hệ thống";

  const nextLabel =
    nextMode === "light"
      ? "Chuyển sang chế độ sáng"
      : nextMode === "dark"
        ? "Chuyển sang chế độ tối"
        : "Chuyển sang chế độ hệ thống";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={nextLabel}
      title={`${currentLabel} • bấm để đổi`}
      onClick={() => setThemeMode(nextMode)}
      className="text-slate-500 hover:bg-slate-100"
    >
      <CurrentIcon className="h-5 w-5" />
    </Button>
  );
}