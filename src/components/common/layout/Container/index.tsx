import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("container", {
  variants: {
    center: {
      true: "mx-auto",
      false: "",
    },
    padding: {
      none: "",
      sm: "px-4",
      default: "px-4 sm:px-6 lg:px-8",
      lg: "px-6 sm:px-8 lg:px-12",
    },
  },
  defaultVariants: {
    center: true,
    padding: "default",
  },
});

export interface ContainerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: "div" | "section" | "main" | "article" | "header" | "footer";
}

export default function Container({
  className,
  center,
  padding,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(containerVariants({ center, padding }), className)}
      {...props}
    />
  );
}

export { containerVariants };
