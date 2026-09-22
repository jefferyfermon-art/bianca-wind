import { Mic } from "lucide-react";

import { PanelFrame } from "./panel-frame";
import { cn } from "@/lib/utils";

/**
 * Deterministic bar heights. Not random: a fixed pattern keeps the server and
 * client markup identical, and gives the trace a consistent silhouette.
 */
const bars = [
  22, 38, 30, 52, 44, 68, 58, 84, 72, 96, 80, 64, 74, 54, 66, 46, 58, 40, 52,
  34, 48, 62, 56, 78, 70, 88, 76, 60, 68, 50, 58, 42, 36, 28, 34, 24,
];

type VoiceWaveProps = {
  className?: string;
  /** Shown as the session's subject, e.g. "language practice". */
  mode?: string;
};

/**
 * A live voice session: the waveform animates continuously via CSS, with no
 * JavaScript and no audio. Under `prefers-reduced-motion` the bars freeze at
 * their staggered heights, so it still reads as a voice trace rather than
 * collapsing. Illustrative only.
 */
export function VoiceWave({
  className,
  mode = "language practice",
}: VoiceWaveProps) {
  return (
    <PanelFrame label={`voice session · ${mode}`} className={className}>
      <div className="flex items-center gap-4">
        {/* Mic with a pulsing ring. */}
        <span className="relative flex size-11 shrink-0 items-center justify-center">
          <span
            className="absolute inset-0 rounded-full bg-teal/25"
            style={{ animation: "pulse-ring 2600ms ease-out infinite" }}
          />
          <span className="relative flex size-11 items-center justify-center rounded-full border border-teal/40 bg-teal/15">
            <Mic strokeWidth={1.5} className="size-[1.1rem] text-teal" />
          </span>
        </span>

        {/* The waveform itself. */}
        <div className="flex h-16 flex-1 items-center gap-[3px]">
          {bars.map((height, index) => (
            <span
              key={index}
              className={cn(
                "voice-bar w-full flex-1 rounded-full",
                index % 7 === 0 ? "bg-gold/70" : "bg-teal/60",
              )}
              style={{
                height: `${height}%`,
                animationDelay: `${index * 55}ms`,
                animationDuration: `${900 + (index % 5) * 160}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 border-t border-fg/10 pt-4">
        <p className="font-sans text-[0.8125rem] leading-snug text-fg/80">
          &ldquo;Encore une fois, un peu plus lentement.&rdquo;
        </p>
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-teal" />
          <span className="font-sans text-[0.6875rem] tracking-wide text-fg/65">
            Listening, and adapting to what it hears
          </span>
        </div>
      </div>
    </PanelFrame>
  );
}
