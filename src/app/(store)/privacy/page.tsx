import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/store/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { 
  title: "Privacy Policy | Forgekit",
  description: "Learn how Forgekit collects, uses, protects, and handles your personal data in full compliance with the Information Technology Act (India) & international data standards."
};

export default function PrivacyPage() {
  return (
    <LegalPage 
      title="Privacy Policy" 
      updated="October 6, 2026"
      subtitle="At Forgekit, we believe privacy is a fundamental right. This policy outlines our transparent data practices, security safeguards, and your rights."
    >
      <LegalSection title="1. Introduction & Ownership">
        <p>
          This Privacy Policy governs the collection, processing, and protection of personal data by <strong>Forgekit</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), an independent digital software studio operating in India.
        </p>
        <p>
          By accessing our website (<a className="text-sapphire-600 underline dark:text-sapphire-400" href="https://www.forgekit.in">forgekit.in</a>) or purchasing any software license keys, you agree to the collection and use of information in accordance with this policy. This policy complies with the Information Technology Act, 2000, Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and relevant provisions of the Digital Personal Data Protection (DPDP) Act, 2023.
        </p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>We adhere to strict data minimization. We only collect the minimal information necessary to deliver software license keys and issue tax receipts:</p>
        
        <div className="mt-3 space-y-3">
          <div className="rounded-xl border border-ink/10 bg-wash/50 p-4">
            <h3 className="font-bold text-ink">A. Direct Personal Information</h3>
            <ul className="mt-2 list-disc list-inside space-y-1 text-xs sm:text-sm text-ink/75">
              <li><strong>Contact Details:</strong> Email address (used for license key delivery and transactional updates).</li>
              <li><strong>Identity Info:</strong> Full name and optional business name (for tax receipts).</li>
              <li><strong>Tax Data:</strong> GSTIN (Optional, provided voluntarily by Indian businesses for GST tax input credit).</li>
              <li><strong>Contact Number:</strong> Phone number (optional, used solely for urgent order clarification).</li>
            </ul>
          </div>

          <div className="rounded-xl border border-ink/10 bg-wash/50 p-4">
            <h3 className="font-bold text-ink">B. Financial & Payment Information</h3>
            <p className="mt-1 text-xs sm:text-sm text-ink/75">
              <strong>We do NOT collect, store, or process payment card numbers, CVVs, UPI PINs, or netbanking credentials.</strong> All transactions are executed through PCI-DSS Level 1 Compliant payment gateway partner <strong>Razorpay</strong>. We only receive a transaction ID and payment confirmation status.
            </p>
          </div>

          <div className="rounded-xl border border-ink/10 bg-wash/50 p-4">
            <h3 className="font-bold text-ink">C. Technical & Usage Data</h3>
            <p className="mt-1 text-xs sm:text-sm text-ink/75">
              We collect server logs containing IP addresses, browser user-agents, and request timestamps solely for security defense, rate-limiting, and fraud prevention.
            </p>
          </div>
        </div>
      </LegalSection>

      <LegalSection title="3. Purpose & Legal Basis for Processing">
        <p>We process your personal information strictly under the following lawful grounds:</p>
        <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-ink/80">
          <li><strong>Contract Performance:</strong> To issue, validate, and manage your software license keys upon payment.</li>
          <li><strong>Legal Obligation:</strong> To issue GST invoices and maintain financial transaction records required under Indian Tax Laws.</li>
          <li><strong>Legitimate Interest:</strong> To prevent fraudulent orders, defend against DDoS attacks, and enforce rate limits.</li>
          <li><strong>Customer Support:</strong> To assist you with product installation, troubleshooting, or refund requests.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Data Sharing & Third-Party Vendors">
        <p>We do not sell, rent, or trade your personal data under any circumstances. We share data only with essential infrastructure subprocessors:</p>
        
        <div className="mt-3 overflow-hidden rounded-xl border border-ink/10">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-wash border-b border-ink/10 text-ink font-bold">
              <tr>
                <th className="p-3">Vendor / Service</th>
                <th className="p-3">Purpose</th>
                <th className="p-3">Data Handled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10 text-ink/75">
              <tr>
                <td className="p-3 font-semibold text-ink">Razorpay Software Pvt. Ltd.</td>
                <td className="p-3">Payment Processing</td>
                <td className="p-3">Email, Name, Order Amount, GSTIN</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">Supabase Inc.</td>
                <td className="p-3">Database & Relational Storage</td>
                <td className="p-3">Encrypted Order & License Records</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-ink">Vercel Inc.</td>
                <td className="p-3">Edge Application Hosting</td>
                <td className="p-3">Server Request Logs, IP Addresses</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="5. Cookies & Tracking Technologies">
        <p>
          Forgekit maintains a privacy-first approach to cookies:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-ink/80">
          <li><strong>Essential Cookies Only:</strong> We use strictly necessary session cookies for security tokens (CSRF protection) and authenticated admin access.</li>
          <li><strong>Zero Marketing Tracking:</strong> We do NOT use third-party cross-site trackers, Facebook Pixels, Google Remarketing, or ad network cookies.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Data Security & Storage Safeguards">
        <p>
          We employ industry-standard technical and organizational security measures:
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-ink/80">
          <li><strong>Encryption:</strong> All data in transit is encrypted via TLS 1.3/HTTPS. Relational data in Supabase is encrypted at rest using AES-256.</li>
          <li><strong>Access Control:</strong> Database access is guarded by strict Row Level Security (RLS) policies. Only authenticated system services can write to order records.</li>
          <li><strong>Tokenization:</strong> License keys are cryptographically generated using secure pseudo-random number generators (PRNG).</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Data Retention & Deletion Rights">
        <p>
          We retain purchase records (Email, Name, License Key, GSTIN) for as long as your software license remains valid to allow key recovery and verify authentications.
        </p>
        <p className="mt-2">
          <strong>Your Rights:</strong> Under applicable law, you have the right to request access to, correction of, or complete erasure of your personal data. To exercise your rights, email us at <a className="font-semibold text-sapphire-600 underline dark:text-sapphire-400" href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>. (Note: Account erasure will invalidate your active license keys).
        </p>
      </LegalSection>

      <LegalSection title="8. Grievance Officer & Contact Information">
        <p>
          In accordance with the Information Technology Act, 2000 and rules made thereunder, the contact details of our Grievance Officer are provided below:
        </p>
        <div className="mt-3 rounded-xl border border-ink/10 bg-wash/60 p-4 text-xs sm:text-sm space-y-1">
          <div><strong>Grievance Officer:</strong> Legal & Compliance Team (Forgekit)</div>
          <div><strong>Email:</strong> <a className="font-medium text-sapphire-600 underline dark:text-sapphire-400" href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a></div>
          <div><strong>Response Timeline:</strong> Within 48 hours of receipt of grievance.</div>
        </div>
      </LegalSection>
    </LegalPage>
  );
}
