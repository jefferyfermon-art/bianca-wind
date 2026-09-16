import { ArrowRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import { CapabilityIcon } from "@/components/capability-icon";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  cardSurface,
} from "@/components/ui/card";
import type { Capability } from "@/content/site";
import { cn } from "@/lib/utils";

type CapabilityCardProps = {
  capability: Capability;
  /** Link through to the matching section on the services page. */
  href?: Route;
  className?: string;
};

export function CapabilityCard({
  capability,
  href,
  className,
}: CapabilityCardProps) {
  const layout = cn(
    "flex h-full flex-col gap-5 p-6 transition-colors duration-200 sm:p-7",
    className,
  );

  const content = (
    <>
      <CapabilityIcon icon={capability.icon} />

      <CardHeader className="gap-2.5">
        <CardTitle className="text-xl">{capability.name}</CardTitle>
        <CardDescription>{capability.summary}</CardDescription>
      </CardHeader>

      {href ? (
        <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm text-teal">
          Read more
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </span>
      ) : null}
    </>
  );

  if (!href) {
    return <Card className={layout}>{content}</Card>;
  }

  // The whole card is the link, so the surface styles go on the anchor itself.
  return (
    <Link
      href={href}
      className={cn(cardSurface, layout, "group hover:border-ink/30")}
    >
      {content}
    </Link>
  );
}
