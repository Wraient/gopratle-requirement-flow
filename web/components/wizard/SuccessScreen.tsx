"use client";

import { CheckCircle2, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_META, type Category } from "@/lib/schemas";

interface SuccessScreenProps {
  requirementId: string;
  category: Category;
  eventName: string;
  onReset: () => void;
}

export function SuccessScreen({
  requirementId,
  category,
  eventName,
  onReset,
}: SuccessScreenProps) {
  const meta = CATEGORY_META[category];
  return (
    <div className="flex flex-col items-center py-10 text-center animate-fade-up">
      <span className="flex size-16 items-center justify-center rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/40">
        <CheckCircle2 className="size-8 text-emerald-300" />
      </span>
      <h2 className="mt-6 font-display text-2xl font-semibold text-zinc-100">
        Requirement posted!
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
        <span className="text-zinc-300 font-medium">{eventName}</span> is now
        live. Verified {meta.plural} can see it and respond — expect the first
        quotes within 24 hours.
      </p>
      <div className="mt-5 flex items-center gap-2">
        <Badge variant="amber">{meta.label}</Badge>
        <code className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-zinc-400">
          {requirementId.slice(-8).toUpperCase()}
        </code>
      </div>
      <div className="mt-8 flex items-center gap-3">
        <Button variant="secondary" onClick={onReset}>
          <PartyPopper /> Post another
        </Button>
      </div>
    </div>
  );
}
