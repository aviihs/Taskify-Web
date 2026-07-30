"use client";

import Icon from "@/components/common/icon";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  name: string; // iconify id, e.g. "lucide:search"
  className?: string;
  onClick?: () => void;
}

export default function IconButton({
  name,
  className,
  onClick,
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn("flex h-10 w-10 items-center justify-center", className)}
      onClick={onClick}
    >
      <Icon name={name} />
    </button>
  );
}
