import type { Metadata } from "next";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { brand, contact } from "@/content/site";
import { getContactConfig } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.invitation,
};

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
                Useful things to include
              </h2>

              <ul className="mt-6 flex flex-col gap-4">
                {contact.prompts.map((prompt) => (
                  <li
                    key={prompt}
                    className="flex items-start gap-3 body-copy text-ink/75"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.7rem] h-px w-5 shrink-0 bg-gold"
                    />
                    {prompt}
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
                  <p className="mt-3 body-copy-sm text-ink/75">
                    Enquiries go straight to {brand.name}.
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
                  <p className="mt-4 body-copy-sm text-ink/75">
                    There is no enquiry address to publish here yet, and we
                    would rather leave this blank than print one that does not
                    reach anybody.
                  </p>
                  <p className="mt-4 body-copy-sm text-ink/75">
                    Until it opens, the clearest picture of what we build and
                    how a project runs is on these two pages.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/services"
                      className={buttonVariants({ variant: "secondary" })}
                    >
                      What we build
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                    <Link
                      href="/about"
                      className={buttonVariants({ variant: "secondary" })}
                    >
                      How we work
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
