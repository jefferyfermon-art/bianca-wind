import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getPusherPublicConfig } from "@/lib/sms";
import { SmsLive } from "./sms-live";

/**
 * /sms
 *
 * A private relay view. It is not linked from the site navigation, it is
 * excluded from the sitemap, it carries noindex, and it sits behind Basic
 * Auth enforced in `src/proxy.ts`.
 *
 * Nothing is persisted: the current message lives in client state only.
 */

export const metadata: Metadata = {
  title: "SMS relay",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

/** Reads environment at request time and must never be prerendered. */
export const dynamic = "force-dynamic";

export default function SmsPage() {
  // Only the key and the cluster cross to the browser. The app id and the
  // secret stay on the server.
  const publicConfig = getPusherPublicConfig();

  return (
    <Section>
      <Container width="narrow">
        <header className="flex flex-col gap-3 border-b border-fg/10 pb-8">
          <p className="eyebrow flex items-center gap-3 text-fg/70">
            <span aria-hidden="true" className="h-px w-6 bg-gold" />
            Private relay
          </p>
          <h1 className="text-4xl text-fg sm:text-5xl">Incoming SMS</h1>
          <p className="body-copy-sm text-fg/70">
            Shows the most recent forwarded message. Nothing is stored, so
            reloading this page clears what is on screen.
          </p>
        </header>

        <div className="mt-10">
          {publicConfig ? (
            <SmsLive
              pusherKey={publicConfig.key}
              cluster={publicConfig.cluster}
            />
          ) : (
            <div className="edge rounded-xl p-7 sm:p-9">
              <h2 className="font-display text-2xl text-fg">Not configured</h2>
              <p className="mt-3 body-copy-sm text-fg/75">
                Set <code className="text-teal">PUSHER_KEY</code> and{" "}
                <code className="text-teal">PUSHER_CLUSTER</code> in the
                environment, then reload.
              </p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
