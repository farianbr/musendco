import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import { absoluteUrl, siteUrl } from "@/lib/site-url";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

/**
 * TeX Gyre Heros (GUST Font License, see fonts/GUST-FONT-LICENSE.txt): a free
 * Helvetica clone, bundled so devices without Helvetica Neue still get the
 * brand look. It sits behind the real Helvetica Neue in --font-sans, and is
 * not preloaded, so Apple devices (which have Helvetica Neue) never fetch it.
 * Only 400 and 700 exist: 500 renders as 400 and 600 as 700, as Arial did.
 */
const heros = localFont({
  src: [
    { path: "./fonts/texgyreheros-regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/texgyreheros-italic.otf", weight: "400", style: "italic" },
    { path: "./fonts/texgyreheros-bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-heros",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: site.legalName,
    template: `%s - ${site.legalName}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.legalName, locale: "en", url: "/" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/brand/muse-logo-dark.svg"),
  address: { "@type": "PostalAddress", addressLocality: "Luton", addressCountry: "GB" },
  description: site.description,
};

/** Applies a saved light-theme preference before first paint (no flash). */
const themeScript = `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={heros.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Static string, no user input. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body id="top" className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[70] -translate-y-24 rounded-full bg-accent px-5 py-3 text-meta font-medium text-on-accent focus:translate-y-0"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
