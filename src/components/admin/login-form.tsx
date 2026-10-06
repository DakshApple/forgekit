"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons";
import { Field } from "@/components/ui";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      if (res.ok) {
        router.replace("/admin/dashboard");
        router.refresh();
        return;
      }
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? "Could not sign in. Try again.");
    } catch {
      setError("Could not reach the server. Try again.");
    }
    setBusy(false);
  }

  return (
    <form className="w-full max-w-[420px]" onSubmit={onSubmit}>
      <h2 className="text-[40px] font-bold leading-[1.1] tracking-tightest">Sign in</h2>
      <p className="mt-3 text-base font-light text-ink/75">Admin access only.</p>
      <div className="mt-9 flex flex-col gap-6">
        <Field label="Email" htmlFor="email">
          <input id="email" name="email" type="email" autoComplete="username" required className="input" />
        </Field>
        <Field label="Password" htmlFor="password">
          <input id="password" name="password" type="password" autoComplete="current-password" required className="input" />
        </Field>
      </div>
      {error && (
        <p role="alert" className="mt-5 text-sm font-medium text-ink">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="mt-8 inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-lg border border-ink bg-ink text-base font-medium text-paper transition hover:bg-ink/85 disabled:opacity-60"
      >
        {busy ? "Signing in" : "Sign in"} <Icon name="arrow" size={16} />
      </button>
      <p className="mt-7 text-[13px] font-light leading-5 text-ink/65">
        Shoppers never sign in. They pay with an email and get a key.{" "}
        <Link href="/" className="font-medium text-ink underline underline-offset-4">Back to store</Link>
      </p>
    </form>
  );
}
