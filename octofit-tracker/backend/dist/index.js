"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = Number(process.env.PORT ?? 8000);
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'octofit-backend' });
});
mongoose_1.default
    .connect(MONGODB_URI)
    .then(() => {
    console.log(`MongoDB connected at ${MONGODB_URI}`);
    app.listen(PORT, () => {
        console.log(`API server listening on http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
