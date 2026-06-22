"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = require("../models/Team");
const router = (0, express_1.Router)();
router.get('/', async (_req, res, next) => {
    try {
        const teams = await Team_1.TeamModel.find().sort({ name: 1 }).lean();
        res.json({ teams });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
