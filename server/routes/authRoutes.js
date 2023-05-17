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
                        const options = {
                            expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // Thời gian hết hạn của cookie (1 giờ)
                            httpOnly: true, // Chỉ cho phép truy cập cookie qua HTTP, không cho phép qua JavaScript
                            secure: true // Chỉ sử dụng cookie khi kết nối HTTPS
                            // Thêm các tùy chọn khác của cookie tại đây
                        };
                        res.cookie('token', token, options).json(userDoc);
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
