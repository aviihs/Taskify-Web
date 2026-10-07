import Icon from "@/components/common/icon";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import type { PolicyHighlight } from "@/types/PrivacyPolicy";

interface PolicyHighlightsProps {
  highlights: PolicyHighlight[];
}

export default function PolicyHighlights({
  highlights,
}: PolicyHighlightsProps) {
  return (
    <Stagger
      as="ul"
      className="relative mx-auto -mt-20 grid max-w-6xl grid-cols-1 gap-4 px-4 sm:-mt-24 sm:grid-cols-2 lg:grid-cols-4"
    >
      {highlights.map(highlight => (
        <StaggerItem
          as="li"
          key={highlight.title}
          className="bg-taskify-surface border-taskify-border/70 rounded-3xl border p-6 shadow-[0_24px_60px_-36px_rgb(31_36_53/0.35)]"
        >
          <span className="from-taskify-primary to-taskify-secondary mb-5 flex size-11 items-center justify-center rounded-2xl bg-linear-to-br text-white">
            <Icon
              name={highlight.icon}
              className="cursor-default text-xl lg:text-xl"
            />
          </span>
          <h2 className="text-taskify-text font-semibold tracking-tight">
            {highlight.title}
          </h2>
          <p className="text-taskify-text-secondary mt-1 text-sm leading-relaxed">
            {highlight.description}
          </p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
