import { Schema, model } from 'mongoose';

export interface Activity {
  username: string;
  activityType: string;
  durationMinutes: number;
  caloriesBurned: number;
  activityDate: Date;
}

const activitySchema = new Schema<Activity>(
  {
    username: { type: String, required: true, trim: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    activityDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export const ActivityModel = model<Activity>('Activity', activitySchema);
