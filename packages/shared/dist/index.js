"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORY_FIELD_GROUPS = exports.BASE_FIELD_GROUPS = exports.validatedRequirementSchema = exports.requirementSchema = exports.crewRequirementSchema = exports.performerRequirementSchema = exports.plannerRequirementSchema = exports.baseRequirementSchema = exports.AVAILABILITY = exports.EXPERIENCE_LEVELS = exports.PLANNER_SERVICES = exports.EVENT_TYPES = exports.CATEGORY_META = exports.CATEGORIES = void 0;
const zod_1 = require("zod");
/* ------------------------------------------------------------------ */
/* Vocabularies                                                        */
/* ------------------------------------------------------------------ */
exports.CATEGORIES = ['planner', 'performer', 'crew'];
exports.CATEGORY_META = {
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
exports.EVENT_TYPES = ['Wedding', 'Corporate', 'Concert', 'Festival', 'Private Party', 'Other'];
exports.PLANNER_SERVICES = [
    'Catering',
    'Decor & Theming',
    'Sound & AV',
    'Lighting',
    'Photography',
    'Logistics',
    'Artist Management',
    'Security',
];
exports.EXPERIENCE_LEVELS = ['Fresher', '1-3 years', '3-5 years', '5+ years'];
exports.AVAILABILITY = ['Weekdays', 'Weekends', 'Flexible'];
/* ------------------------------------------------------------------ */
/* Schemas                                                             */
/* ------------------------------------------------------------------ */
const isoDateTime = zod_1.z.string().datetime({ offset: true });
exports.baseRequirementSchema = zod_1.z.object({
    eventName: zod_1.z.string().min(3, 'Event name must be at least 3 characters').max(120, 'Event name is too long'),
    eventType: zod_1.z.enum(exports.EVENT_TYPES),
    startDate: isoDateTime,
    endDate: isoDateTime,
    location: zod_1.z.string().min(2, 'Location must be at least 2 characters').max(120, 'Location is too long'),
    venue: zod_1.z.string().max(200, 'Venue is too long').optional(),
});
/**
 * Cross-field checks. These cannot live inside the per-category object
 * schemas: in zod v3, `.refine()` / `.superRefine()` return ZodEffects,
 * which are not valid options for `z.discriminatedUnion`. So the union is
 * built from plain ZodObjects and these checks are applied on top via
 * `validatedRequirementSchema`, which is what the API validates against.
 */
function checkDateOrder(data, ctx) {
    if (new Date(data.endDate).getTime() < new Date(data.startDate).getTime()) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'End date must be on or after start date',
            path: ['endDate'],
        });
    }
}
exports.plannerRequirementSchema = exports.baseRequirementSchema.extend({
    category: zod_1.z.literal('planner'),
    budgetMin: zod_1.z.number().min(0, 'Budget cannot be negative'),
    budgetMax: zod_1.z.number().min(0, 'Budget cannot be negative'),
    guestCount: zod_1.z.number().int('Guest count must be a whole number').min(1, 'Guest count must be at least 1'),
    servicesNeeded: zod_1.z.array(zod_1.z.string().min(1)).min(1, 'Pick at least one service'),
    plannerExperience: zod_1.z.enum(exports.EXPERIENCE_LEVELS),
    plannerNotes: zod_1.z.string().max(1000, 'Notes are too long').optional(),
});
exports.performerRequirementSchema = exports.baseRequirementSchema.extend({
    category: zod_1.z.literal('performer'),
    performanceType: zod_1.z.string().min(2, 'Performance type must be at least 2 characters').max(80, 'Performance type is too long'),
    durationMinutes: zod_1.z.number().int('Duration must be a whole number').min(5, 'Duration must be at least 5 minutes'),
    feeExpected: zod_1.z.number().min(0, 'Fee cannot be negative'),
    portfolioLinks: zod_1.z.array(zod_1.z.string().url('Portfolio links must be valid URLs')).min(1, 'Add at least one portfolio link'),
    crewSize: zod_1.z.number().int('Crew size must be a whole number').min(1, 'Crew size must be at least 1'),
});
exports.crewRequirementSchema = exports.baseRequirementSchema.extend({
    category: zod_1.z.literal('crew'),
    crewRole: zod_1.z.string().min(2, 'Crew role must be at least 2 characters').max(80, 'Crew role is too long'),
    skills: zod_1.z.array(zod_1.z.string().min(1)).min(1, 'Add at least one skill'),
    availability: zod_1.z.enum(exports.AVAILABILITY),
    dailyRate: zod_1.z.number().min(0, 'Daily rate cannot be negative'),
    experienceYears: zod_1.z.number().min(0, 'Experience cannot be negative'),
});
exports.requirementSchema = zod_1.z.discriminatedUnion('category', [
    exports.plannerRequirementSchema,
    exports.performerRequirementSchema,
    exports.crewRequirementSchema,
]);
/**
 * Full validation used by the API: the discriminated union plus the
 * cross-field rules (endDate >= startDate for every category, and
 * budgetMax >= budgetMin for planner).
 */
exports.validatedRequirementSchema = exports.requirementSchema.superRefine((data, ctx) => {
    checkDateOrder(data, ctx);
    if (data.category === 'planner' && data.budgetMax < data.budgetMin) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: 'Maximum budget must be at least the minimum budget',
            path: ['budgetMax'],
        });
    }
});
exports.BASE_FIELD_GROUPS = [
    {
        label: 'Event basics',
        fields: [
            { name: 'eventName', label: 'Event name', type: 'text', placeholder: 'e.g. Sharma Wedding Sangeet', required: true, min: 3, max: 120 },
            { name: 'eventType', label: 'Event type', type: 'select', options: exports.EVENT_TYPES, required: true },
            { name: 'startDate', label: 'Start date', type: 'date', required: true },
            { name: 'endDate', label: 'End date', type: 'date', required: true },
            { name: 'location', label: 'Location', type: 'text', placeholder: 'City, State', required: true, min: 2, max: 120 },
            { name: 'venue', label: 'Venue (optional)', type: 'text', placeholder: 'e.g. Grand Hyatt Ballroom', required: false, max: 200 },
        ],
    },
];
exports.CATEGORY_FIELD_GROUPS = {
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
                { name: 'servicesNeeded', label: 'Services needed', type: 'multiselect', options: exports.PLANNER_SERVICES, required: true },
                { name: 'plannerExperience', label: 'Planner experience', type: 'select', options: exports.EXPERIENCE_LEVELS, required: true },
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
                { name: 'availability', label: 'Availability', type: 'select', options: exports.AVAILABILITY, required: true },
                { name: 'experienceYears', label: 'Experience (years)', type: 'number', placeholder: '2', required: true, min: 0 },
                { name: 'dailyRate', label: 'Daily rate (INR)', type: 'number', placeholder: '3000', required: true, min: 0 },
            ],
        },
    ],
};
//# sourceMappingURL=index.js.map