import type { Metadata } from "next";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { contact } from "@/content/site";
import { getContactConfig } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.invitation,
};

/** What this inbox is genuinely for. */
const goodReasons = [
  "A question about the writing or the music",
  "An idea for a creative collaboration",
  "A note about something on this site",
];

export default function ContactPage() {
  const config = getContactConfig();
  const email = contact.email;
  const canSendForm = config.isConfigured;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={contact.heading}
        description={contact.invitation}
      />

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <h2 className="font-serif text-2xl text-ink">
                Good things to write about
              </h2>

              <ul className="mt-6 flex flex-col gap-4">
                {goodReasons.map((reason) => (
                  <li
                    key={reason}
                    className="flex items-start gap-3 text-[1.0625rem] leading-relaxed text-ink/75"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.7rem] h-px w-5 shrink-0 bg-gold"
                    />
                    {reason}
                  </li>
                ))}
              </ul>

              <p className="mt-10 border-t border-ink/10 pt-6 text-sm leading-relaxed text-ink/70">
                {contact.note}
              </p>
            </div>

            <div>
              {canSendForm ? (
                <ContactForm />
              ) : email ? (
                <div className="rounded-lg border border-ink/15 bg-white/50 p-8">
                  <h2 className="font-serif text-2xl text-ink">By email</h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/75">
                    Messages go straight to Bianca.
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className={cn(buttonVariants(), "mt-7")}
                  >
                    <Mail aria-hidden="true" className="size-4" />
                    {email}
                  </a>
                </div>
              ) : (
                <div className="rounded-lg border border-ink/15 bg-mist/45 p-8">
                  <h2 className="font-serif text-2xl text-ink">
                    Not open just yet
                  </h2>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink/75">
                    There is no contact address to publish here yet, and we
                    would rather leave this blank than print one that does not
                    work.
                  </p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink/75">
                    Until it opens, the writing and the music are the best way
                    to get a sense of the work.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/writing"
                      className={buttonVariants({ variant: "secondary" })}
                    >
                      The writing
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                    <Link
                      href="/music"
                      className={buttonVariants({ variant: "secondary" })}
                    >
                      The music
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
