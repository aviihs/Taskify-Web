import Link from "next/link";

import Icon from "@/components/common/icon";
import type { HomeContent } from "@/types/Home";

interface SecuritySectionProps {
  security: HomeContent["security"];
}

export default function SecuritySection({ security }: SecuritySectionProps) {
  return (
    <section id="security" className="mx-auto max-w-6xl scroll-mt-20 px-4">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-taskify-link text-sm font-semibold tracking-wider uppercase">
            {security.eyebrow}
          </p>
          <h2 className="text-taskify-text mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {security.title}
          </h2>
          <p className="text-taskify-text-secondary mt-4 text-lg leading-relaxed">
            {security.description}
          </p>
          <Link
            href="/privacy-policy"
            className="text-taskify-link mt-6 inline-flex items-center gap-2 font-semibold hover:underline"
          >
            {security.linkLabel}
            <Icon name="lucide:arrow-right" className="cursor-pointer" />
          </Link>
        </div>

        <ul className="space-y-4">
          {security.items.map(item => (
            <li
              key={item.title}
              className="bg-taskify-surface border-taskify-border/70 flex gap-4 rounded-2xl border p-5"
            >
              <span className="from-taskify-primary to-taskify-secondary flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br text-white">
                <Icon
                  name={item.icon}
                  className="cursor-default text-2xl lg:text-2xl"
                />
              </span>
              <div>
                <h3 className="text-taskify-text font-semibold">
                  {item.title}
                </h3>
                <p className="text-taskify-text-secondary mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
