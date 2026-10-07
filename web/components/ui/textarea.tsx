"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[110px] w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 transition-colors resize-y",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:border-amber-400/50",
        error
          ? "border-red-500/60 focus-visible:ring-red-400/40"
          : "border-white/10 hover:border-white/20",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
