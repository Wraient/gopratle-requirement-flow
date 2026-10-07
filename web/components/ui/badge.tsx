"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium [&_svg]:size-3",
  {
    variants: {
      variant: {
        amber:
          "border-amber-400/30 bg-amber-400/10 text-amber-300",
        zinc: "border-white/10 bg-white/[0.05] text-zinc-300",
        green:
          "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
      },
    },
    defaultVariants: { variant: "zinc" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
