"use client";

import * as React from "react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Field({
  label,
  error,
  hint,
  optional,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn("spot-field space-y-2", className)}>
      <Label>
        {label}
        {optional && (
          <span className="ml-1.5 font-normal text-zinc-600">(optional)</span>
        )}
      </Label>
      {children}
      {error ? (
        <p className="text-[13px] text-red-400 animate-fade-up">{error}</p>
      ) : hint ? (
        <p className="text-[13px] text-zinc-600">{hint}</p>
      ) : null}
    </div>
  );
}
