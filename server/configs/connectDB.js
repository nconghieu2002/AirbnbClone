import mongoose from 'mongoose';

import { config } from 'dotenv';
config();

const dbConnect = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL);
    } catch (err) {
        console.log(err.message);
    }
};

export default dbConnect;
