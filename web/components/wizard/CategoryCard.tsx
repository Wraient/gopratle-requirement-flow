"use client";

import { CalendarCheck, HardHat, Music, Check, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_META, type Category } from "@/lib/schemas";

const ICONS: Record<Category, LucideIcon> = {
  planner: CalendarCheck,
  performer: Music,
  crew: HardHat,
};

interface CategoryCardProps {
  category: Category;
  selected: boolean;
  onSelect: () => void;
}

export function CategoryCard({ category, selected, onSelect }: CategoryCardProps) {
  const Icon = ICONS[category];
  const meta = CATEGORY_META[category];
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-all cursor-pointer active:scale-[0.98]",
        selected
          ? "border-amber-400/70 bg-amber-400/[0.08] shadow-[0_0_32px_-8px_rgba(251,191,36,0.45)]"
          : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
      )}
    >
      <span
        className={cn(
          "flex size-11 items-center justify-center rounded-xl transition-colors",
          selected
            ? "bg-amber-400 text-zinc-950"
            : "bg-white/[0.06] text-zinc-300 group-hover:bg-white/[0.1]"
        )}
      >
        <Icon className="size-5" />
      </span>
      <span>
        <span className="block font-display text-[15px] font-semibold text-zinc-100">
          {meta.label}
        </span>
        <span className="mt-1 block text-[13px] leading-snug text-zinc-500">
          {meta.tagline}
        </span>
      </span>
      <span
        className={cn(
          "absolute right-4 top-4 flex size-5 items-center justify-center rounded-full transition-all",
          selected
            ? "bg-amber-400 text-zinc-950 scale-100"
            : "scale-75 bg-white/10 text-transparent"
        )}
      >
        <Check className="size-3" strokeWidth={3} />
      </span>
    </button>
  );
}
