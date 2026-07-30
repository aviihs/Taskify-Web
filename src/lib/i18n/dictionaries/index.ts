import type { Locale } from "../config";
import ne from "./ne.json";

// Keyed by the exact English string Text receives as children.
// Add a locale here once a real page needs it — anything missing from
// the dictionary just renders in English.
export const dictionaries: Partial<Record<Locale, Record<string, string>>> = {
  ne,
};
