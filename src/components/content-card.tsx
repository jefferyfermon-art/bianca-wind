import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

export type ContentCardTag = {
  label: string;
  variant?: "solid" | "outline";
  dot?: boolean;
};

type ContentCardProps = {
  title: string;
  tags?: ContentCardTag[];
  /** Body copy. Omit entirely rather than passing filler text. */
  description?: string | null;
  /** Shown in place of `description` when there is nothing public to say yet. */
  placeholder?: string;
  media?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

/**
 * Shared card for a single piece of work — a writing project, a track, or any
 * future project type.
 */
export function ContentCard({
  title,
  tags,
  description,
  placeholder,
  media,
  footer,
  className,
}: ContentCardProps) {
  const body = description ?? placeholder ?? null;

  return (
    <Card
      className={cn(
        "flex flex-col gap-6 p-6 transition-colors duration-200 hover:border-ink/25 sm:p-7",
        media && "sm:flex-row sm:items-start sm:gap-8",
        className,
      )}
    >
      {media ? <div className="w-full sm:w-44 sm:shrink-0">{media}</div> : null}

      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <CardHeader>
          {tags && tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag.label} variant={tag.variant} dot={tag.dot}>
                  {tag.label}
                </Tag>
              ))}
            </div>
          ) : null}
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        {body ? (
          <CardContent>
            <CardDescription
              className={cn(!description && placeholder && "italic text-ink/70")}
            >
              {body}
            </CardDescription>
          </CardContent>
        ) : null}

        {footer ? <CardFooter className="mt-auto pt-1">{footer}</CardFooter> : null}
      </div>
    </Card>
  );
}
