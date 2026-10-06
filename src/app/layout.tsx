import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Forgekit. Simple business software at a fixed price.",
    template: "%s | Forgekit",
  },
  description:
    "Small software for small businesses. Pick a tool, pay monthly or once in INR, and get your license key by email. No account needed.",
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
