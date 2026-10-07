import Link from "next/link";

import Icon from "@/components/common/icon";
import { Reveal } from "@/components/motion/Reveal";

interface PolicyContactProps {
  appName: string;
  contactEmail: string;
}

export default function PolicyContact({
  appName,
  contactEmail,
}: PolicyContactProps) {
  return (
    <section id="contact" className="scroll-mt-24">
      <Reveal className="from-taskify-primary-dark to-taskify-secondary relative isolate overflow-hidden rounded-3xl bg-linear-to-br p-6 text-white sm:p-9">
        <div
          aria-hidden
          className="bg-grid-white mask-fade-b absolute inset-0 -z-10"
        />
        <div
          aria-hidden
          className="bg-taskify-accent/50 absolute -right-10 -bottom-16 -z-10 size-56 rounded-full blur-3xl"
        />
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Questions about your privacy?
            </h2>
            <p className="mt-2 max-w-md leading-relaxed text-white/80">
              Reach out to the {appName} team for data requests, account erasure
              or anything in this policy. We reply within a few working days.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2.5">
            <a
              href={`mailto:${contactEmail}`}
              className="text-taskify-primary-dark inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5"
            >
              <Icon name="lucide:mail" />
              Email us
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-5 py-3 font-semibold ring-1 ring-white/25 transition-colors hover:bg-white/20"
            >
              Contact page
              <Icon name="lucide:arrow-right" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
