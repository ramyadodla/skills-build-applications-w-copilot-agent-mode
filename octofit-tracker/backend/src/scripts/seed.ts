import mongoose from 'mongoose';
import { ActivityModel } from '../models/Activity';
import { LeaderboardEntryModel } from '../models/LeaderboardEntry';
import { TeamModel } from '../models/Team';
import { UserModel } from '../models/User';
import { WorkoutModel } from '../models/Workout';

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

const users = [
  {
    username: 'maya-runner',
    email: 'maya.runner@example.com',
    displayName: 'Maya Patel',
    fitnessGoal: 'Run a 10K under 55 minutes',
    teamName: 'Cardio Crew',
    joinedAt: new Date('2026-01-12T10:00:00Z'),
  },
  {
    username: 'noah-lifts',
    email: 'noah.lifts@example.com',
    displayName: 'Noah Kim',
    fitnessGoal: 'Build full-body strength',
    teamName: 'Power Pulse',
    joinedAt: new Date('2026-02-03T14:30:00Z'),
  },
  {
    username: 'sofia-yoga',
    email: 'sofia.yoga@example.com',
    displayName: 'Sofia Rivera',
    fitnessGoal: 'Improve mobility and recovery',
    teamName: 'Flex Force',
    joinedAt: new Date('2026-02-18T09:15:00Z'),
  },
  {
    username: 'liam-cycles',
    email: 'liam.cycles@example.com',
    displayName: 'Liam Brooks',
    fitnessGoal: 'Cycle 100 miles per week',
    teamName: 'Cardio Crew',
    joinedAt: new Date('2026-03-01T16:45:00Z'),
  },
];

const teams = [
  {
    name: 'Cardio Crew',
    city: 'Seattle',
    memberCount: 18,
    weeklyGoalMinutes: 3600,
    captainUsername: 'maya-runner',
  },
  {
    name: 'Power Pulse',
    city: 'Austin',
    memberCount: 14,
    weeklyGoalMinutes: 3000,
    captainUsername: 'noah-lifts',
  },
  {
    name: 'Flex Force',
    city: 'Denver',
    memberCount: 11,
    weeklyGoalMinutes: 2400,
    captainUsername: 'sofia-yoga',
  },
];

const activities = [
  {
    username: 'maya-runner',
    activityType: 'Running',
    durationMinutes: 42,
    caloriesBurned: 430,
    activityDate: new Date('2026-06-18T07:00:00Z'),
  },
  {
    username: 'noah-lifts',
    activityType: 'Strength Training',
    durationMinutes: 55,
    caloriesBurned: 360,
    activityDate: new Date('2026-06-18T18:15:00Z'),
  },
  {
    username: 'sofia-yoga',
    activityType: 'Yoga',
    durationMinutes: 35,
    caloriesBurned: 160,
    activityDate: new Date('2026-06-19T06:30:00Z'),
  },
  {
    username: 'liam-cycles',
    activityType: 'Cycling',
    durationMinutes: 78,
    caloriesBurned: 620,
    activityDate: new Date('2026-06-19T12:00:00Z'),
  },
];

const leaderboard = [
  {
    username: 'liam-cycles',
    teamName: 'Cardio Crew',
    rank: 1,
    points: 2480,
    weeklyMinutes: 315,
  },
  {
    username: 'maya-runner',
    teamName: 'Cardio Crew',
    rank: 2,
    points: 2325,
    weeklyMinutes: 284,
  },
  {
    username: 'noah-lifts',
    teamName: 'Power Pulse',
    rank: 3,
    points: 2110,
    weeklyMinutes: 260,
  },
  {
    username: 'sofia-yoga',
    teamName: 'Flex Force',
    rank: 4,
    points: 1895,
    weeklyMinutes: 235,
  },
];

const workouts = [
  {
    title: 'Tempo Run Builder',
    category: 'Cardio',
    difficulty: 'intermediate' as const,
    durationMinutes: 45,
    suggestedForGoal: 'Run a 10K under 55 minutes',
    exercises: ['10 min easy jog', '20 min tempo run', '6 x 30 sec strides', '5 min cooldown'],
  },
  {
    title: 'Foundational Strength Circuit',
    category: 'Strength',
    difficulty: 'beginner' as const,
    durationMinutes: 38,
    suggestedForGoal: 'Build full-body strength',
    exercises: ['Goblet squats', 'Push-ups', 'Bent-over rows', 'Glute bridges', 'Plank holds'],
  },
  {
    title: 'Mobility Reset Flow',
    category: 'Mobility',
    difficulty: 'beginner' as const,
    durationMinutes: 25,
    suggestedForGoal: 'Improve mobility and recovery',
    exercises: ['Cat-cow', 'World greatest stretch', 'Hip airplanes', 'Thoracic rotations', 'Box breathing'],
  },
  {
    title: 'Endurance Ride Intervals',
    category: 'Cycling',
    difficulty: 'advanced' as const,
    durationMinutes: 60,
    suggestedForGoal: 'Cycle 100 miles per week',
    exercises: ['15 min warmup', '4 x 8 min threshold intervals', '10 min steady spin', '5 min cooldown'],
  },
];

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardEntryModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const [createdUsers, createdTeams, createdActivities, createdLeaderboard, createdWorkouts] = await Promise.all([
    UserModel.insertMany(users),
    TeamModel.insertMany(teams),
    ActivityModel.insertMany(activities),
    LeaderboardEntryModel.insertMany(leaderboard),
    WorkoutModel.insertMany(workouts),
  ]);

  console.log(`Seeded ${createdUsers.length} users`);
  console.log(`Seeded ${createdTeams.length} teams`);
  console.log(`Seeded ${createdActivities.length} activities`);
  console.log(`Seeded ${createdLeaderboard.length} leaderboard entries`);
  console.log(`Seeded ${createdWorkouts.length} workouts`);
}

seedDatabase()
  .catch((error: unknown) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
