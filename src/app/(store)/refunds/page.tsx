import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/store/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Refund policy" };

// DRAFT. The refund window comes from src/lib/site.ts. Confirm it, then edit this text.
export default function RefundsPage() {
  return (
    <LegalPage title="Refund policy" updated="6 October 2026">
      <LegalSection title="Refunds">
        <p>
          If a product does not do what its page says, write to {site.supportEmail}{" "}
          within {site.refundDays} days of purchase with your order number and we
          will refund you.
        </p>
      </LegalSection>
      <LegalSection title="Monthly plans">
        <p>
          You can stop a monthly plan before the next renewal date by emailing us.
          The license stays active until the end of the period you paid for.
        </p>
      </LegalSection>
      <LegalSection title="After a refund">
        <p>The license key for a refunded order is revoked.</p>
      </LegalSection>
      <LegalSection title="How long it takes">
        <p>
          Refunds go back to the original payment method through Razorpay. Your
          bank decides how long it takes to show up.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
