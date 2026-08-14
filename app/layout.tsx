import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://copiwrite.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Copiwrite — Marketing that makes the value clear",
    template: "%s | Copiwrite",
  },
  description:
    "Copiwrite turns complex offers into clear positioning, conversion copy, campaigns, and sales content that moves buyers to act.",
  keywords: [
    "conversion copywriting",
    "marketing strategy",
    "sales enablement",
    "website copywriting",
    "B2B positioning",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Copiwrite",
    title: "Turn what you sell into words people act on.",
    description: "Strategy, copy, campaigns, and sales content for ambitious teams.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Copiwrite — Marketing that makes the value clear",
    description: "Strategy, copy, campaigns, and sales content for ambitious teams.",
  },
};

const themeScript = `
  try {
    const stored = localStorage.getItem('copiwrite-theme');
    const dark = stored === 'dark' || (!stored && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  } catch (_) {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
