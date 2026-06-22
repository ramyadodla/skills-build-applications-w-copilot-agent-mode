import express from 'express';
import mongoose from 'mongoose';
import type { ErrorRequestHandler } from 'express';
import { apiBaseUrl, PORT } from './config/apiUrl';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

const app = express();
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'octofit-backend', apiBaseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error('API error:', error);
  res.status(500).json({ error: 'Internal server error' });
};

app.use(errorHandler);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`MongoDB connected at ${MONGODB_URI}`);
    app.listen(PORT, () => {
      console.log(`API server listening on ${apiBaseUrl}`);
    });
  })
  .catch((error: unknown) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
