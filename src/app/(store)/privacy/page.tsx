import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/store/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy policy" };

// Production Privacy Policy
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="6 October 2026">
      <LegalSection title="1. Information We Collect">
        <p>
          We collect information that you provide directly to us when purchasing a license. This includes your email address, full name, phone number, and any billing details (such as Business Name or GSTIN). We do not collect or store credit card details; all financial transactions are processed securely via Razorpay.
        </p>
      </LegalSection>
      <LegalSection title="2. How We Use Your Information">
        <p>
          Your information is used strictly to provide you with the product. We use your email to deliver your license keys, send important security updates, process refunds, and respond to your customer support requests. We may also use your billing details to generate legally required tax invoices.
        </p>
      </LegalSection>
      <LegalSection title="3. Third-Party Services">
        <p>
          We share your data with trusted third parties only when necessary to operate our business:
        </p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li><strong>Razorpay:</strong> To process your payments securely.</li>
          <li><strong>Email Providers:</strong> To deliver your license keys and transactional emails.</li>
        </ul>
      </LegalSection>
      <LegalSection title="4. Cookies and Tracking">
        <p>
          We use essential cookies to ensure the website functions securely (such as CSRF tokens and admin session cookies). We do not use third-party tracking or advertising cookies.
        </p>
      </LegalSection>
      <LegalSection title="5. Data Retention & Deletion">
        <p>
          We retain your purchase history to ensure your license remains valid indefinitely (for one-time purchases) or for the duration of your subscription. If you wish to have your data completely deleted from our systems, please email {site.supportEmail}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
