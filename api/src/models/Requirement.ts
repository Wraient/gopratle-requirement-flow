import { Schema, model, type InferSchemaType } from 'mongoose';
import { CATEGORIES } from '@gopratle/shared';

/**
 * One collection for all requirement postings. Base fields are required
 * for every category; category-specific fields stay optional at the
 * Mongo level because the shared zod schema is the source of truth for
 * per-category validation (the API validates before saving).
 */
const requirementSchema = new Schema(
  {
    category: { type: String, enum: CATEGORIES, required: true, index: true },
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    location: { type: String, required: true },
    venue: { type: String },

    budgetMin: { type: Number },
    budgetMax: { type: Number },
    guestCount: { type: Number },
    servicesNeeded: { type: [String] },
    plannerExperience: { type: String },
    plannerNotes: { type: String },

    performanceType: { type: String },
    durationMinutes: { type: Number },
    feeExpected: { type: Number },
    portfolioLinks: { type: [String] },
    crewSize: { type: Number },

    crewRole: { type: String },
    skills: { type: [String] },
    availability: { type: String },
    dailyRate: { type: Number },
    experienceYears: { type: Number },
  },
  { timestamps: true }
);

export type RequirementDoc = InferSchemaType<typeof requirementSchema>;

export const RequirementModel = model('Requirement', requirementSchema);
