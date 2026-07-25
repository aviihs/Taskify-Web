"use client";

import * as React from "react";

import { defaultLocale, type Locale } from "./config";

const LocaleContext = React.createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
}>({ locale: defaultLocale, setLocale: () => {} });

export function LocaleProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = React.useState(initialLocale);
  const value = React.useMemo(() => ({ locale, setLocale }), [locale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export const useLocale = () => React.useContext(LocaleContext);
