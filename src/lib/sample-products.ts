// Sample catalogue. Used ONLY by the seed script (scripts/seed.ts) to load the six
// starter products and plans into the database. The app reads from the DB.

import type { Product } from "./types";

export type SeedProduct = Omit<Product, "accessUrl" | "keyPrefix">;

export const products: SeedProduct[] = [
  {
    slug: "invoice-kit",
    name: "Invoice Kit",
    tagline: "Create and send invoices from one page.",
    description:
      "Create and send invoices from one page. Built for small businesses that send a handful a week and do not want full accounting software.",
    icon: "invoice",
    plans: [
      { id: "invoice-kit-monthly", type: "monthly", priceInr: 499 },
      { id: "invoice-kit-once", type: "one-time", priceInr: 4999 },
    ],
    features: [
      "Build an invoice from a saved customer and item list",
      "Send it by email as a PDF",
      "Mark it paid and see what is still outstanding",
      "Export a month of invoices as a CSV",
    ],
    preview: {
      title: "Invoices",
      rows: [
        { label: "INV-1042 Mehta Stores", value: "₹18,000" },
        { label: "INV-1041 Patel Studio", value: "₹24,500" },
        { label: "INV-1040 Joshi Foods", value: "₹6,200" },
      ],
    },
    status: "live",
    updatedAt: "28 Sep 2026",
    trialDays: 7,
  },
  {
    slug: "booking-kit",
    name: "Booking Kit",
    tagline: "A booking page your customers fill in themselves.",
    description:
      "Share one link. Customers pick a slot and you get the booking. No back and forth on WhatsApp.",
    icon: "calendar",
    plans: [{ id: "booking-kit-monthly", type: "monthly", priceInr: 299 }],
    features: [
      "A public booking page with your services and hours",
      "Customers pick a free slot and leave their details",
      "Email confirmation to you and the customer",
      "Block out days off in two clicks",
    ],
    preview: {
      title: "Today",
      rows: [
        { label: "10:30 Haircut", value: "Confirmed" },
        { label: "12:00 Consultation", value: "Confirmed" },
        { label: "15:15 Follow-up", value: "Pending" },
      ],
    },
    status: "live",
    updatedAt: "21 Sep 2026",
    trialDays: 7,
  },
  {
    slug: "review-kit",
    name: "Review Kit",
    tagline: "Ask every customer for a Google review.",
    description:
      "Send a short message after every sale with a direct link to leave a Google review.",
    icon: "star",
    plans: [{ id: "review-kit-monthly", type: "monthly", priceInr: 399 }],
    features: [
      "Upload a customer list or add one at a time",
      "Send a review request by email",
      "See who has and has not replied",
      "Your own Google review link, no extra setup",
    ],
    preview: {
      title: "Review requests",
      rows: [
        { label: "Sana Khan", value: "Sent" },
        { label: "Vikram Desai", value: "Reviewed" },
        { label: "Neha Patel", value: "Sent" },
      ],
    },
    status: "live",
    updatedAt: "14 Sep 2026",
    trialDays: 7,
  },
  {
    slug: "stock-kit",
    name: "Stock Kit",
    tagline: "Know what is on the shelf, without a spreadsheet.",
    description:
      "Track items and quantities for a small shop. See what is low before it runs out.",
    icon: "box",
    plans: [{ id: "stock-kit-once", type: "one-time", priceInr: 2999 }],
    features: [
      "Add items with a quantity and a low-stock level",
      "Record stock in and stock out",
      "A list of what needs reordering",
      "Export your stock as a CSV",
    ],
    preview: {
      title: "Items",
      rows: [
        { label: "Basmati rice 5 kg", value: "42 left" },
        { label: "Sunflower oil 1 L", value: "8 left" },
        { label: "Tea 250 g", value: "120 left" },
      ],
    },
    status: "live",
    updatedAt: "2 Sep 2026",
    trialDays: 0,
  },
  {
    slug: "quote-kit",
    name: "Quote Kit",
    tagline: "Send a clean quote in two minutes.",
    description:
      "Build a quote from your price list and send it as a PDF. Turn it into an invoice when accepted.",
    icon: "quote",
    plans: [{ id: "quote-kit-once", type: "one-time", priceInr: 1499 }],
    features: [
      "Build a quote from a saved price list",
      "Send it as a PDF by email",
      "Track quotes as sent, accepted or declined",
      "Valid-until date on every quote",
    ],
    preview: {
      title: "Quotes",
      rows: [
        { label: "QT-208 Raoworks", value: "₹56,000" },
        { label: "QT-207 Desai Trade", value: "₹12,400" },
        { label: "QT-206 Khan Fab", value: "₹31,000" },
      ],
    },
    status: "live",
    updatedAt: "30 Aug 2026",
    trialDays: 0,
  },
  {
    slug: "lead-kit",
    name: "Lead Kit",
    tagline: "Catch a lead, follow up the same day.",
    description:
      "A simple form for your website and a list of who to call today.",
    icon: "user-plus",
    plans: [{ id: "lead-kit-monthly", type: "monthly", priceInr: 599 }],
    features: [
      "An embeddable enquiry form",
      "Every new lead emailed to you",
      "A follow-up list for today",
      "Mark leads as won or lost",
    ],
    preview: {
      title: "New leads",
      rows: [
        { label: "Arjun Rao", value: "Today" },
        { label: "Meera Iyer", value: "Today" },
        { label: "Dev Joshi", value: "Yesterday" },
      ],
    },
    status: "live",
    updatedAt: "19 Aug 2026",
    trialDays: 7,
  },
];
