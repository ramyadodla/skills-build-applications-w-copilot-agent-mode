"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const router = (0, express_1.Router)();
router.get('/', async (_req, res, next) => {
    try {
        const activities = await Activity_1.ActivityModel.find().sort({ activityDate: -1 }).lean();
        res.json({ activities });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
