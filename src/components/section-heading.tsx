import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Heading level. Pages use `h1`; sections within a page use `h2`. */
  as?: "h1" | "h2";
  className?: string;
  size?: "md" | "lg";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  size = "md",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="eyebrow flex items-center gap-3 text-ink/70">
          <span aria-hidden="true" className="h-px w-6 bg-gold" />
          {eyebrow}
        </p>
      ) : null}

      <Heading
        className={cn(
          "text-balance text-ink",
          size === "lg"
            ? "text-4xl leading-[1.08] sm:text-5xl lg:text-6xl"
            : "text-3xl leading-[1.12] sm:text-4xl",
        )}
      >
        {title}
      </Heading>

      {description ? (
        <p
          className={cn(
            "max-w-2xl body-copy text-ink/75",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
