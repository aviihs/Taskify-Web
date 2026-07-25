"use client";

import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { type Locale } from "@/lib/i18n/config";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

const textVariants = cva("font-sans transition-colors", {
  variants: {
    variant: {
      h1: "text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl",
      h2: "text-3xl font-bold tracking-tight text-foreground",
      h3: "text-xl font-semibold text-foreground",
      body: "text-base font-normal leading-relaxed text-foreground",
      caption: "text-sm font-medium text-muted-foreground",
    },
    color: {
      default: "",
      // ponytail: --primary token is neutral (black/white), not blue — no brand color token exists yet, so this stays hardcoded until one is added to globals.css
      brand: "text-blue-600 dark:text-blue-400",
      muted: "text-muted-foreground",
      error: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "default",
  },
});

export interface TextProps
  extends
    Omit<React.HTMLAttributes<HTMLParagraphElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div"; // Allows semantic HTML flexibility
  /**
   * Render string children as raw HTML (dangerouslySetInnerHTML) instead of
   * plain text, so translations can carry inline markup (`<span>`, `<b>`, ...).
   * Only use this for trusted, author-written copy — never for user-supplied
   * strings (task titles, comments, etc.), since it's an XSS vector otherwise.
   */
  html?: boolean;
}

export default function Text({
  className,
  variant,
  color,
  as: Component = "p",
  children,
  html = false,
  ...props
}: TextProps) {
  const { locale } = useLocale();
  const content = useTranslatedText(children, locale);
  const resolvedClassName = cn(textVariants({ variant, color }), className);

  if (html && typeof content === "string") {
    return (
      <Component
        className={resolvedClassName}
        {...props}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <Component className={resolvedClassName} {...props}>
      {content}
    </Component>
  );
}

// Only string children are translatable — JSX children (icons, nested
// components) pass through untouched. Anything missing from the dictionary
// just renders in English.
function useTranslatedText(children: React.ReactNode, locale: Locale) {
  const source = typeof children === "string" ? children : null;
  if (!source) return children;
  return dictionaries[locale]?.[source] ?? source;
}

export { textVariants };
