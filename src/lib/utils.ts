import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mirrors Tailwind's spacing scale (`gap-4` = 1rem) for components whose gap
// comes from a numeric prop instead of a `gap-*` class.
export function gapToRem(gap?: number) {
  return gap ? `${gap * 0.25}rem` : "";
}
