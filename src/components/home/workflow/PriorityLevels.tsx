import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import type { HomeContent } from "@/types/Home";

import { TONE_DOT_CLASSES } from "../tone-classes";

interface PriorityLevelsProps {
  caption: string;
  priorities: HomeContent["workflow"]["priorities"];
}

// Each priority shows a small signal meter: Low fills one bar, Critical all.
export default function PriorityLevels({
  caption,
  priorities,
}: PriorityLevelsProps) {
  const barCount = priorities.length;

  return (
    <Reveal className="border-taskify-border/70 flex flex-col items-center gap-5 border-t pt-10 md:flex-row md:justify-between">
      <p className="text-taskify-text-secondary text-sm font-medium">
        {caption}
      </p>
      <ul className="flex flex-wrap justify-center gap-2">
        {priorities.map((priority, index) => (
          <li
            key={priority.label}
            className="border-taskify-border/70 bg-taskify-background text-taskify-text inline-flex items-center gap-3 rounded-full border py-1.5 pr-3 pl-3.5 text-sm font-medium"
          >
            {priority.label}
            <span aria-hidden className="flex items-end gap-0.5">
              {Array.from({ length: barCount }, (_, barIndex) => (
                <span
                  key={barIndex}
                  className={cn(
                    "w-0.75 rounded-full",
                    barIndex <= index
                      ? TONE_DOT_CLASSES[priority.tone]
                      : "bg-taskify-border"
                  )}
                  style={{ height: 5 + barIndex * 3 }}
                />
              ))}
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
