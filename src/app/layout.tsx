import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/header/Navbar";
import { fontMono, fontSans } from "@/lib/fonts";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Taskify · Plan, track and finish work together",
    template: "%s · Taskify",
  },
  description:
    "Taskify is a task and project manager for teams. Organise projects, assign tasks, track progress and keep everyone in sync from your phone or the web.",
  applicationName: "Taskify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        fontSans.variable,
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="flex min-h-full flex-col">
        <LocaleProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
