import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import type { SectionIntro as SectionIntroContent } from "@/types/Home";

interface SectionIntroProps extends SectionIntroContent {
  className?: string;
  align?: "center" | "left";
}

export default function SectionIntro({
  eyebrow,
  title,
  description,
  className,
  align = "center",
}: SectionIntroProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <p className="text-taskify-link inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase">
        <span aria-hidden className="bg-taskify-accent h-px w-6" />
        {eyebrow}
      </p>
      <h2 className="text-taskify-text mt-4 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-taskify-text-secondary mt-5 text-lg leading-relaxed text-pretty">
          {description}
        </p>
      )}
    </Reveal>
  );
}
