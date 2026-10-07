"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirementModel = void 0;
const mongoose_1 = require("mongoose");
const shared_1 = require("@gopratle/shared");
/**
 * One collection for all requirement postings. Base fields are required
 * for every category; category-specific fields stay optional at the
 * Mongo level because the shared zod schema is the source of truth for
 * per-category validation (the API validates before saving).
 */
const requirementSchema = new mongoose_1.Schema({
    category: { type: String, enum: shared_1.CATEGORIES, required: true, index: true },
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
}, { timestamps: true });
exports.RequirementModel = (0, mongoose_1.model)('Requirement', requirementSchema);
