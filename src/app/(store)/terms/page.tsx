import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/store/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of service" };

// DRAFT. Have a lawyer review and finalise this text before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of service" updated="6 October 2026">
      <LegalSection title="Who we are">
        <p>
          Forgekit is operated by {site.company}, {site.location}. By buying a
          license you agree to these terms.
        </p>
      </LegalSection>
      <LegalSection title="What you are buying">
        <p>
          A license to use one Forgekit product, as described on its page.
          Monthly licenses renew every month until cancelled. One-time licenses
          are paid once and do not renew.
        </p>
      </LegalSection>
      <LegalSection title="License keys">
        <p>
          A key is issued after payment is verified and is for your use only. We
          may mark a key as expired or revoked, for example after a refund or
          misuse.
        </p>
      </LegalSection>
      <LegalSection title="Payments">
        <p>
          Prices are in Indian rupees. Payments are processed by Razorpay. We do
          not store card details.
        </p>
      </LegalSection>
      <LegalSection title="Contact">
        <p>Questions about these terms: {site.supportEmail}.</p>
      </LegalSection>
    </LegalPage>
  );
}
