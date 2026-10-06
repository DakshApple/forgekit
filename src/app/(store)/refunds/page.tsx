import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/store/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { 
  title: "Refund Policy | Forgekit",
  description: "Read our straightforward 7-day refund guarantee policy, subscription cancellation rules, and payment processing timelines."
};

export default function RefundsPage() {
  return (
    <LegalPage 
      title="Refund Policy" 
      updated="October 6, 2026"
      subtitle="We want you to be 100% confident in your purchase. Here is our simple, hassle-free money-back guarantee."
    >
      <LegalSection title="1. 7-Day Money Back Guarantee">
        <p>
          We stand behind the code we build. If any software tool you purchase from Forgekit does not function as described on its product page, or if you encounter technical issues that our support team cannot resolve, you are entitled to a <strong>100% full refund within {site.refundDays} days</strong> of purchase.
        </p>
        <p className="mt-2">
          To request a refund, simply send an email to <a className="text-sky-600 font-semibold underline" href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> with your Order ID or License Key. No complex forms or questions asked.
        </p>
      </LegalSection>

      <LegalSection title="2. 7-Day Free Trial Policy">
        <p>
          Select monthly subscription products offer a 7-day free trial. You can test all premium features without being billed upfront. If you cancel before day 7, your account will never be charged. Once a trial converts into a paid billing cycle, our standard 7-day refund window applies to that billing period.
        </p>
      </LegalSection>

      <LegalSection title="3. Subscription Cancellations">
        <p>
          You are in full control of your subscription plans:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1.5 text-xs sm:text-sm text-ink/80">
          <li>Cancel anytime before your next renewal date by emailing <a className="text-sky-600 underline" href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.</li>
          <li>Upon cancellation, your license key remains <strong>100% active until the end of the current paid billing cycle</strong>.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Key Revocation & Bank Processing Timelines">
        <p>
          When a refund is approved and processed:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1.5 text-xs sm:text-sm text-ink/80">
          <li><strong>License Revocation:</strong> The associated license key will be marked as revoked in our system, disabling future access.</li>
          <li><strong>Bank Refund Speed:</strong> Refunds are routed back through <strong>Razorpay</strong> to your original payment method (UPI, Card, or Bank Account). Funds typically reflect in your account within <strong>5 to 7 business days</strong>.</li>
        </ul>
      </LegalSection>
    </LegalPage>
  );
}
