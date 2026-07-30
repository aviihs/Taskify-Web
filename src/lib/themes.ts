// Per-page theme overrides. "default" (:root in globals.css) is not listed here —
// only add an entry once a real page needs colors different from the default.
export const themes = {
  ocean: {
    primary: "oklch(0.55 0.15 240)",
    primaryForeground: "oklch(0.98 0 0)",
    ring: "oklch(0.55 0.15 240 / 50%)",
  },
} as const;

export type ThemeName = keyof typeof themes;
