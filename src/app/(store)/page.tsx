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
  { title: "Pricing", body: "Every product has one fixed price, monthly or one-time, shown on its page. Prices are in INR. The amount at checkout is the amount you pay." },
  { title: "Delivery", body: "Your license key is created when Razorpay confirms the payment, then emailed to you and shown on the confirmation page." },
  { title: "Cancelling", body: "Monthly plans can be stopped before the next renewal date by emailing us. One-time purchases do not renew." },
  { title: "Refunds", body: `If the product does not do what its page says, write to us within ${site.refundDays} days of purchase and we will refund you. The full policy is on the refund policy page.` },
];

const faqs = [
  { q: "Do I need an account?", a: "No. Your email and a payment are enough. The license key is sent to the email you enter at checkout." },
  { q: "What is a license key?", a: "A code that proves you paid. You enter it where the product asks for it. We can mark it active, expired or revoked." },
  { q: "What if my payment fails?", a: "You stay on checkout and can try again. No key is issued until the payment is verified. If money left your account without a key, email us your order number." },
  { q: "Will I get a GST invoice?", a: "You get a receipt with every order. If you need your GSTIN on the invoice, add it at checkout." },
  { q: "I did not get my key email. What now?", a: `Check spam first. The key is also shown on the confirmation page. Still missing? Email ${site.supportEmail} with your order number and we will resend it.` },
];



export default async function HomePage() {
  const featured = (await getProducts()).slice(0, 3);

  return (
    <>
      {/* hero */}
      <section>
        <div className="wrap flex flex-wrap items-center gap-14 py-14 md:py-20">
          <div className="min-w-0 flex-1 basis-[480px]">
            <div className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-ink/15 py-1.5 pl-2.5 pr-3.5">
              <span className="block h-2 w-2 rounded-full bg-ink" />
              Software for small businesses, by Genartml
            </div>
            <h1 className="h1 mt-7">Simple business software at a fixed price.</h1>
            <p className="lead mt-6 max-w-[500px]">
              Pick a tool, pay monthly or once, and your license key arrives by
              email. No account to create and no sales call.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/products">
                Browse products <Icon name="arrow" size={16} />
              </ButtonLink>
              <ButtonLink href="/#how" variant="secondary">
                How buying works
              </ButtonLink>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-[13px] text-ink/70">
              {["Prices in INR", "Secure payment by Razorpay", "Receipt with every order"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <Icon name="check" size={16} /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-w-[300px] flex-1 basis-[440px] pb-9">
            <div className="overflow-hidden rounded-[10px] border border-ink/15 bg-paper shadow-float">
              <div className="flex h-8 items-center gap-1.5 border-b border-ink/10 bg-wash px-3">
                <i className="block h-2 w-2 rounded-full bg-ink/15" />
                <i className="block h-2 w-2 rounded-full bg-ink/15" />
                <i className="block h-2 w-2 rounded-full bg-ink/15" />
                <span className="ml-3 text-[11px] text-ink/50">Invoice Kit</span>
              </div>
              <div className="flex items-center justify-between px-5 pb-2 pt-5">
                <div className="text-base font-bold tracking-[-0.01em]">Invoices</div>
                <span className="inline-flex h-[30px] items-center rounded-md bg-ink px-3 text-xs font-medium text-paper">New invoice</span>
              </div>
              <div className="flex gap-3 px-5 pb-3 pt-1">
                <div className="flex-1 rounded-lg border border-ink/10 p-3">
                  <div className="text-[11px] text-ink/55">Outstanding</div>
                  <div className="mt-1 text-xl font-bold tracking-[-0.02em]">₹42,500</div>
                </div>
                <div className="flex-1 rounded-lg border border-ink/10 p-3">
                  <div className="text-[11px] text-ink/55">Paid this month</div>
                  <div className="mt-1 text-xl font-bold tracking-[-0.02em]">₹1,18,000</div>
                </div>
              </div>
              {[
                ["INV-1042", "Mehta Stores", "₹18,000", "Paid"],
                ["INV-1041", "Patel Studio", "₹24,500", "Due"],
                ["INV-1040", "Joshi Foods", "₹6,200", "Paid"],
              ].map(([id, who, amt, st]) => (
                <div key={id} className="flex items-center justify-between gap-3 border-t border-ink/10 px-3.5 py-2.5 text-xs">
                  <span>
                    <b className="font-medium">{id}</b>{" "}
                    <span className="text-ink/55">{who}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="font-medium">{amt}</span>
                    <span className={`inline-flex h-[22px] items-center rounded-md border px-2 text-[11px] font-medium ${st === "Paid" ? "border-ink bg-ink text-paper" : "border-ink/25"}`}>{st}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute -left-3 bottom-0 flex w-[272px] items-center gap-3 rounded-[10px] border border-ink/15 bg-paper px-4 py-3.5 shadow-float md:-left-6">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-ink text-paper">
                <Icon name="check" size={16} strokeWidth={2.4} />
              </span>
              <div>
                <div className="text-[13px] font-medium leading-[18px]">Payment verified</div>
                <div className="text-xs font-light leading-[18px] text-ink/65">License key sent by email</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* trust bar */}
      <section className="border-y border-ink/10 bg-wash">
        <div className="wrap grid gap-x-10 gap-y-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t) => (
            <div key={t.title} className="flex items-start gap-3.5">
              <Icon name={t.icon} size={22} strokeWidth={1.8} className="mt-0.5 flex-none" />
              <div>
                <div className="text-[15px] font-medium leading-[22px]">{t.title}</div>
                <div className="text-[13px] font-light leading-5 text-ink/70">{t.body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* products */}
      <section>
        <div className="wrap py-20 md:py-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="eyebrow mb-3.5">Products</div>
              <h2 className="h2">Tools you can start using today</h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 text-[15px] font-medium">
              View all products <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(320px,100%),1fr))]">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* how it works */}
      <section id="how" className="scroll-mt-20 border-y border-ink/10 bg-wash">
        <div className="wrap py-20 md:py-24">
          <div className="eyebrow mb-3.5">How it works</div>
          <h2 className="h2 max-w-[680px]">From checkout to your key in four steps</h2>
          <div className="mt-14 grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(240px,100%),1fr))]">
            {steps.map((s, i) => (
              <div key={s.title}>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ink text-sm font-medium">
                  {i + 1}
                </div>
                <div className="mt-5 text-lg font-bold leading-[26px] tracking-[-0.01em]">{s.title}</div>
                <div className="mt-2 text-sm font-light leading-6 text-ink/75">{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* terms */}
      <section id="terms" className="scroll-mt-20">
        <div className="wrap py-20 md:py-24">
          <div className="eyebrow mb-3.5">Before you buy</div>
          <h2 className="h2 max-w-[680px]">What you pay, what you get, what if it goes wrong</h2>
          <div className="mt-12 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
            {terms.map((t) => (
              <div key={t.title} className="card p-7">
                <div className="text-[17px] font-bold leading-[26px]">{t.title}</div>
                <p className="mt-2.5 text-sm font-light leading-6 text-ink/80">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* built by */}
      <section className="bg-ink text-paper">
        <div className="wrap flex flex-wrap items-center justify-between gap-10 py-20">
          <div className="max-w-[640px] flex-1 basis-[480px]">
            <div className="text-[13px] font-medium text-paper/60">Who is behind this</div>
            <h2 className="h2 mt-3.5">Built and supported by Genartml.</h2>
            <p className="mt-5 text-base font-light leading-7 text-paper/80">
              Genartml is an AI and workflow automation company based in
              Ahmedabad, India. Forgekit is where we sell the small tools we
              build. When you write to support, you reach the people who made
              the product.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/products" variant="inverse">Browse products</ButtonLink>
            <ButtonLink href="/#faq" variant="ghost-inverse">Read the FAQ</ButtonLink>
          </div>
        </div>
      </section>

      {/* faq */}
      <section id="faq" className="scroll-mt-20">
        <div className="wrap flex flex-wrap gap-x-20 gap-y-12 py-20 md:py-24">
          <div className="min-w-0 flex-1 basis-[280px]">
            <div className="eyebrow mb-3.5">FAQ</div>
            <h2 className="h2">Common questions</h2>
            <p className="mt-4 text-[15px] font-light leading-[26px] text-ink/70">
              Something else? Write to{" "}
              <a className="underline underline-offset-4" href={`mailto:${site.supportEmail}`}>
                {site.supportEmail}
              </a>
              .
            </p>
          </div>
          <div className="min-w-0 flex-[2_1_520px]">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0} className="group border-t border-ink/15 last:border-b">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium leading-7 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="text-2xl font-light transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-[640px] pb-6 text-[15px] font-light leading-[26px] text-ink/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
