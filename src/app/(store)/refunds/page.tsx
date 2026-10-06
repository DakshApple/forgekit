import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/store/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Refund policy" };

// Production Refund Policy
export default function RefundsPage() {
  return (
    <LegalPage title="Refund policy" updated="6 October 2026">
      <LegalSection title="1. Digital Products Refund Policy">
        <p>
          We stand behind the quality of our products. If the software does not work as described or you encounter insurmountable technical issues, write to {site.supportEmail} within {site.refundDays} days of your purchase. Please include your order number and a brief explanation of the issue, and we will issue a full refund.
        </p>
      </LegalSection>
      <LegalSection title="2. Free Trials">
        <p>
          Some of our subscription products offer a 7-day free trial. If you cancel your subscription before the trial period ends, your card will not be charged. Once the trial converts into a paid subscription, the standard refund policy applies.
        </p>
      </LegalSection>
      <LegalSection title="3. Monthly Subscriptions & Cancellations">
        <p>
          You have full control over your subscriptions. You can request a cancellation of your monthly plan at absolutely any time before the next billing cycle by emailing {site.supportEmail}. Upon cancellation, your license will remain fully active until the end of the period you already paid for.
        </p>
      </LegalSection>
      <LegalSection title="4. Consequences of a Refund">
        <p>
          When a refund is processed, the associated License Key is immediately and permanently revoked. You will lose access to the premium features of the product associated with that key.
        </p>
      </LegalSection>
      <LegalSection title="5. Processing Times">
        <p>
          All refunds are securely routed back to your original payment method through Razorpay. Depending on your bank or credit card issuer, it typically takes 5-7 business days for the funds to reflect in your account.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
