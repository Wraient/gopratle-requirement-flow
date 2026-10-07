"use client";

import * as React from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface MoneyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
  ({ className, error, ...props }, ref) => (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
        ₹
      </span>
      <Input
        ref={ref}
        type="number"
        min="0"
        error={error}
        className={cn("pl-8", className)}
        {...props}
      />
    </div>
  )
);
MoneyInput.displayName = "MoneyInput";

export { MoneyInput };
