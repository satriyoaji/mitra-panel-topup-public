import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow",
        ghost: "border-transparent bg-background text-primary shadow",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary-500/80",
        success:
          "border-transparent bg-green-500/20 text-green-500 shadow hover:bg-green-500/30",
        warning:
          "border-transparent bg-amber-500/20 text-amber-500 shadow hover:bg-amber-500/30",
        destructive:
          "border-transparent bg-red-500/20 text-red-500 shadow hover:bg-red-500/30",
        black:
          "border-transparent bg-black text-white shadow hover:bg-black/80",
        purple:
          "border-transparent bg-purple-500/20 text-purple-500 shadow hover:bg-purple-500/30",
        blue: "border-transparent bg-blue-500/20 text-blue-500 shadow hover:bg-blue-500/30",
        outline: "text-primary border-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
