import Icon from "@/components/common/icon";

interface PolicyContactProps {
  appName: string;
  contactEmail: string;
}

export default function PolicyContact({
  appName,
  contactEmail,
}: PolicyContactProps) {
  return (
    <section
      id="contact"
      className="from-taskify-primary to-taskify-secondary relative scroll-mt-8 overflow-hidden rounded-2xl bg-linear-to-br p-6 text-white sm:p-8"
    >
      <div
        aria-hidden
        className="bg-taskify-accent/50 absolute -right-10 -bottom-16 size-56 rounded-full blur-3xl"
      />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Questions about your privacy?
          </h2>
          <p className="mt-2 max-w-md leading-relaxed text-white/80">
            Reach out to the {appName} team for data requests, account erasure
            or anything in this policy. We reply within a few working days.
          </p>
        </div>
        <a
          href={`mailto:${contactEmail}`}
          className="text-taskify-primary-dark inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5"
        >
          <Icon name="lucide:mail" />
          {contactEmail}
        </a>
      </div>
    </section>
  );
}
