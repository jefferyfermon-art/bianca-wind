import { cn } from "@/lib/utils";
import { WindLines } from "./wind-lines";

type ConceptCoverProps = {
  title: string;
  /** Small line above the title, e.g. "Working title". */
  overline?: string;
  /** `sm` is for narrow list contexts; `md` for the feature slot. */
  size?: "sm" | "md";
  className?: string;
};

/**
 * A designed typographic stand-in for a book cover. It is deliberately
 * type-only: no illustration, no author portrait, nothing that could be
 * mistaken for a finished, published cover. Callers are expected to label it
 * as concept artwork in the surrounding copy.
 */
export function ConceptCover({
  title,
  overline,
  size = "md",
  className,
}: ConceptCoverProps) {
  const isSmall = size === "sm";

  return (
    <div
      className={cn(
        "relative aspect-[2/3] w-full max-w-full overflow-hidden rounded-md bg-ink",
        "shadow-[0_18px_50px_-24px_rgba(23,37,42,0.55)]",
        className,
      )}
    >
      {/* Atmospheric linework, dimmed back so the type stays dominant. */}
      <div className="absolute inset-0 opacity-45">
        <WindLines />
      </div>

      {/* Fine gold frame. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute rounded-[3px] border border-gold/45",
          isSmall ? "inset-2.5" : "inset-3 sm:inset-4",
        )}
      />

      <div
        className={cn(
          "relative flex h-full flex-col justify-between text-center",
          isSmall ? "p-5" : "p-7 sm:p-9",
        )}
      >
        <span
          aria-hidden="true"
          className={cn("mx-auto h-px bg-gold/70", isSmall ? "w-6" : "w-10")}
        />

        <div className={isSmall ? "" : "px-1"}>
          {overline ? (
            <p
              className={cn(
                "eyebrow text-ivory/65",
                isSmall ? "mb-2.5 text-[0.5625rem] tracking-[0.18em]" : "mb-4",
              )}
            >
              {overline}
            </p>
          ) : null}
          <p
            className={cn(
              "font-serif text-ivory",
              isSmall
                ? "text-[1.0625rem] leading-[1.2]"
                : "text-[1.75rem] leading-[1.15] sm:text-[2rem]",
            )}
          >
            {title}
          </p>
        </div>

        <span
          aria-hidden="true"
          className={cn("mx-auto h-px bg-gold/70", isSmall ? "w-6" : "w-10")}
        />
      </div>
    </div>
  );
}
