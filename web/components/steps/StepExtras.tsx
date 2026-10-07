"use client";

import { Plus, X, Link2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Chips } from "@/components/ui/chips";
import { MoneyInput } from "@/components/ui/money-input";
import { CATEGORY_META, PLANNER_SERVICES } from "@/lib/schemas";
import type { StepProps } from "./types";

export function StepExtras({ form, update, errors }: StepProps) {
  const cat = form.category;
  const meta = cat ? CATEGORY_META[cat] : null;

  const setLink = (i: number, v: string) => {
    const next = [...form.portfolioLinks];
    next[i] = v;
    update({ portfolioLinks: next });
  };
  const addLink = () => update({ portfolioLinks: [...form.portfolioLinks, ""] });
  const removeLink = (i: number) =>
    update({ portfolioLinks: form.portfolioLinks.filter((_, j) => j !== i) });

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h2 className="font-display text-xl font-semibold text-zinc-100">
          Finishing touches
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          {cat === "planner" && "Which services should the planner cover?"}
          {cat === "performer" && "Show performers your previous work."}
          {cat === "crew" && "Rates help crew decide fast."}
        </p>
      </div>

      {cat === "planner" && (
        <>
          <Field
            label="Services needed"
            error={errors.servicesNeeded}
            hint="Select all that apply"
          >
            <Chips
              options={PLANNER_SERVICES}
              value={form.servicesNeeded}
              onChange={(v) => update({ servicesNeeded: v })}
            />
          </Field>
          <Field
            label="Anything else planners should know?"
            optional
            error={errors.plannerNotes}
          >
            <Textarea
              value={form.plannerNotes}
              onChange={(e) => update({ plannerNotes: e.target.value })}
              placeholder="Theme ideas, must-haves, things to avoid..."
              error={!!errors.plannerNotes}
            />
          </Field>
        </>
      )}

      {cat === "performer" && (
        <Field
          label="Portfolio links"
          error={errors.portfolioLinks}
          hint="YouTube, Instagram, Spotify — wherever your work lives"
        >
          <div className="space-y-3">
            {form.portfolioLinks.map((link, i) => (
              <div key={i} className="flex gap-2">
                <div className="relative flex-1">
                  <Link2 className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-600" />
                  <Input
                    value={link}
                    onChange={(e) => setLink(i, e.target.value)}
                    placeholder="https://youtube.com/..."
                    className="pl-11"
                    error={!!errors.portfolioLinks}
                  />
                </div>
                {form.portfolioLinks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLink(i)}
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 text-zinc-500 hover:border-red-500/40 hover:text-red-400 cursor-pointer"
                    aria-label="Remove link"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addLink}
              className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-white/15 px-4 py-2.5 text-[13px] font-medium text-zinc-400 hover:border-amber-400/50 hover:text-amber-200 cursor-pointer"
            >
              <Plus className="size-4" /> Add another link
            </button>
          </div>
        </Field>
      )}

      {cat === "crew" && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Daily rate"
              error={errors.dailyRate}
              hint="What you'll pay per day"
            >
              <MoneyInput
                value={form.dailyRate}
                onChange={(e) => update({ dailyRate: e.target.value })}
                placeholder="3,000"
                error={!!errors.dailyRate}
              />
            </Field>
            <Field
              label="Min. experience (years)"
              error={errors.experienceYears}
            >
              <Input
                type="number"
                min="0"
                value={form.experienceYears}
                onChange={(e) => update({ experienceYears: e.target.value })}
                placeholder="2"
                error={!!errors.experienceYears}
              />
            </Field>
          </div>
          <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-4">
            <p className="text-[13px] leading-relaxed text-amber-200/80">
              Tip: crew with rate expectations get matched 2x faster. Be
              realistic and the right people will bite.
            </p>
          </div>
        </>
      )}

      {meta && (
        <p className="text-[13px] text-zinc-600">
          Posting as <span className="text-zinc-400">{meta.label}</span> — this
          is how {meta.plural} will see your requirement.
        </p>
      )}
    </div>
  );
}
