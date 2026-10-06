"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppWindow } from "@/components/app-window";
import { Icon } from "@/components/icons";
import { Button, Field } from "@/components/ui";
import { saveProduct, uploadThumbnail } from "@/lib/api";
import { formatInr } from "@/lib/format";
import type { Product } from "@/lib/types";

function slugify(v: string) {
  return v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const editing = !!product;

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(editing);
  const [tagline, setTagline] = useState(product?.tagline ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [features, setFeatures] = useState<string[]>(product?.features ?? [""]);
  const [trialDays, setTrialDays] = useState(product?.trialDays ? String(product.trialDays) : "0");
  const monthlyPlan = product?.plans.find((p) => p.type === "monthly");
  const oncePlan = product?.plans.find((p) => p.type === "one-time");
  const [monthlyOn, setMonthlyOn] = useState(editing ? !!monthlyPlan : true);
  const [monthlyPrice, setMonthlyPrice] = useState(monthlyPlan ? String(monthlyPlan.priceInr) : "");
  const [onceOn, setOnceOn] = useState(!!oncePlan);
  const [oncePrice, setOncePrice] = useState(oncePlan ? String(oncePlan.priceInr) : "");
  const [live, setLive] = useState(product ? product.status === "live" : false);
  const [accessUrl, setAccessUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [thumbnailPath, setThumbnailPath] = useState(product?.thumbnailUrl ? product.thumbnailUrl.split("/").pop() : "");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(product?.thumbnailUrl ?? "");

  function onName(v: string) {
    setName(v);
    if (!slugTouched) setSlug(slugify(v));
  }

  async function handleThumbnailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const mp = Number(monthlyPrice);
    const op = Number(oncePrice);
    const td = Number(trialDays);
    if (name.trim().length < 2) return setError("Give the product a name.");
    if (!slug) return setError("The product needs a URL slug.");
    if (!monthlyOn && !onceOn) return setError("Turn on at least one plan.");
    if (monthlyOn && !(mp > 0)) return setError("Enter a monthly price above 0.");
    if (onceOn && !(op > 0)) return setError("Enter a one-time price above 0.");
    setError(null);

    setSaving(true);
    let finalThumbnailPath = thumbnailPath;

    try {
      if (thumbnailFile) {
        finalThumbnailPath = await uploadThumbnail(thumbnailFile);
      }
      
      await saveProduct({
        oldSlug: product?.slug,
        slug,
        name,
        tagline,
        description,
        features: features.filter(Boolean),
        trial_days: isNaN(td) ? 0 : td,
        icon: "box",
        thumbnail_path: finalThumbnailPath || null,
        plans: [
          ...(monthlyOn ? [{ type: "monthly", priceInr: mp }] : []),
          ...(onceOn ? [{ type: "one-time", priceInr: op }] : []),
        ],
        status: live ? "live" : "draft",
        access_url: accessUrl,
      });
      setMessage("Successfully saved to database!");
      setTimeout(() => router.push("/admin/products"), 1500);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setSaving(false);
    }
  }

  const previewProduct: Product = {
    slug: slug || "new-product",
    name: name || "Product name",
    tagline,
    description,
    icon: "box",
    plans: [],
    features: [],
    preview: product?.preview ?? {
      title: "Preview",
      rows: [
        { label: "Sample row one", value: "₹0" },
        { label: "Sample row two", value: "₹0" },
        { label: "Sample row three", value: "₹0" },
      ],
    },
    status: live ? "live" : "draft",
    updatedAt: "",
    accessUrl: null,
    keyPrefix: product?.keyPrefix ?? "",
    trialDays: isNaN(Number(trialDays)) ? 0 : Number(trialDays),
    thumbnailUrl: thumbnailPreview || undefined,
  };

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 flex flex-wrap items-start gap-6">
      <div className="min-w-0 flex-1 basis-[560px] space-y-6">
        <section className="card p-6 md:p-7">
          <h2 className="text-base font-bold">Basics</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Name" htmlFor="name">
              <input id="name" value={name} onChange={(e) => onName(e.target.value)} className="input" placeholder="Invoice Kit" />
            </Field>
            <Field label="URL slug" htmlFor="slug" hint={`Shown as /products/${slug || "your-slug"}`}>
              <input id="slug" value={slug} onChange={(e) => { setSlugTouched(true); setSlug(slugify(e.target.value)); }} className="input" />
            </Field>
          </div>
          <div className="mt-5">
            <Field label="One line summary" htmlFor="tagline" hint="Shown on product cards.">
              <input id="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} className="input" placeholder="Create and send invoices from one page." />
            </Field>
          </div>
          <div className="mt-5">
            <Field label="Description" htmlFor="description">
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="input h-auto resize-y py-3 leading-6" />
            </Field>
          </div>
        </section>

        <section className="card p-6 md:p-7">
          <h2 className="text-base font-bold">What it does</h2>
          <p className="mt-1 text-[13px] font-light text-ink/65">One short line per feature. Shown as a checklist.</p>
          <ul className="mt-5 space-y-3">
            {features.map((f, i) => (
              <li key={i} className="flex gap-2">
                <input
                  value={f}
                  aria-label={`Feature ${i + 1}`}
                  onChange={(e) => setFeatures((prev) => prev.map((x, j) => (j === i ? e.target.value : x)))}
                  className="input"
                  placeholder="Send it by email as a PDF"
                />
                <button
                  type="button"
                  aria-label={`Remove feature ${i + 1}`}
                  onClick={() => setFeatures((prev) => (prev.length > 1 ? prev.filter((_, j) => j !== i) : [""]))}
                  className="flex h-12 w-12 flex-none items-center justify-center rounded-lg border border-ink/25 hover:bg-tint"
                >
                  <Icon name="close" size={16} />
                </button>
              </li>
            ))}
          </ul>
          <Button type="button" variant="secondary" size="sm" className="mt-4" onClick={() => setFeatures((p) => [...p, ""])}>
            <Icon name="plus" size={14} /> Add feature
          </Button>
        </section>

        <section className="card p-6 md:p-7">
          <h2 className="text-base font-bold">Plans and pricing</h2>
          <p className="mt-1 text-[13px] font-light text-ink/65">Fixed prices in INR. Turn on the plans you sell.</p>
          <div className="mt-5 space-y-4">
            {[
              { id: "monthly", label: "Monthly", note: "Renews every month", on: monthlyOn, setOn: setMonthlyOn, price: monthlyPrice, setPrice: setMonthlyPrice },
              { id: "once", label: "One-time", note: "Paid once, no renewal", on: onceOn, setOn: setOnceOn, price: oncePrice, setPrice: setOncePrice },
            ].map((p) => (
              <div key={p.id} className={`flex flex-wrap items-center justify-between gap-4 rounded-[10px] border p-4 ${p.on ? "border-ink" : "border-ink/20"}`}>
                <label className="flex cursor-pointer items-center gap-3.5">
                  <input type="checkbox" checked={p.on} onChange={(e) => p.setOn(e.target.checked)} className="h-[18px] w-[18px] accent-ink" />
                  <span>
                    <span className="block text-[15px] font-medium leading-[22px]">{p.label}</span>
                    <span className="block text-xs font-light text-ink/65">{p.note}</span>
                  </span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-ink/65">₹</span>
                  <input
                    inputMode="numeric"
                    aria-label={`${p.label} price in rupees`}
                    disabled={!p.on}
                    value={p.price}
                    onChange={(e) => p.setPrice(e.target.value.replace(/\D/g, ""))}
                    className="input w-32 disabled:bg-tint disabled:text-ink/40"
                    placeholder="499"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-ink/10 pt-6">
            <Field label="Free Trial (Days)" htmlFor="trialDays" hint="Only applies to Monthly Subscriptions. Set 0 for no trial.">
              <input id="trialDays" type="number" value={trialDays} onChange={(e) => setTrialDays(e.target.value)} className="input" placeholder="0" />
            </Field>
          </div>
        </section>

        <section className="card p-6 md:p-7">
          <h2 className="text-base font-bold">Delivery and license</h2>
          <div className="mt-5 space-y-5">
            <Field label="Access link" htmlFor="access" hint="Where the buyer opens the product after payment. Included in the key email.">
              <input id="access" value={accessUrl} onChange={(e) => setAccessUrl(e.target.value)} className="input" placeholder="https://app.forgekit.example/invoice-kit" />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Key prefix" htmlFor="prefix" hint="Keys look like IK-XXXX-XXXX-XXXX.">
                <input id="prefix" defaultValue={name ? name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 3) : ""} className="input uppercase" placeholder="IK" />
              </Field>
              <Field label="Monthly term" htmlFor="term" hint="How long a monthly key stays active per payment.">
                <input id="term" defaultValue="1 month" className="input" />
              </Field>
            </div>
          </div>
        </section>
      </div>

      <aside className="w-full flex-none space-y-6 lg:sticky lg:top-8 lg:w-[360px]">
        <section className="card p-6">
          <h2 className="text-base font-bold">Visibility</h2>
          <button
            type="button"
            role="switch"
            aria-checked={live}
            onClick={() => setLive((v) => !v)}
            className="mt-4 flex w-full items-center justify-between gap-4 rounded-[10px] border border-ink/25 p-4 text-left"
          >
            <span>
              <span className="block text-[15px] font-medium leading-[22px]">{live ? "Live" : "Draft"}</span>
              <span className="block text-xs font-light text-ink/65">{live ? "Visible on the storefront" : "Hidden from the storefront"}</span>
            </span>
            <span className={`relative h-6 w-11 flex-none rounded-full border border-ink transition ${live ? "bg-ink" : "bg-paper"}`}>
              <span className={`absolute top-0.5 h-[18px] w-[18px] rounded-full transition-all ${live ? "left-[22px] bg-paper" : "left-0.5 bg-ink"}`} />
            </span>
          </button>
        </section>

        <section className="card p-6">
          <h2 className="text-base font-bold">Card preview</h2>
          <div className="mt-4 rounded-xl bg-tint px-4 pt-4">
            <AppWindow product={previewProduct} className="rounded-b-none border-b-0" />
          </div>
          <div className="mt-4">
            <div className="text-lg font-bold leading-7">{previewProduct.name}</div>
            <div className="text-[13px] font-light text-ink/70">{tagline || "Your one line summary"}</div>
            <div className="mt-2 text-sm font-bold">
              {monthlyOn && Number(monthlyPrice) > 0 ? formatInr(Number(monthlyPrice)) + " / month" : onceOn && Number(oncePrice) > 0 ? formatInr(Number(oncePrice)) + " once" : "Set a price"}
            </div>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-base font-bold">Thumbnail</h2>
          <p className="mt-1 text-[13px] font-light text-ink/65">
            Optional. Upload a product screenshot (PNG or JPG). Needs file storage in the backend.
          </p>
          <label className="mt-4 flex h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-[10px] border border-dashed border-ink/40 text-sm text-ink/70 hover:bg-tint overflow-hidden relative">
            {thumbnailPreview ? (
              <img src={thumbnailPreview} alt="Thumbnail preview" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <>
                <Icon name="upload" size={20} />
                Choose a file
              </>
            )}
            <input type="file" accept="image/png,image/jpeg" onChange={handleThumbnailChange} className="sr-only" />
          </label>
        </section>

        {error && (
          <p role="alert" className="rounded-lg border border-dashed border-ink p-4 text-sm">{error}</p>
        )}
        {message && (
          <p role="status" className="rounded-lg border border-ink p-4 text-sm">{message}</p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={saving} className="flex-1">
            {saving ? "Saving" : editing ? "Save changes" : "Create product"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.push("/admin/products")}>Cancel</Button>
        </div>
        {editing && (
          <Link href={`/products/${product!.slug}`} className="block text-center text-sm font-medium underline underline-offset-4">
            View on storefront
          </Link>
        )}
      </aside>
    </form>
  );
}
