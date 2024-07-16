const Review = require('../models/review.model');
const mongoose = require('mongoose');

exports.addReview = async (req, res) => {
    const { packageId, userId, rating, reviewDescription } = req.body;

    try {
        const newReview = new Review({
            packageId,
            userId,
            rating,
            reviewDescription,
            createdAt: new Date()
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).send({ error: 'Failed to add review' });
    }
};