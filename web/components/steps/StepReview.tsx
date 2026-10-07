"use client";

import { Pencil, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_META, type RequirementForm } from "@/lib/schemas";
import { format } from "date-fns";

export function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

export function formatDate(iso: string): string {
  try {
    return format(new Date(iso + "T00:00:00"), "d MMM yyyy");
  } catch {
    return iso;
  }
}

interface RowProps {
  label: string;
  value: string;
}

function Row({ label, value }: RowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-white/[0.06] last:border-0">
      <span className="text-[13px] text-zinc-500">{label}</span>
      <span className="text-right text-sm font-medium text-zinc-200">
        {value}
      </span>
    </div>
  );
}

interface StepReviewProps {
  form: RequirementForm;
  goTo: (step: number) => void;
  onSubmit: () => void;
  submitting: boolean;
  apiError: string | null;
}

export function StepReview({
  form,
  goTo,
  onSubmit,
  submitting,
  apiError,
}: StepReviewProps) {
  const meta = CATEGORY_META[form.category as keyof typeof CATEGORY_META];
  const dates =
    form.startDate && form.endDate && form.endDate !== form.startDate
      ? `${formatDate(form.startDate)} → ${formatDate(form.endDate)}`
      : formatDate(form.startDate);

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h2 className="font-display text-xl font-semibold text-zinc-100">
          Review & post
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          One last look before this goes live to{" "}
          {meta ? meta.plural : "vendors"}.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
          <span className="text-[13px] font-semibold uppercase tracking-wider text-zinc-500">
            Event
          </span>
          <button
            type="button"
            onClick={() => goTo(0)}
            className="inline-flex items-center gap-1 text-[13px] text-amber-300 hover:text-amber-200 cursor-pointer"
          >
            <Pencil className="size-3.5" /> Edit
          </button>
        </div>
        <div className="px-5 py-2">
          <Row label="Event" value={form.eventName} />
          <Row label="Type" value={form.eventType} />
          <Row label="Dates" value={dates} />
          <Row label="Location" value={form.location} />
          {form.venue && <Row label="Venue" value={form.venue} />}
          <div className="flex items-start justify-between gap-4 py-2.5">
            <span className="text-[13px] text-zinc-500">Category</span>
            <Badge variant="amber">{meta?.label}</Badge>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
          <span className="text-[13px] font-semibold uppercase tracking-wider text-zinc-500">
            Requirements
          </span>
          <button
            type="button"
            onClick={() => goTo(1)}
            className="inline-flex items-center gap-1 text-[13px] text-amber-300 hover:text-amber-200 cursor-pointer"
          >
            <Pencil className="size-3.5" /> Edit
          </button>
        </div>
        <div className="px-5 py-2">
          {form.category === "planner" && (
            <>
              <Row
                label="Budget"
                value={`${formatINR(Number(form.budgetMin))} – ${formatINR(Number(form.budgetMax))}`}
              />
              <Row label="Guests" value={form.guestCount} />
              <Row label="Experience" value={form.plannerExperience} />
              <Row label="Services" value={form.servicesNeeded.join(", ")} />
              {form.plannerNotes.trim() && (
                <Row label="Notes" value={form.plannerNotes.trim()} />
              )}
            </>
          )}
          {form.category === "performer" && (
            <>
              <Row label="Act" value={form.performanceType} />
              <Row label="Duration" value={`${form.durationMinutes} min`} />
              <Row label="Crew size" value={form.crewSize} />
              <Row label="Fee" value={formatINR(Number(form.feeExpected))} />
              <Row
                label="Portfolio"
                value={
                  (() => {
                    const n = form.portfolioLinks.filter(Boolean).length;
                    return `${n} link${n === 1 ? "" : "s"}`;
                  })()
                }
              />
            </>
          )}
          {form.category === "crew" && (
            <>
              <Row label="Role" value={form.crewRole} />
              <Row label="Skills" value={form.skills.join(", ")} />
              <Row label="Availability" value={form.availability} />
              <Row label="Daily rate" value={formatINR(Number(form.dailyRate))} />
              <Row
                label="Min. experience"
                value={`${form.experienceYears} yr(s)`}
              />
            </>
          )}
        </div>
      </div>

      {apiError && (
        <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/[0.07] p-4 animate-fade-up">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-400" />
          <p className="text-sm text-red-300">{apiError}</p>
        </div>
      )}

      <Button
        size="lg"
        className="w-full"
        onClick={onSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="animate-spin" /> Posting your requirement...
          </>
        ) : (
          "Post requirement"
        )}
      </Button>
      <p className="text-center text-[13px] text-zinc-600">
        Posting is free. Verified {meta ? meta.plural : "vendors"} can respond
        within 24 hours.
      </p>
    </div>
  );
}
