import { Router } from 'express';
import { WorkoutModel } from '../models/Workout';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const workouts = await WorkoutModel.find().sort({ title: 1 }).lean();
    res.json({ workouts });
  } catch (error) {
    next(error);
  }
});

export default router;
