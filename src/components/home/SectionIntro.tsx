import { cn } from "@/lib/utils";
import type { SectionIntro as SectionIntroContent } from "@/types/Home";

interface SectionIntroProps extends SectionIntroContent {
  className?: string;
}

export default function SectionIntro({
  eyebrow,
  title,
  description,
  className,
}: SectionIntroProps) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <p className="text-taskify-link text-sm font-semibold tracking-wider uppercase">
        {eyebrow}
      </p>
      <h2 className="text-taskify-text mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-taskify-text-secondary mt-4 text-lg leading-relaxed text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
