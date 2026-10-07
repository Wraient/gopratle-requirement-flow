"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Stepper } from "@/components/wizard/Stepper";
import { StepBasics } from "@/components/steps/StepBasics";
import { StepDetails } from "@/components/steps/StepDetails";
import { StepExtras } from "@/components/steps/StepExtras";
import { StepReview } from "@/components/steps/StepReview";
import { SuccessScreen } from "@/components/wizard/SuccessScreen";
import {
  initialForm,
  toApiPayload,
  basicsSchema,
  plannerDetailsSchema,
  plannerExtrasSchema,
  performerDetailsSchema,
  performerExtrasSchema,
  crewDetailsSchema,
  crewExtrasSchema,
  type RequirementForm,
  type Category,
} from "@/lib/schemas";
import { postRequirement, checkHealth, type ApiError } from "@/lib/api";
import { cn } from "@/lib/utils";

const STEPS = ["Event basics", "Details", "Extras", "Review & post"];

function schemaFor(step: number, category: string) {
  if (step === 0) return basicsSchema;
  if (step === 1) {
    if (category === "planner") return plannerDetailsSchema;
    if (category === "performer") return performerDetailsSchema;
    return crewDetailsSchema;
  }
  if (category === "planner") return plannerExtrasSchema;
  if (category === "performer") return performerExtrasSchema;
  return crewExtrasSchema;
}

export default function Home() {
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState<RequirementForm>(initialForm);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [apiError, setApiError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<{
    id: string;
    category: Category;
  } | null>(null);
  const [apiLive, setApiLive] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    checkHealth()
      .then(() => setApiLive(true))
      .catch(() => setApiLive(false));
  }, []);

  const update = React.useCallback((patch: Partial<RequirementForm>) => {
    setForm((f) => ({ ...f, ...patch }));
    setErrors((e) => {
      const next = { ...e };
      for (const k of Object.keys(patch)) delete next[k];
      return next;
    });
    setApiError(null);
  }, []);

  const validate = (s: number): boolean => {
    const schema = schemaFor(s, form.category);
    const parsed = schema.safeParse(form);
    if (parsed.success) {
      setErrors({});
      return true;
    }
    const next: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!next[key]) next[key] = issue.message;
    }
    setErrors(next);
    return false;
  };

  const next = () => {
    if (validate(step)) {
      setStep((s) => Math.min(s + 1, 3));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const back = () => {
    setStep((s) => Math.max(s - 1, 0));
    setApiError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    setSubmitting(true);
    setApiError(null);
    try {
      const payload = toApiPayload(form);
      if (!payload) throw new Error("Pick a category first");
      const res = await postRequirement(
        payload as unknown as Record<string, unknown>
      );
      setResult({ id: res._id, category: payload.category });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      const err = e as ApiError;
      setApiError(
        err.details?.length
          ? `${err.message}: ${err.details.map((d) => d.message).join("; ")}`
          : err.message || "Something went wrong. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setStep(0);
    setResult(null);
    setApiError(null);
  };

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-amber-500/[0.07] blur-[120px]" />
        <div className="absolute right-[-160px] top-1/3 h-[380px] w-[380px] rounded-full bg-orange-600/[0.05] blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-b from-amber-300 to-amber-500 text-zinc-950 shadow-[0_8px_24px_-8px_rgba(251,191,36,0.6)]">
              <Sparkles className="size-4" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              GoPratle
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-xs",
                apiLive === null
                  ? "text-zinc-600"
                  : apiLive
                    ? "text-emerald-400"
                    : "text-amber-400"
              )}
              title={
                apiLive === false
                  ? "Backend not reachable — start the API on :4000"
                  : "Backend status"
              }
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  apiLive === null
                    ? "bg-zinc-600"
                    : apiLive
                      ? "bg-emerald-400 animate-pulse"
                      : "bg-amber-400"
                )}
              />
              {apiLive === null
                ? "Checking API..."
                : apiLive
                  ? "API live"
                  : "API offline"}
            </span>
            <Badge>For hosts</Badge>
          </div>
        </header>

        {!result && (
          <div className="mt-6 text-center sm:mt-10">
            <h1 className="font-display text-3xl font-bold tracking-tight text-zinc-50 sm:text-[2.75rem] sm:leading-[1.1]">
              Tell us about your event.
              <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                We will handle the rest.
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-500">
              Post one requirement and get matched with verified planners,
              performers and crew. Free to post, quotes within 24 hours.
            </p>
          </div>
        )}

        {/* Wizard card */}
        <Card className="mt-8 sm:mt-10">
          <CardContent className="p-6 sm:p-8">
            {result ? (
              <SuccessScreen
                requirementId={result.id}
                category={result.category}
                eventName={form.eventName}
                onReset={reset}
              />
            ) : (
              <>
                <Stepper steps={STEPS} current={step} />
                <div className="my-7 h-px bg-white/[0.07]" />
                <div key={step}>
                  {step === 0 && (
                    <StepBasics form={form} update={update} errors={errors} />
                  )}
                  {step === 1 && (
                    <StepDetails form={form} update={update} errors={errors} />
                  )}
                  {step === 2 && (
                    <StepExtras form={form} update={update} errors={errors} />
                  )}
                  {step === 3 && (
                    <StepReview
                      form={form}
                      goTo={setStep}
                      onSubmit={submit}
                      submitting={submitting}
                      apiError={apiError}
                    />
                  )}
                </div>
                {step < 3 && (
                  <div className="mt-8 flex items-center justify-between border-t border-white/[0.07] pt-6">
                    <Button
                      variant="ghost"
                      onClick={back}
                      disabled={step === 0}
                      className={cn(step === 0 && "invisible")}
                    >
                      <ArrowLeft /> Back
                    </Button>
                    <Button onClick={next} size="lg" className="min-w-36">
                      Continue <ArrowRight />
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-zinc-700">
          GoPratle — the marketplace connecting hosts with professional event
          planners, performers and crew.
        </p>
      </div>
    </div>
  );
}
