import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted Inter (from @fontsource files) via next/font: no network call at
// build time, and a size-adjusted fallback so text does not shift on load.
const inter = localFont({
  src: [
    { path: "../../node_modules/@fontsource/inter/files/inter-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/inter/files/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#08090a" },
  ],
};

// Runs before first paint: marks JS as available (enables scroll reveals) and
// applies the saved storefront theme so there is no light/dark flash.
const bootScript = `(function(){try{var d=document.documentElement;d.classList.add('js');if(localStorage.getItem('fk-theme')==='dark')d.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
