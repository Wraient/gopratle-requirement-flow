import { z } from 'zod';
export declare const CATEGORIES: readonly ["planner", "performer", "crew"];
export type Category = (typeof CATEGORIES)[number];
export interface CategoryMeta {
    label: string;
    tagline: string;
    /** Suggested lucide icon names for the frontend to pick from. */
    icons: string[];
}
export declare const CATEGORY_META: Record<Category, CategoryMeta>;
export declare const EVENT_TYPES: readonly ["Wedding", "Corporate", "Concert", "Festival", "Private Party", "Other"];
export type EventType = (typeof EVENT_TYPES)[number];
export declare const PLANNER_SERVICES: readonly ["Catering", "Decor & Theming", "Sound & AV", "Lighting", "Photography", "Logistics", "Artist Management", "Security"];
export type PlannerService = (typeof PLANNER_SERVICES)[number];
export declare const EXPERIENCE_LEVELS: readonly ["Fresher", "1-3 years", "3-5 years", "5+ years"];
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];
export declare const AVAILABILITY: readonly ["Weekdays", "Weekends", "Flexible"];
export type Availability = (typeof AVAILABILITY)[number];
export declare const baseRequirementSchema: z.ZodObject<{
    eventName: z.ZodString;
    eventType: z.ZodEnum<["Wedding", "Corporate", "Concert", "Festival", "Private Party", "Other"]>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    location: z.ZodString;
    venue: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    venue?: string | undefined;
}, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    venue?: string | undefined;
}>;
export declare const plannerRequirementSchema: z.ZodObject<{
    eventName: z.ZodString;
    eventType: z.ZodEnum<["Wedding", "Corporate", "Concert", "Festival", "Private Party", "Other"]>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    location: z.ZodString;
    venue: z.ZodOptional<z.ZodString>;
} & {
    category: z.ZodLiteral<"planner">;
    budgetMin: z.ZodNumber;
    budgetMax: z.ZodNumber;
    guestCount: z.ZodNumber;
    servicesNeeded: z.ZodArray<z.ZodString, "many">;
    plannerExperience: z.ZodEnum<["Fresher", "1-3 years", "3-5 years", "5+ years"]>;
    plannerNotes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "planner";
    budgetMin: number;
    budgetMax: number;
    guestCount: number;
    servicesNeeded: string[];
    plannerExperience: "Fresher" | "1-3 years" | "3-5 years" | "5+ years";
    venue?: string | undefined;
    plannerNotes?: string | undefined;
}, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "planner";
    budgetMin: number;
    budgetMax: number;
    guestCount: number;
    servicesNeeded: string[];
    plannerExperience: "Fresher" | "1-3 years" | "3-5 years" | "5+ years";
    venue?: string | undefined;
    plannerNotes?: string | undefined;
}>;
export declare const performerRequirementSchema: z.ZodObject<{
    eventName: z.ZodString;
    eventType: z.ZodEnum<["Wedding", "Corporate", "Concert", "Festival", "Private Party", "Other"]>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    location: z.ZodString;
    venue: z.ZodOptional<z.ZodString>;
} & {
    category: z.ZodLiteral<"performer">;
    performanceType: z.ZodString;
    durationMinutes: z.ZodNumber;
    feeExpected: z.ZodNumber;
    portfolioLinks: z.ZodArray<z.ZodString, "many">;
    crewSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "performer";
    performanceType: string;
    durationMinutes: number;
    feeExpected: number;
    portfolioLinks: string[];
    crewSize: number;
    venue?: string | undefined;
}, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "performer";
    performanceType: string;
    durationMinutes: number;
    feeExpected: number;
    portfolioLinks: string[];
    crewSize: number;
    venue?: string | undefined;
}>;
export declare const crewRequirementSchema: z.ZodObject<{
    eventName: z.ZodString;
    eventType: z.ZodEnum<["Wedding", "Corporate", "Concert", "Festival", "Private Party", "Other"]>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    location: z.ZodString;
    venue: z.ZodOptional<z.ZodString>;
} & {
    category: z.ZodLiteral<"crew">;
    crewRole: z.ZodString;
    skills: z.ZodArray<z.ZodString, "many">;
    availability: z.ZodEnum<["Weekdays", "Weekends", "Flexible"]>;
    dailyRate: z.ZodNumber;
    experienceYears: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "crew";
    crewRole: string;
    skills: string[];
    availability: "Weekdays" | "Weekends" | "Flexible";
    dailyRate: number;
    experienceYears: number;
    venue?: string | undefined;
}, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "crew";
    crewRole: string;
    skills: string[];
    availability: "Weekdays" | "Weekends" | "Flexible";
    dailyRate: number;
    experienceYears: number;
    venue?: string | undefined;
}>;
export declare const requirementSchema: z.ZodDiscriminatedUnion<"category", [z.ZodObject<{
    eventName: z.ZodString;
    eventType: z.ZodEnum<["Wedding", "Corporate", "Concert", "Festival", "Private Party", "Other"]>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    location: z.ZodString;
    venue: z.ZodOptional<z.ZodString>;
} & {
    category: z.ZodLiteral<"planner">;
    budgetMin: z.ZodNumber;
    budgetMax: z.ZodNumber;
    guestCount: z.ZodNumber;
    servicesNeeded: z.ZodArray<z.ZodString, "many">;
    plannerExperience: z.ZodEnum<["Fresher", "1-3 years", "3-5 years", "5+ years"]>;
    plannerNotes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "planner";
    budgetMin: number;
    budgetMax: number;
    guestCount: number;
    servicesNeeded: string[];
    plannerExperience: "Fresher" | "1-3 years" | "3-5 years" | "5+ years";
    venue?: string | undefined;
    plannerNotes?: string | undefined;
}, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "planner";
    budgetMin: number;
    budgetMax: number;
    guestCount: number;
    servicesNeeded: string[];
    plannerExperience: "Fresher" | "1-3 years" | "3-5 years" | "5+ years";
    venue?: string | undefined;
    plannerNotes?: string | undefined;
}>, z.ZodObject<{
    eventName: z.ZodString;
    eventType: z.ZodEnum<["Wedding", "Corporate", "Concert", "Festival", "Private Party", "Other"]>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    location: z.ZodString;
    venue: z.ZodOptional<z.ZodString>;
} & {
    category: z.ZodLiteral<"performer">;
    performanceType: z.ZodString;
    durationMinutes: z.ZodNumber;
    feeExpected: z.ZodNumber;
    portfolioLinks: z.ZodArray<z.ZodString, "many">;
    crewSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "performer";
    performanceType: string;
    durationMinutes: number;
    feeExpected: number;
    portfolioLinks: string[];
    crewSize: number;
    venue?: string | undefined;
}, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "performer";
    performanceType: string;
    durationMinutes: number;
    feeExpected: number;
    portfolioLinks: string[];
    crewSize: number;
    venue?: string | undefined;
}>, z.ZodObject<{
    eventName: z.ZodString;
    eventType: z.ZodEnum<["Wedding", "Corporate", "Concert", "Festival", "Private Party", "Other"]>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    location: z.ZodString;
    venue: z.ZodOptional<z.ZodString>;
} & {
    category: z.ZodLiteral<"crew">;
    crewRole: z.ZodString;
    skills: z.ZodArray<z.ZodString, "many">;
    availability: z.ZodEnum<["Weekdays", "Weekends", "Flexible"]>;
    dailyRate: z.ZodNumber;
    experienceYears: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "crew";
    crewRole: string;
    skills: string[];
    availability: "Weekdays" | "Weekends" | "Flexible";
    dailyRate: number;
    experienceYears: number;
    venue?: string | undefined;
}, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "crew";
    crewRole: string;
    skills: string[];
    availability: "Weekdays" | "Weekends" | "Flexible";
    dailyRate: number;
    experienceYears: number;
    venue?: string | undefined;
}>]>;
/**
 * Full validation used by the API: the discriminated union plus the
 * cross-field rules (endDate >= startDate for every category, and
 * budgetMax >= budgetMin for planner).
 */
export declare const validatedRequirementSchema: z.ZodEffects<z.ZodDiscriminatedUnion<"category", [z.ZodObject<{
    eventName: z.ZodString;
    eventType: z.ZodEnum<["Wedding", "Corporate", "Concert", "Festival", "Private Party", "Other"]>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    location: z.ZodString;
    venue: z.ZodOptional<z.ZodString>;
} & {
    category: z.ZodLiteral<"planner">;
    budgetMin: z.ZodNumber;
    budgetMax: z.ZodNumber;
    guestCount: z.ZodNumber;
    servicesNeeded: z.ZodArray<z.ZodString, "many">;
    plannerExperience: z.ZodEnum<["Fresher", "1-3 years", "3-5 years", "5+ years"]>;
    plannerNotes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "planner";
    budgetMin: number;
    budgetMax: number;
    guestCount: number;
    servicesNeeded: string[];
    plannerExperience: "Fresher" | "1-3 years" | "3-5 years" | "5+ years";
    venue?: string | undefined;
    plannerNotes?: string | undefined;
}, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "planner";
    budgetMin: number;
    budgetMax: number;
    guestCount: number;
    servicesNeeded: string[];
    plannerExperience: "Fresher" | "1-3 years" | "3-5 years" | "5+ years";
    venue?: string | undefined;
    plannerNotes?: string | undefined;
}>, z.ZodObject<{
    eventName: z.ZodString;
    eventType: z.ZodEnum<["Wedding", "Corporate", "Concert", "Festival", "Private Party", "Other"]>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    location: z.ZodString;
    venue: z.ZodOptional<z.ZodString>;
} & {
    category: z.ZodLiteral<"performer">;
    performanceType: z.ZodString;
    durationMinutes: z.ZodNumber;
    feeExpected: z.ZodNumber;
    portfolioLinks: z.ZodArray<z.ZodString, "many">;
    crewSize: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "performer";
    performanceType: string;
    durationMinutes: number;
    feeExpected: number;
    portfolioLinks: string[];
    crewSize: number;
    venue?: string | undefined;
}, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "performer";
    performanceType: string;
    durationMinutes: number;
    feeExpected: number;
    portfolioLinks: string[];
    crewSize: number;
    venue?: string | undefined;
}>, z.ZodObject<{
    eventName: z.ZodString;
    eventType: z.ZodEnum<["Wedding", "Corporate", "Concert", "Festival", "Private Party", "Other"]>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    location: z.ZodString;
    venue: z.ZodOptional<z.ZodString>;
} & {
    category: z.ZodLiteral<"crew">;
    crewRole: z.ZodString;
    skills: z.ZodArray<z.ZodString, "many">;
    availability: z.ZodEnum<["Weekdays", "Weekends", "Flexible"]>;
    dailyRate: z.ZodNumber;
    experienceYears: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "crew";
    crewRole: string;
    skills: string[];
    availability: "Weekdays" | "Weekends" | "Flexible";
    dailyRate: number;
    experienceYears: number;
    venue?: string | undefined;
}, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "crew";
    crewRole: string;
    skills: string[];
    availability: "Weekdays" | "Weekends" | "Flexible";
    dailyRate: number;
    experienceYears: number;
    venue?: string | undefined;
}>]>, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "planner";
    budgetMin: number;
    budgetMax: number;
    guestCount: number;
    servicesNeeded: string[];
    plannerExperience: "Fresher" | "1-3 years" | "3-5 years" | "5+ years";
    venue?: string | undefined;
    plannerNotes?: string | undefined;
} | {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "performer";
    performanceType: string;
    durationMinutes: number;
    feeExpected: number;
    portfolioLinks: string[];
    crewSize: number;
    venue?: string | undefined;
} | {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "crew";
    crewRole: string;
    skills: string[];
    availability: "Weekdays" | "Weekends" | "Flexible";
    dailyRate: number;
    experienceYears: number;
    venue?: string | undefined;
}, {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "planner";
    budgetMin: number;
    budgetMax: number;
    guestCount: number;
    servicesNeeded: string[];
    plannerExperience: "Fresher" | "1-3 years" | "3-5 years" | "5+ years";
    venue?: string | undefined;
    plannerNotes?: string | undefined;
} | {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "performer";
    performanceType: string;
    durationMinutes: number;
    feeExpected: number;
    portfolioLinks: string[];
    crewSize: number;
    venue?: string | undefined;
} | {
    eventName: string;
    eventType: "Wedding" | "Corporate" | "Concert" | "Festival" | "Private Party" | "Other";
    startDate: string;
    endDate: string;
    location: string;
    category: "crew";
    crewRole: string;
    skills: string[];
    availability: "Weekdays" | "Weekends" | "Flexible";
    dailyRate: number;
    experienceYears: number;
    venue?: string | undefined;
}>;
export type BaseRequirement = z.infer<typeof baseRequirementSchema>;
export type PlannerRequirement = z.infer<typeof plannerRequirementSchema>;
export type PerformerRequirement = z.infer<typeof performerRequirementSchema>;
export type CrewRequirement = z.infer<typeof crewRequirementSchema>;
export type Requirement = z.infer<typeof requirementSchema>;
export type FieldType = 'text' | 'textarea' | 'number' | 'date' | 'select' | 'multiselect' | 'url-list' | 'string-list';
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
export declare const BASE_FIELD_GROUPS: RequirementFieldGroup[];
export declare const CATEGORY_FIELD_GROUPS: Record<Category, RequirementFieldGroup[]>;
//# sourceMappingURL=index.d.ts.map