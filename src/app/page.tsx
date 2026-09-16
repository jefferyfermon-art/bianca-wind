import { ArrowRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import { WindLines } from "@/components/art/wind-lines";
import { CapabilityCard } from "@/components/capability-card";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  audiences,
  brand,
  company,
  contact,
  getFeaturedCapabilities,
  processSteps,
} from "@/content/site";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const featured = getFeaturedCapabilities();

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/*  Hero                                                              */}
      {/* ------------------------------------------------------------------ */}
      <Section
        spacing="loose"
        className="relative overflow-hidden pb-16 sm:pb-20 lg:pb-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-mist/70 via-ivory to-ivory" />
        </div>

        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-20">
            <div>
              <p className="eyebrow flex items-center gap-3 text-ink/70">
                <span aria-hidden="true" className="h-px w-8 bg-gold" />
                AI agents &bull; Automation &bull; Data analysis
              </p>

              <h1 className="mt-7 text-balance text-[2.5rem] leading-[1.06] text-ink sm:text-6xl lg:text-[4rem]">
                {brand.tagline}
              </h1>

              <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-ink/75 sm:text-lg">
                {brand.description}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link href="/services" className={buttonVariants({ size: "lg" })}>
                  See what we build
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <Link
                  href="/contact"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                  })}
                >
                  Start a conversation
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-ink/12 bg-white/40 sm:aspect-[5/4] lg:aspect-square">
              <WindLines />
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  What we build                                                     */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <Container>
          <div className="border-t border-ink/10 pt-14">
            <SectionHeading
              eyebrow="What we build"
              title="Four kinds of work"
              description="Most projects start as one of these, and often end up drawing on more than one."
            />

            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((capability) => (
                <li key={capability.id} className="h-full">
                  <CapabilityCard
                    capability={capability}
                    href={`/services#${capability.id}` as Route}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  Approach                                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section className="bg-mist/35">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <SectionHeading
              eyebrow="Our approach"
              title="Start from the work, not the technology"
            />

            <div className="flex flex-col gap-5">
              {company.intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-[1.0625rem] leading-relaxed text-ink/75"
                >
                  {paragraph}
                </p>
              ))}

              <Link
                href="/about"
                className={cn(
                  buttonVariants({ variant: "link", size: "none" }),
                  "mt-2 self-start text-sm",
                )}
              >
                How we work
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  Process                                                           */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="How a project runs"
            title="Small steps, in the open"
          />

          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.id} className="border-t border-ink/15 pt-5">
                <span className="eyebrow text-ink/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-xl text-ink">{step.name}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/75">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  Who we build for                                                  */}
      {/* ------------------------------------------------------------------ */}
      <Section spacing="tight">
        <Container>
          <div className="border-t border-ink/10 pt-14">
            <SectionHeading eyebrow="Who we build for" title="Individuals and businesses" />

            <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-16">
              {audiences.map((audience) => (
                <div key={audience.id}>
                  <h3 className="flex items-center gap-3 font-serif text-2xl text-ink">
                    <span aria-hidden="true" className="h-px w-6 bg-gold" />
                    {audience.name}
                  </h3>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/75">
                    {audience.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  Contact                                                           */}
      {/* ------------------------------------------------------------------ */}
      <Section spacing="tight">
        <Container>
          <div className="relative overflow-hidden rounded-lg border border-ink/12 bg-ink px-7 py-14 text-center sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40"
            >
              <WindLines />
            </div>

            <div className="relative mx-auto max-w-xl">
              <h2 className="text-balance font-serif text-3xl leading-tight text-ivory sm:text-4xl">
                {contact.heading}
              </h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-ivory/75">
                {contact.invitation}
              </p>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "inverse", size: "lg" }),
                  "mt-9",
                )}
              >
                Get in touch
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
