import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import imageDownload from 'image-downloader';
import multer from 'multer';
import fs from 'fs';

import User from './models/User.js';
import Place from './models/Place.js';
import Booking from './models/Booking.js';
import { config } from 'dotenv';
config();

const jwtSecret = 'MY_SECRET_KEY';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(process.cwd() + '/uploads'));
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

const getUserDataFromReq = (req) => {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    });
};

// app.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;
//     const passwordHash = bcrypt.hashSync(password, 10);

//     try {
//         const userDoc = await User.create({
//             name,
//             email,
//             password: passwordHash
//         });

//         res.json(userDoc);
//     } catch (err) {
//         res.status(422).json(err);
//     }
// });

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     const userDoc = await User.findOne({ email });
//     if (userDoc) {
//         const passOk = bcrypt.compareSync(password, userDoc.password);
//         if (passOk) {
//             jwt.sign(
//                 {
//                     email: userDoc.email,
//                     id: userDoc._id
//                 },
//                 jwtSecret,
//                 {},
//                 (err, token) => {
//                     if (err) {
//                         throw err;
//                     }
//                     res.cookie('token', token).json(userDoc);
//                 }
//             );
//         } else {
//             res.status(422).json('pass not ok');
//         }
//     } else {
//         res.json('not found');
//     }
// });

app.post('/register', async (req, res) => {
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

app.post('/login', async (req, res) => {
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
            res.status(400).json('not found');
        }
    } catch (err) {
        res.status(401).json({ message: err.message });
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

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownload.image({
        url: link,
        dest: process.cwd() + '/uploads/' + newName
    });

    res.json(newName);
});

const photosMiddleware = multer({ dest: 'uploads' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads', ''));
    }

    res.json(uploadedFiles);
});

app.post('/places', async (req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } =
        req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;

        const placeDoc = await Place.create({
            owner: userData.id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price
        });

        res.json(placeDoc);
    });
});

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    });
});

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
});

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } =
        req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title,
                address,
                photos: addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price
            });
            placeDoc.save();
            res.json('oke');
        }
    });
});

app.get('/places', async (req, res) => {
    res.json(await Place.find());
});

app.post('/bookings', async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        const { checkIn, checkOut, numberOfGuests, name, phone, price, place } = req.body;

        const bookingDoc = await Booking.create({
            user: userData.id,
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
            price,
            place
        });
        res.json(bookingDoc);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/bookings', async (req, res) => {
    try {
        const userData = await getUserDataFromReq(req);
        res.json(await Booking.find({ user: userData.id }).populate('place'));
    } catch (err) {
        res.json('err');
    }
});

app.listen(4000);
