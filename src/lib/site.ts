// Single place for business details used across the storefront.
// Replace these before launch.

export const site = {
  name: "Forgekit",
  company: "Forgekit Inc.",
  location: "Ahmedabad, Gujarat, India",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@forgekit.example",
  supportHours: "Mon to Sat, 10am to 6pm IST",
  /** Policy values shown in the UI. Decide the real ones, then edit here. */
  refundDays: 7,
  supportReply: "within one working day",
  adminEmail: "admin@forgekit.in",
} as const;
