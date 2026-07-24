"use client";

import { Icon as IconifyIcon } from "@iconify/react";

import { cn } from "@/lib/utils";

interface IIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string; // e.g. "lucide:search" or "mdi:home"
  className?: string;
  onClick?: () => void;
}

export default function Icon({
  name,
  className,
  onClick,
  ...rest
}: IIconProps) {
  return (
    <span
      role="presentation"
      className={cn("flex h-fit items-center", className)}
      onKeyUp={() => {}}
      onClick={onClick}
      {...rest}
    >
      <IconifyIcon
        icon={name}
        className={cn(
          "cursor-pointer text-base duration-300 select-none lg:text-lg",
          className
        )}
      />
    </span>
  );
}
