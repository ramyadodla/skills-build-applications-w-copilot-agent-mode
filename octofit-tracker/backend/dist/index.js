"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiUrl_1 = require("./config/apiUrl");
const database_1 = require("./config/database");
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const teams_1 = __importDefault(require("./routes/teams"));
const users_1 = __importDefault(require("./routes/users"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'octofit-backend', apiBaseUrl: apiUrl_1.apiBaseUrl });
});
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use('/api/workouts', workouts_1.default);
const errorHandler = (error, _req, res, _next) => {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal server error' });
};
app.use(errorHandler);
(0, database_1.connectDatabase)()
    .then(() => {
    console.log(`MongoDB connected at ${database_1.MONGODB_URI}`);
    app.listen(apiUrl_1.PORT, () => {
        console.log(`API server listening on ${apiUrl_1.apiBaseUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
