import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import Booking from '../models/Booking.js';

const bookingRouter = express.Router();

bookingRouter.post('/bookings', authMiddleware, async (req, res) => {
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
    try {
        const userData = req.userData;
        res.json(await Booking.find({ user: userData.id }).populate('place'));
    } catch (err) {
        res.json('err');
    }
});

export default bookingRouter;
