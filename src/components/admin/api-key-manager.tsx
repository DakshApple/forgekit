"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/components/icons";

type ApiKey = {
  id: string;
  name: string;
  key: string;
  created_at: string;
  last_used_at: string | null;
};

export function ApiKeyManager() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetchKeys();
  }, []);

  async function fetchKeys() {
    setLoading(true);
    const res = await fetch("/api/admin/api-keys");
    if (res.ok) {
      setKeys(await res.json());
    }
    setLoading(false);
  }

  async function generateKey(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setGenerating(true);
    
    const res = await fetch("/api/admin/api-keys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName })
    });
    
    if (res.ok) {
      setNewName("");
      await fetchKeys();
    }
    setGenerating(false);
  }

  async function deleteKey(id: string) {
    if (!confirm("Are you sure you want to revoke this API Key? Any software using it will instantly break.")) return;
    const res = await fetch(`/api/admin/api-keys?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setKeys(keys.filter((k) => k.id !== id));
    }
  }

  return (
    <section className="card p-6 md:p-8">
      <h2 className="text-lg font-bold">API Keys</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
        Generate secret API keys to authenticate server-to-server requests. Keep these keys secure and never expose them in client-side code like desktop apps or web browsers.
      </p>

      <form onSubmit={generateKey} className="mt-6 flex items-center gap-3">
        <input
          type="text"
          placeholder="e.g. Production Server"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="input h-10 w-[240px]"
          required
        />
        <button
          type="submit"
          disabled={generating}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-ink px-4 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          {generating ? "Generating..." : "Generate Key"}
        </button>
      </form>

      <div className="mt-8 border-t border-ink/10 pt-6">
        {loading ? (
          <p className="text-sm text-ink/50">Loading keys...</p>
        ) : keys.length === 0 ? (
          <p className="text-sm text-ink/50">No API keys generated yet.</p>
        ) : (
          <ul className="space-y-4">
            {keys.map((k) => (
              <li key={k.id} className="flex items-center justify-between rounded-lg border border-ink/10 bg-ink/5 p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-ink">{k.name}</p>
                    <span className="rounded bg-ink/10 px-1.5 py-0.5 text-[11px] font-medium tracking-wide text-ink/70">
                      {k.key.substring(0, 12)}...
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] text-ink/60">
                    Created {new Date(k.created_at).toLocaleDateString()}
                    {k.last_used_at && ` • Last used ${new Date(k.last_used_at).toLocaleDateString()}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(k.key);
                      alert("API Key copied to clipboard!");
                    }}
                    className="p-2 text-ink/60 hover:text-ink transition-colors"
                    title="Copy Key"
                  >
                    <Icon name="copy" size={18} />
                  </button>
                  <button
                    onClick={() => deleteKey(k.id)}
                    className="p-2 text-red-500/70 hover:text-red-500 transition-colors"
                    title="Revoke Key"
                  >
                    <Icon name="close" size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
