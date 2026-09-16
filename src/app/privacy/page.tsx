import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { brand, legal } from "@/content/site";
import { getContactConfig } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How the ${brand.name} website handles information.`,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const contactFormEnabled = getContactConfig().isConfigured;

  return (
    <>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy"
        description={`How this website handles information. Last updated ${legal.privacyLastUpdated}.`}
      />

      <Section>
        <Container>
          <div className="max-w-3xl">
            <div className="flex flex-col gap-12">
              <section className="flex flex-col gap-4">
                <h2 className="font-serif text-2xl text-ink">In short</h2>
                <p className="text-[1.0625rem] leading-[1.75] text-ink/80">
                  This is a small personal website. It does not run analytics or
                  advertising, it does not set cookies of its own, and it does not
                  ask you to create an account or sign up to anything.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="font-serif text-2xl text-ink">
                  What the site collects
                </h2>
                <p className="text-[1.0625rem] leading-[1.75] text-ink/80">
                  Nothing is collected from you as you read these pages. There is
                  no tracking script, no analytics tag, and no advertising
                  network.
                </p>
                <p className="text-[1.0625rem] leading-[1.75] text-ink/80">
                  Fonts are served from this site rather than from a third party,
                  so simply reading a page does not send a request to an outside
                  font provider.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="font-serif text-2xl text-ink">Hosting</h2>
                <p className="text-[1.0625rem] leading-[1.75] text-ink/80">
                  The site is hosted on Vercel. Like any web host, Vercel handles
                  the technical request that delivers a page to you, and keeps
                  standard server logs that can include your IP address, the page
                  requested, and your browser&rsquo;s user-agent string. That
                  information is processed by Vercel as part of serving and
                  protecting the site.
                </p>
              </section>

              {contactFormEnabled ? (
                <section className="flex flex-col gap-4">
                  <h2 className="font-serif text-2xl text-ink">
                    If you send a message
                  </h2>
                  <p className="text-[1.0625rem] leading-[1.75] text-ink/80">
                    The contact form asks for your name, your email address, and
                    your message. Those details are used to read and reply to what
                    you sent, and for nothing else. They are delivered by email
                    through an email service provider and are not sold, shared for
                    marketing, or added to a mailing list.
                  </p>
                </section>
              ) : null}

              <section className="flex flex-col gap-4">
                <h2 className="font-serif text-2xl text-ink">Links elsewhere</h2>
                <p className="text-[1.0625rem] leading-[1.75] text-ink/80">
                  Some pages link out to other services, such as where a song is
                  hosted. Once you follow one of those links you are on that
                  company&rsquo;s website, under its own privacy policy and terms.
                  This site has no control over what they collect.
                </p>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="font-serif text-2xl text-ink">Changes</h2>
                <p className="text-[1.0625rem] leading-[1.75] text-ink/80">
                  If the way this site handles information changes &mdash; for
                  example if a contact form or a newsletter is added later &mdash;
                  this page will be updated to say so, and the date at the top
                  will change with it.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
