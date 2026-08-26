import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://copiwrite.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Copiwrite: Marketing that makes the value clear",
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
    title: "Copiwrite: Marketing that makes the value clear",
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

const clarityScript = `
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "y6jcbhaask");
`;

const googleAnalyticsScript = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-F5XQTR7K4J');
`;

const metaPixelScript = `
  !function(f,b,e,v,n,t,s){
    if(f.fbq)return;
    n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
    t=b.createElement(e);t.async=!0;t.src=v;
    s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)
  }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init','1862600781375107');
  fbq('track','PageView');
`;

const tawkConfigScript = `
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {clarityScript}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F5XQTR7K4J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {googleAnalyticsScript}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {metaPixelScript}
        </Script>
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=1862600781375107&amp;ev=PageView&amp;noscript=1" />',
          }}
        />
        <Script id="tawk-config" strategy="afterInteractive">
          {tawkConfigScript}
        </Script>
        <Script
          id="tawk-chat-widget"
          src="https://embed.tawk.to/6a8a0faadf6d0434484b9c8e/1k0lkqd19"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
