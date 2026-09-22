import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Shared button styling. Exported separately from the `Button` element so that
 * `next/link` anchors and external `<a>` tags can wear the same styles without
 * nesting an interactive element inside another.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-sans font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-fg text-canvas hover:bg-teal",
        secondary:
          "border border-fg/25 bg-transparent text-fg hover:border-fg/50 hover:bg-panel/60",
        /** For the inverted chalk panels: dark button on a light ground. */
        inverse: "bg-canvas text-chalk hover:bg-panel",
        ghost: "text-fg hover:bg-panel/70",
        link: "text-teal underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-[0.8125rem]",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-[0.9375rem]",
        none: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
