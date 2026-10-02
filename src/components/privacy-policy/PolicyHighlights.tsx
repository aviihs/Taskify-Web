import Icon from "@/components/common/icon";
import type { PolicyHighlight } from "@/types/PrivacyPolicy";

interface PolicyHighlightsProps {
  highlights: PolicyHighlight[];
}

export default function PolicyHighlights({
  highlights,
}: PolicyHighlightsProps) {
  return (
    <ul className="relative mx-auto -mt-20 grid max-w-5xl grid-cols-1 gap-4 px-4 sm:-mt-24 sm:grid-cols-2 lg:grid-cols-4">
      {highlights.map(highlight => (
        <li
          key={highlight.title}
          className="bg-taskify-surface border-taskify-border/70 rounded-2xl border p-5 shadow-lg shadow-black/5"
        >
          <span className="from-taskify-primary to-taskify-secondary mb-4 flex size-11 items-center justify-center rounded-xl bg-linear-to-br text-white">
            <Icon name={highlight.icon} className="cursor-default text-xl" />
          </span>
          <h2 className="text-taskify-text font-semibold">{highlight.title}</h2>
          <p className="text-taskify-text-secondary mt-1 text-sm leading-relaxed">
            {highlight.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
