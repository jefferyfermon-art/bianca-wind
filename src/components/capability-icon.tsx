import { Blocks, Bot, LineChart, Workflow } from "lucide-react";

import type { IconKey } from "@/content/site";
import { cn } from "@/lib/utils";

const icons = {
  agent: Bot,
  automation: Workflow,
  analysis: LineChart,
  custom: Blocks,
} as const satisfies Record<IconKey, unknown>;

type CapabilityIconProps = {
  icon: IconKey;
  className?: string;
  /** `plate` draws the icon on a bordered tile; `bare` renders it alone. */
  variant?: "plate" | "bare";
};

/**
 * Decorative marker for a capability. The capability name always appears as
 * text alongside it, so the icon itself is hidden from assistive technology.
 */
export function CapabilityIcon({
  icon,
  className,
  variant = "plate",
}: CapabilityIconProps) {
  const Icon = icons[icon];

  if (variant === "bare") {
    return (
      <Icon
        aria-hidden="true"
        strokeWidth={1.25}
        className={cn("size-6 text-teal", className)}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-md border border-ink/12 bg-mist/60 text-teal",
        className,
      )}
    >
      <Icon strokeWidth={1.25} className="size-[1.375rem]" />
    </span>
  );
}
