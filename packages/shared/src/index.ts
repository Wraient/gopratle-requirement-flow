import { z } from 'zod';

/* ------------------------------------------------------------------ */
/* Vocabularies                                                        */
/* ------------------------------------------------------------------ */

export const CATEGORIES = ['planner', 'performer', 'crew'] as const;
export type Category = (typeof CATEGORIES)[number];

export interface CategoryMeta {
  label: string;
  tagline: string;
  /** Suggested lucide icon names for the frontend to pick from. */
  icons: string[];
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  planner: {
    label: 'Event Planner',
    tagline: 'Find a planner who owns your event end to end',
    icons: ['clipboard-list', 'calendar-check-2', 'sparkles', 'party-popper', 'briefcase', 'megaphone'],
  },
  performer: {
    label: 'Performer',
    tagline: 'Book artists, DJs and acts that light up the stage',
    icons: ['music', 'mic-vocal', 'guitar', 'drum', 'star', 'ticket'],
  },
  crew: {
    label: 'Crew',
    tagline: 'Hire reliable crew for setup, sound and logistics',
    icons: ['hard-hat', 'wrench', 'truck', 'camera', 'zap', 'users'],
  },
};

export const EVENT_TYPES = ['Wedding', 'Corporate', 'Concert', 'Festival', 'Private Party', 'Other'] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export const PLANNER_SERVICES = [
  'Catering',
  'Decor & Theming',
  'Sound & AV',
  'Lighting',
  'Photography',
  'Logistics',
  'Artist Management',
  'Security',
] as const;
export type PlannerService = (typeof PLANNER_SERVICES)[number];

export const EXPERIENCE_LEVELS = ['Fresher', '1-3 years', '3-5 years', '5+ years'] as const;
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

export const AVAILABILITY = ['Weekdays', 'Weekends', 'Flexible'] as const;
export type Availability = (typeof AVAILABILITY)[number];

/* ------------------------------------------------------------------ */
/* Schemas                                                             */
/* ------------------------------------------------------------------ */

const isoDateTime = z.string().datetime({ offset: true });

export const baseRequirementSchema = z.object({
  eventName: z.string().min(3, 'Event name must be at least 3 characters').max(120, 'Event name is too long'),
  eventType: z.enum(EVENT_TYPES),
  startDate: isoDateTime,
  endDate: isoDateTime,
  location: z.string().min(2, 'Location must be at least 2 characters').max(120, 'Location is too long'),
  venue: z.string().max(200, 'Venue is too long').optional(),
});

/**
 * Cross-field checks. These cannot live inside the per-category object
 * schemas: in zod v3, `.refine()` / `.superRefine()` return ZodEffects,
 * which are not valid options for `z.discriminatedUnion`. So the union is
 * built from plain ZodObjects and these checks are applied on top via
 * `validatedRequirementSchema`, which is what the API validates against.
 */
function checkDateOrder(data: { startDate: string; endDate: string }, ctx: z.RefinementCtx): void {
  if (new Date(data.endDate).getTime() < new Date(data.startDate).getTime()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'End date must be on or after start date',
      path: ['endDate'],
    });
  }
}

export const plannerRequirementSchema = baseRequirementSchema.extend({
  category: z.literal('planner'),
  budgetMin: z.number().min(0, 'Budget cannot be negative'),
  budgetMax: z.number().min(0, 'Budget cannot be negative'),
  guestCount: z.number().int('Guest count must be a whole number').min(1, 'Guest count must be at least 1'),
  servicesNeeded: z.array(z.string().min(1)).min(1, 'Pick at least one service'),
  plannerExperience: z.enum(EXPERIENCE_LEVELS),
  plannerNotes: z.string().max(1000, 'Notes are too long').optional(),
});

export const performerRequirementSchema = baseRequirementSchema.extend({
  category: z.literal('performer'),
  performanceType: z.string().min(2, 'Performance type must be at least 2 characters').max(80, 'Performance type is too long'),
  durationMinutes: z.number().int('Duration must be a whole number').min(5, 'Duration must be at least 5 minutes'),
  feeExpected: z.number().min(0, 'Fee cannot be negative'),
  portfolioLinks: z.array(z.string().url('Portfolio links must be valid URLs')).min(1, 'Add at least one portfolio link'),
  crewSize: z.number().int('Crew size must be a whole number').min(1, 'Crew size must be at least 1'),
});

export const crewRequirementSchema = baseRequirementSchema.extend({
  category: z.literal('crew'),
  crewRole: z.string().min(2, 'Crew role must be at least 2 characters').max(80, 'Crew role is too long'),
  skills: z.array(z.string().min(1)).min(1, 'Add at least one skill'),
  availability: z.enum(AVAILABILITY),
  dailyRate: z.number().min(0, 'Daily rate cannot be negative'),
  experienceYears: z.number().min(0, 'Experience cannot be negative'),
});

export const requirementSchema = z.discriminatedUnion('category', [
  plannerRequirementSchema,
  performerRequirementSchema,
  crewRequirementSchema,
]);

/**
 * Full validation used by the API: the discriminated union plus the
 * cross-field rules (endDate >= startDate for every category, and
 * budgetMax >= budgetMin for planner).
 */
export const validatedRequirementSchema = requirementSchema.superRefine((data, ctx) => {
  checkDateOrder(data, ctx);
  if (data.category === 'planner' && data.budgetMax < data.budgetMin) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Maximum budget must be at least the minimum budget',
      path: ['budgetMax'],
    });
  }
});

export type BaseRequirement = z.infer<typeof baseRequirementSchema>;
export type PlannerRequirement = z.infer<typeof plannerRequirementSchema>;
export type PerformerRequirement = z.infer<typeof performerRequirementSchema>;
export type CrewRequirement = z.infer<typeof crewRequirementSchema>;
export type Requirement = z.infer<typeof requirementSchema>;

/* ------------------------------------------------------------------ */
/* Frontend field groups (drives the multi-step form)                 */
/* ------------------------------------------------------------------ */

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'date'
  | 'select'
  | 'multiselect'
  | 'url-list'
  | 'string-list';

export interface RequirementField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: readonly string[];
  required: boolean;
  min?: number;
  max?: number;
}

export interface RequirementFieldGroup {
  label: string;
  fields: RequirementField[];
}

export const BASE_FIELD_GROUPS: RequirementFieldGroup[] = [
  {
    label: 'Event basics',
    fields: [
      { name: 'eventName', label: 'Event name', type: 'text', placeholder: 'e.g. Sharma Wedding Sangeet', required: true, min: 3, max: 120 },
      { name: 'eventType', label: 'Event type', type: 'select', options: EVENT_TYPES, required: true },
      { name: 'startDate', label: 'Start date', type: 'date', required: true },
      { name: 'endDate', label: 'End date', type: 'date', required: true },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'City, State', required: true, min: 2, max: 120 },
      { name: 'venue', label: 'Venue (optional)', type: 'text', placeholder: 'e.g. Grand Hyatt Ballroom', required: false, max: 200 },
    ],
  },
];

export const CATEGORY_FIELD_GROUPS: Record<Category, RequirementFieldGroup[]> = {
  planner: [
    {
      label: 'Budget and scale',
      fields: [
        { name: 'budgetMin', label: 'Minimum budget (INR)', type: 'number', placeholder: '50000', required: true, min: 0 },
        { name: 'budgetMax', label: 'Maximum budget (INR)', type: 'number', placeholder: '200000', required: true, min: 0 },
        { name: 'guestCount', label: 'Expected guests', type: 'number', placeholder: '150', required: true, min: 1 },
      ],
    },
    {
      label: 'Services and experience',
      fields: [
        { name: 'servicesNeeded', label: 'Services needed', type: 'multiselect', options: PLANNER_SERVICES, required: true },
        { name: 'plannerExperience', label: 'Planner experience', type: 'select', options: EXPERIENCE_LEVELS, required: true },
        { name: 'plannerNotes', label: 'Additional notes (optional)', type: 'textarea', placeholder: 'Themes, must-haves, deal-breakers...', required: false, max: 1000 },
      ],
    },
  ],
  performer: [
    {
      label: 'Performance details',
      fields: [
        { name: 'performanceType', label: 'Performance type', type: 'text', placeholder: 'e.g. Sufi night, Stand-up comedy', required: true, min: 2, max: 80 },
        { name: 'durationMinutes', label: 'Duration (minutes)', type: 'number', placeholder: '90', required: true, min: 5 },
        { name: 'feeExpected', label: 'Expected fee (INR)', type: 'number', placeholder: '75000', required: true, min: 0 },
        { name: 'crewSize', label: 'Troupe / crew size', type: 'number', placeholder: '4', required: true, min: 1 },
        { name: 'portfolioLinks', label: 'Portfolio links', type: 'url-list', placeholder: 'https://youtube.com/...', required: true },
      ],
    },
  ],
  crew: [
    {
      label: 'Role and skills',
      fields: [
        { name: 'crewRole', label: 'Crew role', type: 'text', placeholder: 'e.g. Sound engineer, Stage hand', required: true, min: 2, max: 80 },
        { name: 'skills', label: 'Skills', type: 'string-list', placeholder: 'e.g. Mixing consoles, Rigging', required: true },
        { name: 'availability', label: 'Availability', type: 'select', options: AVAILABILITY, required: true },
        { name: 'experienceYears', label: 'Experience (years)', type: 'number', placeholder: '2', required: true, min: 0 },
        { name: 'dailyRate', label: 'Daily rate (INR)', type: 'number', placeholder: '3000', required: true, min: 0 },
      ],
    },
  ],
};
