"use client";

import * as React from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChipsProps {
  options: readonly string[] | string[];
  value: string[];
  onChange: (value: string[]) => void;
  allowCustom?: boolean;
  customPlaceholder?: string;
}

export function Chips({
  options,
  value,
  onChange,
  allowCustom,
  customPlaceholder = "Add custom...",
}: ChipsProps) {
  const [draft, setDraft] = React.useState("");
  const customValues = value.filter((v) => !options.includes(v));

  const toggle = (opt: string) => {
    onChange(
      value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]
    );
  };

  const addCustom = () => {
    const v = draft.trim();
    if (v && !value.includes(v)) onChange([...value, v]);
    setDraft("");
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={cn(
                "rounded-full border px-4 py-2 text-[13px] font-medium transition-all cursor-pointer active:scale-95",
                active
                  ? "border-amber-400/60 bg-amber-400/15 text-amber-200 shadow-[0_0_16px_-4px_rgba(251,191,36,0.4)]"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-zinc-200"
              )}
            >
              {opt}
            </button>
          );
        })}
        {customValues.map((v) => (
          <span
            key={v}
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/60 bg-amber-400/15 px-3 py-2 text-[13px] font-medium text-amber-200"
          >
            {v}
            <button
              type="button"
              onClick={() => onChange(value.filter((x) => x !== v))}
              className="rounded-full p-0.5 hover:bg-amber-400/20 cursor-pointer"
              aria-label={`Remove ${v}`}
            >
              <X className="size-3" />
            </button>
          </span>
        ))}
      </div>
      {allowCustom && (
        <div className="flex gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustom();
              }
            }}
            placeholder={customPlaceholder}
            className="flex h-9 w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 text-[13px] text-zinc-200 placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
          />
          <button
            type="button"
            onClick={addCustom}
            className="inline-flex h-9 shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-white/[0.05] px-3 text-[13px] font-medium text-zinc-300 hover:bg-white/[0.1] cursor-pointer"
          >
            <Plus className="size-3.5" /> Add
          </button>
        </div>
      )}
    </div>
  );
}
