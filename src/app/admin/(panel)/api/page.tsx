import { PageHeader } from "@/components/admin/page-header";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { ApiKeyManager } from "@/components/admin/api-key-manager";

export default function ApiSettingsPage() {
  return (
    <>
      <PageHeader title="API & Integration" description="Connect your software to ForgeKit securely." />

      <div className="mt-8 grid max-w-[800px] gap-6">
        
        {/* NEW: API Key Manager */}
        <ApiKeyManager />

        <section className="card p-6 md:p-8 border-dashed border-ink/20 bg-transparent">
          <h2 className="text-lg font-bold">Keyless Client Integration</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
            If you are building client-side software (like a Desktop App or CLI) where an API key could be stolen, you don&apos;t need API keys!
          </p>
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
                <p className="mt-1 text-sm text-ink/70">At the very bottom of the Product Edit page, you will find the generated JavaScript integration code.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
