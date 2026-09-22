import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PanelFrameProps = {
  /** Small label in the panel's title bar. */
  label: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

/**
 * Shared chrome for the interface illustrations. These panels are drawn by
 * hand to explain an idea. They are not screenshots of a shipped product,
 * the surrounding copy says so. Decorative, so hidden from assistive
 * technology; the capability text alongside carries the meaning.
 */
export function PanelFrame({
  label,
  children,
  className,
  bodyClassName,
}: PanelFrameProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "glass relative overflow-hidden rounded-xl border border-fg/12",
        "shadow-[0_28px_70px_-34px_rgba(0,0,0,0.75)]",
        className,
      )}
    >
      <div className="flex items-center gap-2.5 border-b border-fg/10 bg-fg/[0.04] px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-fg/15" />
          <span className="size-2 rounded-full bg-fg/15" />
          <span className="size-2 rounded-full bg-gold/60" />
        </span>
        <span className="truncate font-sans text-[0.6875rem] tracking-[0.08em] text-fg/70">
          {label}
        </span>
      </div>

      <div className={cn("relative p-4 sm:p-5", bodyClassName)}>
        <span className="grid-rule pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
