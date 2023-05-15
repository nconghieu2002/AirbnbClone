import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import imageDownload from 'image-downloader';
import multer from 'multer';
import fs from 'fs';

import dbConnect from './configs/connectDB.js';
import authRouter from './routes/authRoutes.js';
import profileRouter from './routes/profileRoutes.js';
import placeRouter from './routes/placeRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import searchRouter from './routes/searchRoutes.js';
import { config } from 'dotenv';
config();

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

dbConnect();

app.use(authRouter);
app.use(profileRouter);
app.use(placeRouter);
app.use(bookingRouter);
app.use(searchRouter);

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

app.listen(4000);
