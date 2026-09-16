import { PanelFrame } from "./panel-frame";

const nodes = [
  { id: "intake", label: "Form" },
  { id: "extract", label: "Extract" },
  { id: "check", label: "Validate" },
  { id: "record", label: "Record" },
];

/** A small automation moving a record between systems. Illustrative only. */
export function Pipeline({ className }: { className?: string }) {
  return (
    <PanelFrame label="automation" className={className}>
      <ol className="flex items-center justify-between gap-1">
        {nodes.map((node, index) => (
          <li key={node.id} className="flex min-w-0 flex-1 items-center gap-1">
            <span className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-md border border-ink/15 bg-white">
                <span className="size-2 rounded-full bg-teal/70" />
              </span>
              <span className="truncate font-sans text-[0.625rem] tracking-wide text-ink/65">
                {node.label}
              </span>
            </span>

            {index < nodes.length - 1 ? (
              <span className="mb-5 h-px flex-1 bg-gradient-to-r from-teal/50 to-teal/20" />
            ) : null}
          </li>
        ))}
      </ol>

      <div className="mt-4 flex flex-col gap-2 border-t border-ink/10 pt-3">
        {["Runs on every submission", "Retries on failure"].map((line) => (
          <div key={line} className="flex items-center gap-2">
            <span className="h-px w-3 shrink-0 bg-gold" />
            <span className="font-sans text-[0.6875rem] text-ink/65">
              {line}
            </span>
          </div>
        ))}
      </div>
    </PanelFrame>
  );
}
