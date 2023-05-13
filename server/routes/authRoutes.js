import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from './models/User.js';

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const passwordHash = bcrypt.hashSync(password, 10);

        const checkUser = await User.findOne({ email });
        if (checkUser) {
            throw new Error('Email is already taken');
        }

        const userDoc = await User.create({
            name,
            email,
            password: passwordHash
        });

        if (!userDoc) {
            throw new Error('Register failed');
        }

        res.status(201).json(userDoc);
    } catch (err) {
        res.status(401).json({
            message: err.message
        });
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'email or password is missing'
            });
        }

        const userDoc = await User.findOne({ email });
        if (!userDoc) {
            return res.status(400).json({
                message: 'user not found'
            });
        }

        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (!passOk) {
            return res.status(400).json({
                message: 'password is incorrect'
            });
        }

        jwt.sign(
            {
                email: userDoc.email,
                id: userDoc._id
            },
            jwtSecret,
            {},
            (err, token) => {
                if (err) {
                    throw err;
                }
                res.cookie('token', token).json(userDoc);
            }
        );

        res.status(200).json({
            message: 'login successful'
        });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
});
