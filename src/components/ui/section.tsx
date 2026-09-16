import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section"> & {
  spacing?: "default" | "tight" | "loose";
};

const spacings = {
  tight: "py-14 sm:py-16",
  default: "py-20 sm:py-24",
  loose: "py-24 sm:py-28 lg:py-32",
} as const;

/** Vertical rhythm wrapper. Pair with `Container` for horizontal gutters. */
export function Section({
  className,
  spacing = "default",
  ...props
}: SectionProps) {
  return (
    <section className={cn(spacings[spacing], className)} {...props} />
  );
}
