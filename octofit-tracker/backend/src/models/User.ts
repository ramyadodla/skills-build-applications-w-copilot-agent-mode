import { Schema, model } from 'mongoose';

export interface User {
  username: string;
  email: string;
  displayName: string;
  fitnessGoal: string;
  teamName: string;
  joinedAt: Date;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    fitnessGoal: { type: String, required: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    joinedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const UserModel = model<User>('User', userSchema);
