"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type IInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, placeholder, type, onClick, ...rest }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder || "Search"}
        className={cn(
          "border-input text-foreground placeholder:text-muted-foreground hover:border-ring focus:border-ring disabled:border-input flex h-10 rounded-lg border-[1.5px] bg-transparent px-3 text-sm transition-colors duration-500 ease-in-out file:font-medium focus:bg-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onClick={onClick}
        {...rest}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;
