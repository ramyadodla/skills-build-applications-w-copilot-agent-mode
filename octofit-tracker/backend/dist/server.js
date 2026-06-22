"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.apiBaseUrl = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const teams_1 = __importDefault(require("./routes/teams"));
const users_1 = __importDefault(require("./routes/users"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;
exports.apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
exports.app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'octofit-backend', apiBaseUrl: exports.apiBaseUrl });
});
exports.app.use('/api/users', users_1.default);
exports.app.use('/api/teams', teams_1.default);
exports.app.use('/api/activities', activities_1.default);
exports.app.use('/api/leaderboard', leaderboard_1.default);
exports.app.use('/api/workouts', workouts_1.default);
const errorHandler = (error, _req, res, _next) => {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal server error' });
};
exports.app.use(errorHandler);
(0, database_1.connectDatabase)()
    .then(() => {
    console.log(`MongoDB connected at ${database_1.MONGODB_URI}`);
    exports.app.listen(PORT, () => {
        console.log(`API server listening on ${exports.apiBaseUrl}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
