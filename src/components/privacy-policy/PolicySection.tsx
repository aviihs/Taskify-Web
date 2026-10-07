import Icon from "@/components/common/icon";
import { Reveal } from "@/components/motion/Reveal";
import type { PolicySection as PolicySectionContent } from "@/types/PrivacyPolicy";

interface BulletListProps {
  items: string[];
}

function BulletList({ items }: BulletListProps) {
  return (
    <ul className="space-y-3">
      {items.map(item => (
        <li
          key={item}
          className="text-taskify-text-secondary flex gap-3.5 leading-relaxed"
        >
          <span
            aria-hidden
            className="bg-taskify-accent mt-[0.6rem] size-1.5 shrink-0 rounded-full"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

interface PolicySectionProps {
  section: PolicySectionContent;
  number: number;
}

// One section of the policy document, separated from the next by a divider.
export default function PolicySection({ section, number }: PolicySectionProps) {
  return (
    <section
      id={section.id}
      className="border-taskify-border/70 scroll-mt-28 border-t py-12 last:pb-0"
    >
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="bg-taskify-surface-variant text-taskify-link flex size-9 items-center justify-center rounded-xl">
            <Icon
              name={section.icon}
              className="cursor-default text-base lg:text-base"
            />
          </span>
          <span className="text-taskify-text-muted text-xs font-semibold tracking-[0.16em] tabular-nums">
            {String(number).padStart(2, "0")}
          </span>
        </div>

        <h2 className="text-taskify-text mt-5 text-2xl font-semibold tracking-[-0.02em] sm:text-[1.75rem]">
          {section.title}
        </h2>

        <div className="mt-5 space-y-6">
          {section.paragraphs?.map(paragraph => (
            <p
              key={paragraph}
              className="text-taskify-text-secondary text-[17px] leading-[1.75]"
            >
              {paragraph}
            </p>
          ))}

          {section.groups && (
            <div className="grid gap-x-12 gap-y-8 pt-2 sm:grid-cols-2">
              {section.groups.map(group => (
                <div key={group.title}>
                  <h3 className="text-taskify-text mb-3.5 text-sm font-semibold">
                    {group.title}
                  </h3>
                  <BulletList items={group.items} />
                </div>
              ))}
            </div>
          )}

          {section.items && <BulletList items={section.items} />}

          {section.note && (
            <p className="bg-taskify-background text-taskify-text border-taskify-border/70 flex gap-3 rounded-2xl border px-5 py-4 text-sm leading-relaxed">
              <Icon
                name="lucide:info"
                className="text-taskify-link mt-0.5 shrink-0 cursor-default"
              />
              <span>{section.note}</span>
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
