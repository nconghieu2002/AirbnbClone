import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import imageDownload from 'image-downloader';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import fs from 'fs';
import mime from 'mime-types';
import cookieParser from 'cookie-parser';

import dbConnect from './configs/connectDB.js';
import authRouter from './routes/authRoutes.js';
import profileRouter from './routes/profileRoutes.js';
import placeRouter from './routes/placeRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import searchRouter from './routes/searchRoutes.js';
import { config } from 'dotenv';
config();

const bucket = 'chieu-booking-app';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(process.cwd() + '/uploads'));
app.use(
    cors({
        credentials: true,
        origin: process.env.URL_FRONTEND
    })
);

const uploadToS3 = async (path, originalFilename, mimetype) => {
    const client = new S3Client({
        region: 'ap-southeast-2',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_ACCESS_KEY_SECRET
        },
        endpoint: 'https://s3.ap-southeast-2.amazonaws.com'
    });

    const parts = originalFilename.split('.');
    const ext = parts[parts.length - 1];
    const newFilename = Date.now() + '.' + ext;
    await client.send(
        new PutObjectCommand({
            Bucket: bucket,
            Body: fs.readFileSync(path),
            Key: newFilename,
            ContentType: mimetype,
            ACL: 'public-read'
        })
    );
    console.log(path, originalFilename, mimetype);

    return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
};

app.use(authRouter);
app.use(profileRouter);
app.use(placeRouter);
app.use(bookingRouter);
app.use(searchRouter);

app.post('/upload-by-link', async (req, res) => {
    dbConnect();

    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownload.image({
        url: link,
        dest: '/tmp/' + newName
    });
    const url = await uploadToS3(`/tmp/${newName}`, newName, mime.lookup(`/tmp/${newName}`));
    res.json(url);
});

const photosMiddleware = multer({ dest: '/tmp' });
app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    dbConnect();

    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname, mimetype } = req.files[i];
        const url = await uploadToS3(path, originalname, mimetype);
        uploadedFiles.push(url);
    }
    res.json(uploadedFiles);
});

app.listen(4000);
