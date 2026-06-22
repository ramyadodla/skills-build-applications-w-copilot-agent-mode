import { Router } from 'express';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardEntryModel.find().sort({ rank: 1 }).lean();
    res.json({ leaderboard });
  } catch (error) {
    next(error);
  }
});

export default router;
