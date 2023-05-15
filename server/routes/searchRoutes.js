import express from 'express';

import Place from '../models/Place.js';

const searchRouter = express.Router();

searchRouter.get('/search', async (req, res) => {
    const { searchValue } = req.query;

    try {
        const searchResults = await Place.find({
            $or: [
                { title: { $regex: searchValue, $options: 'i' } },
                { address: { $regex: searchValue, $options: 'i' } }
            ]
        });

        res.json(searchResults);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default searchRouter;
