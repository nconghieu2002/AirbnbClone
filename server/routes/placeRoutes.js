import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import Place from '../models/Place.js';

const placeRouter = express.Router();

placeRouter.post('/places', authMiddleware, async (req, res) => {
    const userData = req.userData;

    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } =
        req.body;

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

placeRouter.get('/user-places', authMiddleware, async (req, res) => {
    const userData = req.userData;

    const { id } = userData;
    res.json(await Place.find({ owner: id }));
});

placeRouter.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id).populate('owner'));
});

placeRouter.put('/places', authMiddleware, async (req, res) => {
    const userData = req.userData;

    const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } =
        req.body;

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

placeRouter.get('/places', async (req, res) => {
    res.json(await Place.find());
});

export default placeRouter;
