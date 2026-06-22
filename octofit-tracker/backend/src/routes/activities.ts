import { Router } from 'express';
import { ActivityModel } from '../models/Activity';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const activities = await ActivityModel.find().sort({ activityDate: -1 }).lean();
    res.json({ activities });
  } catch (error) {
    next(error);
  }
});

export default router;
