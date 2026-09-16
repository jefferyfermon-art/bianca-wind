import type { Metadata } from "next";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

import { ContentCard, type ContentCardTag } from "@/components/content-card";
import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { musicIntro, musicTracks } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Songs made from the writing of Bianca Wind, shaped with AI music tools.",
};

export default function MusicPage() {
  return (
    <>
      <PageHeader
        eyebrow="Music"
        title="Words, set to sound"
        description="Songs built from the writing on this site, made with AI music tools."
      />

      <Section>
        <Container>
          <div className="flex max-w-2xl flex-col gap-5">
            {musicIntro.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-[1.0625rem] leading-relaxed text-ink/75"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-14 flex flex-col gap-6">
            {musicTracks.map((track) => {
              const tags: ContentCardTag[] = [
                { label: track.platform, dot: true },
              ];

              if (track.titleStatus === "working") {
                tags.push({
                  label: "Title to be confirmed",
                  variant: "outline",
                });
              }

              return (
                <li key={track.id}>
                  <ContentCard
                    title={track.displayTitle}
                    tags={tags}
                    description={`Hosted on ${track.platform}. The link opens in a new tab, and nothing plays automatically on this site.`}
                    footer={
                      <a
                        href={track.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants()}
                      >
                        Listen on {track.platform}
                        <ExternalLink aria-hidden="true" className="size-4" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    }
                  />
                </li>
              );
            })}
          </ul>

          <div className="mt-16 border-t border-ink/10 pt-12">
            <h2 className="font-serif text-2xl text-ink">How these are made</h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink/75">
              The lyrics come from Bianca&rsquo;s writing and from her own
              experiences. The music around them is produced using AI music
              tools. Where a track began as something written, you will find
              that work on the writing page.
            </p>
            <Link
              href="/writing"
              className={cn(buttonVariants({ variant: "secondary" }), "mt-8")}
            >
              Back to the writing
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
