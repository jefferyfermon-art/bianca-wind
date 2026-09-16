import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { audiences, company, processSteps } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: company.short,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Built around the work"
        description={company.short}
      />

      <Section>
        <Container>
          <div className="max-w-3xl">
            <div className="flex flex-col gap-6">
              {company.about.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-[1.0625rem] leading-[1.75] text-ink/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/*  How we work                                               */}
          {/* ---------------------------------------------------------- */}
          <div className="mt-16 border-t border-ink/10 pt-14">
            <h2 className="font-serif text-2xl text-ink sm:text-3xl">
              How we work
            </h2>

            <ol className="mt-10 flex flex-col gap-10">
              {processSteps.map((step, index) => (
                <li
                  key={step.id}
                  className="grid gap-3 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-8"
                >
                  <span className="eyebrow pt-1 text-ink/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="max-w-2xl">
                    <h3 className="font-serif text-xl text-ink">{step.name}</h3>
                    <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink/75">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* ---------------------------------------------------------- */}
          {/*  Who we build for                                          */}
          {/* ---------------------------------------------------------- */}
          <div className="mt-16 border-t border-ink/10 pt-14">
            <h2 className="font-serif text-2xl text-ink sm:text-3xl">
              Who we build for
            </h2>

            <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-16">
              {audiences.map((audience) => (
                <div key={audience.id}>
                  <h3 className="flex items-center gap-3 font-serif text-xl text-ink">
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

          {/* ---------------------------------------------------------- */}
          {/*  Honest positioning                                        */}
          {/* ---------------------------------------------------------- */}
          <div className="mt-16 border-t border-ink/10 pt-14">
            <div className="max-w-3xl rounded-lg border border-ink/12 bg-mist/45 p-8 sm:p-10">
              <h2 className="font-serif text-2xl text-ink">
                {company.stage.heading}
              </h2>
              <div className="mt-5 flex flex-col gap-4">
                {company.stage.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-[1.0625rem] leading-relaxed text-ink/80"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href="/contact" className={buttonVariants()}>
              Start a conversation
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href="/services"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              See what we build
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
