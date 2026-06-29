"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi2";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="p-2 w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-xl py-2 px-5 transition-all duration-300 cursor-pointer bg-background border border-third ml-3 hover:bg-(--card-bg)"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <HiSun className="h-5 w-5 text-amber-400" />
      ) : (
        <HiMoon className="h-5 w-5 text-blue-400" />
      )}
    </button>
  );
}
