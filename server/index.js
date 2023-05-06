import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import User from './models/User.js';
import { config } from 'dotenv';
config();

const jwtSecret = 'MY_SECRET_KEY';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);

//yuDpoOPGNfYx9v7i
const dbConnect = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL);
    } catch (err) {
        console.log(err.message);
    }
};

dbConnect();

app.get('/test', (req, res) => {
    res.json('ok');
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        const userDoc = await User.create({
            name,
            email,
            password: passwordHash
        });

        res.json(userDoc);
    } catch (err) {
        res.status(422).json(err);
    }
});

app.post('/login', async (req, res) => {
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
                jwtSecret,
                {},
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.cookie('token', token).json(userDoc);
                }
            );
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

app.listen(4000);
