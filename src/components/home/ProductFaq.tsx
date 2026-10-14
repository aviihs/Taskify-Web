import Link from "next/link";

import SectionIntro from "@/components/reusable/SectionIntro";
import type { HomeContent } from "@/types/Home";

interface ProductFaqProps {
  faq: HomeContent["faq"];
}

// Native details keep every answer in the server-rendered HTML and work
// without client-side JavaScript.
export default function ProductFaq({ faq }: ProductFaqProps) {
  return (
    <section id="product-faq" className="mx-auto max-w-4xl scroll-mt-32 px-4">
      <SectionIntro {...faq} />
      <div className="divide-taskify-border/70 border-taskify-border/70 mt-12 divide-y border-y">
        {faq.items.map(item => (
          <details key={item.question} className="group py-5">
            <summary className="text-taskify-text flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {item.question}
              <span
                aria-hidden="true"
                className="text-taskify-link shrink-0 text-2xl transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="text-taskify-text-secondary mt-4 max-w-3xl space-y-3 leading-relaxed">
              <p>{item.answer}</p>
              {item.link && (
                <p>
                  <Link
                    href={item.link.href}
                    className="text-taskify-link font-medium underline underline-offset-4 hover:opacity-80"
                  >
                    {item.link.label}
                  </Link>
                </p>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
