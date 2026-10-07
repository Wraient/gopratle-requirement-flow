"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-xl border bg-white/[0.04] px-4 text-sm text-zinc-100 placeholder:text-zinc-600 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:border-amber-400/50",
        error
          ? "border-red-500/60 focus-visible:ring-red-400/40 focus-visible:border-red-400/60"
          : "border-white/10 hover:border-white/20",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
