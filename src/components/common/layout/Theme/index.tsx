import * as React from "react";

import { type ThemeName, themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

export interface ThemeProps extends React.HTMLAttributes<HTMLDivElement> {
  name: ThemeName;
}

export default function Theme({
  name,
  className,
  style,
  ...props
}: ThemeProps) {
  const theme = themes[name];

  return (
    <div
      className={cn(className)}
      style={
        {
          "--primary": theme.primary,
          "--primary-foreground": theme.primaryForeground,
          "--ring": theme.ring,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
