import { Check, CircleDashed, LoaderCircle } from "lucide-react";

import { PanelFrame } from "./panel-frame";
import { cn } from "@/lib/utils";

type StepState = "done" | "running" | "waiting";

const steps: { id: string; label: string; state: StepState }[] = [
  { id: "read", label: "Read new messages", state: "done" },
  { id: "match", label: "Match to existing threads", state: "done" },
  { id: "draft", label: "Draft replies", state: "running" },
  { id: "approve", label: "Hand back for approval", state: "waiting" },
];

const stateStyles: Record<StepState, string> = {
  done: "text-teal",
  running: "text-gold",
  waiting: "text-ink/35",
};

function StepIcon({ state }: { state: StepState }) {
  const className = cn("size-4 shrink-0", stateStyles[state]);

  if (state === "done") return <Check className={className} />;
  if (state === "running")
    return <LoaderCircle className={cn(className, "animate-spin")} />;
  return <CircleDashed className={className} />;
}

/** An agent working through a task, step by step. Illustrative only. */
export function AgentRun({ className }: { className?: string }) {
  return (
    <PanelFrame label="agent run" className={className}>
      <ol className="flex flex-col gap-3">
        {steps.map((step) => (
          <li key={step.id} className="flex items-center gap-3">
            <StepIcon state={step.state} />
            <span
              className={cn(
                "font-sans text-[0.8125rem] leading-snug",
                step.state === "waiting" ? "text-ink/65" : "text-ink/80",
              )}
            >
              {step.label}
            </span>
            {step.state === "done" ? (
              <span className="ml-auto h-px w-6 shrink-0 bg-teal/40" />
            ) : null}
          </li>
        ))}
      </ol>

      <div className="mt-4 flex items-center gap-2 border-t border-ink/10 pt-3">
        <span className="size-1.5 rounded-full bg-gold" />
        <span className="font-sans text-[0.6875rem] tracking-wide text-ink/65">
          Paused for a person
        </span>
      </div>
    </PanelFrame>
  );
}
