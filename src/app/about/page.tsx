import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { author, brand } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: author.short,
};

/** Short, factual notes about how the work is made. */
const practice = [
  {
    id: "writing",
    label: "Writing",
    body: "Stories and shorter pieces, drawn from imagination and from personal experience.",
  },
  {
    id: "music",
    label: "Music",
    body: "Songs built from some of that writing, made with AI music tools.",
  },
  {
    id: "next",
    label: "What comes next",
    body: "Further creative projects under the same name, published here as they become real.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A name to write under"
        description={author.short}
      />

      <Section>
        <Container>
          <div className="max-w-3xl">
            <div className="flex flex-col gap-6">
              {author.about.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-[1.0625rem] leading-[1.75] text-ink/80"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-16 border-t border-ink/10 pt-12">
              <h2 className="font-serif text-2xl text-ink">The work, in short</h2>

              <dl className="mt-8 flex flex-col gap-8">
                {practice.map((item) => (
                  <div
                    key={item.id}
                    className="grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8"
                  >
                    <dt className="eyebrow flex items-start gap-3 pt-1 text-ink/70">
                      <span
                        aria-hidden="true"
                        className="mt-[0.45rem] h-px w-4 shrink-0 bg-gold"
                      />
                      {item.label}
                    </dt>
                    <dd className="text-[1.0625rem] leading-relaxed text-ink/75">
                      {item.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-16 flex flex-col gap-3 border-t border-ink/10 pt-12 sm:flex-row sm:gap-4">
              <Link href="/writing" className={buttonVariants()}>
                Read about the writing
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="/music"
                className={buttonVariants({ variant: "secondary" })}
              >
                Hear the music
              </Link>
            </div>

            <p className="mt-10 text-sm leading-relaxed text-ink/70">
              {brand.name} is a creative identity. The wind and weather imagery
              used across this site is a metaphor for how the work moves, not a
              claim about anything else.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
