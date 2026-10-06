import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/store/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy" };

// DRAFT. Have a lawyer review and finalise this text before launch.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="6 October 2026">
      <LegalSection title="What we collect">
        <p>
          When you buy, we collect your email, name, phone number, and optionally
          your business name and GSTIN. We also keep your order and license
          records.
        </p>
      </LegalSection>
      <LegalSection title="Why we collect it">
        <p>
          To take payment, send your license key and receipt, give you support,
          and meet tax and accounting rules.
        </p>
      </LegalSection>
      <LegalSection title="Who sees it">
        <p>
          Razorpay processes your payment. Our email provider delivers your key.
          We do not sell your data.
        </p>
      </LegalSection>
      <LegalSection title="Your choices">
        <p>
          Write to {site.supportEmail} to ask for a copy of your data or to have
          it corrected or deleted, where the law allows.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
