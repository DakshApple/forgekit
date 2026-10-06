"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";

/** Light by default. Choice is saved and applied before paint (see root layout). */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("fk-theme", next ? "dark" : "light");
    } catch {
      /* private mode: theme just won't persist */
    }
    setDark(next);
  };

  return (
    <button
      type="button"
      id="theme-toggle"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full text-ink/70 transition-colors duration-150 hover:bg-ink/[0.06] hover:text-ink ${className}`}
    >
      {/* Both icons rendered; CSS picks one so server and client markup match. */}
      <Icon name="moon" size={17} strokeWidth={1.8} className="dark:hidden" />
      <Icon name="sun" size={18} strokeWidth={1.8} className="hidden dark:block" />
    </button>
  );
}
