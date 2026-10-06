import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { ButtonLink } from "@/components/ui";
import { getProducts } from "@/lib/data";
import { site } from "@/lib/site";

const trust: { icon: IconName; title: string; body: string }[] = [
  { icon: "lock", title: "Secure payments", body: "Handled by Razorpay. We never see your card details." },
  { icon: "invoice", title: "Receipt for every order", body: "Emailed with your key, for your records." },
  { icon: "headset", title: "Real support", body: `Email us and a person replies, usually ${site.supportReply}.` },
  { icon: "refund", title: "Clear refund policy", body: "Written in plain words. See the terms below." },
];

const steps = [
  { title: "Pick a tool", body: "Read what it does and what it costs. The price is on the page." },
  { title: "Pay with Razorpay", body: "UPI, cards or netbanking. Everything in INR." },
  { title: "Get your key", body: "Emailed once payment is verified, and shown on the confirmation page." },
  { title: "Start using it", body: "Open the access link, enter the key, and you are in." },
];

const terms = [
  { title: "Pricing & Trials", body: "Every product has a fixed price. Some monthly subscriptions offer a 7-day free trial. The amount at checkout is what you pay. No hidden fees." },
  { title: "Delivery", body: "Your license key is created instantly when Razorpay confirms the payment, then emailed to you and shown on the confirmation page." },
  { title: "Cancelling", body: "You have full control. Monthly plans can be cancelled anytime before the next renewal date by emailing us. Your license stays active until the end of your billing cycle." },
  { title: "Refunds", body: `We stand behind our products. If it doesn't do what the page says, write to us within ${site.refundDays} days for a full refund. The full policy is on the refund policy page.` },
];

const faqs = [
  { q: "Do I need an account to buy?", a: "No. Your email and a payment are enough. Your license key is safely sent to the email you enter at checkout." },
  { q: "How do 7-Day Free Trials work?", a: "If a product offers a trial, you'll enter your card details but won't be charged. You get 7 days to try the premium features. Cancel before day 7, and you pay nothing." },
  { q: "How do I log into the apps I bought?", a: "Each app works differently. Some will just ask you to paste your License Key, while others might ask for your email and then verify your key." },
  { q: "What happens if I cancel my subscription?", a: "Your license key will remain active until the end of the month you already paid for. After that, it will be automatically revoked." },
  { q: "What if my payment fails?", a: "No key is issued until the payment is verified. If money left your account without a key, just email us your order number and we'll fix it instantly." },
  { q: "Will I get a GST invoice?", a: "Yes, you get a tax receipt with every order. Just add your GSTIN at checkout and it will be included." },
];



export default async function HomePage() {
  const featured = (await getProducts()).slice(0, 3);

  return (
    <>
      {/* Hero Masterpiece Section */}
      <section className="relative overflow-hidden pt-8 pb-20 md:py-28">
        {/* Layered glowing ambient spotlights */}
        <div className="pointer-events-none absolute -top-36 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-sky-500/15 via-blue-600/10 to-indigo-500/5 blur-3xl opacity-80" />
        <div className="pointer-events-none absolute top-1/3 -right-32 -z-10 h-[400px] w-[400px] rounded-full bg-sky-400/10 blur-3xl" />

        <div className="wrap flex flex-wrap items-center gap-12 lg:gap-16">
          {/* Left Hero Content */}
          <div className="min-w-0 flex-1 basis-[500px]">
            <div className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs font-bold text-sky-950 shadow-sm backdrop-blur-md opacity-0 animate-fade-in-up">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-600" />
              </span>
              Independent Software Suite for Indian Small Businesses
            </div>
            
            <h1 className="h1 mt-6 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-[56px] leading-[1.1] opacity-0 animate-fade-in-up-delay">
              Own your business tools. <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-ink via-sky-950 to-sky-600 bg-clip-text text-transparent">Zero monthly bloat.</span>
            </h1>

            <p className="lead mt-6 max-w-[540px] text-base sm:text-lg leading-relaxed text-ink/75 opacity-0 animate-fade-in-up-delay-2">
              Forgekit builds clean, fast web apps for Invoicing, Booking, Stock Tracking, and Review Collection. Pay in ₹ INR, receive your license key instantly, and start working in under 2 minutes.
            </p>

            {/* Feature Value Pill Highlights */}
            <div className="mt-8 flex flex-wrap gap-2.5 text-xs font-semibold text-ink/85 opacity-0 animate-fade-in-up-delay-2">
              <span className="inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-paper/90 px-3.5 py-2.5 shadow-sm backdrop-blur-md hover:border-sky-500/30 transition-all">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-50 text-sky-600"><Icon name="check" size={13} strokeWidth={3} /></span> Lifetime & Monthly Plans
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-paper/90 px-3.5 py-2.5 shadow-sm backdrop-blur-md hover:border-sky-500/30 transition-all">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-50 text-sky-600"><Icon name="check" size={13} strokeWidth={3} /></span> Instant Email License Key
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-paper/90 px-3.5 py-2.5 shadow-sm backdrop-blur-md hover:border-sky-500/30 transition-all">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-50 text-sky-600"><Icon name="check" size={13} strokeWidth={3} /></span> Razorpay UPI / Cards
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4 opacity-0 animate-fade-in-up-delay-2">
              <ButtonLink href="/products" className="h-13 px-8 text-base shadow-xl shadow-sky-950/15 transition-all hover:scale-[1.02] hover:shadow-2xl">
                Explore tools & prices <Icon name="arrow" size={18} />
              </ButtonLink>
              <ButtonLink href="/#how" variant="secondary" className="h-13 px-7 text-base border-ink/15 hover:bg-wash transition-all">
                How buying works
              </ButtonLink>
            </div>
          </div>

          {/* Right Hero Creative Interactive Engine Showcase */}
          <div className="relative min-w-[320px] flex-1 basis-[460px] opacity-0 animate-fade-in-up-delay">
            {/* Main Elevated Glass Card Container */}
            <div className="relative overflow-hidden rounded-3xl border border-ink/15 bg-paper/90 shadow-2xl backdrop-blur-2xl transition-all hover:border-sky-500/30">
              
              {/* Window Title Bar */}
              <div className="flex h-11 items-center justify-between border-b border-ink/10 bg-wash/80 px-5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400/90" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/90" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
                  <span className="ml-2 text-[11px] font-bold tracking-wider text-ink/60 uppercase">Forgekit Engine v2.4</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    Operational
                  </span>
                </div>
              </div>

              {/* Card Body Interactive Simulation */}
              <div className="p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-ink/40">Sample License Flow</div>
                    <div className="text-sm font-extrabold text-ink mt-0.5">Invoice Kit — One-Time Plan</div>
                  </div>
                  <span className="font-mono text-xs font-extrabold text-sky-700 bg-sky-50 border border-sky-500/20 px-3 py-1 rounded-lg">
                    ₹4,999 INR
                  </span>
                </div>

                {/* 3 Step Visual Pipeline */}
                <div className="space-y-3">
                  <div className="group flex items-center justify-between rounded-xl border border-ink/10 bg-wash/60 p-3.5 text-xs transition-all hover:border-sky-500/30 hover:bg-paper">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-paper font-bold text-xs shadow-sm">1</span>
                      <div>
                        <div className="font-bold text-ink">Enter Buyer Email</div>
                        <div className="text-[11px] text-ink/60">No account password required</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700">Verified</span>
                  </div>

                  <div className="group flex items-center justify-between rounded-xl border border-ink/10 bg-wash/60 p-3.5 text-xs transition-all hover:border-sky-500/30 hover:bg-paper">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-paper font-bold text-xs shadow-sm">2</span>
                      <div>
                        <div className="font-bold text-ink">Razorpay Payment Gateway</div>
                        <div className="text-[11px] text-ink/60">UPI / GPay / Netbanking</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">UPI Instant</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-sky-500/40 bg-ink text-paper p-4 text-xs font-medium shadow-xl">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-paper text-ink font-bold text-xs shadow-sm">3</span>
                      <div>
                        <div className="font-bold text-paper">License Key Dispatched</div>
                        <div className="text-[11px] text-paper/70">Emailed to buyer inbox</div>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] font-bold bg-paper/20 text-paper border border-paper/30 px-2.5 py-1 rounded-lg">
                      IK-9842-PRO
                    </span>
                  </div>
                </div>

                {/* Micro Metric Banner */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="rounded-xl border border-ink/10 bg-wash/50 p-3 text-center">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-ink/50">Fulfilment Speed</div>
                    <div className="text-sm font-extrabold text-ink mt-0.5">&lt; 3 Seconds</div>
                  </div>
                  <div className="rounded-xl border border-ink/10 bg-wash/50 p-3 text-center">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-ink/50">Money-Back Period</div>
                    <div className="text-sm font-extrabold text-emerald-700 mt-0.5">7 Days Full Refund</div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="border-t border-ink/10 bg-wash/80 px-6 py-3.5 text-center text-xs text-ink/70 flex items-center justify-center gap-2">
                <Icon name="lock" size={14} className="text-sky-600" />
                <span>PCI-DSS Level 1 Encrypted Checkout</span>
              </div>
            </div>

            {/* Creative Floating Badge Overlay */}
            <div className="absolute -left-4 -bottom-4 flex items-center gap-3.5 rounded-2xl border border-ink/15 bg-paper/95 p-4 shadow-2xl backdrop-blur-xl md:-left-8">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-sky-600 text-paper shadow-md">
                <Icon name="check" size={20} strokeWidth={2.5} />
              </span>
              <div>
                <div className="text-xs font-extrabold text-ink">100% Automated Key Delivery</div>
                <div className="text-[11px] font-medium text-ink/65">Access your tools immediately</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="relative z-10 border-y border-ink/10 bg-paper/60 backdrop-blur-md">
        <div className="wrap grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t) => (
            <div key={t.title} className="group flex items-start gap-4 p-2 transition-all">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-ink/10 bg-wash text-ink transition-colors group-hover:border-sky-500/30 group-hover:bg-sky-500/5 group-hover:text-sky-600">
                <Icon name={t.icon} size={20} strokeWidth={1.8} />
              </div>
              <div>
                <div className="text-sm font-bold text-ink leading-snug">{t.title}</div>
                <div className="mt-1 text-xs font-normal leading-relaxed text-ink/70">{t.body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-ink/10 pb-8">
            <div>
              <div className="eyebrow mb-2 text-xs font-semibold uppercase tracking-wider text-sky-600">Curated Suite</div>
              <h2 className="h2 text-3xl font-extrabold sm:text-4xl">Tools ready for your business</h2>
            </div>
            <Link href="/products" className="group inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-sky-600 transition-colors">
              Explore full catalogue <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Seamless Workflow Section */}
      <section id="how" className="scroll-mt-20 border-y border-ink/10 bg-wash/40 py-20 md:py-28">
        <div className="wrap">
          <div className="text-center max-w-[600px] mx-auto">
            <div className="eyebrow mb-2 text-xs font-semibold uppercase tracking-wider text-sky-600">Simple 4-Step Process</div>
            <h2 className="h2 text-3xl font-extrabold sm:text-4xl">From checkout to key in minutes</h2>
            <p className="mt-3 text-sm text-ink/70">No bloated onboarding calls or complex enterprise setups.</p>
          </div>

          <div className="mt-16 grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr))]">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl border border-ink/10 bg-paper p-7 shadow-sm transition-all hover:border-sky-500/30 hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-paper text-sm font-bold shadow-md">
                  0{i + 1}
                </div>
                <div className="mt-6 text-lg font-bold leading-snug text-ink">{s.title}</div>
                <div className="mt-2.5 text-xs font-normal leading-relaxed text-ink/70">{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Guarantee Terms Section */}
      <section id="terms" className="scroll-mt-20 py-20 md:py-28 relative overflow-hidden bg-wash/30">
        <div className="wrap">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-b border-ink/10 pb-8">
            <div className="max-w-[540px]">
              <div className="eyebrow mb-2.5 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-3 py-1 text-xs font-semibold text-sky-700">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
                TRANSPARENCY FIRST
              </div>
              <h2 className="h2 text-3xl font-extrabold tracking-tight sm:text-4xl text-ink">Clear terms. No fine print surprises.</h2>
            </div>
            <p className="max-w-[400px] text-xs font-normal leading-relaxed text-ink/70">
              We believe in honest software sales. Here is exactly how pricing, key delivery, cancellations, and refunds work.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "invoice" as const,
                tag: "Fixed Pricing",
                title: "Pricing & Trials",
                body: "Every product has a fixed price in ₹ INR. Select monthly subscriptions include a 7-day free trial. What you see at checkout is what you pay—zero hidden charges.",
              },
              {
                icon: "mail" as const,
                tag: "Instant Delivery",
                title: "Key Delivery",
                body: "Your unique license key is generated in real-time as soon as Razorpay verifies your payment. It is emailed immediately and displayed on your screen.",
              },
              {
                icon: "close" as const,
                tag: "1-Click Control",
                title: "Easy Cancelling",
                body: "You stay in complete control. Cancel monthly plans anytime before renewal by emailing us. Your key remains active through the end of your billing cycle.",
              },
              {
                icon: "refund" as const,
                tag: "Risk Free",
                title: `${site.refundDays}-Day Refunds`,
                body: `We stand behind our code. If a product doesn't perform as described on its page, email us within ${site.refundDays} days for a full, hassle-free refund.`,
              },
            ].map((t) => (
              <div
                key={t.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-ink/10 bg-paper/90 p-7 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/30 hover:shadow-xl hover:shadow-sky-500/5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink/10 bg-wash text-ink transition-colors group-hover:border-sky-500/30 group-hover:bg-sky-600 group-hover:text-paper shadow-sm">
                      <Icon name={t.icon} size={20} strokeWidth={2} />
                    </div>
                    <span className="rounded-full bg-wash border border-ink/10 px-2.5 py-0.5 text-[10px] font-bold text-ink/70 group-hover:border-sky-500/20 group-hover:bg-sky-50 group-hover:text-sky-700 transition-colors">
                      {t.tag}
                    </span>
                  </div>

                  <div className="mt-6 text-lg font-bold text-ink group-hover:text-sky-950 transition-colors">{t.title}</div>
                  <p className="mt-2.5 text-xs font-normal leading-relaxed text-ink/75">{t.body}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-ink/5 flex items-center gap-1.5 text-[11px] font-semibold text-ink/50 group-hover:text-sky-600 transition-colors">
                  <span>Guaranteed Policy</span>
                  <Icon name="check" size={12} strokeWidth={2.5} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder / About Section */}
      <section className="relative overflow-hidden bg-ink text-paper py-20 md:py-24">
        {/* Subtle dark glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
        
        <div className="wrap flex flex-wrap items-center justify-between gap-12">
          <div className="max-w-[620px] flex-1 basis-[460px]">
            <span className="inline-block rounded-full bg-paper/10 px-3.5 py-1.5 text-xs font-medium text-paper/80">
              Independent Studio
            </span>
            <h2 className="h2 mt-4 text-3xl font-bold sm:text-4xl text-paper">Built and supported by Forgekit Software Studio.</h2>
            <p className="mt-5 text-sm font-normal leading-relaxed text-paper/80">
              Forgekit is an independent software studio. We design and maintain clean, fast, standalone web tools for small businesses. When you reach out for support, you speak directly with the engineering team who built your product.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/products" variant="inverse" className="h-12 px-6 text-sm font-semibold">
              Browse products
            </ButtonLink>
            <ButtonLink href="/#faq" variant="ghost-inverse" className="h-12 px-6 text-sm border-paper/20">
              Read the FAQ
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="scroll-mt-20 py-20 md:py-28">
        <div className="wrap flex flex-wrap gap-x-16 gap-y-12">
          <div className="min-w-0 flex-1 basis-[300px]">
            <div className="eyebrow mb-2 text-xs font-semibold uppercase tracking-wider text-sky-600">Need Clarity?</div>
            <h2 className="h2 text-3xl font-extrabold sm:text-4xl">Frequently asked questions</h2>
            <p className="mt-4 text-sm font-normal leading-relaxed text-ink/70">
              Have a question not listed here? Email us directly at{" "}
              <a className="font-semibold text-ink underline underline-offset-4 hover:text-sky-600" href={`mailto:${site.supportEmail}`}>
                {site.supportEmail}
              </a>
            </p>
          </div>

          <div className="min-w-0 flex-[2_1_500px]">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0} className="group border-b border-ink/10 last:border-b-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-base font-bold leading-snug text-ink transition-colors group-open:text-sky-600 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-ink/15 text-lg font-light transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-[620px] pb-6 text-xs leading-relaxed text-ink/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
