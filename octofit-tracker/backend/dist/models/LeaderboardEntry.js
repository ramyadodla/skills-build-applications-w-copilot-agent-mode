"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardEntryModel = void 0;
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    username: { type: String, required: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    weeklyMinutes: { type: Number, required: true, min: 0 },
}, { timestamps: true, collection: 'leaderboard' });
exports.LeaderboardEntryModel = (0, mongoose_1.model)('LeaderboardEntry', leaderboardEntrySchema);
