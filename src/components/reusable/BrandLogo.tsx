import Image from "next/image";
import Link from "next/link";

import taskifyLogo from "@/assets/taskify-logo.png";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
}

export default function BrandLogo({ className }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "text-taskify-text flex items-center gap-2 text-lg font-bold tracking-tight",
        className
      )}
    >
      <Image src={taskifyLogo} alt="" className="size-8" priority />
      Taskify
    </Link>
  );
}
