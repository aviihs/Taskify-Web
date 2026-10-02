import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/header/Navbar";
import site from "@/data/site.json";
import { fontMono, fontSans } from "@/lib/fonts";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteDescription =
  "Taskify is a task and project manager for teams. Organise projects, assign tasks, track progress and keep everyone in sync from your phone or the web.";

export const metadata: Metadata = {
  title: {
    default: `${site.name} · Plan, track and finish work together`,
    template: `%s · ${site.name}`,
  },
  description: siteDescription,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  keywords: [
    "task manager",
    "project management",
    "team collaboration",
    "to-do app",
    "Taskify",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} · Plan, track and finish work together`,
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: site.name,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#585c83",
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
        <LocaleProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
