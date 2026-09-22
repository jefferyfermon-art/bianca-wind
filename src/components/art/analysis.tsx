import { Search } from "lucide-react";

import { PanelFrame } from "./panel-frame";
import { cn } from "@/lib/utils";

/**
 * Relative bar heights only. There are deliberately no numbers, axis values or
 * labels anywhere in this illustration: invented figures on a company site read
 * as performance claims, and there is nothing here to claim yet.
 */
const bars = [38, 54, 46, 72, 61, 88, 70, 96];

/** Asking a question of your own records. Illustrative only. */
export function Analysis({ className }: { className?: string }) {
  return (
    <PanelFrame label="analysis" className={className}>
      <div className="flex items-center gap-2.5 rounded-md border border-fg/15 bg-fg/[0.06] px-3 py-2">
        <Search className="size-3.5 shrink-0 text-fg/40" />
        <span className="truncate font-sans text-[0.75rem] text-fg/70">
          Which accounts went quiet last month?
        </span>
      </div>

      <div className="mt-5 flex h-24 items-end gap-1.5" role="presentation">
        {bars.map((height, index) => (
          <span
            key={height}
            style={{ height: `${height}%` }}
            className={cn(
              "flex-1 rounded-t-[3px]",
              // One bar picked out, to suggest a result without asserting one.
              index === bars.length - 1 ? "bg-gold/70" : "bg-teal/35",
            )}
          />
        ))}
      </div>

      <div className="mt-3 h-px bg-fg/15" />

      <div className="mt-3 flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-gold" />
        <span className="font-sans text-[0.6875rem] text-fg/65">
          Answer drawn from records you already hold
        </span>
      </div>
    </PanelFrame>
  );
}
