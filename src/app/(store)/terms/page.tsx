import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/store/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = { 
  title: "Terms of Service | Forgekit",
  description: "Read the official Terms of Service governing product licensing, payments, account usage, and legal guarantees for Forgekit tools."
};

export default function TermsPage() {
  return (
    <LegalPage 
      title="Terms of Service" 
      updated="October 6, 2026"
      subtitle="These binding terms set out your rights and responsibilities when purchasing and using software products from Forgekit."
    >
      <LegalSection title="1. Agreement & Provider Ownership">
        <p>
          These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Customer&quot; or &quot;User&quot;) and <strong>Forgekit</strong> (&quot;Company&quot;, &quot;we&quot;, or &quot;us&quot;), operating from {site.location}.
        </p>
        <p className="mt-2">
          By purchasing, downloading, or activating any software product license through <a className="text-indigo-600 underline" href="https://www.forgekit.in">forgekit.in</a>, you accept these Terms in full. If you are entering into this agreement on behalf of a company or legal entity, you represent that you have the authority to bind such entity.
        </p>
      </LegalSection>

      <LegalSection title="2. License Grant & Permitted Usage">
        <p>
          Upon payment confirmation by Razorpay, Forgekit grants you a non-exclusive, non-transferable, worldwide license to access and use the purchased digital software product according to the plan selected:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1.5 text-xs sm:text-sm text-ink/80">
          <li><strong>One-Time Lifetime License:</strong> Grants perpetual access to the specified version of the software tool without recurring subscription fees.</li>
          <li><strong>Monthly Subscription License:</strong> Grants access to the software product on a month-to-month basis, subject to timely payment renewals. Includes active maintenance and feature updates.</li>
        </ul>
        <p className="mt-3">
          <strong>Restrictions:</strong> You shall not sub-license, rent, lease, reverse-engineer, decompile, or redistribute your assigned software license keys to unauthorized third parties.
        </p>
      </LegalSection>

      <LegalSection title="3. Pricing, Billing & Tax Invoicing">
        <p>
          All product prices are quoted in Indian Rupees (₹ INR). Prices displayed at checkout are final.
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1.5 text-xs sm:text-sm text-ink/80">
          <li><strong>Payment Processing:</strong> Payments are processed via PCI-DSS compliant partner <strong>Razorpay Software Pvt. Ltd.</strong> using UPI, Debit/Credit Cards, or Netbanking.</li>
          <li><strong>GST Tax Receipts:</strong> Registered Indian businesses providing a valid GSTIN at checkout will receive an official tax invoice with GST input credit details.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Free Trials & Subscription Renewals">
        <p>
          Products offering a 7-day free trial allow immediate access without upfront charges. Unless cancelled before the 7-day trial period expires, your card will be automatically charged for the recurring monthly fee. You may cancel your subscription at any time by emailing <a className="text-indigo-600 font-medium underline" href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
        </p>
      </LegalSection>

      <LegalSection title="5. Intellectual Property Rights">
        <p>
          All intellectual property rights, trademarks, underlying code, visual designs, and documentation associated with Forgekit products remain the exclusive property of Forgekit and its founder ({site.company}).
        </p>
      </LegalSection>

      <LegalSection title="6. Disclaimer of Warranties & Limitation of Liability">
        <p>
          Software is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. While we strive for 99.9% uptime and defect-free code, Forgekit shall not be liable for indirect, incidental, or consequential damages resulting from lost business data or service interruptions exceeding the actual amount paid for the software license.
        </p>
      </LegalSection>

      <LegalSection title="7. Governing Law & Dispute Resolution">
        <p>
          These Terms shall be governed by and construed in accordance with the laws of India. Any legal proceedings arising from these Terms shall be subject to the exclusive jurisdiction of the competent courts in Gujarat, India.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
