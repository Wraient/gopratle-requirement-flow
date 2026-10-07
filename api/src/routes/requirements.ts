import { Router } from 'express';
import { CATEGORIES, validatedRequirementSchema } from '@gopratle/shared';
import { RequirementModel } from '../models/Requirement';

const router = Router();

/** POST /api/requirements - validate and store a requirement posting. */
router.post('/requirements', async (req, res, next) => {
  try {
    const parsed = validatedRequirementSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid requirement', details: parsed.error.issues });
    }
    const doc = await RequirementModel.create(parsed.data);
    return res.status(201).json(doc);
  } catch (err) {
    return next(err);
  }
});

/** GET /api/requirements - list postings, newest first. */
router.get('/requirements', async (req, res, next) => {
  try {
    const filter: Record<string, string> = {};
    const { category, limit } = req.query;

    if (category !== undefined) {
      if (typeof category !== 'string' || !(CATEGORIES as readonly string[]).includes(category)) {
        return res.status(400).json({ error: `Invalid category. Use one of: ${CATEGORIES.join(', ')}` });
      }
      filter.category = category;
    }

    const parsedLimit = Number.parseInt(String(limit ?? '20'), 10);
    const safeLimit = Math.min(Math.max(Number.isNaN(parsedLimit) ? 20 : parsedLimit, 1), 100);

    const data = await RequirementModel.find(filter).sort({ createdAt: -1 }).limit(safeLimit).lean();
    return res.json({ data, count: data.length });
  } catch (err) {
    return next(err);
  }
});

export default router;
