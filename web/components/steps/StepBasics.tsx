"use client";

import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Select } from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { CategoryCard } from "@/components/wizard/CategoryCard";
import {
  CATEGORIES,
  EVENT_TYPES,
  type RequirementForm,
} from "@/lib/schemas";
import type { StepProps } from "./types";

export function StepBasics({ form, update, errors }: StepProps) {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h2 className="font-display text-xl font-semibold text-zinc-100">
          Event basics
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Tell us what you are planning. The next steps adapt to the category
          you pick.
        </p>
      </div>

      <Field label="Event name" error={errors.eventName}>
        <Input
          value={form.eventName}
          onChange={(e) => update({ eventName: e.target.value })}
          placeholder="e.g. Sharma–Verma Wedding Sangeet"
          error={!!errors.eventName}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Event type" error={errors.eventType}>
          <Select
            value={form.eventType}
            onChange={(v) =>
              update({ eventType: v as RequirementForm["eventType"] })
            }
            options={EVENT_TYPES.map((t) => ({ value: t, label: t }))}
            placeholder="Pick a type"
            error={!!errors.eventType}
          />
        </Field>
        <Field label="Location" error={errors.location}>
          <Input
            value={form.location}
            onChange={(e) => update({ location: e.target.value })}
            placeholder="e.g. Pune"
            error={!!errors.location}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Event dates"
          error={errors.startDate || errors.endDate}
          hint="Pick a single day or a range"
        >
          <DateRangePicker
            startDate={form.startDate}
            endDate={form.endDate || undefined}
            onChange={(start, end) =>
              update({ startDate: start, endDate: end ?? "" })
            }
            error={!!(errors.startDate || errors.endDate)}
          />
        </Field>
        <Field label="Venue" optional error={errors.venue}>
          <Input
            value={form.venue}
            onChange={(e) => update({ venue: e.target.value })}
            placeholder="e.g. The Ritz-Carlton, Baner"
            error={!!errors.venue}
          />
        </Field>
      </div>

      <Field label="I am looking for" error={errors.category}>
        <div className="grid gap-3 sm:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <div
              key={c}
              className={`animate-fade-up stagger-${i + 1}`}
            >
              <CategoryCard
                category={c}
                selected={form.category === c}
                onSelect={() => update({ category: c })}
              />
            </div>
          ))}
        </div>
      </Field>
    </div>
  );
}
