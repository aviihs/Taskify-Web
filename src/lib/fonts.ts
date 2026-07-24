import { Geist, Geist_Mono } from "next/font/google";

// Single source of truth for fonts — swap/add a family here only.
// Wire new CSS variables to Tailwind tokens in `src/app/globals.css` (@theme inline).
export const fontSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
