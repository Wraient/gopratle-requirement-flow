import { Schema, type InferSchemaType } from 'mongoose';
/**
 * One collection for all requirement postings. Base fields are required
 * for every category; category-specific fields stay optional at the
 * Mongo level because the shared zod schema is the source of truth for
 * per-category validation (the API validates before saving).
 */
declare const requirementSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    category: "planner" | "performer" | "crew";
    eventName: string;
    eventType: string;
    startDate: string;
    endDate: string;
    location: string;
    servicesNeeded: string[];
    portfolioLinks: string[];
    skills: string[];
    venue?: string | null | undefined;
    budgetMin?: number | null | undefined;
    budgetMax?: number | null | undefined;
    guestCount?: number | null | undefined;
    plannerExperience?: string | null | undefined;
    plannerNotes?: string | null | undefined;
    performanceType?: string | null | undefined;
    durationMinutes?: number | null | undefined;
    feeExpected?: number | null | undefined;
    crewSize?: number | null | undefined;
    crewRole?: string | null | undefined;
    availability?: string | null | undefined;
    dailyRate?: number | null | undefined;
    experienceYears?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    category: "planner" | "performer" | "crew";
    eventName: string;
    eventType: string;
    startDate: string;
    endDate: string;
    location: string;
    servicesNeeded: string[];
    portfolioLinks: string[];
    skills: string[];
    venue?: string | null | undefined;
    budgetMin?: number | null | undefined;
    budgetMax?: number | null | undefined;
    guestCount?: number | null | undefined;
    plannerExperience?: string | null | undefined;
    plannerNotes?: string | null | undefined;
    performanceType?: string | null | undefined;
    durationMinutes?: number | null | undefined;
    feeExpected?: number | null | undefined;
    crewSize?: number | null | undefined;
    crewRole?: string | null | undefined;
    availability?: string | null | undefined;
    dailyRate?: number | null | undefined;
    experienceYears?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    category: "planner" | "performer" | "crew";
    eventName: string;
    eventType: string;
    startDate: string;
    endDate: string;
    location: string;
    servicesNeeded: string[];
    portfolioLinks: string[];
    skills: string[];
    venue?: string | null | undefined;
    budgetMin?: number | null | undefined;
    budgetMax?: number | null | undefined;
    guestCount?: number | null | undefined;
    plannerExperience?: string | null | undefined;
    plannerNotes?: string | null | undefined;
    performanceType?: string | null | undefined;
    durationMinutes?: number | null | undefined;
    feeExpected?: number | null | undefined;
    crewSize?: number | null | undefined;
    crewRole?: string | null | undefined;
    availability?: string | null | undefined;
    dailyRate?: number | null | undefined;
    experienceYears?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type RequirementDoc = InferSchemaType<typeof requirementSchema>;
export declare const RequirementModel: import("mongoose").Model<{
    category: "planner" | "performer" | "crew";
    eventName: string;
    eventType: string;
    startDate: string;
    endDate: string;
    location: string;
    servicesNeeded: string[];
    portfolioLinks: string[];
    skills: string[];
    venue?: string | null | undefined;
    budgetMin?: number | null | undefined;
    budgetMax?: number | null | undefined;
    guestCount?: number | null | undefined;
    plannerExperience?: string | null | undefined;
    plannerNotes?: string | null | undefined;
    performanceType?: string | null | undefined;
    durationMinutes?: number | null | undefined;
    feeExpected?: number | null | undefined;
    crewSize?: number | null | undefined;
    crewRole?: string | null | undefined;
    availability?: string | null | undefined;
    dailyRate?: number | null | undefined;
    experienceYears?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    category: "planner" | "performer" | "crew";
    eventName: string;
    eventType: string;
    startDate: string;
    endDate: string;
    location: string;
    servicesNeeded: string[];
    portfolioLinks: string[];
    skills: string[];
    venue?: string | null | undefined;
    budgetMin?: number | null | undefined;
    budgetMax?: number | null | undefined;
    guestCount?: number | null | undefined;
    plannerExperience?: string | null | undefined;
    plannerNotes?: string | null | undefined;
    performanceType?: string | null | undefined;
    durationMinutes?: number | null | undefined;
    feeExpected?: number | null | undefined;
    crewSize?: number | null | undefined;
    crewRole?: string | null | undefined;
    availability?: string | null | undefined;
    dailyRate?: number | null | undefined;
    experienceYears?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    category: "planner" | "performer" | "crew";
    eventName: string;
    eventType: string;
    startDate: string;
    endDate: string;
    location: string;
    servicesNeeded: string[];
    portfolioLinks: string[];
    skills: string[];
    venue?: string | null | undefined;
    budgetMin?: number | null | undefined;
    budgetMax?: number | null | undefined;
    guestCount?: number | null | undefined;
    plannerExperience?: string | null | undefined;
    plannerNotes?: string | null | undefined;
    performanceType?: string | null | undefined;
    durationMinutes?: number | null | undefined;
    feeExpected?: number | null | undefined;
    crewSize?: number | null | undefined;
    crewRole?: string | null | undefined;
    availability?: string | null | undefined;
    dailyRate?: number | null | undefined;
    experienceYears?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    category: "planner" | "performer" | "crew";
    eventName: string;
    eventType: string;
    startDate: string;
    endDate: string;
    location: string;
    servicesNeeded: string[];
    portfolioLinks: string[];
    skills: string[];
    venue?: string | null | undefined;
    budgetMin?: number | null | undefined;
    budgetMax?: number | null | undefined;
    guestCount?: number | null | undefined;
    plannerExperience?: string | null | undefined;
    plannerNotes?: string | null | undefined;
    performanceType?: string | null | undefined;
    durationMinutes?: number | null | undefined;
    feeExpected?: number | null | undefined;
    crewSize?: number | null | undefined;
    crewRole?: string | null | undefined;
    availability?: string | null | undefined;
    dailyRate?: number | null | undefined;
    experienceYears?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    category: "planner" | "performer" | "crew";
    eventName: string;
    eventType: string;
    startDate: string;
    endDate: string;
    location: string;
    servicesNeeded: string[];
    portfolioLinks: string[];
    skills: string[];
    venue?: string | null | undefined;
    budgetMin?: number | null | undefined;
    budgetMax?: number | null | undefined;
    guestCount?: number | null | undefined;
    plannerExperience?: string | null | undefined;
    plannerNotes?: string | null | undefined;
    performanceType?: string | null | undefined;
    durationMinutes?: number | null | undefined;
    feeExpected?: number | null | undefined;
    crewSize?: number | null | undefined;
    crewRole?: string | null | undefined;
    availability?: string | null | undefined;
    dailyRate?: number | null | undefined;
    experienceYears?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    category: "planner" | "performer" | "crew";
    eventName: string;
    eventType: string;
    startDate: string;
    endDate: string;
    location: string;
    servicesNeeded: string[];
    portfolioLinks: string[];
    skills: string[];
    venue?: string | null | undefined;
    budgetMin?: number | null | undefined;
    budgetMax?: number | null | undefined;
    guestCount?: number | null | undefined;
    plannerExperience?: string | null | undefined;
    plannerNotes?: string | null | undefined;
    performanceType?: string | null | undefined;
    durationMinutes?: number | null | undefined;
    feeExpected?: number | null | undefined;
    crewSize?: number | null | undefined;
    crewRole?: string | null | undefined;
    availability?: string | null | undefined;
    dailyRate?: number | null | undefined;
    experienceYears?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export {};
