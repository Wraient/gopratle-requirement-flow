import { z } from "zod";

export const CATEGORIES = ["planner", "performer", "crew"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_META: Record<
  Category,
  { label: string; tagline: string; plural: string }
> = {
  planner: {
    label: "Event Planner",
    tagline: "Full-service planning, decor, catering and coordination",
    plural: "planners",
  },
  performer: {
    label: "Performer",
    tagline: "Artists, DJs, bands and live acts for your stage",
    plural: "performers",
  },
  crew: {
    label: "Crew",
    tagline: "Sound, lighting, camera and on-ground event staff",
    plural: "crew",
  },
};

export const EVENT_TYPES = [
  "Wedding",
  "Corporate",
  "Concert",
  "Festival",
  "Private Party",
  "Other",
] as const;

export const PLANNER_SERVICES = [
  "Catering",
  "Decor & Theming",
  "Sound & AV",
  "Lighting",
  "Photography",
  "Logistics",
  "Artist Management",
  "Security",
] as const;

export const EXPERIENCE_LEVELS = [
  "Fresher",
  "1-3 years",
  "3-5 years",
  "5+ years",
] as const;

export const AVAILABILITY = ["Weekdays", "Weekends", "Flexible"] as const;

const optionalText = (max: number) =>
  z
    .string()
    .max(max)
    .optional()
    .transform((v) => (v?.trim() === "" ? undefined : v));

// Numeric inputs arrive as strings. reqNum rejects empties loudly and
// guarantees a numeric string; callers refine range/integer rules on top.
const reqNum = (message = "Enter a number") =>
  z
    .string()
    .min(1, message)
    .refine((v) => v.trim() !== "" && !Number.isNaN(Number(v)), {
      message: "Enter a valid number",
    });

const nonNegative = (enterMessage: string, rangeMessage = "Can't be negative") =>
  reqNum(enterMessage).refine((v) => Number(v) >= 0, { message: rangeMessage });

const positiveInt = (enterMessage: string, rangeMessage: string) =>
  reqNum(enterMessage).refine(
    (v) => Number.isInteger(Number(v)) && Number(v) >= 1,
    { message: rangeMessage }
  );

export const basicsSchema = z
  .object({
    eventName: z
      .string()
      .min(3, "Give your event a name (min 3 characters)")
      .max(120),
    eventType: z.enum(EVENT_TYPES, {
      message: "Pick an event type",
    }),
    startDate: z.string().min(1, "Pick a start date"),
    endDate: z.string().optional(),
    location: z.string().min(2, "Where is the event?").max(120),
    venue: optionalText(120),
    category: z.enum(CATEGORIES, { message: "Pick a category" }),
  })
  .refine((d) => !d.endDate || d.endDate >= d.startDate, {
    message: "End date can't be before the start date",
    path: ["endDate"],
  });

export const plannerDetailsSchema = z
  .object({
    budgetMin: nonNegative("Enter a min budget", "Budget can't be negative"),
    budgetMax: nonNegative("Enter a max budget", "Budget can't be negative"),
    guestCount: positiveInt("How many guests?", "At least 1 guest"),
    plannerExperience: z.enum(EXPERIENCE_LEVELS, {
      message: "Pick an experience level",
    }),
  })
  .refine((d) => d.budgetMax >= d.budgetMin, {
    message: "Max budget can't be below min budget",
    path: ["budgetMax"],
  });

export const plannerExtrasSchema = z.object({
  servicesNeeded: z
    .array(z.string())
    .min(1, "Pick at least one service"),
  plannerNotes: optionalText(1000),
});

export const performerDetailsSchema = z.object({
  performanceType: z.string().min(2, "What kind of act?").max(80),
  durationMinutes: reqNum("How long?")
    .refine((v) => Number.isInteger(Number(v)) && Number(v) >= 5, {
      message: "Minimum 5 minutes",
    }),
  crewSize: positiveInt("Crew size?", "At least 1 person"),
  feeExpected: nonNegative("Expected fee?", "Fee can't be negative"),
});

export const performerExtrasSchema = z.object({
  portfolioLinks: z
    .array(z.string().url("That doesn't look like a valid URL"))
    .min(1, "Add at least one portfolio link"),
});

export const crewDetailsSchema = z.object({
  crewRole: z.string().min(2, "What role do you need?").max(80),
  skills: z.array(z.string()).min(1, "Add at least one skill"),
  availability: z.enum(AVAILABILITY, { message: "Pick availability" }),
});

export const crewExtrasSchema = z.object({
  dailyRate: nonNegative("Daily rate?", "Rate can't be negative"),
  experienceYears: nonNegative("Years of experience?", "Can't be negative"),
});

export type BasicsForm = z.infer<typeof basicsSchema>;

export interface RequirementForm extends BasicsForm {
  budgetMin: string;
  budgetMax: string;
  guestCount: string;
  plannerExperience: string;
  servicesNeeded: string[];
  plannerNotes: string;
  performanceType: string;
  durationMinutes: string;
  crewSize: string;
  feeExpected: string;
  portfolioLinks: string[];
  crewRole: string;
  skills: string[];
  availability: string;
  dailyRate: string;
  experienceYears: string;
}

export const initialForm: RequirementForm = {
  eventName: "",
  eventType: "" as RequirementForm["eventType"],
  startDate: "",
  endDate: "",
  location: "",
  venue: "",
  category: "" as RequirementForm["category"],
  budgetMin: "",
  budgetMax: "",
  guestCount: "",
  plannerExperience: "",
  servicesNeeded: [],
  plannerNotes: "",
  performanceType: "",
  durationMinutes: "",
  crewSize: "",
  feeExpected: "",
  portfolioLinks: [""],
  crewRole: "",
  skills: [],
  availability: "",
  dailyRate: "",
  experienceYears: "",
};

/** API expects full ISO datetimes; the picker gives YYYY-MM-DD. */
const toDateTime = (d: string) => new Date(`${d}T00:00:00`).toISOString();

export function toApiPayload(form: RequirementForm) {
  const base = {
    eventName: form.eventName.trim(),
    eventType: form.eventType,
    startDate: toDateTime(form.startDate),
    endDate: toDateTime(form.endDate || form.startDate),
    location: form.location.trim(),
    ...(form.venue ? { venue: form.venue.trim() } : {}),
  };
  switch (form.category) {
    case "planner":
      return {
        ...base,
        category: "planner" as const,
        budgetMin: Number(form.budgetMin),
        budgetMax: Number(form.budgetMax),
        guestCount: Number(form.guestCount),
        plannerExperience: form.plannerExperience,
        servicesNeeded: form.servicesNeeded,
        ...(form.plannerNotes.trim()
          ? { plannerNotes: form.plannerNotes.trim() }
          : {}),
      };
    case "performer":
      return {
        ...base,
        category: "performer" as const,
        performanceType: form.performanceType.trim(),
        durationMinutes: Number(form.durationMinutes),
        crewSize: Number(form.crewSize),
        feeExpected: Number(form.feeExpected),
        portfolioLinks: form.portfolioLinks
          .map((l) => l.trim())
          .filter(Boolean),
      };
    case "crew":
      return {
        ...base,
        category: "crew" as const,
        crewRole: form.crewRole.trim(),
        skills: form.skills,
        availability: form.availability,
        dailyRate: Number(form.dailyRate),
        experienceYears: Number(form.experienceYears),
      };
  }
}
