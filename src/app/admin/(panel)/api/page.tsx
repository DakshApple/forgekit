import { PageHeader } from "@/components/admin/page-header";
import Link from "next/link";
import { Icon } from "@/components/icons";

export default function ApiSettingsPage() {
  return (
    <>
      <PageHeader title="API & Integration" description="Connect your software to ForgeKit securely." />

      <div className="mt-8 grid max-w-[800px] gap-6">
        <section className="card p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-sapphire-500/10 text-sapphire-600">
              <Icon name="terminal" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Where are my API Keys?</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
                ForgeKit is designed specifically for downloadable software (like Desktop Apps and CLIs). 
                Because client-side software can be decompiled, embedding a secret &quot;Admin API Key&quot; inside your app is a major security risk.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/75">
                Instead, ForgeKit uses a modern <strong>Keyless Integration Architecture</strong>. The customer&apos;s unique `license_key` combined with your `product_slug` acts as the secure token!
              </p>
            </div>
          </div>
        </section>

        <section className="card p-6 md:p-8">
          <h2 className="text-lg font-bold">How to connect your software</h2>
          <div className="mt-5 space-y-6">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-ink text-paper text-sm font-bold">1</div>
              <div>
                <h3 className="font-semibold text-ink">Go to the Products tab</h3>
                <p className="mt-1 text-sm text-ink/70">Navigate to the <Link href="/admin/products" className="text-sapphire-600 underline">Products dashboard</Link> and select the software you are building.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-ink text-paper text-sm font-bold">2</div>
              <div>
                <h3 className="font-semibold text-ink">Scroll to API Integration</h3>
                <p className="mt-1 text-sm text-ink/70">At the very bottom of the Product Edit page, you will find the API Integration card.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-ink text-paper text-sm font-bold">3</div>
              <div>
                <h3 className="font-semibold text-ink">Copy the Code</h3>
                <p className="mt-1 text-sm text-ink/70">The exact JavaScript code needed to connect that specific product is automatically generated for you. Just copy and paste it into your app!</p>
              </div>
            </div>
          </div>
        </section>

        <section className="card p-6 md:p-8 border-dashed border-ink/20 bg-transparent">
          <h2 className="text-base font-bold">Need Server-to-Server Webhooks?</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            If you are building a SaaS (Web App) with its own backend database, you can connect Razorpay directly to your SaaS via webhooks to auto-provision accounts upon payment.
          </p>
        </section>
      </div>
    </>
  );
}
