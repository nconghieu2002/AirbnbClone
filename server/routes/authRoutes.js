import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dbConnect from '../configs/connectDB.js';
import User from '../models/User.js';
import { config } from 'dotenv';
config();

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    dbConnect();

    try {
        const { name, email, password } = req.body;
        const passwordHash = bcrypt.hashSync(password, 10);
        const userDoc = await User.create({
            name,
            email,
            password: passwordHash
        });
        res.status(201).json(userDoc);
    } catch (err) {
        res.status(401).json({
            message: err.message
        });
    }
});

authRouter.post('/login', async (req, res) => {
    dbConnect();

    try {
        const { email, password } = req.body;
        const userDoc = await User.findOne({ email });
        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password);
            if (passOk) {
                jwt.sign(
                    {
                        email: userDoc.email,
                        id: userDoc._id
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' },
                    (err, token) => {
                        if (err) {
                            throw err;
                        }
                        const action = {
                            domain: 'airbnb-clone-khaki-beta.vercel.app',
                            sameSite: 'none'
                        };
                        res.cookie('token', token, action).json(userDoc);
                    }
                );
            } else {
                res.status(422).json('pass not ok');
            }
        } else {
            res.status(400).json('not found');
        }
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
});

authRouter.post('/logout', (req, res) => {
    dbConnect();

    res.cookie('token', '').json(true);
});

export default authRouter;
