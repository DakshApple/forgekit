import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Forgekit. Simple business software at a fixed price.",
    template: "%s | Forgekit",
  },
  description:
    "Small software for small businesses. Pick a tool, pay monthly or once in INR, and get your license key by email. No account needed.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "Forgekit. Simple business software at a fixed price.",
    description: "Small software for small businesses. Pick a tool, pay monthly or once in INR, and get your license key by email.",
    siteName: "Forgekit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forgekit. Simple business software at a fixed price.",
    description: "Small software for small businesses. Pick a tool, pay monthly or once in INR, and get your license key by email.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
