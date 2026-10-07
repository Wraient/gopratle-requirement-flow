"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shared_1 = require("@gopratle/shared");
const Requirement_1 = require("../models/Requirement");
const router = (0, express_1.Router)();
/** POST /api/requirements - validate and store a requirement posting. */
router.post('/requirements', async (req, res, next) => {
    try {
        const parsed = shared_1.validatedRequirementSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: 'Invalid requirement', details: parsed.error.issues });
        }
        const doc = await Requirement_1.RequirementModel.create(parsed.data);
        return res.status(201).json(doc);
    }
    catch (err) {
        return next(err);
    }
});
/** GET /api/requirements - list postings, newest first. */
router.get('/requirements', async (req, res, next) => {
    try {
        const filter = {};
        const { category, limit } = req.query;
        if (category !== undefined) {
            if (typeof category !== 'string' || !shared_1.CATEGORIES.includes(category)) {
                return res.status(400).json({ error: `Invalid category. Use one of: ${shared_1.CATEGORIES.join(', ')}` });
            }
            filter.category = category;
        }
        const parsedLimit = Number.parseInt(String(limit ?? '20'), 10);
        const safeLimit = Math.min(Math.max(Number.isNaN(parsedLimit) ? 20 : parsedLimit, 1), 100);
        const data = await Requirement_1.RequirementModel.find(filter).sort({ createdAt: -1 }).limit(safeLimit).lean();
        return res.json({ data, count: data.length });
    }
    catch (err) {
        return next(err);
    }
});
exports.default = router;
