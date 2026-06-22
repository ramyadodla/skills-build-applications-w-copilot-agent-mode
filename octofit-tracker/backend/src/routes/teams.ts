import { Router } from 'express';
import { TeamModel } from '../models/Team';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const teams = await TeamModel.find().sort({ name: 1 }).lean();
    res.json({ teams });
  } catch (error) {
    next(error);
  }
});

export default router;
