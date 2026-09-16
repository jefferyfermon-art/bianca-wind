import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div"> & {
  /** `narrow` is intended for long-form reading columns. */
  width?: "default" | "narrow" | "wide";
};

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

/**
 * Horizontal shell for every section. Owns the page gutters, so nothing else
 * needs to — this is what keeps the layout free of horizontal overflow.
 */
export function Container({
  className,
  width = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8",
        widths[width],
        className,
      )}
      {...props}
    />
  );
}
