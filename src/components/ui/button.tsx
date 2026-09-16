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
        primary: "bg-ink text-ivory hover:bg-teal",
        secondary:
          "border border-ink/25 bg-transparent text-ink hover:border-ink/50 hover:bg-mist/60",
        /** For use on the deep ink panels. */
        inverse: "bg-ivory text-ink hover:bg-mist",
        ghost: "text-ink hover:bg-mist/70",
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
