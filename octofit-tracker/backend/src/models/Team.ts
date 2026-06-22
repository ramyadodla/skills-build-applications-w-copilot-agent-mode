import { Schema, model } from 'mongoose';

export interface Team {
  name: string;
  city: string;
  memberCount: number;
  weeklyGoalMinutes: number;
  captainUsername: string;
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    memberCount: { type: Number, required: true, min: 0 },
    weeklyGoalMinutes: { type: Number, required: true, min: 0 },
    captainUsername: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const TeamModel = model<Team>('Team', teamSchema);
