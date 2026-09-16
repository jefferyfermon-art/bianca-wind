import { cn } from "@/lib/utils";

/**
 * Abstract flowing-line artwork suggesting moving air. Purely decorative, so it
 * is hidden from assistive technology. Drawn as vectors rather than an image so
 * it stays crisp at any size and costs nothing to download.
 */

/** Build one long, smooth current line across the canvas. */
function current(y: number, amplitude: number, skew: number) {
  const a = amplitude;
  return [
    `M -60 ${y}`,
    `C 140 ${y - a}, 250 ${y + a * 0.85 + skew}, 420 ${y - a * 0.25}`,
    `S 700 ${y + a * 0.95 - skew}, 900 ${y - a * 0.5}`,
  ].join(" ");
}

type WindLinesProps = {
  className?: string;
  /** `hero` is the dense feature artwork; `band` is a quiet section divider. */
  variant?: "hero" | "band";
};

export function WindLines({ className, variant = "hero" }: WindLinesProps) {
  const isHero = variant === "hero";

  // Baselines for the ink/teal current lines.
  const lines = isHero
    ? [
        48, 78, 108, 134, 162, 192, 218, 246, 276, 304, 332, 362, 390, 418,
        448, 478, 508,
      ]
    : [40, 70, 100, 130];

  // A couple of gold lines, used decoratively and sparingly.
  const goldLines = isHero ? [174, 352] : [85];

  return (
    <svg
      viewBox={isHero ? "0 0 840 560" : "0 0 840 170"}
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
    >
      <defs>
        {/* Fade the line ends so the artwork dissolves rather than stopping. */}
        <linearGradient id="wind-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="18%" stopColor="white" stopOpacity="1" />
          <stop offset="78%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="wind-mask">
          <rect x="0" y="0" width="840" height="560" fill="url(#wind-fade)" />
        </mask>
      </defs>

      <g mask="url(#wind-mask)">
        <g className="wind-drift">
          {lines.map((y, index) => {
            const amplitude = 26 + ((index * 13) % 44);
            const skew = ((index % 5) - 2) * 9;
            // Alternate ink and teal, and keep every line hairline-thin.
            const isTeal = index % 3 !== 0;
            return (
              <path
                key={y}
                d={current(y, amplitude, skew)}
                stroke={isTeal ? "var(--color-teal)" : "var(--color-ink)"}
                strokeWidth={index % 4 === 0 ? 1.5 : 0.9}
                strokeOpacity={isTeal ? 0.5 : 0.3}
                strokeLinecap="round"
              />
            );
          })}
        </g>

        <g className="wind-drift-slow">
          {goldLines.map((y, index) => (
            <path
              key={y}
              d={current(y, 34 + index * 12, index * 7)}
              stroke="var(--color-gold)"
              strokeWidth="1.6"
              strokeOpacity="0.75"
              strokeLinecap="round"
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
