import type { Tone } from "@/types/Home";

// Status colours match taskify_app AppColors (success/warning/error/info),
// which are the same hex values as Tailwind's 500 shades.
export const TONE_BADGE_CLASSES: Record<Tone, string> = {
  info: "bg-blue-500/12 text-blue-600 dark:text-blue-400",
  success: "bg-green-500/12 text-green-600 dark:text-green-400",
  warning: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  error: "bg-red-500/12 text-red-600 dark:text-red-400",
};

export const TONE_DOT_CLASSES: Record<Tone, string> = {
  info: "bg-blue-500",
  success: "bg-green-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
};
