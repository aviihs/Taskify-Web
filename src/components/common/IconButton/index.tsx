"use client";

import Icon from "@/components/common/icon";
import { cn } from "@/lib/utils";

interface IIconButtonProps {
  name: string; // iconify id, e.g. "lucide:search"
  className?: string;
  onClick?: () => void;
}

export default function IconButton({
  name,
  className,
  onClick,
}: IIconButtonProps) {
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
