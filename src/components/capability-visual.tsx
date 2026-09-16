import { AgentRun } from "@/components/art/agent-run";
import { Analysis } from "@/components/art/analysis";
import { Blocks } from "@/components/art/blocks";
import { Pipeline } from "@/components/art/pipeline";
import type { IconKey } from "@/content/site";

const visuals = {
  agent: AgentRun,
  automation: Pipeline,
  analysis: Analysis,
  custom: Blocks,
} as const satisfies Record<IconKey, unknown>;

/**
 * Picks the interface illustration that belongs to a capability. Adding a new
 * `IconKey` will fail type-checking here until a visual is supplied for it.
 */
export function CapabilityVisual({
  icon,
  className,
}: {
  icon: IconKey;
  className?: string;
}) {
  const Visual = visuals[icon];
  return <Visual className={className} />;
}
