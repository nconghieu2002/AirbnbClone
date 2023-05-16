import express from 'express';

import dbConnect from '../configs/connectDB.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import User from '../models/User.js';

const profileRouter = express.Router();

profileRouter.get('/profile', authMiddleware, async (req, res) => {
    dbConnect();

    const userData = req.userData;
    if (userData) {
        const { name, email, _id } = await User.findById(userData.id);
        res.json({ name, email, _id });
    } else {
        res.json(null);
    }
});

export default profileRouter;
