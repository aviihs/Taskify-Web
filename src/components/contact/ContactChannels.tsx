import Link from "next/link";

import Icon from "@/components/common/icon";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { buildMailtoLink } from "@/lib/mailto";
import type { ContactChannel } from "@/types/ContactPage";

interface ContactChannelsProps {
  channels: ContactChannel[];
  contactEmail: string;
}

export default function ContactChannels({
  channels,
  contactEmail,
}: ContactChannelsProps) {
  return (
    <Stagger
      as="ul"
      className="relative mx-auto -mt-20 grid max-w-6xl gap-4 px-4 sm:-mt-24 md:grid-cols-3"
    >
      {channels.map(channel => {
        const isEmail = channel.href === "mailto";
        const href = isEmail
          ? buildMailtoLink(contactEmail, { subject: channel.subject })
          : channel.href;
        const actionClassName =
          "text-taskify-link mt-6 inline-flex items-center gap-1.5 text-sm font-semibold after:absolute after:inset-0";
        const actionContent = (
          <>
            {channel.actionLabel}
            <Icon
              name="lucide:arrow-up-right"
              className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 lg:text-sm"
            />
          </>
        );

        return (
          <StaggerItem
            as="li"
            key={channel.title}
            className="group bg-taskify-surface border-taskify-border/70 interactive-card relative rounded-3xl border p-7 shadow-[0_24px_60px_-36px_rgb(31_36_53/0.35)]"
          >
            <span className="bg-taskify-surface-variant text-taskify-link group-hover:from-taskify-primary group-hover:to-taskify-secondary flex size-12 items-center justify-center rounded-2xl transition-colors group-hover:bg-linear-to-br group-hover:text-white">
              <Icon
                name={channel.icon}
                className="cursor-default text-xl lg:text-xl"
              />
            </span>
            <h2 className="text-taskify-text mt-6 text-lg font-semibold tracking-tight">
              {channel.title}
            </h2>
            <p className="text-taskify-text-secondary mt-2 text-sm leading-relaxed">
              {channel.description}
            </p>
            {isEmail ? (
              <a href={href} className={actionClassName}>
                {actionContent}
              </a>
            ) : (
              <Link href={href} className={actionClassName}>
                {actionContent}
              </Link>
            )}
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
