import { Schema, model } from 'mongoose';

export interface Workout {
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  suggestedForGoal: string;
  exercises: string[];
}

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 0 },
    suggestedForGoal: { type: String, required: true, trim: true },
    exercises: [{ type: String, required: true, trim: true }],
  },
  { timestamps: true }
);

export const WorkoutModel = model<Workout>('Workout', workoutSchema);
