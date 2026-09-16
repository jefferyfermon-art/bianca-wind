import { ArrowRight, Plus } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import { AgentRun } from "@/components/art/agent-run";
import { Analysis } from "@/components/art/analysis";
import { Blocks } from "@/components/art/blocks";
import { CapabilityIcon } from "@/components/capability-icon";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { Card, cardSurface } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  audiences,
  brand,
  capabilities,
  company,
  contact,
  faqs,
  illustrationCaption,
  principles,
  processSteps,
} from "@/content/site";
import { cn } from "@/lib/utils";

/** Bento cell spans, so the capability grid is asymmetric rather than a row of four. */
const cellSpans = [
  "lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-4",
];

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/*  Hero                                                              */}
      {/* ------------------------------------------------------------------ */}
      <Section
        spacing="loose"
        className="relative overflow-hidden pb-20 sm:pb-24"
      >
        <div
          aria-hidden="true"
          className="aurora pointer-events-none absolute inset-0 -z-10 opacity-80"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ivory"
        />

        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-20">
            <div>
              <p className="eyebrow flex items-center gap-3 text-ink/70">
                <span aria-hidden="true" className="h-px w-8 bg-gold" />
                AI agents &bull; Automation &bull; Data analysis
              </p>

              <h1 className="mt-7 text-balance text-[2.75rem] leading-[1.03] text-ink sm:text-6xl lg:text-[4.5rem]">
                {brand.tagline}
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-[1.65] text-ink/80 sm:text-xl">
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

            {/* Composite interface illustration: two staggered panels. */}
            <div className="flex flex-col gap-4">
              <AgentRun className="sm:w-[88%]" />
              <Analysis className="sm:ml-auto sm:w-[88%]" />
            </div>
          </div>

          <p className="mt-10 text-sm text-ink/70">{illustrationCaption}</p>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  Capabilities — bento grid                                         */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What we build"
            title="Four kinds of work"
            description="Most projects start as one of these, and often end up drawing on more than one."
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {capabilities.map((capability, index) => {
              const wide = cellSpans[index] === "lg:col-span-4";

              return (
                <li key={capability.id} className={cn(cellSpans[index])}>
                  <Link
                    href={`/services#${capability.id}` as Route}
                    className={cn(
                      cardSurface,
                      "group flex h-full flex-col gap-6 p-6 transition-colors duration-200 hover:border-ink/30 sm:p-7",
                      wide && "lg:flex-row lg:items-center lg:gap-8",
                    )}
                  >
                    <div className={cn("flex flex-col gap-4", wide && "lg:flex-1")}>
                      <CapabilityIcon icon={capability.icon} />
                      <h3 className="font-serif text-2xl leading-tight text-ink">
                        {capability.name}
                      </h3>
                      <p className="body-copy-sm text-ink/75">
                        {capability.summary}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm text-teal">
                        Read more
                        <ArrowRight
                          aria-hidden="true"
                          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>

                    {/* The two wide cells carry an illustration. */}
                    {capability.icon === "agent" ? (
                      <AgentRun className="hidden lg:block lg:w-[52%]" />
                    ) : null}
                    {capability.icon === "custom" ? (
                      <Blocks className="hidden lg:block lg:w-[52%]" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  Approach                                                          */}
      {/* ------------------------------------------------------------------ */}
      <Section className="border-y border-ink/10 bg-mist/40">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <SectionHeading
              eyebrow="Our approach"
              title="Start from the work, not the technology"
            />

            <div className="flex flex-col gap-6">
              {company.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="body-copy text-ink/80">
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

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {principles.map((principle) => (
              <Card key={principle.id} className="bg-white/60 p-6">
                <h3 className="flex items-start gap-3 font-serif text-xl leading-tight text-ink">
                  <Plus
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-gold"
                  />
                  {principle.name}
                </h3>
                <p className="mt-3 body-copy-sm text-ink/75">{principle.body}</p>
              </Card>
            ))}
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
                <h3 className="mt-3 font-serif text-2xl text-ink">
                  {step.name}
                </h3>
                <p className="mt-3 body-copy-sm text-ink/75">{step.body}</p>
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
            <SectionHeading
              eyebrow="Who we build for"
              title="Individuals and businesses"
            />

            <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-16">
              {audiences.map((audience) => (
                <div key={audience.id}>
                  <h3 className="flex items-center gap-3 font-serif text-2xl text-ink">
                    <span aria-hidden="true" className="h-px w-6 bg-gold" />
                    {audience.name}
                  </h3>
                  <p className="mt-4 body-copy text-ink/75">{audience.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  Questions                                                         */}
      {/* ------------------------------------------------------------------ */}
      <Section spacing="tight">
        <Container>
          <div className="grid gap-12 border-t border-ink/10 pt-14 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
            <SectionHeading eyebrow="Questions" title="Before you write in" />

            <div className="flex flex-col">
              {faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="group border-b border-ink/12 py-5 first:pt-0"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-serif text-xl text-ink marker:hidden">
                    {faq.question}
                    <Plus
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-gold transition-transform duration-200 group-open:rotate-45"
                    />
                  </summary>
                  <p className="mt-4 max-w-2xl body-copy-sm text-ink/75">
                    {faq.answer}
                  </p>
                </details>
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
          <div className="relative overflow-hidden rounded-xl border border-ink/12 bg-ink px-7 py-16 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-45"
            >
              <div className="grid-rule absolute inset-0 opacity-30" />
            </div>

            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance font-serif text-4xl leading-tight text-ivory sm:text-5xl">
                {contact.heading}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ivory/80">
                {contact.invitation}
              </p>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "inverse", size: "lg" }),
                  "mt-10",
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
