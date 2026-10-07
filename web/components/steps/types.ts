import type { RequirementForm } from "@/lib/schemas";

export interface StepProps {
  form: RequirementForm;
  update: (patch: Partial<RequirementForm>) => void;
  errors: Record<string, string>;
}
