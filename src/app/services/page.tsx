import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { CapabilityIcon } from "@/components/capability-icon";
import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { capabilities, capabilitiesNote, processSteps } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "What we build",
  description:
    "AI agents, automation tools, data analysis tools, and custom AI solutions — what each one means in practice.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we build"
        title="Four kinds of work"
        description="Most projects start as one of these. In practice they overlap — an agent usually needs automation underneath it, and analysis is often what makes either one worth having."
      />

      {/* Section index, so the page is navigable without scrolling blindly. */}
      <Section spacing="tight" className="border-b border-ink/10">
        <Container>
          <ul className="flex flex-wrap gap-x-8 gap-y-4">
            {capabilities.map((capability) => (
              <li key={capability.id}>
                <a
                  href={`#${capability.id}`}
                  className="inline-flex items-center gap-3 text-sm text-ink/75 transition-colors hover:text-ink"
                >
                  <CapabilityIcon icon={capability.icon} variant="bare" />
                  {capability.name}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-2xl border-t border-ink/10 pt-6 text-sm leading-relaxed text-ink/70">
            {capabilitiesNote}
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col gap-20 sm:gap-24">
            {capabilities.map((capability) => (
              <section
                key={capability.id}
                id={capability.id}
                // Offset the sticky header when linked to directly.
                className="scroll-mt-28"
              >
                <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
                  <div>
                    <CapabilityIcon icon={capability.icon} />
                    <h2 className="mt-6 font-serif text-3xl leading-tight text-ink sm:text-4xl">
                      {capability.name}
                    </h2>
                    <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/75">
                      {capability.summary}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-col gap-5">
                      {capability.body.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 32)}
                          className="text-[1.0625rem] leading-[1.75] text-ink/80"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <div className="mt-10 border-t border-ink/10 pt-8">
                      {/* Clearly labelled as illustrative — these are not
                          descriptions of delivered client work. */}
                      <h3 className="eyebrow text-ink/70">
                        What it can look like
                      </h3>
                      <ul className="mt-5 flex flex-col gap-3">
                        {capability.examples.map((example) => (
                          <li
                            key={example}
                            className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink/75"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.6rem] h-px w-4 shrink-0 bg-gold"
                            />
                            {example}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 text-sm leading-relaxed text-ink/70">
                        Illustrations of what this covers &mdash; not a list of
                        completed projects.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  How a project runs                                                */}
      {/* ------------------------------------------------------------------ */}
      <Section className="border-t border-ink/10 bg-mist/35">
        <Container>
          <h2 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
            How a project runs
          </h2>

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

          <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/contact" className={buttonVariants()}>
              Describe your problem
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href="/about"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              More about how we work
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
