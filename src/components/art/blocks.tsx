import { PanelFrame } from "./panel-frame";
import { cn } from "@/lib/utils";

/**
 * Twelve cells; the filled ones trace an irregular shape rather than a neat
 * rectangle — the point being that the system is cut to fit the problem.
 */
const filled = new Set([0, 1, 2, 4, 5, 7, 8, 9, 11]);
const accent = new Set([2, 8]);

/** A system assembled from parts, shaped to fit. Illustrative only. */
export function Blocks({ className }: { className?: string }) {
  return (
    <PanelFrame label="custom build" className={className}>
      <div className="grid grid-cols-4 gap-1.5">
        {Array.from({ length: 12 }, (_, index) => (
          <span
            key={index}
            className={cn(
              "aspect-square rounded-[4px] border",
              filled.has(index)
                ? accent.has(index)
                  ? "border-gold/50 bg-gold/25"
                  : "border-teal/35 bg-teal/15"
                : "border-dashed border-ink/15 bg-transparent",
            )}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-ink/10 pt-3">
        {["Built around your constraints", "Nothing you do not need"].map(
          (line) => (
            <div key={line} className="flex items-center gap-2">
              <span className="h-px w-3 shrink-0 bg-gold" />
              <span className="font-sans text-[0.6875rem] text-ink/65">
                {line}
              </span>
            </div>
          ),
        )}
      </div>
    </PanelFrame>
  );
}
