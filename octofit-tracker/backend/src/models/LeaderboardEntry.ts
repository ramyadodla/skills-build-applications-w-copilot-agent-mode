import { Schema, model } from 'mongoose';

export interface LeaderboardEntry {
  username: string;
  teamName: string;
  rank: number;
  points: number;
  weeklyMinutes: number;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntry>(
  {
    username: { type: String, required: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    weeklyMinutes: { type: Number, required: true, min: 0 },
  },
  { timestamps: true, collection: 'leaderboard' }
);

export const LeaderboardEntryModel = model<LeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);
