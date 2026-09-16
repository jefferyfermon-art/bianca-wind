import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ConceptCover } from "@/components/art/concept-cover";
import { ContentCard, type ContentCardTag } from "@/components/content-card";
import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { writingIntro, writingProjects } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Writing projects by Bianca Wind, listed as they take shape. Titles and details may change while a project is in progress.",
};

export default function WritingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Work in motion"
        description="Projects are listed here as they take shape, with nothing announced before it is real."
      />

      <Section>
        <Container>
          <div className="flex max-w-2xl flex-col gap-5">
            {writingIntro.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-[1.0625rem] leading-relaxed text-ink/75"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-14 flex flex-col gap-6">
            {writingProjects.map((project) => {
              const tags: ContentCardTag[] = [
                { label: project.statusLabel, dot: true },
              ];

              if (project.titleStatus === "working") {
                tags.push({ label: "Working title", variant: "outline" });
              }

              return (
                <li key={project.id}>
                  <ContentCard
                    title={project.title}
                    tags={tags}
                    description={project.summary}
                    placeholder="No synopsis yet. This project is still being written, and a description will be added here rather than guessed at."
                    media={
                      <figure>
                        <ConceptCover
                          title={project.title}
                          size="sm"
                          overline={
                            project.titleStatus === "working"
                              ? "Working title"
                              : undefined
                          }
                        />
                        <figcaption className="mt-3 text-xs leading-relaxed text-ink/70">
                          Concept artwork &mdash; not a final cover.
                        </figcaption>
                      </figure>
                    }
                  />
                </li>
              );
            })}
          </ul>

          <div className="mt-16 border-t border-ink/10 pt-12">
            <h2 className="font-serif text-2xl text-ink">
              When writing turns into sound
            </h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink/75">
              Some pieces do not stay on the page. Where a passage works better
              as something to listen to, it becomes a song.
            </p>
            <Link
              href="/music"
              className={cn(buttonVariants({ variant: "secondary" }), "mt-8")}
            >
              Go to the music
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
