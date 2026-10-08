import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/header/Navbar";
import TopBar from "@/components/layout/header/TopBar";
import MotionProvider from "@/components/motion/MotionProvider";
import JsonLd from "@/components/reusable/JsonLd";
import site from "@/data/site.json";
import { fontMono, fontSans } from "@/lib/fonts";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { SITE_URL } from "@/lib/seo";
import { buildSiteSchema } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const defaultTitle = `${site.name} by ${site.creator.name} · Task and project manager for teams`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.creator.name, url: site.creator.url }],
  creator: site.creator.name,
  publisher: site.legalName,
  keywords: site.keywords,
  category: "productivity",
  alternates: {
    canonical: "/",
    // Points AI crawlers at the plain-text site summary.
    types: { "text/plain": "/llms.txt" },
  },
  formatDetection: { email: false, telephone: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: defaultTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
    creator: site.creator.name,
  },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(
        "h-full",
        "scroll-smooth",
        "antialiased",
        fontSans.variable,
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="bg-taskify-background flex min-h-full flex-col">
        <JsonLd data={buildSiteSchema()} />
        <LocaleProvider>
          <MotionProvider>
            {/* Top bar and navbar stick together as one header. */}
            <div className="sticky top-0 z-50">
              <TopBar />
              <Navbar />
            </div>
            <div className="flex-1">{children}</div>
            <Footer />
          </MotionProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
