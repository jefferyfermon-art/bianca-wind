import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em]",
  {
    variants: {
      variant: {
        /** Neutral status, e.g. "Work in progress". */
        solid: "bg-mist text-ink/80",
        /** Quieter qualifier, e.g. "Working title". */
        outline: "border border-ink/20 text-ink/70",
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  },
);

type TagProps = React.ComponentProps<"span"> &
  VariantProps<typeof tagVariants> & {
    /** Decorative gold marker. Gold is never used for the text itself. */
    dot?: boolean;
  };

export function Tag({ className, variant, dot, children, ...props }: TagProps) {
  return (
    <span className={cn(tagVariants({ variant }), className)} {...props}>
      {dot ? (
        <span
          aria-hidden="true"
          className="size-1.5 shrink-0 rounded-full bg-gold"
        />
      ) : null}
      {children}
    </span>
  );
}
