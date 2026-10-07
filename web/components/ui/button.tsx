"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-b from-amber-300 to-amber-500 text-zinc-950 shadow-[0_8px_24px_-8px_rgba(251,191,36,0.5)] hover:from-amber-200 hover:to-amber-400 active:scale-[0.98]",
        secondary:
          "bg-white/[0.06] text-zinc-100 border border-white/10 hover:bg-white/[0.1] active:scale-[0.98]",
        ghost: "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06]",
        danger:
          "bg-red-500/10 text-red-300 border border-red-500/20 hover:bg-red-500/20",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-5",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
