import { Icon, type IconName } from "@/components/icons";

/**
 * Monochrome payment & security marks. These are facts about how checkout
 * works (Razorpay handles UPI, cards and netbanking), not customer logos.
 * Kept at 55% ink (not 40%) so the text still passes WCAG AA.
 */
const marks: { icon: IconName; label: string }[] = [
  { icon: "shield", label: "Razorpay secured" },
  { icon: "card", label: "UPI · Cards · Netbanking" },
  { icon: "invoice", label: "GST invoices" },
  { icon: "lock", label: "HTTPS encrypted" },
  { icon: "globe", label: "Prices in ₹ INR" },
  { icon: "mail", label: "Key by email" },
];

export function TrustStrip() {
  return (
    <section aria-label="Payments and security" className="relative border-y border-ink/[0.06] py-8">
      <ul className="wrap flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:justify-between">
        {marks.map((m) => (
          <li
            key={m.label}
            className="inline-flex items-center gap-2 text-[14px] font-medium tracking-[-0.01em] text-ink/55 grayscale transition-colors duration-150 hover:text-ink"
          >
            <Icon name={m.icon} size={17} strokeWidth={1.7} />
            {m.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
