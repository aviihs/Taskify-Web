import Icon from "@/components/common/icon";
import type { PolicySection } from "@/types/PrivacyPolicy";

interface PolicyTocProps {
  sections: PolicySection[];
}

function TocLinks({ sections }: PolicyTocProps) {
  return (
    <ol className="space-y-1">
      {sections.map((section, index) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="text-taskify-text-secondary hover:bg-taskify-surface-variant hover:text-taskify-text flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors"
          >
            <span className="text-taskify-text-muted w-5 text-xs font-semibold tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function PolicyToc({ sections }: PolicyTocProps) {
  return (
    <>
      {/* Mobile: collapsible list */}
      <details className="bg-taskify-surface border-taskify-border/70 group rounded-2xl border p-2 lg:hidden">
        <summary className="text-taskify-text flex cursor-pointer list-none items-center justify-between px-3 py-2 font-semibold">
          On this page
          <Icon
            name="lucide:chevron-down"
            className="transition-transform group-open:rotate-180"
          />
        </summary>
        <div className="mt-1">
          <TocLinks sections={sections} />
        </div>
      </details>

      {/* Desktop: sticky sidebar */}
      <nav
        aria-label="Privacy policy sections"
        className="sticky top-24 hidden lg:block"
      >
        <p className="text-taskify-text-muted mb-3 px-3 text-xs font-semibold tracking-wider uppercase">
          On this page
        </p>
        <TocLinks sections={sections} />
      </nav>
    </>
  );
}
