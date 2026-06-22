"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = require("../models/Activity");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const Workout_1 = require("../models/Workout");
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
        difficulty: 'intermediate',
        durationMinutes: 45,
        suggestedForGoal: 'Run a 10K under 55 minutes',
        exercises: ['10 min easy jog', '20 min tempo run', '6 x 30 sec strides', '5 min cooldown'],
    },
    {
        title: 'Foundational Strength Circuit',
        category: 'Strength',
        difficulty: 'beginner',
        durationMinutes: 38,
        suggestedForGoal: 'Build full-body strength',
        exercises: ['Goblet squats', 'Push-ups', 'Bent-over rows', 'Glute bridges', 'Plank holds'],
    },
    {
        title: 'Mobility Reset Flow',
        category: 'Mobility',
        difficulty: 'beginner',
        durationMinutes: 25,
        suggestedForGoal: 'Improve mobility and recovery',
        exercises: ['Cat-cow', 'World greatest stretch', 'Hip airplanes', 'Thoracic rotations', 'Box breathing'],
    },
    {
        title: 'Endurance Ride Intervals',
        category: 'Cycling',
        difficulty: 'advanced',
        durationMinutes: 60,
        suggestedForGoal: 'Cycle 100 miles per week',
        exercises: ['15 min warmup', '4 x 8 min threshold intervals', '10 min steady spin', '5 min cooldown'],
    },
];
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(MONGODB_URI);
    await Promise.all([
        User_1.UserModel.deleteMany({}),
        Team_1.TeamModel.deleteMany({}),
        Activity_1.ActivityModel.deleteMany({}),
        LeaderboardEntry_1.LeaderboardEntryModel.deleteMany({}),
        Workout_1.WorkoutModel.deleteMany({}),
    ]);
    const [createdUsers, createdTeams, createdActivities, createdLeaderboard, createdWorkouts] = await Promise.all([
        User_1.UserModel.insertMany(users),
        Team_1.TeamModel.insertMany(teams),
        Activity_1.ActivityModel.insertMany(activities),
        LeaderboardEntry_1.LeaderboardEntryModel.insertMany(leaderboard),
        Workout_1.WorkoutModel.insertMany(workouts),
    ]);
    console.log(`Seeded ${createdUsers.length} users`);
    console.log(`Seeded ${createdTeams.length} teams`);
    console.log(`Seeded ${createdActivities.length} activities`);
    console.log(`Seeded ${createdLeaderboard.length} leaderboard entries`);
    console.log(`Seeded ${createdWorkouts.length} workouts`);
}
seedDatabase()
    .catch((error) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose_1.default.disconnect();
});
