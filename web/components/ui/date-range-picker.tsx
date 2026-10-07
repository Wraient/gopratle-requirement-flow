"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { DayPicker, type DateRange } from "react-day-picker";
import { CalendarDays } from "lucide-react";
import { format, parseISO } from "date-fns";
import "react-day-picker/style.css";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  startDate: string;
  endDate?: string;
  onChange: (start: string, end?: string) => void;
  error?: boolean;
}

function toISO(d: Date): string {
  return format(d, "yyyy-MM-dd");
}

export function DateRangePicker({
  startDate,
  endDate,
  onChange,
  error,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [today, setToday] = React.useState<Date | undefined>(undefined);
  const ref = React.useRef<HTMLDivElement>(null);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ top: 0, left: 0, width: 0 });

  // Compute "today" on the client so prerendering never sees new Date().
  React.useEffect(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    setToday(d);
  }, []);

  // Portaled popup: escapes ancestor stacking contexts (card blur,
  // animations, spotlight filters). Re-measure on scroll/resize.
  React.useEffect(() => {
    if (!open) return;
    const place = () => {
      const r = ref.current?.getBoundingClientRect();
      if (r) setPos({ top: r.bottom + 8, left: r.left, width: Math.max(r.width, 300) });
    };
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open ]);

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (ref.current?.contains(t)) return;
      if (popupRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const range: DateRange = {
    from: startDate ? parseISO(startDate) : undefined,
    to: endDate ? parseISO(endDate) : undefined,
  };

  const label = startDate
    ? endDate && endDate !== startDate
      ? `${format(parseISO(startDate), "d MMM yyyy")} → ${format(parseISO(endDate), "d MMM yyyy")}`
      : format(parseISO(startDate), "d MMM yyyy")
    : "Pick event dates";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-11 w-full items-center gap-3 rounded-xl border bg-white/[0.04] px-4 text-sm transition-colors cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50",
          error
            ? "border-red-500/60"
            : "border-white/10 hover:border-white/20",
          !startDate && "text-zinc-600"
        )}
      >
        <CalendarDays className="size-4 shrink-0 text-zinc-500" />
        <span className="truncate">{label}</span>
      </button>
      {open &&
        createPortal(
          <div
            ref={popupRef}
            className="fixed z-[100] rounded-2xl border border-white/10 bg-zinc-900 p-4 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.9)] animate-pop-in"
            style={{ top: pos.top, left: pos.left, width: pos.width }}
          >
            <DayPicker
              mode="range"
              selected={range}
              onSelect={(r) => {
                if (r?.from) {
                  onChange(toISO(r.from), r.to ? toISO(r.to) : undefined);
                } else if (r === undefined) {
                  onChange("", undefined);
                }
              }}
              disabled={today ? { before: today } : undefined}
              numberOfMonths={1}
            />
            <div className="mt-2 flex items-center justify-between border-t border-white/[0.07] pt-3">
              {startDate ? (
                <button
                  type="button"
                  onClick={() => onChange("", undefined)}
                  className="rounded-lg px-2 py-1.5 text-xs text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05] cursor-pointer"
                >
                  Clear dates
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-amber-400 px-4 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-amber-300 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
