import { cn } from "@/lib/utils";

/**
 * Card surface styles, exported separately so that an element which must be
 * something other than a `div` — a `next/link` anchor, say — can wear the same
 * surface without nesting one interactive element inside another.
 */
export const cardSurface =
  "rounded-lg border border-ink/12 bg-white/45 backdrop-blur-[1px]";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(cardSurface, className)} {...props} />;
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-3", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("font-serif text-2xl leading-tight text-ink", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-[0.9375rem] leading-relaxed text-ink/70", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-3", className)}
      {...props}
    />
  );
}
