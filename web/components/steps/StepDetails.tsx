"use client";

import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Select } from "@/components/ui/select";
import { MoneyInput } from "@/components/ui/money-input";
import { Chips } from "@/components/ui/chips";
import {
  CATEGORY_META,
  EXPERIENCE_LEVELS,
  AVAILABILITY,
  type RequirementForm,
} from "@/lib/schemas";
import type { StepProps } from "./types";

export function StepDetails({ form, update, errors }: StepProps) {
  const cat = form.category;
  const meta = cat ? CATEGORY_META[cat] : null;

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h2 className="font-display text-xl font-semibold text-zinc-100">
          {meta ? `${meta.label} details` : "Details"}
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          {cat === "planner" &&
            "Budget and scale help planners quote accurately."}
          {cat === "performer" &&
            "Tell performers about the act you need."}
          {cat === "crew" && "Describe the role and the skills it needs."}
        </p>
      </div>

      {cat === "planner" && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Min budget" error={errors.budgetMin}>
              <MoneyInput
                value={form.budgetMin}
                onChange={(e) => update({ budgetMin: e.target.value })}
                placeholder="50,000"
                error={!!errors.budgetMin}
              />
            </Field>
            <Field label="Max budget" error={errors.budgetMax}>
              <MoneyInput
                value={form.budgetMax}
                onChange={(e) => update({ budgetMax: e.target.value })}
                placeholder="2,00,000"
                error={!!errors.budgetMax}
              />
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Expected guests" error={errors.guestCount}>
              <Input
                type="number"
                min="1"
                value={form.guestCount}
                onChange={(e) => update({ guestCount: e.target.value })}
                placeholder="300"
                error={!!errors.guestCount}
              />
            </Field>
            <Field label="Planner experience" error={errors.plannerExperience}>
              <Select
                value={form.plannerExperience}
                onChange={(v) =>
                  update({
                    plannerExperience: v as RequirementForm["plannerExperience"],
                  })
                }
                options={EXPERIENCE_LEVELS.map((t) => ({ value: t, label: t }))}
                placeholder="Pick experience"
                error={!!errors.plannerExperience}
              />
            </Field>
          </div>
        </>
      )}

      {cat === "performer" && (
        <>
          <Field label="Performance type" error={errors.performanceType}>
            <Input
              value={form.performanceType}
              onChange={(e) => update({ performanceType: e.target.value })}
              placeholder="e.g. Live DJ set, Sufi band, Stand-up comedy"
              error={!!errors.performanceType}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Duration (minutes)" error={errors.durationMinutes}>
              <Input
                type="number"
                min="5"
                value={form.durationMinutes}
                onChange={(e) => update({ durationMinutes: e.target.value })}
                placeholder="120"
                error={!!errors.durationMinutes}
              />
            </Field>
            <Field label="Crew size" error={errors.crewSize}>
              <Input
                type="number"
                min="1"
                value={form.crewSize}
                onChange={(e) => update({ crewSize: e.target.value })}
                placeholder="4"
                error={!!errors.crewSize}
              />
            </Field>
            <Field label="Expected fee" error={errors.feeExpected}>
              <MoneyInput
                value={form.feeExpected}
                onChange={(e) => update({ feeExpected: e.target.value })}
                placeholder="75,000"
                error={!!errors.feeExpected}
              />
            </Field>
          </div>
        </>
      )}

      {cat === "crew" && (
        <>
          <Field label="Role needed" error={errors.crewRole}>
            <Input
              value={form.crewRole}
              onChange={(e) => update({ crewRole: e.target.value })}
              placeholder="e.g. Sound engineer, Lighting technician"
              error={!!errors.crewRole}
            />
          </Field>
          <Field
            label="Skills required"
            error={errors.skills}
            hint="Pick from the list or add your own"
          >
            <Chips
              options={[
                "Mixing consoles",
                "DMX lighting",
                "Live streaming",
                "Camera operation",
                "Stage setup",
                "Power & rigging",
              ]}
              value={form.skills}
              onChange={(v) => update({ skills: v })}
              allowCustom
            />
          </Field>
          <Field label="Availability needed" error={errors.availability}>
            <Select
              value={form.availability}
              onChange={(v) =>
                update({ availability: v as RequirementForm["availability"] })
              }
              options={AVAILABILITY.map((t) => ({ value: t, label: t }))}
              placeholder="Pick availability"
              error={!!errors.availability}
            />
          </Field>
        </>
      )}
    </div>
  );
}
