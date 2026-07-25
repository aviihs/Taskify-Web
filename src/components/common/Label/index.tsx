import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface LabelProps {
  children: ReactNode;
  htmlFor?: string | number;
  required?: boolean;
  className?: string;
}

export default function Label({
  children,
  htmlFor,
  required,
  className,
}: LabelProps) {
  return (
    <label
      className={cn("text-foreground text-sm font-medium", className)}
      htmlFor={htmlFor?.toString()}
    >
      {children}
      {required && <span className="text-destructive">*</span>}
    </label>
  );
}
