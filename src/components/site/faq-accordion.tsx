import { site } from "@/lib/site";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const faqs = [
  { q: "Do I need an account to buy?", a: "No. Your email and a payment are enough. Your license key is safely sent to the email you enter at checkout." },
  { q: "How do I log into the apps I bought?", a: "Each app works differently. Some will just ask you to paste your License Key, while others might ask for your email and then verify your key." },
  { q: "What if my payment fails?", a: "No key is issued until the payment is verified. If money left your account without a key, just email us your order number and we'll fix it instantly." },
  { q: "Will I get a GST invoice?", a: "Yes, you get a tax receipt with every order. Just add your GSTIN at checkout and it will be included." },
];

export function FaqAccordion() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section scroll-mt-24">
      <div className="wrap">
        <SectionHeading
          id="faq-title"
          kicker="Support"
          title="Frequently asked questions."
        />
        
        <div className="mx-auto mt-14 max-w-[720px]">
          {faqs.map((f, i) => (
            <Reveal key={f.q} as="details" delay={i * 60} className="group border-b border-ink/[0.08] last:border-none">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-medium text-ink transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="relative h-4 w-4 flex-none text-ink/40 transition-transform duration-300 group-open:rotate-180">
                  <span className="absolute inset-y-0 left-1.5 w-[1.5px] bg-currentColor transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                  <span className="absolute inset-x-0 top-1.5 h-[1.5px] bg-currentColor" />
                </span>
              </summary>
              <div className="overflow-hidden">
                <p className="pb-6 pr-8 text-[15px] leading-[1.6] text-ink/65">{f.a}</p>
              </div>
            </Reveal>
          ))}
          
          <Reveal delay={faqs.length * 60} className="mt-8 rounded-2xl bg-wash/60 p-6 text-center text-[14px] text-ink/70">
            Have a question not listed here? Email us at{" "}
            <a className="font-medium text-ink underline underline-offset-4 hover:text-accent" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
