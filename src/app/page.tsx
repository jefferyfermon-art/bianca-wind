import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

import { ConceptCover } from "@/components/art/concept-cover";
import { WindLines } from "@/components/art/wind-lines";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import {
  author,
  brand,
  contact,
  getFeaturedTrack,
  getFeaturedWriting,
} from "@/content/site";

export default function HomePage() {
  const featuredWriting = getFeaturedWriting();
  const featuredTrack = getFeaturedTrack();

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/*  Hero                                                              */}
      {/* ------------------------------------------------------------------ */}
      <Section
        spacing="loose"
        className="relative overflow-hidden pb-16 sm:pb-20 lg:pb-24"
      >
        {/* Atmospheric wash behind the hero. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        >
          <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-mist/70 via-ivory to-ivory" />
        </div>

        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
            <div>
              <p className="eyebrow flex items-center gap-3 text-ink/70">
                <span aria-hidden="true" className="h-px w-8 bg-gold" />
                Writing &bull; Music &bull; Imagination
              </p>

              <h1 className="mt-7 text-balance text-[2.5rem] leading-[1.06] text-ink sm:text-6xl lg:text-[4.25rem]">
                {brand.tagline}
              </h1>

              <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-ink/75 sm:text-lg">
                {brand.description}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  href="/writing"
                  className={buttonVariants({ size: "lg" })}
                >
                  Explore the Writing
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <Link
                  href="/music"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                  })}
                >
                  Discover the Music
                </Link>
              </div>
            </div>

            {/* Abstract artwork rather than a photograph. */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-ink/12 bg-white/40 sm:aspect-[5/4] lg:aspect-square">
              <WindLines />
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  Introduction                                                      */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <Container>
          <div className="grid gap-10 border-t border-ink/10 pt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <SectionHeading eyebrow="Introduction" title="Meet Bianca Wind" />

            <div className="flex flex-col gap-5">
              {author.intro.map((paragraph) => (
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
                More about Bianca Wind
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  Featured writing                                                  */}
      {/* ------------------------------------------------------------------ */}
      {featuredWriting ? (
        <Section className="bg-mist/35 py-20 sm:py-24">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] lg:gap-20">
              <figure className="mx-auto w-full max-w-[17rem] lg:mx-0">
                <ConceptCover
                  title={featuredWriting.title}
                  overline="Working title"
                />
                <figcaption className="mt-4 text-center text-xs leading-relaxed text-ink/70 lg:text-left">
                  Concept artwork. Not a final cover design.
                </figcaption>
              </figure>

              <div>
                <SectionHeading
                  eyebrow="Featured writing"
                  title={featuredWriting.title}
                />

                <div className="mt-6 flex flex-wrap gap-2">
                  <Tag dot>{featuredWriting.statusLabel}</Tag>
                  {featuredWriting.titleStatus === "working" ? (
                    <Tag variant="outline">Working title</Tag>
                  ) : null}
                </div>

                <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-ink/75">
                  A project in progress. There is no synopsis to share yet
                  &mdash; details will appear here as the work takes shape.
                </p>

                <Link
                  href="/writing"
                  className={cn(buttonVariants({ variant: "secondary" }), "mt-9")}
                >
                  See the writing
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ------------------------------------------------------------------ */}
      {/*  Featured music                                                    */}
      {/* ------------------------------------------------------------------ */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <SectionHeading
              eyebrow="Featured music"
              title="Writing that becomes sound"
              description="Some of Bianca's writing and personal experiences are turned into songs, made with AI music tools."
            />

            {featuredTrack ? (
              <div className="relative overflow-hidden rounded-lg border border-ink/12 bg-white/45">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-60"
                >
                  <WindLines variant="band" />
                </div>

                <div className="relative p-7 sm:p-9">
                  <div className="flex flex-wrap gap-2">
                    <Tag dot>{featuredTrack.platform}</Tag>
                    {featuredTrack.titleStatus === "working" ? (
                      <Tag variant="outline">Title to be confirmed</Tag>
                    ) : null}
                  </div>

                  <h3 className="mt-6 font-serif text-3xl leading-tight text-ink">
                    {featuredTrack.displayTitle}
                  </h3>

                  <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ink/70">
                    Listening opens {featuredTrack.platform} in a new tab.
                    Nothing plays automatically here.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={featuredTrack.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonVariants()}
                    >
                      Listen on {featuredTrack.platform}
                      <ExternalLink aria-hidden="true" className="size-4" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                    <Link
                      href="/music"
                      className={buttonVariants({ variant: "secondary" })}
                    >
                      All music
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/*  Contact invitation                                                */}
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
