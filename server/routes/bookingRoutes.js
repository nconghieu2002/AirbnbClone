import express from 'express';

import dbConnect from '../configs/connectDB.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import Booking from '../models/Booking.js';

const bookingRouter = express.Router();

bookingRouter.post('/bookings', authMiddleware, async (req, res) => {
    dbConnect();

    try {
        const userData = req.userData;

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
        res.status(401).json({ message: err.message });
    }
});

bookingRouter.get('/bookings', authMiddleware, async (req, res) => {
    dbConnect();

    try {
        const userData = req.userData;
        res.json(await Booking.find({ user: userData.id }).populate('place'));
    } catch (err) {
        res.json({ message: err.message });
    }
});

bookingRouter.delete('/bookings/:bookingId', authMiddleware, async (req, res) => {
    dbConnect();

    try {
        const { bookingId } = req.params;
        res.json(await Booking.findByIdAndDelete(bookingId));
    } catch (err) {
        res.json({ message: err.message });
    }
});

export default bookingRouter;
