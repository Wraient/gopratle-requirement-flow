"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  steps: string[];
  current: number;
}

export function Stepper({ steps, current }: StepperProps) {
  return (
    <ol className="flex items-center gap-1 sm:gap-2">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-1 sm:gap-2 last:flex-none">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all",
                  done
                    ? "bg-amber-400 text-zinc-950"
                    : active
                      ? "bg-amber-400/15 text-amber-300 ring-2 ring-amber-400/60"
                      : "bg-white/[0.05] text-zinc-600 ring-1 ring-white/10"
                )}
              >
                {done ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden text-[13px] font-medium whitespace-nowrap sm:block",
                  active
                    ? "text-zinc-100"
                    : done
                      ? "text-zinc-400"
                      : "text-zinc-600"
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "h-px flex-1 transition-colors",
                  i < current ? "bg-amber-400/60" : "bg-white/10"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
