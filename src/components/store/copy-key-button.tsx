"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";

export function CopyKeyButton({
  value,
  variant = "inverse",
}: {
  value: string;
  variant?: "inverse" | "secondary";
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard can be blocked; the key is still visible on screen */
    }
  }

  const style =
    variant === "inverse"
      ? "border-paper bg-paper text-ink hover:bg-paper/90"
      : "border-ink/25 bg-paper text-ink hover:bg-tint";

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition ${style}`}
    >
      <Icon name={copied ? "check" : "copy"} size={16} />
      {copied ? "Copied" : "Copy key"}
    </button>
  );
}
