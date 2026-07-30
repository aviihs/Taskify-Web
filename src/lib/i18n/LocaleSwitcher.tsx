"use client";

import { Button } from "@/components/ui/button";

import { locales } from "./config";
import { useLocale } from "./LocaleProvider";

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex gap-2">
      {locales.map(l => (
        <Button
          key={l}
          variant={l === locale ? "default" : "outline"}
          onClick={() => setLocale(l)}
        >
          {l}
        </Button>
      ))}
    </div>
  );
}
