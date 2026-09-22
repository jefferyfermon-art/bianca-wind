import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type ImageBandProps = {
  image: StaticImageData;
  children?: ReactNode;
  className?: string;
  height?: "sm" | "md" | "lg";
  /** Which way the overlay leans, so overlaid text stays readable. */
  tone?: "ink" | "light";
  /** Set on the first band above the fold; leave off elsewhere. */
  priority?: boolean;
  /** Slow scale drift. Disabled under prefers-reduced-motion. */
  drift?: boolean;
};

const heights = {
  sm: "min-h-[14rem] sm:min-h-[16rem]",
  md: "min-h-[20rem] sm:min-h-[24rem]",
  lg: "min-h-[26rem] sm:min-h-[32rem]",
} as const;

/**
 * Full-bleed photographic band with an overlay and optional overlaid content.
 *
 * The photograph is atmospheric rather than documentary, so it is decorative:
 * `alt` is intentionally empty and the wrapper is hidden from assistive
 * technology. Any meaning lives in `children`, which is real text in the DOM.
 */
export function ImageBand({
  image,
  children,
  className,
  height = "md",
  tone = "ink",
  priority = false,
  drift = false,
}: ImageBandProps) {
  return (
    <section
      className={cn(
        "relative isolate flex items-center overflow-hidden",
        heights[height],
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Image
          src={image}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          placeholder="blur"
          className={cn("object-cover", drift && "ken-burns")}
        />
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10",
          tone === "ink"
            ? "bg-gradient-to-r from-ink/80 via-ink/55 to-ink/25"
            : "bg-gradient-to-r from-ivory/90 via-ivory/70 to-ivory/40",
        )}
      />

      {children ? (
        <Container className="relative py-16 sm:py-20">{children}</Container>
      ) : null}
    </section>
  );
}
