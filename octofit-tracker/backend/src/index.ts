import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT ?? 8000);
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'octofit-backend' });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`MongoDB connected at ${MONGODB_URI}`);
    app.listen(PORT, () => {
      console.log(`API server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error: unknown) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
