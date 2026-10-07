import type { Metadata } from "next";

import { Container, Text, Theme } from "@/components/common/layout";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/lib/i18n/LocaleSwitcher";

// Internal component gallery, kept out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function OceanPage() {
  return (
    <Container className="space-y-8 py-8">
      <LocaleSwitcher />

      <section className="space-y-3">
        <Text as="h2" variant="h3">
          Default theme
        </Text>
        <Text variant="body">
          Uses whatever --primary is set in :root — no Theme wrapper here.
        </Text>
        <Button>Primary button</Button>
        <Text
          html
          variant="body"
        >{`Our platform is <span class="text-blue-600 font-bold">100% free</span> for small teams.`}</Text>
      </section>

      <Theme
        name="ocean"
        className="border-border bg-card space-y-3 rounded-lg border p-6"
      >
        <Text as="h2" variant="h3">
          Ocean theme
        </Text>
        <Text variant="body">
          Same Button component, same className, only the tokens inside this
          wrapper changed — colors come from src/lib/themes.ts, not CSS.
        </Text>
        <Button>Primary button</Button>
      </Theme>
    </Container>
  );
}
