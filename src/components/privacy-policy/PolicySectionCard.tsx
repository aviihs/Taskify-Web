import Icon from "@/components/common/icon";
import type { PolicySection } from "@/types/PrivacyPolicy";

interface CheckListProps {
  items: string[];
}

function CheckList({ items }: CheckListProps) {
  return (
    <ul className="space-y-2.5">
      {items.map(item => (
        <li
          key={item}
          className="text-taskify-text-secondary flex gap-3 leading-relaxed"
        >
          <Icon
            name="lucide:circle-check"
            className="text-taskify-link mt-0.5 shrink-0 cursor-default"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

interface PolicySectionCardProps {
  section: PolicySection;
  number: number;
}

export default function PolicySectionCard({
  section,
  number,
}: PolicySectionCardProps) {
  return (
    <section
      id={section.id}
      className="bg-taskify-surface border-taskify-border/70 scroll-mt-24 rounded-2xl border p-6 sm:p-8"
    >
      <div className="mb-5 flex items-center gap-4">
        <span className="bg-taskify-surface-variant text-taskify-link flex size-11 shrink-0 items-center justify-center rounded-xl">
          <Icon
            name={section.icon}
            className="cursor-default text-xl lg:text-xl"
          />
        </span>
        <div>
          <p className="text-taskify-text-muted text-xs font-semibold tracking-wider uppercase">
            Section {String(number).padStart(2, "0")}
          </p>
          <h2 className="text-taskify-text text-xl font-bold tracking-tight sm:text-2xl">
            {section.title}
          </h2>
        </div>
      </div>

      <div className="space-y-5">
        {section.paragraphs?.map(paragraph => (
          <p
            key={paragraph}
            className="text-taskify-text-secondary leading-relaxed"
          >
            {paragraph}
          </p>
        ))}

        {section.groups && (
          <div className="grid gap-4 sm:grid-cols-2">
            {section.groups.map(group => (
              <div
                key={group.title}
                className="border-taskify-border/70 bg-taskify-background rounded-xl border p-5"
              >
                <h3 className="text-taskify-text mb-3 font-semibold">
                  {group.title}
                </h3>
                <CheckList items={group.items} />
              </div>
            ))}
          </div>
        )}

        {section.items && <CheckList items={section.items} />}

        {section.note && (
          <p className="bg-taskify-surface-variant text-taskify-text flex gap-3 rounded-xl px-4 py-3 text-sm leading-relaxed">
            <Icon
              name="lucide:info"
              className="text-taskify-link mt-0.5 shrink-0 cursor-default"
            />
            <span>{section.note}</span>
          </p>
        )}
      </div>
    </section>
  );
}
