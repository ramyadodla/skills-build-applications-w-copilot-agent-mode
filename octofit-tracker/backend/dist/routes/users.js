"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.get('/', async (_req, res, next) => {
    try {
        const users = await User_1.UserModel.find().sort({ displayName: 1 }).lean();
        res.json({ users });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
