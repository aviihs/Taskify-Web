// Supported locales. "en" is the source language Text's children are written
// in, so it never needs a dictionary entry.
export const locales = ["en", "ne"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
